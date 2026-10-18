(() => {
  'use strict';

  const catalog = window.TIO_CATALOG || {};
  const prompts = window.TIO_PROMPTS || {};
  const PAGE_SIZE = 6;
  const icons = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    face: '<circle cx="12" cy="12" r="9"/><path d="M8 14.5c1.8 2.1 6.2 2.1 8 0M8.5 8.5h.01M15.5 8.5h.01"/>',
    pose: '<circle cx="12" cy="4.5" r="2"/><path d="m5 8 7 3 7-3M12 11v5m0 0-4 5m4-5 4 5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    prompt: '<path d="m8 6-5 6 5 6m8-12 5 6-5 6m-3-14-2 16"/>',
    spark: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4L12 3Zm7 0v4m-2-2h4"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 15v5h16v-5"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    shield: '<path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
    'arrow-up-right': '<path d="M6 18 18 6M6 6h12v12"/>',
    'arrow-right': '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    left: '<path d="m15 5-7 7 7 7"/>',
    right: '<path d="m9 5 7 7-7 7"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
    play: '<path d="m9 5 11 7-11 7V5Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    expand: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v7m0-10h.01"/>',
    folder: '<path d="M3 7V5h7l2 3h9v12H3V7Z"/>',
  };
  const categories = [
    { id: 'original', label: '원형 & 시트', icon: 'grid' },
    { id: 'expressions', label: '표정', icon: 'face' },
    { id: 'poses', label: '포즈', icon: 'pose' },
    { id: 'samples', label: '활용 샘플', icon: 'layers' },
    { id: 'prompts', label: '프롬프트', icon: 'prompt', utility: true },
    { id: 'tools', label: 'AI 도구', icon: 'spark', utility: true },
  ];
  const categoryAliases = {
    '원형': 'original', '기본형': 'original', '원형 & 시트': 'original', '시트': 'original',
    '표정': 'expressions', 'expression': 'expressions', '포즈': 'poses', 'pose': 'poses',
    '활용': 'samples', '활용 샘플': 'samples', 'applications': 'samples', 'application': 'samples',
  };
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.image}</svg>`;
  const exists = value => value !== undefined && value !== null && value !== '';
  const metadataValue = value => exists(value) ? String(value) : '제공되지 않음';
  const safeURL = value => {
    if (!value) return '';
    try {
      const parsed = new URL(String(value), location.href);
      return ['http:', 'https:', 'file:', 'blob:'].includes(parsed.protocol) ? parsed.href : '';
    } catch { return ''; }
  };
  const categoryLabel = id => categories.find(item => item.id === id)?.label || id || '레퍼런스';
  const promptString = value => typeof value === 'string' ? value : value?.text || value?.prompt || '';
  const displayText = value => String(value ?? '').replace(/\s*[([{]\s*(?:검토본|발\s*복원)\s*[)\]}]/g, '').replace(/(?:검토본|발\s*복원)/g, '').replace(/\s{2,}/g, ' ').replace(/^[\s·|/—–-]+|[\s·|/—–-]+$/g, '').trim();

  const assets = (Array.isArray(catalog.assets) ? catalog.assets : []).map((item, index) => {
    const src = item.src || item.url || '';
    const extension = src.split('?')[0].split('.').pop()?.toLowerCase();
    let type = item.type || 'image';
    if (extension === 'gif' || type === 'gif') type = 'gif';
    else if (['mp4', 'webm', 'mov'].includes(extension) || ['video', 'mp4', 'webm'].includes(type)) type = 'video';
    else type = 'image';
    const id = String(item.id || item.metadata?.internalId || `asset-${index + 1}`);
    const thumbnail = item.thumbnail || item.poster || '';
    return {
      ...item, id, src, type, thumbnail,
      title: displayText(item.title || item.name) || 'TIO 레퍼런스',
      description: displayText(item.description),
      subcategory: displayText(item.subcategory),
      category: categoryAliases[item.category] || item.category || 'original',
      tags: Array.isArray(item.tags) ? item.tags.map(displayText).filter(Boolean) : [],
      metadata: item.metadata || {},
      transparent: item.transparent === true,
    };
  });
  const firstAsset = assets.find(asset => asset.category === 'original') || assets[0];
  const state = {
    category: 'original', subcategory: 'all', query: '', transparent: false, page: 1,
    selectedId: firstAsset?.id || '', promptAssetId: firstAsset?.id || '', promptTab: 'combined',
    playing: new Set(), modalId: null,
  };
  let toastTimer;
  let dealEngine = null;
  let horizonEngine = null;
  const dialogFocus = new Map();

  function renderIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
  }

  function getAsset(id = state.selectedId) { return assets.find(asset => asset.id === id); }

  function formatLabel(asset) {
    if (asset.type === 'video') return 'MP4';
    if (asset.type === 'gif') return 'GIF';
    const extension = asset.src.split('?')[0].split('.').pop()?.toLowerCase();
    if (extension === 'jpeg' || extension === 'jpg') return 'JPG';
    if (extension === 'webp') return 'WEBP';
    return extension === 'png' || asset.transparent ? 'PNG' : 'IMAGE';
  }

  function staticPreview(asset) {
    if (asset.thumbnail && !/\.gif(?:[?#]|$)/i.test(asset.thumbnail)) return safeURL(asset.thumbnail);
    return asset.type === 'image' ? safeURL(asset.src) : '';
  }

  function getDownloads(asset) {
    if (!asset) return [];
    let supplied = Array.isArray(asset.downloads) ? asset.downloads : [];
    if (!supplied.length && asset.downloads && typeof asset.downloads === 'object') {
      supplied = Object.entries(asset.downloads).map(([label, value]) => typeof value === 'string' ? { label: label.toUpperCase(), href: value } : { label, ...value });
    }
    const result = supplied.map(item => typeof item === 'string' ? { href: item } : item).filter(item => safeURL(item.href || item.url || item.src)).map(item => ({ ...item, href: item.href || item.url || item.src }));
    if (!result.length && safeURL(asset.src)) result.push({ label: asset.transparent && formatLabel(asset) === 'PNG' ? '투명 PNG' : formatLabel(asset), href: asset.src });
    return result;
  }

  function getApplication(asset) {
    const key = asset?.promptKey || asset?.id;
    const applicationSource = prompts.applications || prompts.application || {};
    return asset?.applicationPrompt || (Array.isArray(applicationSource) ? applicationSource.find(item => item.key === key || item.id === key) : applicationSource[key]);
  }

  function getRatio(width, height) {
    if (!width || !height) return '';
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const divisor = gcd(Number(width), Number(height));
    return divisor ? `${width / divisor}:${height / divisor}` : '';
  }

  function getFormat(asset, preferApplication = true) {
    const format = (preferApplication ? getApplication(asset)?.format : null) || asset?.format || {};
    const width = format.width || asset?.width;
    const height = format.height || asset?.height;
    return { ...format, width, height, ratio: format.ratio || getRatio(width, height) };
  }

  function formatText(asset) {
    const format = getFormat(asset);
    return [format.platform && `용도: ${format.platform}`, format.width && format.height && `크기: ${format.width} × ${format.height} px`, format.ratio && `비율: ${format.ratio}`].filter(Boolean).join('\n');
  }

  function formatChips(asset, preferApplication = true) {
    const format = getFormat(asset, preferApplication);
    return [format.platform, format.width && format.height ? `${format.width} × ${format.height} px` : '', format.ratio].filter(Boolean).map(value => `<span>${escapeHTML(value)}</span>`).join('');
  }

  function getPromptParts(asset) {
    const application = getApplication(asset);
    return {
      master: promptString(prompts.master),
      application: promptString(application),
      negative: promptString(prompts.negative || prompts.constraints),
    };
  }

  function getPrompt(asset, kind = 'combined') {
    const parts = getPromptParts(asset);
    const dimensions = formatText(asset);
    if (kind === 'application') return parts.application ? `${parts.application}${dimensions && !parts.application.includes('[출력 규격]') ? `\n\n[출력 규격]\n${dimensions}` : ''}` : '';
    if (kind !== 'combined') return parts[kind] || '';
    return [
      parts.master && `[캐릭터 원형 · 마스터 프롬프트]\n${parts.master}`,
      parts.application && `[이번 이미지 · 응용 프롬프트]\n${parts.application}`,
      dimensions && !parts.application.includes('[출력 규격]') && `[출력 규격]\n${dimensions}`,
      parts.negative && `[외형 유지 규칙]\n${parts.negative}`,
    ].filter(Boolean).join('\n\n');
  }

  function renderNavigation() {
    $('#categoryNav').innerHTML = categories.map((category, index) => `${index === 4 ? '<span class="nav-divider" aria-hidden="true"></span>' : ''}<button type="button" class="nav-button" data-category="${category.id}" ${state.category === category.id ? 'aria-current="page"' : ''}>${icon(category.icon)}<span>${category.label}</span>${!category.utility ? `<span class="nav-count">${assets.filter(asset => asset.category === category.id).length}</span>` : ''}</button>`).join('');
  }

  function filteredAssets() {
    const query = state.query.trim().toLocaleLowerCase('ko-KR');
    return assets.filter(asset => {
      if (asset.category !== state.category) return false;
      if (state.subcategory !== 'all' && asset.subcategory !== state.subcategory) return false;
      if (state.transparent && (!asset.transparent || formatLabel(asset) !== 'PNG')) return false;
      if (!query) return true;
      return [asset.title, asset.description, asset.subcategory, asset.id, ...asset.tags].filter(Boolean).join(' ').toLocaleLowerCase('ko-KR').includes(query);
    });
  }

  function renderFilters() {
    const subcategories = [...new Set(assets.filter(asset => asset.category === state.category).map(asset => asset.subcategory).filter(Boolean))];
    if (state.subcategory !== 'all' && !subcategories.includes(state.subcategory)) state.subcategory = 'all';
    $('#subfilters').innerHTML = [{ id: 'all', label: '전체' }, ...subcategories.map(name => ({ id: name, label: name }))].map(item => `<button type="button" class="filter-chip" data-subcategory="${escapeHTML(item.id)}" aria-pressed="${state.subcategory === item.id}">${escapeHTML(item.label)}</button>`).join('');
  }

  function renderCard(asset) {
    const preview = staticPreview(asset);
    const selected = asset.id === state.selectedId;
    const previewContent = preview ? `<img src="${escapeHTML(preview)}" alt="" loading="lazy" decoding="async">` : icon(asset.type === 'image' ? 'image' : 'play');
    return `<button class="asset-card" type="button" data-asset="${escapeHTML(asset.id)}" aria-label="${escapeHTML(asset.title)} 상세 보기" aria-pressed="${selected}"><span class="card-preview ${asset.transparent ? 'checkerboard' : ''}">${previewContent}<span class="card-top-label">${asset.transparent && formatLabel(asset) === 'PNG' ? 'TRANSPARENT PNG' : formatLabel(asset)}</span>${asset.type !== 'image' ? `<span class="media-play">${icon('play')}</span>` : ''}${selected ? `<span class="card-selected-mark">${icon('check')}</span>` : ''}</span><span class="card-caption"><span><strong>${escapeHTML(asset.title)}</strong><small>${escapeHTML(asset.subcategory || categoryLabel(asset.category))}${getFormat(asset, false).ratio ? ` · ${escapeHTML(getFormat(asset, false).ratio)}` : ''}</small></span>${icon('arrow-up-right')}</span></button>`;
  }

  function renderPagination(totalPages) {
    const visiblePages = new Set([1, totalPages, state.page - 1, state.page, state.page + 1].filter(page => page >= 1 && page <= totalPages));
    const numbers = [...visiblePages].sort((a, b) => a - b);
    let previous = 0;
    const buttons = numbers.map(page => {
      const separator = previous && page - previous > 1 ? '<span class="page-ellipsis" aria-hidden="true">…</span>' : '';
      previous = page;
      return `${separator}<button type="button" class="page-button" data-page="${page}" ${page === state.page ? 'aria-current="page"' : ''} aria-label="${page}페이지">${page}</button>`;
    }).join('');
    $('#pagination').innerHTML = `<button class="page-button" type="button" data-page="${state.page - 1}" aria-label="이전 페이지" ${state.page === 1 ? 'disabled' : ''}>${icon('left')}</button>${buttons}<button class="page-button" type="button" data-page="${state.page + 1}" aria-label="다음 페이지" ${state.page === totalPages ? 'disabled' : ''}>${icon('right')}</button>`;
  }

  function renderGallery() {
    $('#galleryTitle').textContent = categoryLabel(state.category);
    renderFilters();
    const filtered = filteredAssets();
    const pageSize = state.category === 'samples' ? 8 : PAGE_SIZE;
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    state.page = Math.min(state.page, totalPages);
    const pageAssets = filtered.slice((state.page - 1) * pageSize, state.page * pageSize);
    if (!pageAssets.some(asset => asset.id === state.selectedId)) state.selectedId = pageAssets[0]?.id || '';
    $('#resultCount').textContent = `${filtered.length}개`;
    const useDeal = state.category === 'samples' && pageAssets.length && window.TIOMotion;
    $('#galleryView').classList.toggle('is-deal-view', !!useDeal);
    $('#dealSection').hidden = !useDeal;
    $('#assetGrid').hidden = !!useDeal;
    if (dealEngine) { dealEngine.destroy(); dealEngine = null; }
    if (useDeal) renderDeal(pageAssets);
    if (pageAssets.length) {
      $('#assetGrid').innerHTML = pageAssets.map(renderCard).join('');
    } else {
      const filteredOut = !!state.query || state.subcategory !== 'all' || state.transparent;
      $('#assetGrid').innerHTML = `<div class="asset-empty">${icon(filteredOut ? 'search' : 'folder')}<h3>${filteredOut ? '일치하는 이미지가 없어요' : '레퍼런스를 준비하고 있어요'}</h3><p>${filteredOut ? '검색어를 바꾸거나 필터를 초기화해 보세요.' : '검토한 이미지와 생성 기록이 이 앨범에 정리됩니다.'}</p>${filteredOut ? '<button class="button button-quiet button-small" type="button" data-reset-filters>필터 초기화</button>' : ''}</div>`;
    }
    $('#galleryHint').textContent = filtered.length ? `${state.page} / ${totalPages} 페이지 · 이미지를 선택해 자세히 보기` : '자료가 추가되면 여기에서 볼 수 있어요.';
    renderPagination(totalPages);
    renderDetail();
  }

  function renderDeal(items) {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    $('#dealHint').textContent = reduced ? '동작 줄이기 설정으로 정지된 카드가 표시돼요.' : '카드를 선택하면 이미지와 프롬프트를 볼 수 있어요.';
    dealEngine = window.TIOMotion.createDeal($('#dealStage'), {
      images: items.map(staticPreview), items,
      onSelect: id => selectAsset(id),
    });
    dealEngine.select(state.selectedId);
    $('#dealAssetNames').innerHTML = items.map(asset => `<button type="button" data-asset="${escapeHTML(asset.id)}" aria-pressed="${state.selectedId === asset.id}">${escapeHTML(asset.title)}</button>`).join('');
  }

  function setupHero() {
    const video = typeof catalog.heroVideo === 'string' ? { src: catalog.heroVideo } : catalog.heroVideo || {};
    const poster = safeURL(video.poster || catalog.heroPoster || './assets/TIO_master_original.png');
    const videoSrc = safeURL(video.src || video.url);
    $('#heroMedia').innerHTML = videoSrc ? `<video controls muted playsinline preload="metadata" poster="${escapeHTML(poster)}" src="${escapeHTML(videoSrc)}" aria-label="TIO 캐릭터 모션 영상"></video>` : `<img src="${escapeHTML(poster)}" alt="TIO 캐릭터 원형" decoding="async">`;
    const heroVideo = $('#heroMedia video');
    if (heroVideo) {
      const preference = matchMedia('(prefers-reduced-motion: reduce)');
      let visible = true;
      let resumeWhenVisible = !preference.matches;
      let resumeWhenFocused = false;
      heroVideo.muted = true;
      heroVideo.defaultMuted = true;
      heroVideo.loop = !preference.matches;
      heroVideo.autoplay = !preference.matches;
      const playVisible = () => { if (visible && !document.hidden && !preference.matches) heroVideo.play().catch(() => {}); };
      const observer = new IntersectionObserver(entries => {
        const next = entries[entries.length - 1].isIntersecting;
        if (!next) { resumeWhenVisible = !heroVideo.paused; heroVideo.pause(); }
        else if (resumeWhenVisible) { visible = true; playVisible(); }
        visible = next;
      }, { threshold: 0.2 });
      observer.observe(heroVideo);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) { resumeWhenFocused = !heroVideo.paused; heroVideo.pause(); }
        else if (resumeWhenFocused) playVisible();
      });
      preference.addEventListener('change', () => { heroVideo.loop = !preference.matches; if (preference.matches) heroVideo.pause(); });
      playVisible();
    }
    if (window.TIOMotion) horizonEngine = window.TIOMotion.createHorizon($('#heroHorizon'));
  }

  function renderMedia(asset, context) {
    const key = `${context}:${asset.id}`;
    const playing = state.playing.has(key);
    const preview = staticPreview(asset);
    const src = safeURL(asset.src);
    if (asset.type === 'video' && playing && src) {
      return `<video controls playsinline preload="metadata" ${preview ? `poster="${escapeHTML(preview)}"` : ''} src="${escapeHTML(src)}" aria-label="${escapeHTML(asset.title)} 영상">이 브라우저는 영상 재생을 지원하지 않습니다.</video>`;
    }
    if (asset.type === 'gif' && playing && src) {
      return `<img src="${escapeHTML(src)}" alt="${escapeHTML(asset.title)} 움직이는 이미지"><button type="button" class="preview-media-control" data-media="${escapeHTML(asset.id)}" data-context="${context}">${icon('pause')}움직임 멈추기</button>`;
    }
    const displaySource = context === 'modal' && asset.type === 'image' ? src : preview;
    const content = displaySource ? `<img src="${escapeHTML(displaySource)}" alt="${escapeHTML(asset.title)}" decoding="async">` : `<div class="preview-placeholder">${icon(asset.type === 'image' ? 'image' : 'play')}<span>${asset.type === 'image' ? '이미지 미리보기' : '눌러서 움직이는 이미지를 확인하세요'}</span></div>`;
    return `${content}${asset.type !== 'image' && src ? `<button type="button" class="preview-media-control" data-media="${escapeHTML(asset.id)}" data-context="${context}">${icon('play')}${asset.type === 'gif' ? 'GIF 재생' : '영상 열기'}</button>` : ''}`;
  }

  function renderDownloadButtons(asset) {
    const downloads = getDownloads(asset);
    if (!downloads.length) return '<span class="detail-id">다운로드 파일을 준비하고 있어요.</span>';
    return downloads.map((file, index) => `<a class="button button-quiet button-small" href="${escapeHTML(safeURL(file.href))}" download="${escapeHTML(file.filename || '')}" data-download="${escapeHTML(asset.id)}" data-download-index="${index}">${icon('download')}${escapeHTML(file.label || formatLabel(asset))}</a>`).join('');
  }

  function renderMetadata(asset) {
    const meta = asset.metadata;
    const rows = [
      ['내부 ID', meta.internalId || asset.id],
      ['생성 ID', meta.jobId ?? meta.generationId ?? asset.jobId],
      ['시드', meta.seed ?? asset.seed],
      ['생성 모델', meta.model || asset.model],
      ['생성 서비스', meta.provider || asset.provider],
      ['참조 ID', meta.referenceId || asset.referenceId],
      ['캐릭터 ID', meta.referenceElementId || meta.characterId || asset.referenceElementId],
      ['크기', asset.width && asset.height ? `${asset.width} × ${asset.height}` : meta.dimensions],
      ['비율', getFormat(asset, false).ratio],
      ['생성일', meta.createdAt || asset.createdAt],
    ];
    return `<details class="metadata-disclosure"><summary>시드 · ID · 생성 기록${icon('down')}</summary><dl class="metadata-grid">${rows.map(([label, value]) => `<dt>${label}</dt><dd>${escapeHTML(metadataValue(value))}</dd>`).join('')}</dl><p class="seed-notice">시드는 해당 모델의 생성 기록이며, 다른 AI에서 같은 외형을 보장하지는 않아요.</p></details>`;
  }

  function renderDetailBody(asset, modal = false) {
    const parts = getPromptParts(asset);
    return `<div class="detail-title-row"><div><h3 ${modal ? 'id="modalAssetTitle"' : ''}>${escapeHTML(asset.title)}</h3><p class="detail-category">${escapeHTML(categoryLabel(asset.category))}${asset.subcategory ? ` / ${escapeHTML(asset.subcategory)}` : ''}</p></div></div>${asset.description ? `<p class="detail-description">${escapeHTML(asset.description)}</p>` : ''}${asset.tags.length ? `<div class="detail-tags">${asset.tags.slice(0, 4).map(tag => `<span>${escapeHTML(tag)}</span>`).join('')}</div>` : ''}<div class="format-chips">${formatChips(asset, false)}</div><div class="download-row">${renderDownloadButtons(asset)}</div><div class="detail-prompt-buttons"><button type="button" class="button button-dark" data-copy-prompt="combined" data-id="${escapeHTML(asset.id)}" ${!getPrompt(asset) ? 'disabled' : ''}>${icon('copy')}통합 프롬프트 복사</button><button type="button" class="button button-quiet" data-copy-prompt="master" data-id="${escapeHTML(asset.id)}" ${!parts.master ? 'disabled' : ''}>마스터만 복사</button><button type="button" class="button button-quiet" data-copy-prompt="application" data-id="${escapeHTML(asset.id)}" ${!parts.application ? 'disabled' : ''}>응용만 복사</button></div>${renderMetadata(asset)}<p class="detail-id">${escapeHTML(asset.metadata.internalId || asset.id)}</p>`;
  }

  function renderDetail() {
    const asset = getAsset();
    const panel = $('#detailPanel');
    if (!asset) { panel.innerHTML = `<div class="detail-empty">${icon('image')}<span>이미지를 선택하면<br>다운로드와 프롬프트가 나타나요.</span></div>`; return; }
    panel.innerHTML = `<div class="detail-topline"><span>SELECTED REFERENCE</span></div><div class="detail-preview ${asset.transparent ? 'checkerboard' : ''}" data-media-region="detail">${renderMedia(asset, 'detail')}<button type="button" class="icon-button preview-expand" data-expand="${escapeHTML(asset.id)}" aria-label="이미지 크게 보기">${icon('expand')}</button></div><div class="detail-body">${renderDetailBody(asset)}</div>`;
  }

  function renderAssetModal(asset) {
    $('#modalAssetContent').innerHTML = `<div class="modal-preview-area ${asset.transparent ? 'checkerboard' : ''}" data-media-region="modal">${renderMedia(asset, 'modal')}</div><div class="modal-info">${renderDetailBody(asset, true)}</div>`;
  }

  function openDialog(dialog) {
    if (dialog.open) return;
    dialogFocus.set(dialog, document.activeElement);
    dialog.showModal();
  }

  function closeDialog(dialog) { if (dialog?.open) dialog.close(); }

  function openAssetModal(id) {
    const asset = getAsset(id);
    if (!asset) return;
    stopAllMedia();
    state.modalId = asset.id;
    renderAssetModal(asset);
    openDialog($('#assetDialog'));
  }

  function stopAllMedia() {
    $$('video').forEach(video => { video.pause(); });
    state.playing.clear();
  }

  function selectAsset(id, showModal = false) {
    if (!getAsset(id)) return;
    stopAllMedia();
    state.selectedId = id;
    state.promptAssetId = id;
    dealEngine?.select(id);
    $$('#dealAssetNames button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.asset === id)));
    $$('.asset-card').forEach(card => {
      const active = card.dataset.asset === id;
      card.setAttribute('aria-pressed', String(active));
      const mark = card.querySelector('.card-selected-mark');
      if (!active) mark?.remove();
      else if (!mark) card.querySelector('.card-preview')?.insertAdjacentHTML('beforeend', `<span class="card-selected-mark">${icon('check')}</span>`);
    });
    renderDetail();
    if (showModal || matchMedia('(max-width:1199px)').matches) openAssetModal(id);
  }

  function setCategory(category) {
    if (!categories.some(item => item.id === category)) return;
    stopAllMedia();
    state.category = category;
    state.subcategory = 'all';
    state.query = '';
    state.transparent = false;
    state.page = 1;
    $('#searchInput').value = '';
    $('#transparentFilter').checked = false;
    const isUtility = ['prompts', 'tools'].includes(category);
    if (isUtility && dealEngine) { dealEngine.destroy(); dealEngine = null; }
    $('#galleryView').hidden = isUtility;
    $('#detailPanel').hidden = isUtility;
    $('#promptsView').hidden = category !== 'prompts';
    $('#toolsView').hidden = category !== 'tools';
    renderNavigation();
    if (category === 'prompts') renderPrompts();
    else if (category === 'tools') renderTools();
    else renderGallery();
  }

  function renderPrompts() {
    const select = $('#promptAssetSelect');
    select.innerHTML = assets.length ? assets.map(asset => `<option value="${escapeHTML(asset.id)}">${escapeHTML(asset.title)} · ${escapeHTML(categoryLabel(asset.category))}</option>`).join('') : '<option value="">레퍼런스 준비 중</option>';
    if (!getAsset(state.promptAssetId)) state.promptAssetId = assets[0]?.id || '';
    select.value = state.promptAssetId;
    const asset = getAsset(state.promptAssetId);
    const preview = asset ? staticPreview(asset) : '';
    $('#promptAssetSummary').innerHTML = `<div class="prompt-summary-image">${preview ? `<img src="${escapeHTML(preview)}" alt="${escapeHTML(asset.title)}">` : icon('image')}</div><div><strong>${escapeHTML(asset?.title || '마스터 프롬프트')}</strong><p>${escapeHTML(asset?.subcategory || (asset ? categoryLabel(asset.category) : '기준이 될 원형 이미지와 함께 사용하세요.'))}</p></div>`;
    renderPromptText();
  }

  function renderPromptText() {
    const labels = { combined: '통합 프롬프트', master: '마스터 프롬프트', application: '응용 프롬프트', negative: '외형 유지 규칙' };
    const asset = getAsset(state.promptAssetId);
    const text = getPrompt(asset, state.promptTab);
    $$('.prompt-tabs button').forEach(button => {
      const selected = button.dataset.promptTab === state.promptTab;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $('#promptTextPanel').setAttribute('aria-labelledby', `prompt-tab-${state.promptTab}`);
    $('#promptTextTitle').textContent = labels[state.promptTab];
    $('#promptText').value = text || '이 프롬프트는 준비 중이에요.';
    $('#promptCopyCurrent').disabled = !text;
    $('#promptCopyAll').disabled = !getPrompt(asset);
  }

  function renderTools() {
    const defaults = [
      { name: 'Higgsfield', initial: 'H', url: 'https://higgsfield.ai/', description: '이미지 생성·편집과 영상 작업', domain: 'higgsfield.ai' },
      { name: 'ChatGPT', initial: 'C', url: 'https://chatgpt.com/', description: '이미지를 첨부하고 대화하며 제작', domain: 'chatgpt.com' },
      { name: 'Gemini', initial: 'G', url: 'https://gemini.google.com/', description: '참고 이미지와 함께 요청하기', domain: 'gemini.google.com' },
      { name: 'Adobe Firefly', initial: 'F', url: 'https://firefly.adobe.com/', description: '이미지 제작과 편집 도구', domain: 'firefly.adobe.com' },
      { name: 'Midjourney', initial: 'M', url: 'https://www.midjourney.com/', description: '이미지 레퍼런스를 활용한 생성', domain: 'midjourney.com' },
      { name: 'Canva', initial: 'Ca', url: 'https://www.canva.com/', description: '완성한 캐릭터로 콘텐츠 디자인', domain: 'canva.com' },
    ];
    const tools = Array.isArray(catalog.tools) && catalog.tools.length ? catalog.tools : defaults;
    $('#toolsGrid').innerHTML = tools.filter(tool => safeURL(tool.url || tool.href)).map(tool => `<a class="tool-card" href="${escapeHTML(safeURL(tool.url || tool.href))}" target="_blank" rel="noopener noreferrer"><span class="tool-card-top"><span class="tool-initial">${escapeHTML(tool.initial || tool.name.slice(0, 1))}</span>${icon('arrow-up-right')}</span><h3>${escapeHTML(tool.name)}</h3><p>${escapeHTML(tool.description || '원형 이미지와 프롬프트를 준비해 사용하세요.')}</p><small>${escapeHTML(tool.domain || new URL(safeURL(tool.url || tool.href)).hostname)} · 새 창</small></a>`).join('');
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    $('#toast').textContent = message;
    $('#toast').classList.add('is-visible');
    toastTimer = setTimeout(() => $('#toast').classList.remove('is-visible'), 3100);
  }

  async function copyText(text, message = '프롬프트를 복사했어요. 원형 이미지도 함께 첨부해 주세요.') {
    if (!text) { showToast('프롬프트를 준비하고 있어요.'); return; }
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try { await navigator.clipboard.writeText(text); showToast(message); return; } catch { /* Continue with the user-visible copy fallback. */ }
    }
    const previousFocus = document.activeElement;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;';
    textarea.setAttribute('readonly', '');
    textarea.setAttribute('aria-label', '복사할 프롬프트');
    const host = [...document.querySelectorAll('dialog[open]')].pop() || document.body;
    host.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    let copied = false;
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    textarea.remove();
    previousFocus?.focus({ preventScroll: true });
    if (copied) { showToast(message); return; }
    $('#copyFallbackText').value = text;
    openDialog($('#copyDialog'));
    $('#copyFallbackText').focus();
    $('#copyFallbackText').select();
    $('#copyFallbackText').setSelectionRange(0, text.length);
  }

  async function downloadFile(asset, file, link) {
    const href = safeURL(file?.href);
    if (!href) { showToast('다운로드 파일을 준비하고 있어요.'); return; }
    const parsed = new URL(href);
    const filename = file.filename || decodeURIComponent(parsed.pathname.split('/').pop() || `${asset.id}.${formatLabel(asset).toLowerCase()}`);
    try {
      link?.setAttribute('aria-busy', 'true');
      const response = await fetch(href);
      if (!response.ok) throw new Error(`Download returned ${response.status}`);
      const blob = await response.blob();
      if (!blob.size) throw new Error('Empty file');
      const objectURL = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectURL;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(objectURL), 60000);
      showToast('다운로드를 시작했어요. 브라우저 다운로드 목록을 확인해 주세요.');
    } catch {
      if (parsed.origin !== location.origin) {
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        showToast('파일을 새 창에서 열었어요. 저장 메뉴를 이용해 주세요.');
      } else showToast('파일을 내려받지 못했어요. 잠시 후 다시 시도해 주세요.');
    } finally { link?.removeAttribute('aria-busy'); }
  }

  function setupBrand() {
    const logo = safeURL(catalog.brand?.logoSrc || catalog.logoSrc);
    if (logo) $('#brandSymbol').innerHTML = `<img src="${escapeHTML(logo)}" alt="">`;
    const version = catalog.version ? String(catalog.version).replace(/^v/i, '') : '';
    $('#footerVersion').textContent = `TIO CHARACTER LIBRARY${version ? ` · v${version}` : ''}`;
    const master = getAsset(catalog.masterAssetId) || firstAsset;
    const file = getDownloads(master)[0];
    const link = $('#masterDownload');
    if (master && file) {
      link.href = safeURL(file.href);
      link.dataset.download = master.id;
      link.dataset.downloadIndex = '0';
      link.setAttribute('download', file.filename || '');
      link.removeAttribute('aria-disabled');
    }
  }

  function setupMasterStudio() {
    const master = getAsset(catalog.masterAssetId || 'tio-master-v1') || firstAsset;
    const meta = master?.metadata || {};
    const transparent = getAsset('tio-master-transparent') || assets.find(asset => asset.category === 'original' && asset.transparent && asset.metadata?.internalId === meta.internalId);
    $('#masterCharacter').src = safeURL(catalog.masterPreview || transparent?.src || master?.src || './assets/TIO_master_transparent.png');
    $('#masterCharacter').alt = master?.title || '사용자가 지정한 TIO 캐릭터 원형';
    $('#masterExpand').disabled = !master;
    if (master) $('#masterExpand').dataset.expand = master.id;
    $('#masterInternalId').textContent = meta.internalId || (master?.id === 'tio-master-v1' ? 'TIO-MASTER-20261018-001' : '제공되지 않음');
    $('#masterSeed').textContent = metadataValue(meta.workingSeed ?? catalog.workingSeed);
    $('#masterSeed').title = catalog.workingSeedNote || '원본 생성 시드를 복원한 값이 아닌 이 라이브러리의 작업용 설정입니다. 시드 지원 모델에서 사용하며 같은 외형을 보장하지는 않습니다.';
    $('#originalSeedNote').textContent = `원본 생성 시드: ${exists(meta.seed ?? master?.seed) ? String(meta.seed ?? master?.seed) : '미제공'} · 시드 지원 모델 설정에 입력`;
    $('#masterJobId').textContent = metadataValue(meta.jobId ?? meta.generationId ?? master?.jobId);
    $('#masterCharacterId').textContent = metadataValue(meta.referenceElementId || meta.characterId || master?.referenceElementId);
    const text = getPrompt(master, 'master');
    $('#masterPromptText').value = text || '원형의 마스터 프롬프트를 준비하고 있어요.';
    $('#masterCopy').disabled = !text;
    const file = getDownloads(master)[0];
    if (master && file) {
      const link = $('#studioMasterDownload');
      link.href = safeURL(file.href);
      link.dataset.download = master.id;
      link.dataset.downloadIndex = '0';
      link.setAttribute('download', file.filename || '');
      link.removeAttribute('aria-disabled');
    }
    const transparentFile = getDownloads(transparent)[0];
    if (transparent && transparentFile) {
      const link = $('#studioTransparentDownload');
      link.href = safeURL(transparentFile.href);
      link.dataset.download = transparent.id;
      link.dataset.downloadIndex = '0';
      link.setAttribute('download', transparentFile.filename || '');
      link.removeAttribute('aria-disabled');
    }
    const options = Object.entries(prompts.applications || {});
    $('#masterApplicationSelect').innerHTML = '<option value="">응용 프롬프트 선택</option>' + options.map(([key, application]) => `<option value="${escapeHTML(key)}">${escapeHTML(application.title || key)}${application.format?.ratio ? ` · ${escapeHTML(application.format.ratio)}` : ''}</option>`).join('');
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('button,a');
    if (!target) return;
    if (target.getAttribute('aria-disabled') === 'true') { event.preventDefault(); return; }
    if (target.dataset.copyHex) copyText(target.dataset.copyHex, `${target.dataset.copyHex} 색상 코드를 복사했어요.`);
    else if (target.dataset.category) setCategory(target.dataset.category);
    else if (target.dataset.go) setCategory(target.dataset.go);
    else if (target.hasAttribute('data-subcategory')) { state.subcategory = target.dataset.subcategory; state.page = 1; stopAllMedia(); renderGallery(); }
    else if (target.dataset.asset) selectAsset(target.dataset.asset);
    else if (target.dataset.expand) openAssetModal(target.dataset.expand);
    else if (target.dataset.page) {
      state.page = Number(target.dataset.page);
      stopAllMedia();
      renderGallery();
      if (matchMedia('(max-width:1199px)').matches) $('#galleryView').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    } else if (target.hasAttribute('data-reset-filters')) {
      state.query = ''; state.subcategory = 'all'; state.transparent = false; state.page = 1;
      $('#searchInput').value = ''; $('#transparentFilter').checked = false; renderGallery();
    } else if (target.dataset.copyPrompt) copyText(getPrompt(getAsset(target.dataset.id), target.dataset.copyPrompt));
    else if (target.dataset.promptTab) { state.promptTab = target.dataset.promptTab; renderPromptText(); }
    else if (target.dataset.download) {
      event.preventDefault();
      const asset = getAsset(target.dataset.download);
      const file = getDownloads(asset)[Number(target.dataset.downloadIndex || 0)];
      if (asset && file) downloadFile(asset, file, target);
    } else if (target.dataset.media) {
      const asset = getAsset(target.dataset.media);
      const context = target.dataset.context;
      if (!asset) return;
      const key = `${context}:${asset.id}`;
      if (state.playing.has(key)) state.playing.delete(key); else state.playing.add(key);
      const region = document.querySelector(`[data-media-region="${context}"]`);
      if (region) {
        region.innerHTML = renderMedia(asset, context) + (context === 'detail' ? `<button type="button" class="icon-button preview-expand" data-expand="${escapeHTML(asset.id)}" aria-label="이미지 크게 보기">${icon('expand')}</button>` : '');
      }
    } else if (target.hasAttribute('data-close-dialog')) closeDialog(target.closest('dialog'));
  });

  $('#searchForm').addEventListener('submit', event => event.preventDefault());
  $('#searchInput').addEventListener('input', event => { state.query = event.target.value; state.page = 1; stopAllMedia(); renderGallery(); });
  $('#transparentFilter').addEventListener('change', event => { state.transparent = event.target.checked; state.page = 1; stopAllMedia(); renderGallery(); });
  $('#promptAssetSelect').addEventListener('change', event => { state.promptAssetId = event.target.value; renderPrompts(); });
  $('#promptCopyAll').addEventListener('click', () => copyText(getPrompt(getAsset(state.promptAssetId))));
  $('#promptCopyCurrent').addEventListener('click', () => copyText(getPrompt(getAsset(state.promptAssetId), state.promptTab)));
  $('#helpButton').addEventListener('click', () => openDialog($('#helpDialog')));
  $('#footerHelp').addEventListener('click', () => openDialog($('#helpDialog')));
  $('#enterLibrary').addEventListener('click', () => $('#masterStudio').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
  $('#masterGuide').addEventListener('click', () => openDialog($('#helpDialog')));
  $('#masterCopy').addEventListener('click', () => copyText(getPrompt(getAsset(catalog.masterAssetId || 'tio-master-v1'), 'master'), '마스터 프롬프트를 복사했어요. 원형 이미지도 AI에 함께 첨부해 주세요.'));
  $('#masterApplicationSelect').addEventListener('change', event => {
    $('#masterCombinedCopy').disabled = !event.target.value;
    $('#masterFormatChips').innerHTML = event.target.value ? formatChips({ promptKey: event.target.value }) : '<span class="format-placeholder">응용을 선택하면 크기와 비율을 보여드려요.</span>';
  });
  $('#masterCombinedCopy').addEventListener('click', () => copyText(getPrompt({ promptKey: $('#masterApplicationSelect').value })));
  $('#copyReproduction').addEventListener('click', () => {
    const master = getAsset(catalog.masterAssetId || 'tio-master-v1');
    const meta = master?.metadata || {};
    const characterId = meta.referenceElementId || meta.characterId;
    const text = `[TIO 재현 작업 설정]\n내부 관리 ID: ${metadataValue(meta.internalId)}\n작업용 고정 시드: ${metadataValue(meta.workingSeed ?? catalog.workingSeed)}\n원본 생성 시드: ${exists(meta.seed) ? meta.seed : '미제공'}\n원본 생성 ID: ${metadataValue(meta.jobId)}\nHiggsfield 캐릭터 ID: ${metadataValue(characterId)}${characterId ? `\n등록 계정의 Higgsfield 지원 모델용 참조 토큰: <<<${characterId}>>>` : ''}\n\n고정 원형 이미지를 참고 이미지로 함께 첨부하세요. 시드를 지원하는 모델에서는 위 작업용 고정 시드를 설정에 입력하고, 같은 모델·버전·생성 설정을 유지하세요. 작업용 고정 시드는 원본 시드를 복원한 값이 아니며 동일한 외형을 보장하지 않습니다. Higgsfield 캐릭터 ID와 참조 토큰은 등록한 Higgsfield 계정의 지원 모델에서만 사용하세요. 다른 AI에서는 원형 이미지 첨부와 마스터 프롬프트를 기준으로 작업하세요.`;
    copyText(text, '작업용 시드와 참조 ID를 포함한 재현 설정을 복사했어요.');
  });
  $$('.prompt-tabs button').forEach((button, index, buttons) => button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
    if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = buttons.length - 1;
    if (next !== undefined) { event.preventDefault(); state.promptTab = buttons[next].dataset.promptTab; renderPromptText(); buttons[next].focus(); }
  }));

  $$('dialog').forEach(dialog => {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog);
    });
    dialog.addEventListener('close', () => {
      if (dialog.id === 'assetDialog') { stopAllMedia(); state.modalId = null; $('#modalAssetContent').innerHTML = ''; renderDetail(); }
      const trigger = dialogFocus.get(dialog);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
      dialogFocus.delete(dialog);
    });
  });

  document.addEventListener('keydown', event => {
    const editable = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (event.key === '/' && !editable && !$('dialog[open]') && !['prompts', 'tools'].includes(state.category)) { event.preventDefault(); $('#searchInput').focus(); }
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) return;
    stopAllMedia();
    renderDetail();
    if (state.modalId) { const asset = getAsset(state.modalId); if (asset) renderAssetModal(asset); }
  });
  document.addEventListener('error', event => {
    if (event.target.tagName !== 'IMG') return;
    const image = event.target;
    image.style.display = 'none';
    const region = image.closest('.card-preview,.detail-preview,.modal-preview-area,.prompt-summary-image');
    if (region && !region.querySelector('.image-load-error')) region.insertAdjacentHTML('beforeend', `<span class="image-load-error preview-placeholder">${icon('image')}<span>이미지를 불러오지 못했어요.</span></span>`);
  }, true);

  renderIcons();
  setupBrand();
  setupMasterStudio();
  setupHero();
  renderNavigation();
  renderGallery();
})();
