/* Adapted from the user's supplied Deal to Grid and Planet Horizon sources.
 * One shared engine, real TIO assets, one-pass motion, visibility and reduced-motion controls. */
(() => {
  'use strict';
  const PALETTE = ['#FFFFFF', '#F3F3F3', '#E8E8E8', '#DADADA', '#FFB200', '#E41E26', '#2B2B2B', '#1D1D1F'];
  function c4Kit(api) {
    const W = api.W, H = api.H, u = api.u, ratio = W / H;
    const clamp = x => Math.max(0, Math.min(1, x));
    // 카드 모서리 둥글기(짧은 변에 대한 비율): 시험 카드 한 장을 만들어 읽고 바로 지웁니다
    const probe = api.card(api.root, 0, 100, 100), round = parseFloat(probe.style.borderRadius) / 100 || 0;
    probe.remove();
    const k = {
      W: W, H: H, u: u, clamp: clamp, round: round,
      shape: ratio >= 1.4 ? 'wide' : ratio > 0.74 ? 'square' : 'tall',   // 화면 모양: 가로 · 정방(4:5 포함) · 세로
      seg: (t, a, b) => clamp((t - a) / (b - a)),     // t가 a~b 사이 어디쯤인지 0~1로
      mix: (a, b, p) => a + (b - a) * p,
      mod: (a, n) => ((a % n) + n) % n,
      out: x => 1 - Math.pow(1 - clamp(x), 3),        // 빠르게 출발해 부드럽게 멈춤
      expo: x => { x = clamp(x); return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); },   // 아주 빠르게 출발해 길게 멈춤
      into: x => Math.pow(clamp(x), 3),               // 천천히 출발해 빠르게 빠져나감
      // 천천히 출발 → 빠르게 → 천천히 도착 (p가 클수록 가운데가 급함)
      ez: (x, p) => { x = clamp(x); const a = Math.pow(x, p || 3); return a / (a + Math.pow(1 - x, p || 3)); },
      hash: i => { const g = api.rand(i * 7919 + 104729); g(); return g(); },   // i마다 늘 같은 0~1 값
      pad2: i => String(i).padStart(2, '0'),
      fam: f => "'" + f + "','Noto Sans KR',sans-serif",   // 고른 글꼴 하나 + 대체로 프리텐다드
      // 카드 그림자 두 겹 (s: 카드 짧은 변, a: 진하기 배수)
      shadow: (s, a) => '0 ' + (s * 0.012).toFixed(1) + 'px ' + (s * 0.03).toFixed(1) + 'px rgba(0,0,0,' + (0.16 * (a || 1)).toFixed(3) + '),0 ' + (s * 0.07).toFixed(1) + 'px ' + (s * 0.18).toFixed(1) + 'px rgba(0,0,0,' + (0.18 * (a || 1)).toFixed(3) + ')',
      // 조각 하나 (position:absolute + css). 글자는 textContent로
      add(parent, css, words) {
        const el = document.createElement('div');
        el.style.cssText = 'position:absolute;' + css;
        if (words != null) el.textContent = words;
        parent.appendChild(el);
        return el;
      },
      // i번째 사진을 CSS 바탕 값으로: 내 이미지가 있으면 그 이미지, 없으면 sample번 샘플 그림(글자 없는 그림)
      photo(i, sample) {
        const url = api.image(i), art = url ? null : api.art(sample, true);
        return url ? 'url("' + url + '") center / contain no-repeat, #FFFFFF' : art ? 'url(' + art.url + ') center / contain no-repeat' : api.paint(i);
      },
      // 격자의 c칸 r줄에 넣을 사진 번호: 사진 수가 적어도 위아래·좌우 이웃에 같은 사진이 붙지 않게 줄마다 건너뜀
      pick(c, r, cols) {
        const n = api.count || 16;
        let v = cols;
        while (n > 1 && v % n === 0) v++;
        return c + r * v;
      },
      // 바탕 위에 바로 놓는 글자색. 투명 배경으로 저장할 때는 흰 글자 + 그림자로 (밝은 영상·어두운 영상 어디에 얹어도 읽히게)
      textOn: color => api.clear ? 'color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.55),0 0 0.5em rgba(0,0,0,0.35);' : 'color:' + color + ';',
      // 화면 한가운데가 (0,0)인 납작한 무대 (3D 묶음이 아니라서 z-index로 앞뒤를 정할 수 있음)
      stage: () => k.add(api.root, 'left:50%;top:50%;width:0;height:0;z-index:0;'),
      // 가림막 안에서 미끄러져 올라오는 글 한 줄 (부모 안에서 블록으로 쌓임). set(들어온 정도, 나간 정도)
      line(parent, css, words) {
        const box = document.createElement('div'), el = document.createElement('div');
        box.style.cssText = 'position:relative;overflow:hidden;padding:0.06em 0.04em 0.14em;margin:-0.06em -0.04em -0.14em;' + css;
        el.style.cssText = 'white-space:nowrap;line-height:1.12;will-change:transform;';
        el.textContent = words;
        box.appendChild(el);
        parent.appendChild(box);
        return { box: box, el: el, set: (pin, pout) => { el.style.transform = 'translateY(' + (pout > 0 ? -pout * 118 : (1 - pin) * 118).toFixed(2) + '%)'; } };
      }
    };
    return k;
  }

  function c4CardDeal(api) {
    const LABEL = 'TIO CHARACTER';   // 제목 위 작은 라벨
    const TITLE = '캐릭터 활용 / 레퍼런스';       // 제목 (/ 는 줄바꿈)
    const NUMBERS = true;                    // 카드에 순서 번호 붙이기
    const LOOP = 10;                         // 한 바퀴 길이(초)
    const k = c4Kit(api), W = k.W, H = k.H, u = k.u, sp = k.stage();
    const wide = W >= 540;
    const C = 4, R = 2, N = C * R;
    // Reserve a real 4-by-2 card region, including rotation and shadow clearance.
    const pad = Math.max(10, u * 0.055);
    const headingHeight = wide ? 0 : Math.max(40, H * 0.19);
    const area = wide ? [W * 0.31, pad, W * 0.69 - pad, H - pad * 2] : [pad, headingHeight, W - pad * 2, H - headingHeight - pad];
    const fs = wide ? Math.max(16, Math.min(25, W * 0.035)) : Math.max(13, Math.min(18, W * 0.041));
    const gap = Math.max(6, u * 0.028);
    const cw = Math.min((area[2] - gap * (C - 1)) / (C + 0.32), ((area[3] - gap) / (R + 0.24)) * 0.75), ch = cw / 0.75;
    const gx = area[0] + area[2] / 2 - W / 2, gy = area[1] + area[3] / 2 - H / 2;
    const deck = [gx, gy];
    const cards = [];
    for (let i = 0; i < N; i++) {
      const c = i % C, r = Math.floor(i / C), el = api.card(sp, i, cw, ch);
      el.style.boxShadow = k.shadow(cw, 0.32);
      if (i >= api.count) el.style.visibility = 'hidden';
      const chip = k.add(el, 'left:' + cw * 0.07 + 'px;top:' + cw * 0.07 + 'px;overflow:hidden;border-radius:' + cw * 0.025 + 'px;');
      const plate = k.add(chip, 'left:0;top:0;width:100%;height:100%;background:#fff;transform-origin:0 50%;');
      const num = k.add(chip, 'position:relative;padding:' + cw * 0.03 + 'px ' + cw * 0.05 + 'px;color:' + api.ink + ';font:700 ' + Math.max(8, cw * 0.085) + 'px/1.1 ' + k.fam('Noto Sans KR') + ';letter-spacing:0.06em;white-space:nowrap;', 'TIO');
      cards.push({
        el: el, plate: plate, num: num, x: gx + (c - (C - 1) / 2) * (cw + gap), y: gy + (r - (R - 1) / 2) * (ch + gap),
        rot: (k.hash(i) - 0.5) * 9, dx: (k.hash(i + 50) - 0.5) * u * 0.012, dy: -i * u * 0.0035, bend: k.hash(i + 90) < 0.5 ? 1 : -1
      });
    }
    // 제목: 라벨 + 두 줄 제목
    const head = k.add(api.root, (wide ? 'left:' + W * 0.04 + 'px;top:50%;transform:translateY(-50%);max-width:' + W * 0.24 + 'px;' : 'left:' + pad + 'px;top:' + pad + 'px;display:flex;align-items:center;gap:10px;') + 'pointer-events:none;' + k.textOn(api.fg));
    const tag = k.line(head, 'font:600 ' + Math.max(8, fs * 0.22) + 'px ' + k.fam('Noto Sans KR') + ';letter-spacing:0.22em;opacity:0.7;margin-bottom:' + fs * 0.38 + 'px;', LABEL);
    const rows = (wide ? TITLE.split('/') : ['캐릭터 활용 레퍼런스']).map(s => s.trim()).filter(Boolean).map(s => k.line(head, 'font:700 ' + fs + 'px ' + k.fam('Noto Sans KR') + ';letter-spacing:-0.03em;', s));
    const deal = 0.6, gap2 = Math.min(0.2, 1.8 / N), fly = 0.62, back0 = 7.2;   // 나눠 주기 시작 · 카드 사이 간격 · 나는 시간 · 모으기 시작(초)
    const dt = (back0 - 0.5 - (deal + (N - 1) * gap2 + fly + 0.4)) / N, a0 = deal + (N - 1) * gap2 + fly + 0.4 + dt * 0.5;   // 차례로 들리는 간격 · 시작
    return t => {
      t = k.mod(t, LOOP) * 10 / LOOP;   // 10초짜리 순서를 한 바퀴 길이에 맞게 늘이거나 줄임
      cards.forEach((c, i) => {
        const go = k.seg(t, deal + i * gap2, deal + i * gap2 + fly);                       // 나가는 비행 0~1
        const come = k.seg(t, back0 + (N - 1 - i) * gap2 * 0.8, back0 + (N - 1 - i) * gap2 * 0.8 + fly * 0.9);   // 돌아오는 비행 0~1
        const back = come > 0, p = back ? k.ez(come, 2.4) : k.out(go), e = back ? 1 - p : p;
        const sx = deck[0] + c.dx, sy = deck[1] + c.dy;
        const mx = (sx + c.x) / 2, my = (sy + c.y) / 2, dl = Math.hypot(c.x - sx, c.y - sy) || 1;
        const qx = mx - (c.y - sy) / dl * dl * 0.28 * c.bend, qy = my + (c.x - sx) / dl * dl * 0.28 * c.bend - u * 0.08;   // 곡선의 당김점
        const x = (1 - e) * (1 - e) * sx + 2 * e * (1 - e) * qx + e * e * c.x, y = (1 - e) * (1 - e) * sy + 2 * e * (1 - e) * qy + e * e * c.y;
        const flying = (go > 0 && go < 1) || (come > 0 && come < 1), lift = Math.sin(Math.PI * e) * (flying ? 1 : 0);
        const rot = c.rot * (1 - e) + c.bend * 14 * Math.sin(Math.PI * e);
        const ph = (t - a0) / dt - i, b = t < 4.9 && ph > -0.5 && ph < 1.5 ? Math.pow(Math.sin(Math.PI * (ph + 0.5) / 2), 2) : 0;   // 차례가 된 카드가 살짝 들림
        const scale = 1 + 0.06 * lift + 0.035 * b;
        const radians = rot * Math.PI / 180, clearance = Math.max(3, cw * 0.055);
        const halfW = (Math.abs(Math.cos(radians)) * cw + Math.abs(Math.sin(radians)) * ch) * scale / 2 + clearance;
        const halfH = (Math.abs(Math.sin(radians)) * cw + Math.abs(Math.cos(radians)) * ch) * scale / 2 + clearance;
        const bound = (value, min, max) => Math.max(min, Math.min(max, value));
        const safeX = bound(W / 2 + x, area[0] + halfW, area[0] + area[2] - halfW) - W / 2;
        const safeY = bound(H / 2 + y - b * u * 0.014, area[1] + halfH, area[1] + area[3] - halfH) - H / 2;
        c.el.style.transform = 'translate(' + safeX.toFixed(2) + 'px,' + safeY.toFixed(2) + 'px) rotate(' + rot.toFixed(2) + 'deg) scale(' + scale.toFixed(4) + ')';
        c.el.style.zIndex = flying ? 300 + i : e >= 1 ? (b > 0.01 ? 100 : 10 + i) : 200 - i;   // 나는 카드 > 더미 > 깔린 카드
        const ch2 = NUMBERS ? k.expo(k.seg(t, deal + i * gap2 + fly * 0.8, deal + i * gap2 + fly + 0.5)) * (1 - k.into(k.seg(t, back0 - 0.35, back0))) : 0;
        c.plate.style.transform = 'scaleX(' + ch2.toFixed(3) + ')';
        c.num.style.transform = 'translateY(' + ((1 - ch2) * 120).toFixed(1) + '%)';
      });
      const tin = d => k.expo(k.seg(t, 0.3 + d, 1.1 + d)), tout = d => k.into(k.seg(t, back0 + 0.9 + d, back0 + 1.35 + d));
      tag.set(tin(0), tout(0));
      rows.forEach((r, i) => r.set(tin(0.08 + i * 0.08), tout(0.05 + i * 0.05)));
    };
  }

  function lpKit(api) {
    const clamp = x => Math.max(0, Math.min(1, x));
    const lp = {
      face: name => `'${name}','Noto Sans KR','Noto Sans KR',sans-serif`,   // 한글 글꼴 하나 + 대체로 프리텐다드 (한 글줄 안에서 글꼴이 섞이지 않게)
      clamp: clamp,
      seg: (t, a, b) => clamp((t - a) / (b - a)),                 // t가 a~b 사이 어디쯤인지 0~1로
      mix: (a, b, p) => a + (b - a) * p,
      out: x => 1 - Math.pow(1 - clamp(x), 4),                    // 빠르게 출발해 부드럽게 멈춤
      expo: x => { x = clamp(x); return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x); },   // 더 급하게 출발해 길게 멈춤
      into: x => Math.pow(clamp(x), 3),                           // 천천히 출발해 빠르게 빠져나감
      io: x => { x = clamp(x); return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2; },   // 천천히-빠르게-천천히
      wave: (t, period) => 0.5 - 0.5 * Math.cos(t / period * Math.PI * 2),         // 0 → 1 → 0을 period초마다 되풀이
      // 연출용 커서 길. keys = [[초, x(0~1), y(0~1), 누름(0 또는 1)], ...] (x·y는 무대 너비·높이에 대한 비율)
      // 열쇠 사이는 부드럽게 잇고, 첫 열쇠 전 0.3초 동안 나타나며 마지막 열쇠 뒤 0.4초 동안 사라집니다. 누름이 1인 열쇠에서 짧게 누릅니다
      // 돌려주는 값 { x, y(px), down(0~1), on(0~1) } → 그대로 api.pointer()에 넘기면 됩니다
      path(t, keys) {
        const n = keys.length, first = keys[0], end = keys[n - 1];
        let x = first[1], y = first[2];
        if (t >= end[0]) { x = end[1]; y = end[2]; }
        else for (let i = 0; i < n - 1; i++) {
          const a = keys[i], b = keys[i + 1];
          if (t >= a[0] && t < b[0]) { const p = lp.io(lp.seg(t, a[0], b[0])); x = lp.mix(a[1], b[1], p); y = lp.mix(a[2], b[2], p); break; }
        }
        let down = 0;
        keys.forEach(k => { if (k[3]) down = Math.max(down, 1 - clamp(Math.abs(t - k[0]) / 0.16)); });
        const on = Math.min(lp.seg(t, first[0] - 0.3, first[0]), 1 - lp.seg(t, end[0], end[0] + 0.4));
        return { x: x * api.W, y: y * api.H, down: down, on: on };
      },
      // 연출용 커서(화살표). 실제 페이지(CONFIG.live)에서는 저절로 숨습니다. 돌려주는 값 { el, set(p) } — p는 api.pointer()가 돌려준 값
      cursor(parent, scale) {
        const s = api.u * 0.042 * (scale || 1), NS = 'http://www.w3.org/2000/svg';
        const el = document.createElementNS(NS, 'svg'), body = document.createElementNS(NS, 'path');
        el.setAttribute('viewBox', '0 0 20 24');
        el.setAttribute('width', s);
        el.setAttribute('height', s * 1.2);
        el.style.cssText = `position:absolute;left:0;top:0;overflow:visible;pointer-events:none;z-index:9;transform-origin:0 0;filter:drop-shadow(0 ${s * 0.06}px ${s * 0.12}px rgba(0,0,0,.35));`;
        body.setAttribute('d', 'M2 1.6 L2 19.2 L6.6 14.9 L9.6 21.6 L12.7 20.2 L9.8 13.7 L16.2 13.7 Z');
        body.setAttribute('fill', '#ffffff');
        body.setAttribute('stroke', '#111111');
        body.setAttribute('stroke-width', '1.3');
        body.setAttribute('stroke-linejoin', 'round');
        el.appendChild(body);
        parent.appendChild(el);
        return {
          el: el,
          set(p) {
            el.style.opacity = (p.on * p.fake).toFixed(3);
            el.style.transform = `translate(${p.x - s * 0.1}px,${p.y - s * 0.08}px) scale(${1 - 0.14 * p.down})`;
          }
        };
      },
      // 네 갈래 별빛 하나 (반짝임). 아주 작게, 은은하게 쓰세요. 돌려주는 값: 요소 (자리·크기·투명도는 style로)
      glint(parent, px, color) {
        const NS = 'http://www.w3.org/2000/svg', el = document.createElementNS(NS, 'svg'), star = document.createElementNS(NS, 'path');
        el.setAttribute('viewBox', '-10 -10 20 20');
        el.setAttribute('width', px);
        el.setAttribute('height', px);
        el.style.cssText = `position:absolute;left:0;top:0;margin:${-px / 2}px 0 0 ${-px / 2}px;overflow:visible;pointer-events:none;`;
        star.setAttribute('d', 'M0 -10 C0.7 -2.4 2.4 -0.7 10 0 C2.4 0.7 0.7 2.4 0 10 C-0.7 2.4 -2.4 0.7 -10 0 C-2.4 -0.7 -0.7 -2.4 0 -10 Z');
        star.setAttribute('fill', color || '#ffffff');
        el.appendChild(star);
        parent.appendChild(el);
        return el;
      },
      // 빛줄기가 훑고 지나가는 배경 값 (글자·단추 위의 반짝임). p: 지나간 정도 0~1, angle: 기울기(도), width: 빛 폭(%), alpha: 밝기, color: 'r,g,b'
      sweep(p, angle, width, alpha, color) {
        const w = width || 14, c = -w + clamp(p) * (100 + 2 * w), rgb = color || '255,255,255';
        return `linear-gradient(${angle == null ? 105 : angle}deg, rgba(${rgb},0) ${c - w}%, rgba(${rgb},${alpha == null ? 0.55 : alpha}) ${c}%, rgba(${rgb},0) ${c + w}%)`;
      },
      // 유리판 느낌 (backdrop-filter 없이): 반투명 면 + 위쪽 빛 테두리 + 부드러운 그림자. dark = 어두운 바탕 위
      glass(dark) {
        return dark
          ? 'background:linear-gradient(160deg,rgba(255,255,255,.16),rgba(255,255,255,.04));box-shadow:inset 0 1px 0 rgba(255,255,255,.38),inset 0 0 0 1px rgba(255,255,255,.12),0 24px 48px -16px rgba(0,0,0,.55);'
          : 'background:linear-gradient(160deg,rgba(255,255,255,.92),rgba(255,255,255,.62));box-shadow:inset 0 1px 0 #ffffff,inset 0 0 0 1px rgba(255,255,255,.7),0 22px 44px -18px rgba(18,22,36,.35),0 2px 6px rgba(18,22,36,.08);';
      },
      // 고운 결(필름 노이즈) 한 겹: 매끈한 그라데이션에 질감을 줘서 고급스럽게. 투명 배경일 때는 만들지 않음(null)
      grain(parent, alpha) {
        if (api.clear) return null;
        const cv = document.createElement('canvas'), g = cv.getContext('2d'), img = g.createImageData(128, 128), r = api.rand(7);
        cv.width = cv.height = 128;
        for (let i = 0; i < img.data.length; i += 4) { const v = r() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
        g.putImageData(img, 0, 0);
        const el = document.createElement('div');
        el.style.cssText = `position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;opacity:${alpha == null ? 0.06 : alpha};background:url(${cv.toDataURL()}) 0 0 / ${Math.max(64, api.u * 0.16)}px repeat;`;
        parent.appendChild(el);
        return el;
      },
      // 무대 가득 캔버스 한 장. 돌려주는 값 { cv, g, k } — g는 이미 배율이 걸려 있어 px 그대로 그리면 됩니다
      canvas(parent) {
        const cv = document.createElement('canvas'), k = Math.min(2, window.devicePixelRatio || 1, 2600 / Math.max(api.W, api.H));
        cv.width = Math.round(api.W * k);
        cv.height = Math.round(api.H * k);
        cv.style.cssText = `position:absolute;left:0;top:0;width:${api.W}px;height:${api.H}px;`;
        (parent || api.root).appendChild(cv);
        const g = cv.getContext('2d');
        g.setTransform(k, 0, 0, k, 0, 0);
        return { cv: cv, g: g, k: k };
      },
      // 글자를 쪼개 가림막 안에 넣음. by: 'line'(\n 기준) | 'word' | 'char'. 돌려주는 값: 움직일 알맹이 목록
      split(parent, text, by) {
        const units = by === 'line' ? String(text).split('\n') : by === 'word' ? String(text).split(/(\s+)/) : Array.from(String(text));
        const parts = [];
        units.forEach(unit => {
          if (!unit) return;
          if (by !== 'line' && /^\s+$/.test(unit)) { parent.appendChild(document.createTextNode(unit.indexOf('\n') >= 0 ? '\n' : ' ')); return; }
          const mask = document.createElement('span'), core = document.createElement('span');
          mask.style.cssText = `display:${by === 'line' ? 'block' : 'inline-block'};overflow:hidden;vertical-align:top;padding:.14em 0;margin:-.14em 0;` + (by === 'line' ? '' : 'white-space:pre;');
          core.style.cssText = `display:${by === 'line' ? 'block' : 'inline-block'};will-change:transform;`;
          core.textContent = unit;
          mask.appendChild(core);
          parent.appendChild(mask);
          parts.push(core);
        });
        return parts;
      },
      // 작은 라벨 (대문자, 자간 넓게)
      label(parent, text, px, color) {
        const el = document.createElement('span');
        el.textContent = text;
        el.style.cssText = `display:block;font:600 ${px}px/1.2 ${lp.face('Noto Sans KR')};letter-spacing:.14em;text-transform:uppercase;color:${color || api.fg};white-space:nowrap;`;
        parent.appendChild(el);
        return el;
      },
      // 미리보기용 스크롤 진행 0~1: 한 바퀴(loop초) 안에서 천천히 끝까지 내려갔다가 잠깐 머물고, 마지막에 처음으로 감김 → api.scroll()에 넘기면 됩니다
      demoScroll(t, loop) {
        t = ((t % loop) + loop) % loop;
        return t < loop * 0.82 ? lp.io(lp.seg(t, loop * 0.06, loop * 0.74)) : 1 - lp.io(lp.seg(t, loop * 0.86, loop));
      }
    };
    return lp;
  }

  function laRGB(color) {
    return /^#[0-9a-f]{6}$/i.test(color) ? [1, 3, 5].map(i => parseInt(color.slice(i, i + 2), 16) / 255) : [0, 0, 0];
  }

  function laAlpha(color, a) {
    const c = laRGB(color).map(v => Math.round(v * 255));
    return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  }

  function laShader(api, body, scale, loop) {
    const W = api.W, H = api.H;
    const k = Math.min(2, window.devicePixelRatio || 1, 2400 / Math.max(W, H)) * (scale || 1);
    const cv = document.createElement('canvas');
    cv.width = Math.max(2, Math.round(W * k));
    cv.height = Math.max(2, Math.round(H * k));
    cv.style.cssText = `position:absolute;left:0;top:0;width:${W}px;height:${H}px;`;
    api.root.appendChild(cv);
    const gl = cv.getContext('webgl', { preserveDrawingBuffer: true, premultipliedAlpha: false, alpha: true, antialias: false });
    const stub = { cv: cv, set() {}, image() {}, draw() {}, dispose() {} };
    if (!gl) return stub;
    gl.getExtension('OES_standard_derivatives');
    const head = [
      '#extension GL_OES_standard_derivatives : enable',
      '#ifdef GL_FRAGMENT_PRECISION_HIGH',
      'precision highp float;',
      '#else',
      'precision mediump float;',
      '#endif',
      'uniform vec2 uRes, uSize;',
      'uniform float uK, uT, uLoop, uClear;',
      '#define TAU 6.2831853',
      'vec2 px() { return vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uK; }',
      'float hash(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }',
      'float hash3(vec3 p) { p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }',
      'float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
      '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }',
      'float noise3(vec3 p) { vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
      '  float a = mix(mix(hash3(i), hash3(i + vec3(1.0, 0.0, 0.0)), f.x), mix(hash3(i + vec3(0.0, 1.0, 0.0)), hash3(i + vec3(1.0, 1.0, 0.0)), f.x), f.y);',
      '  float b = mix(mix(hash3(i + vec3(0.0, 0.0, 1.0)), hash3(i + vec3(1.0, 0.0, 1.0)), f.x), mix(hash3(i + vec3(0.0, 1.0, 1.0)), hash3(i + vec3(1.0, 1.0, 1.0)), f.x), f.y);',
      '  return mix(a, b, f.z); }',
      'vec2 loopv(float r) { float a = TAU * uT / uLoop; return vec2(cos(a), sin(a)) * r; }',
      'vec4 over(vec4 top, vec4 under) { return top + under * (1.0 - top.a); }',
      'float dither() { return (hash(gl_FragCoord.xy) - 0.5) / 255.0; }',
      ''
    ].join('\n');
    const make = (type, text) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, text);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, make(gl.VERTEX_SHADER, 'attribute vec2 a; void main() { gl_Position = vec4(a, 0.0, 1.0); }'));
    gl.attachShader(prog, make(gl.FRAGMENT_SHADER, head + body));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(prog)); return stub; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const spots = {};
    const where = name => name in spots ? spots[name] : (spots[name] = gl.getUniformLocation(prog, name));
    const st = {
      cv: cv,
      // uniform 값 넣기: 숫자 하나 또는 [2~4개]
      set(name, v) {
        const l = where(name);
        if (!l) return;
        if (typeof v === 'number') gl.uniform1f(l, v);
        else if (v.length === 2) gl.uniform2fv(l, v);
        else if (v.length === 3) gl.uniform3fv(l, v);
        else gl.uniform4fv(l, v);
      },
      // 캔버스 그림을 셰이더 그림(sampler2D)으로 (색은 미리 곱한 값으로 들어감)
      image(name, source, unit) {
        unit = unit || 0;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach(p => gl.texParameteri(gl.TEXTURE_2D, p, gl.LINEAR));
        [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(p => gl.texParameteri(gl.TEXTURE_2D, p, gl.CLAMP_TO_EDGE));
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        const l = where(name);
        if (l) gl.uniform1i(l, unit);
      },
      draw(t) {
        if (gl.isContextLost()) return;
        st.set('uT', t);
        gl.viewport(0, 0, cv.width, cv.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      },
      // 다시 만들기 전에 정리 (엔진이 frame.dispose로 부름)
      dispose() { const x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext(); }
    };
    st.set('uRes', [cv.width, cv.height]);
    st.set('uSize', [W, H]);
    st.set('uK', cv.width / W);
    st.set('uLoop', loop || 10);
    st.set('uClear', api.clear ? 1 : 0);
    return st;
  }

  function lpPlanetRim(api) {
    const SHOW_TEXT = false;                                                   // 예시 제목·단추 보이기 (false면 배경만)
    const LOGO = 'TIO';                                                     // 왼쪽 위 글자 로고
    const MENU = ['원형', '표정', '포즈'];                                // 위 메뉴
    const NAV = '시작하기';                                                    // 위 오른쪽 작은 단추
    const LABEL = '교사크리에이터협회';                                            // 제목 위 작은 글
    const TITLE = 'TIO 캐릭터 레퍼런스';                                     // 큰 제목 (\n 줄바꿈)
    const BODY = '원형은 그대로, 창작은 더 다양하게.';                      // 설명
    const BUTTON = '레퍼런스 둘러보기';                                            // 단추 글자
    const LOOP = 12;                                                          // 한 바퀴 길이(초)
    const lp = lpKit(api), W = api.W, H = api.H, u = api.u, tall = H / W > 1.2;
    const frag = `
  uniform vec3 uBg, uLight, uPearl;
  uniform float uR, uTop, uRise, uBx;
  void main() {
    vec2 p = px();
    float u = min(uSize.x, uSize.y);
    vec2 C = vec2(0.5 * uSize.x, uTop + uR + uRise);
    float d = length(p - C) - uR;
    float focus = exp(-pow((p.x - uBx) / (uSize.x * 0.3), 2.0));
    float side = exp(-pow((p.x / uSize.x - 0.5) / 0.75, 2.0));
    float line = exp(-pow(d * uK / 1.1, 2.0)) * (0.25 + 0.75 * focus) * side;
    float glow = exp(-max(d, 0.0) / (u * 0.028)) * step(0.0, d) * (0.08 + 0.3 * focus) * side;
    float atmo = exp(-max(d, 0.0) / (uSize.y * 0.2)) * step(0.0, d) * (0.04 + 0.08 * focus);
    float inner = exp(min(d, 0.0) / (u * 0.014)) * step(d, 0.0) * (0.04 + 0.16 * focus) * side;
    // 행성 표면: 바탕보다 어두운 면 + 아주 옅은 띠 결
    float body = smoothstep(0.6, -0.6, d);
    float bands = noise(vec2(p.x / (u * 0.6), (p.y - C.y) / (u * 0.05)) + vec2(uT / uLoop * 2.0, 0.0));
    // 하늘의 작은 별 (아주 옅게, 가만히)
    vec2 cs = p / (u * 0.05), ci = floor(cs);
    float hs = hash(ci + 4.2);
    vec2 sp = (ci + 0.2 + 0.6 * vec2(hash(ci + 1.7), hash(ci + 8.3))) * u * 0.05;
    float star = step(0.82, hs) * exp(-dot(p - sp, p - sp) / 0.5) * (0.12 + 0.2 * hash(ci + 2.9)) * smoothstep(0.0, u * 0.25, d);
    float light = line * 0.95 + glow + atmo + inner + star;
    vec3 lc = mix(uPearl, uLight, 0.4);
    if (uClear > 0.5) { gl_FragColor = vec4(lc, clamp(light, 0.0, 1.0)); return; }
    vec3 col = mix(uBg, uBg * 0.93 + uPearl * 0.012 * bands, body);
    col = mix(col, lc, clamp(light * 0.42, 0.0, 1.0));
    col += dither() * 2.0;
    gl_FragColor = vec4(col, 1.0);
  }`;
    const sh = laShader(api, frag, 0.8, LOOP);
    sh.set('uBg', laRGB(api.bg));
    sh.set('uLight', laRGB(api.accent));
    sh.set('uPearl', laRGB(api.tone(0)));
    sh.set('uR', Math.max(W * 1.15, H * 0.9));
    sh.set('uTop', H * (tall ? 0.7 : 0.68));
    lp.grain(api.root, 0.045);
    const hero = null;
    const cursor = { set() {} };
    const frame = t => {
      const tt = t % LOOP;
      // 처음 한 번 떠오름 (그 뒤로는 빛만 오감)
      sh.set('uRise', (1 - lp.expo(lp.seg(t, 0.1, 1.9))) * H * 0.16);
      const P = api.pointer(lp.path(tt, [[6.4, 0.2, 0.86, 0], [8.2, 0.74, 0.8, 0], [9.6, 0.4, 0.84, 0], [10.6, 0.36, 0.95, 0]]));
      const bx = W * (0.5 + 0.2 * Math.sin(Math.PI * 2 * tt / LOOP));
      sh.set('uBx', lp.mix(bx, P.x, P.on));
      sh.draw(tt);
      if (hero) hero.set(t);
      cursor.set(P);
    };
    frame.fonts = true;
    frame.dispose = sh.dispose;
    return frame;
  }

  function tioEngine(root, CFG, motion) {
    // 색 8개: 가장 밝은 색 → 가장 진한 색. [0] 흰 판·밝은 글자, [1]~[4] 연한 색에서 중간 색, [5] 포인트 색, [6] 둘째 포인트 색, [7] 글자색
    // 바꾸려면 CONFIG에 colors: ['#...', ...] 를 같은 순서로 넣으면 됩니다. 비워 두면 흰색·네이비 계열이 쓰입니다
    const COLORS = CFG.colors || ['#FFFFFF', '#F3F3F3', '#E8E8E8', '#DADADA', '#FFB200', '#E41E26', '#2B2B2B', '#1D1D1F'];
    // 매번 같은 순서가 나오는 난수 (같은 seed면 같은 결과)
    const rand = seed => () => (seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296;
    // 샘플 그림: CONFIG.images가 비어 있을 때 쓰입니다. 어느 카드에 어떤 그림이 갈지는 열 때마다 섞입니다
    const dice = rand(CFG.animationSeed || 414);
    const shift = Math.floor(dice() * 16);
    const FONT = '"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic","Noto Sans KR",system-ui,sans-serif';
    // 색의 밝기 (0 = 검정, 255 = 흰색). #rrggbb 꼴이 아니면 검정으로 봅니다
    // 투명 배경 위에 다른 배경을 깔 때(CONFIG.under = 그 배경의 대표 색)는 그 색을 바탕으로 보고 글자색을 고릅니다
    const light = color => color === 'transparent' && /^#[0-9a-f]{6}$/i.test(CFG.under || '') ? light(CFG.under) : /^#[0-9a-f]{6}$/i.test(color) ? (parseInt(color.slice(1, 3), 16) * 299 + parseInt(color.slice(3, 5), 16) * 587 + parseInt(color.slice(5, 7), 16) * 114) / 1000 : 0;
    const bright = light(CFG.bg);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const still = preference.matches;
    let frame = null, time = CFG.startAt || (still ? 4 : 0), last = 0, raf = 0, timer = 0, size = '';
    let playing = false, seen = false, want = CFG.autoplay !== false && !still, drew = false;
    // 랜딩페이지용: 실제 마우스·스크롤에 반응합니다 (CONFIG.live). true = 페이지에 붙여 쓸 때, 'try' = 미리보기 창(마우스가 없으면 연출대로)
    const LIVE = !still && (CFG.live === true || CFG.live === 'try'), TRY = CFG.live === 'try';
    const live = { x: 0, y: 0, tx: 0, ty: 0, over: 0, on: false, down: 0, press: false, s: 0, ts: 0, ready: false };
  
    const api = {
      root: root,
      bg: CFG.bg,
      clear: CFG.bg === 'transparent',              // 투명 배경으로 그리는 중 (영상 편집기에 얹을 자막 등). 이때는 화면 전체를 칠하는 바탕을 그리지 않습니다
      fg: bright > 150 ? COLORS[7] : COLORS[0],     // 배경 위에 바로 쓰는 글자색
      ink: COLORS[7],                               // 흰 판 위에 쓰는 글자색
      colors: COLORS.slice(),                       // 색 8개 그대로 (배경 모션이 그라데이션 재료로 씀)
      accent: COLORS[5],                            // 포인트 색
      deep: COLORS[6],                              // 둘째 포인트 색
      on: color => light(color) > 150 ? COLORS[7] : '#ffffff',   // 그 색 위에 올릴 글자색 (밝은 색 위엔 진한 글자, 진한 색 위엔 흰 글자)
      tone: i => COLORS[1 + (i % 5 + 5) % 5],       // i번째 변주 색 (연한 색 ~ 포인트 색)
      rand: rand,
      font: FONT,
      ko: text => /[\u3131-\u318e\uac00-\ud7a3]/.test(text),   // 한글이 들어 있나 (한글이 든 글줄은 한글 글꼴 하나로 씁니다)
      count: (CFG.images || []).length,             // 넣은 이미지 수 (0이면 샘플)
      words: CFG.words || [],                       // 넣은 낱말 (글자 모션에서 사용, 비면 기본 낱말)
      live: LIVE && !TRY,                           // 실제 페이지에서 마우스·스크롤에 반응하는 중 (미리보기 칸·영상 저장 때는 false)
      // 발표(모션 PPT)에서 '다음 효과'를 누른 단계 { step, at }: 발표기가 채워 줌. 없으면 null (미리보기·영상은 시간표대로)
      cue: CFG.cue || null,
      page: CFG.page || 0,                          // 모션 PPT에서 몇 번째 장인지 (발표기가 채워 줌, 없으면 0)
      // 마우스 자리 { x, y: 무대 안의 px, down: 누름 0~1, on: 마우스가 와 있는 정도 0~1, fake: 연출용 가짜 커서를 보일 정도 0~1 }
      // demo: 미리보기·영상 저장 때 쓸 연출 자리 { x, y, down, on } (t로 계산해서 넘김). 실제 페이지에서는 진짜 마우스를 따라갑니다
      pointer(demo) {
        const d = Object.assign({ x: api.W / 2, y: api.H / 2, down: 0, on: 1 }, demo || {});
        if (!LIVE) return { x: d.x, y: d.y, down: d.down, on: d.on, fake: 1 };
        if (!live.ready) return TRY ? { x: d.x, y: d.y, down: d.down, on: d.on, fake: 1 } : { x: d.x, y: d.y, down: 0, on: 0, fake: 0 };
        const k = TRY ? live.over : 1, mix = (a, b) => a + (b - a) * k;
        return { x: mix(d.x, live.x), y: mix(d.y, live.y), down: mix(d.down, live.down), on: TRY ? mix(d.on, live.over) : live.over, fake: 1 - k };
      },
      // 스크롤 진행 0~1. 미리보기·영상 저장 때는 demo(t로 계산한 값), 실제 페이지에서는 이 상자(또는 CONFIG.track의 칸)가 화면을 지나는 정도
      scroll: demo => LIVE && !TRY ? live.s : demo,
      image: i => { const n = (CFG.images || []).length; return n ? CFG.images[i % n] : null; },   // i번째 이미지 주소 (없으면 null)
      // i번째 샘플 그림 { cv, url }. 코드에 qmArt가 함께 들어 있을 때만 나옵니다 (plain: 글자 없는 그림만)
      art: () => null,
      // i번째 그림을 CSS background 값으로: 내 이미지가 있으면 이미지, 없으면 샘플 그림
      paint: i => {
        const n = (CFG.images || []).length, a = n ? null : api.art(i);
        return n ? `url("${CFG.images[i % n]}") center / contain no-repeat, #FFFFFF` : a ? `url(${a.url}) center / contain no-repeat` : `linear-gradient(145deg, ${COLORS[2]}, ${COLORS[5]})`;
      },
      // 숏폼 자막용 미리보기 바탕: 영상 대신 깔아 두는 흐릿한 장면 (내 이미지를 넣으면 그 그림). 투명 배경일 때는 그리지 않고 null을 돌려줍니다
      footage(dim) {
        if (api.clear) return null;
        const el = document.createElement('div'), n = (CFG.images || []).length;
        el.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;filter:brightness(' + (dim == null ? 0.85 : dim) + ');background:' + (n ? `url("${CFG.images[0]}") center / contain no-repeat` :
          'radial-gradient(55% 32% at 28% 26%, rgba(243,237,226,.5), rgba(243,237,226,0) 70%), radial-gradient(45% 30% at 78% 52%, rgba(154,120,110,.45), rgba(154,120,110,0) 70%), ' +
          'radial-gradient(80% 45% at 50% 108%, rgba(31,52,96,.75), rgba(31,52,96,0) 72%), radial-gradient(40% 25% at 18% 70%, rgba(205,196,184,.28), rgba(205,196,184,0) 70%), linear-gradient(172deg, #4a4f5a, #23262d 60%, #15171c)') + ';';
        root.appendChild(el);
        return el;
      },
      // 0~1 사이 값을 부드럽게 (천천히 출발, 천천히 도착)
      ease: x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); },
      // 0~1 사이 값을 통통 튀게 (살짝 넘쳤다가 제자리로)
      spring: x => { x = Math.max(0, Math.min(1, x)) - 1; return 1 + 2.70158 * x * x * x + 1.70158 * x * x; },
      // 화면 한가운데가 (0,0,0)인 3D 공간. 숫자가 작을수록 원근감이 세집니다
      space(perspective) {
        root.style.perspective = perspective ? perspective + 'px' : 'none';
        return api.group(root, 'left:50%;top:50%;');
      },
      // 여러 조각을 한꺼번에 돌리거나 옮길 묶음
      group(parent, extra) {
        const el = document.createElement('div');
        el.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;transform-style:preserve-3d;' + (extra || '');
        parent.appendChild(el);
        return el;
      },
      // 빈 상자 하나. 상자의 중심이 (0,0)에 놓입니다 (UI 모션에서 사용)
      box(parent, w, h, css) {
        const el = document.createElement('div');
        el.style.cssText = `position:absolute;left:0;top:0;box-sizing:border-box;width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;font-family:${FONT};` + (css || '');
        parent.appendChild(el);
        return el;
      },
      // 카드 한 장. 카드의 중심이 (0,0)에 놓입니다 (카드 모션에서 사용)
      card(parent, i, w, h, twoSided) {
        const el = api.box(parent, w, h, 'overflow:hidden;'), s = el.style;
        s.borderRadius = Math.min(w, h) * (CFG.radius || 0) + 'px';
        s.backfaceVisibility = s.webkitBackfaceVisibility = twoSided ? 'visible' : 'hidden';
        s.background = api.paint(i);
        const item = CFG.items && CFG.items[i % CFG.items.length];
        if (item) {
          el.className = 'motion-reference-card';
          el.setAttribute('role', 'button');
          el.setAttribute('tabindex', '0');
          el.setAttribute('aria-label', item.title + ' 상세 보기');
          el.setAttribute('aria-pressed', 'false');
          el.dataset.motionAsset = item.id;
          el.title = item.title;
          const choose = () => CFG.onSelect && CFG.onSelect(item.id);
          el.addEventListener('click', choose);
          el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(); } });
        }
        return el;
      }
    };
  
    function build() {
      const W = root.clientWidth, H = root.clientHeight;
      if (!W || !H || size === W + 'x' + H) return;
      size = W + 'x' + H;
      if (frame && frame.dispose) frame.dispose();   // WebGL 모션은 다시 만들기 전에 정리
      root.textContent = '';
      api.W = W; api.H = H; api.u = Math.min(W, H);
      if (LIVE && !TRY) { measure(); live.s = live.ts; }
      frame = motion(api);
      frame(time);
      runs(root);
      if (watch) watch.takeRecords();   // 방금 만든 장면은 위에서 다 봤으니 쌓인 기록은 버림
    }
    // 한 글줄 안에 한글과 영문·숫자가 섞였는데 영문 전용 글꼴(Anton·Inter 등)이 앞에 서 있으면,
    // 그 글줄은 글꼴 목록 뒤쪽의 한글 글꼴로 통째로 씁니다 (영문 글꼴과 한글 글꼴이 한 줄에서 따로 놀지 않게)
    const LATIN = /^(Anton|Archivo|Instrument Serif|Inter|JetBrains Mono)$/i;
    function runs(top) {
      const walk = document.createTreeWalker(top, NodeFilter.SHOW_TEXT), seen = new Set();
      for (let n = walk.nextNode(); n; n = walk.nextNode()) if (n.parentElement) seen.add(n.parentElement);
      seen.forEach(el => {
        let own = '';
        el.childNodes.forEach(c => { if (c.nodeType === 3) own += c.nodeValue; });
        if (!/[\u3131-\u318e\uac00-\ud7a3]/.test(own) || !/[A-Za-z0-9]/.test(own)) return;
        const list = getComputedStyle(el).fontFamily.split(',').map(f => f.trim().replace(/^["']|["']$/g, ''));
        if (!LATIN.test(list[0])) return;
        el.style.fontFamily = list.filter(f => !LATIN.test(f)).map(f => /^[a-z-]+$/.test(f) ? f : '"' + f + '"').join(',');
      });
    }
    // 장면이 글자를 바꾸면 바뀐 곳만 다시 봅니다
    const watch = window.MutationObserver ? new MutationObserver(list => mend(list)) : null;
    const mend = list => list.forEach(r => { const el = r.target.nodeType === 3 ? r.target.parentElement : r.target; if (el && root.contains(el)) runs(el); });
    if (watch) watch.observe(root, { childList: true, characterData: true, subtree: true });
    function tick(now) {
      if (!playing) return;
      const dt = Math.max(0, Math.min((now - last) / 1000, 0.1));
      time += dt * CFG.speed;
      const finished = CFG.once && time >= CFG.once;
      if (finished) time = CFG.once;
      last = now;
      if (LIVE) follow(dt);
      if (frame) frame(time);
      if (finished) { want = false; sync(); }
      else raf = requestAnimationFrame(tick);
    }
    // 스크롤 진행: CONFIG.track이 있으면 그 칸(키 큰 칸 안에 이 상자를 position:sticky로 넣은 경우)을 다 내려가는 정도, 없으면 이 상자가 화면 아래에서 위로 지나가는 정도
    function measure() {
      const el = CFG.track ? document.querySelector(CFG.track) : root;
      if (!el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight || 1;
      live.ts = Math.max(0, Math.min(1, CFG.track ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / (vh + r.height)));
    }
    // 진짜 마우스·스크롤 값을 부드럽게 따라감
    function follow(dt) {
      const k = 1 - Math.exp(-dt * 14);
      live.x += (live.tx - live.x) * k;
      live.y += (live.ty - live.y) * k;
      live.over += ((live.on ? 1 : 0) - live.over) * (1 - Math.exp(-dt * 6));
      live.down += ((live.press ? 1 : 0) - live.down) * (1 - Math.exp(-dt * 18));
      if (!TRY) { measure(); live.s += (live.ts - live.s) * (1 - Math.exp(-dt * 10)); }
    }
    const spot = e => {
      const r = root.getBoundingClientRect();
      live.tx = (e.clientX - r.left) * root.clientWidth / (r.width || 1);
      live.ty = (e.clientY - r.top) * root.clientHeight / (r.height || 1);
      if (!live.ready) { live.x = live.tx; live.y = live.ty; live.ready = true; }
    };
    // 멈춰 있을 때(일시 정지·동작 줄이기 설정)도 마우스에는 바로 반응
    const poke = () => { if (playing || !frame) return; live.x = live.tx; live.y = live.ty; live.over = live.on ? 1 : 0; live.down = live.press ? 1 : 0; frame(time); };
    const hands = {
      pointerenter: e => { spot(e); live.on = true; poke(); },
      pointermove: e => { spot(e); live.on = true; poke(); },
      pointerleave: () => { live.on = false; live.press = false; poke(); },
      pointerdown: e => { spot(e); live.on = live.press = true; poke(); },
      pointerup: () => { live.press = false; poke(); }
    };
    if (LIVE) Object.keys(hands).forEach(k => root.addEventListener(k, hands[k]));
    // 화면에 보일 때만 움직입니다
    function sync() {
      const on = want && seen && !document.hidden && !preference.matches;
      if (on && !playing) { playing = true; if (CFG.onState) CFG.onState(true); last = performance.now(); raf = requestAnimationFrame(tick); }
      if (!on && playing) { playing = false; if (CFG.onState) CFG.onState(false); cancelAnimationFrame(raf); }
    }
  
    Object.assign(root.style, { position: 'relative', overflow: 'hidden', background: CFG.bg, aspectRatio: CFG.ratio });
    build();
    const ro = new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(build, 100); });
    const io = new IntersectionObserver(e => { seen = e[e.length - 1].isIntersecting; sync(); });
    // 웹폰트로 그리는 모션은 폰트가 도착하면 크기를 다시 재서 그립니다
    const refit = () => { if (frame && (frame.fonts || drew)) { size = ''; build(); } };
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', refit);
    const reduce = () => { if (preference.matches) { want = false; time = 4; if (frame) frame(time); } sync(); };
    preference.addEventListener('change', reduce);
    document.addEventListener('visibilitychange', sync);
    ro.observe(root);
    io.observe(root);
    sync();
  
    return {
      play() { if (preference.matches) { time = 4; if (frame) frame(time); return; } if (CFG.once && time >= CFG.once) time = 0; want = true; sync(); },
      pause() { want = false; sync(); },
      restart() { time = 0; if (frame) frame(time); },
      seek(t) { time = t; if (frame) frame(time); if (watch) mend(watch.takeRecords()); },
      isPlaying() { return playing; },
      select(id) { root.querySelectorAll('[data-motion-asset]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.motionAsset === id))); },
      now() { return time; },                       // 지금 몇 초의 장면인지 (발표기에서 씀)
      motion() { return frame; },                   // 모션이 돌려준 장면 함수 (frame.steps 같은 정보를 읽을 때)   // t초의 장면으로 건너뜀 (영상으로 한 장씩 찍을 때)
      destroy() { want = false; sync(); document.removeEventListener('visibilitychange', sync); preference.removeEventListener('change', reduce); if (LIVE) Object.keys(hands).forEach(k => root.removeEventListener(k, hands[k])); ro.disconnect(); io.disconnect(); if (watch) watch.disconnect(); clearTimeout(timer); if (document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', refit); if (frame && frame.dispose) frame.dispose(); root.textContent = ''; }
    };
  }


  window.TIOMotion = {
    createDeal(root, options) {
      return tioEngine(root, Object.assign({ speed: 1, radius: 0.06, bg: '#F3F3F3', colors: PALETTE, ratio: '16 / 9', autoplay: true, startAt: 0, once: 4.9, live: false }, options), c4CardDeal);
    },
    createHorizon(root, options) {
      return tioEngine(root, Object.assign({ speed: 1, bg: '#F3F3F3', colors: PALETTE, ratio: '16 / 9', autoplay: true, startAt: 0, once: 3.6, live: false }, options), lpPlanetRim);
    }
  };
})();
