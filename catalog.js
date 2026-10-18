window.TIO_CATALOG = {
  "version": "1.0",
  "updatedAt": "2026-10-18",
  "status": "review",
  "characterName": "TIO",
  "workingSeed": 160944995,
  "workingSeedLabel": "작업용 고정 시드",
  "workingSeedNote": "원형 파일 SHA-256에서 정한 작업용 값입니다. 원본 생성 시드를 복원한 값이 아니며, 시드 입력을 지원하는 모델의 설정에서 사용하세요. 동일 모델·버전·참조 이미지·프롬프트를 유지해야 비교할 수 있습니다.",
  "masterAssetId": "tio-master-v1",
  "brand": {
    "logoSrc": "assets/TIO_master_transparent.png"
  },
  "heroVideo": {
    "src": "assets/TIO_hero_motion.mp4",
    "poster": "assets/TIO_hero_poster.jpg"
  },
  "heroPoster": "assets/TIO_hero_poster.jpg",
  "assets": [
    {
      "id": "tio-master-v1",
      "title": "TIO · 고정 원형",
      "category": "original",
      "subcategory": "고정 원형",
      "tags": [
        "고정 원형"
      ],
      "src": "assets/TIO_master_original.png",
      "type": "image",
      "width": 1024,
      "height": 1024,
      "format": {
        "width": 1024,
        "height": 1024,
        "ratio": "1:1",
        "platform": "고정 원형"
      },
      "description": "사용자가 지정한 최우선 캐릭터 기준. 실제 PNG 메타데이터의 생성 ID를 기록했으며 시드는 제공되지 않았습니다.",
      "promptKey": "reference-only",
      "transparent": false,
      "metadata": {
        "internalId": "TIO-MASTER-20261018-001",
        "jobId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "seed": null,
        "provider": "Higgsfield · 사용자 제공",
        "model": "gpt_image_2_5",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "approved",
        "mediaId": "7425a1e3-3716-49b2-bd07-b41bad636b4f",
        "referenceElementId": "b6aab7dd-62dd-4b40-84a9-3503571a6437",
        "workingSeed": 160944995,
        "workingSeedKind": "SHA256-derived project seed, not the original generation seed"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/TIO_master_original.png",
          "filename": "TIO_master_original.png"
        }
      ],
      "thumbnail": "assets/TIO_master_original.preview.webp"
    },
    {
      "id": "tio-master-transparent",
      "title": "TIO · 고정 원형 투명 PNG",
      "category": "original",
      "subcategory": "고정 원형",
      "tags": [
        "고정 원형"
      ],
      "src": "assets/TIO_master_transparent.png",
      "type": "image",
      "width": 1024,
      "height": 1024,
      "format": {
        "width": 1024,
        "height": 1024,
        "ratio": "1:1",
        "platform": "고정 원형"
      },
      "description": "새 고정 원형의 배경만 제거한 투명 PNG. 캐릭터 모양과 색상은 유지합니다.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "tio-master-transparent",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/TIO_master_transparent.png",
          "filename": "TIO_master_transparent.png"
        }
      ],
      "thumbnail": "assets/TIO_master_transparent.preview.webp"
    },
    {
      "id": "tio-sheet",
      "title": "4K 캐릭터 시트 · 발 복원",
      "category": "original",
      "subcategory": "캐릭터 시트",
      "tags": [
        "캐릭터 시트"
      ],
      "src": "assets/TIO_character_sheet_4K_feet_fixed.png",
      "type": "image",
      "width": 4096,
      "height": 2737,
      "format": {
        "width": 4096,
        "height": 2737,
        "ratio": "4096:2737",
        "platform": "캐릭터 시트"
      },
      "description": "Higgsfield 4K 확대본의 하단 말풍선 예시에서 잘린 발을 복원한 참고 시트. 새 고정 원형과 함께 비교하세요.",
      "promptKey": "reference-only",
      "transparent": false,
      "metadata": {
        "internalId": "tio-sheet",
        "jobId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "seed": null,
        "provider": "Higgsfield",
        "model": "bytedance_image_upscale · 4K",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/TIO_character_sheet_4K_feet_fixed.png",
          "filename": "TIO_character_sheet_4K_feet_fixed.png"
        }
      ],
      "thumbnail": "assets/TIO_character_sheet_4K_feet_fixed.preview.webp"
    },
    {
      "id": "01_front",
      "title": "정면",
      "category": "original",
      "subcategory": "방향 참고",
      "tags": [
        "방향 참고"
      ],
      "src": "assets/01_front.png",
      "type": "image",
      "width": 505,
      "height": 534,
      "format": {
        "width": 505,
        "height": 534,
        "ratio": "505:534",
        "platform": "방향 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "01_front",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/01_front.png",
          "filename": "01_front.png"
        }
      ],
      "thumbnail": "assets/01_front.preview.webp"
    },
    {
      "id": "02_side",
      "title": "측면",
      "category": "original",
      "subcategory": "방향 참고",
      "tags": [
        "방향 참고"
      ],
      "src": "assets/02_side.png",
      "type": "image",
      "width": 375,
      "height": 528,
      "format": {
        "width": 375,
        "height": 528,
        "ratio": "125:176",
        "platform": "방향 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "02_side",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/02_side.png",
          "filename": "02_side.png"
        }
      ],
      "thumbnail": "assets/02_side.preview.webp"
    },
    {
      "id": "03_back",
      "title": "후면",
      "category": "original",
      "subcategory": "방향 참고",
      "tags": [
        "방향 참고"
      ],
      "src": "assets/03_back.png",
      "type": "image",
      "width": 507,
      "height": 530,
      "format": {
        "width": 507,
        "height": 530,
        "ratio": "507:530",
        "platform": "방향 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "03_back",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/03_back.png",
          "filename": "03_back.png"
        }
      ],
      "thumbnail": "assets/03_back.preview.webp"
    },
    {
      "id": "04_expression_smile",
      "title": "기본 미소",
      "category": "expressions",
      "subcategory": "표정 참고",
      "tags": [
        "표정 참고"
      ],
      "src": "assets/04_expression_smile.png",
      "type": "image",
      "width": 404,
      "height": 357,
      "format": {
        "width": 404,
        "height": 357,
        "ratio": "404:357",
        "platform": "표정 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "04_expression_smile",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/04_expression_smile.png",
          "filename": "04_expression_smile.png"
        }
      ],
      "thumbnail": "assets/04_expression_smile.preview.webp"
    },
    {
      "id": "05_expression_wink",
      "title": "윙크",
      "category": "expressions",
      "subcategory": "표정 참고",
      "tags": [
        "표정 참고"
      ],
      "src": "assets/05_expression_wink.png",
      "type": "image",
      "width": 407,
      "height": 392,
      "format": {
        "width": 407,
        "height": 392,
        "ratio": "407:392",
        "platform": "표정 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "05_expression_wink",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/05_expression_wink.png",
          "filename": "05_expression_wink.png"
        }
      ],
      "thumbnail": "assets/05_expression_wink.preview.webp"
    },
    {
      "id": "06_expression_excited",
      "title": "신남",
      "category": "expressions",
      "subcategory": "표정 참고",
      "tags": [
        "표정 참고"
      ],
      "src": "assets/06_expression_excited.png",
      "type": "image",
      "width": 419,
      "height": 437,
      "format": {
        "width": 419,
        "height": 437,
        "ratio": "419:437",
        "platform": "표정 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "06_expression_excited",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/06_expression_excited.png",
          "filename": "06_expression_excited.png"
        }
      ],
      "thumbnail": "assets/06_expression_excited.preview.webp"
    },
    {
      "id": "07_expression_surprised",
      "title": "놀람",
      "category": "expressions",
      "subcategory": "표정 참고",
      "tags": [
        "표정 참고"
      ],
      "src": "assets/07_expression_surprised.png",
      "type": "image",
      "width": 359,
      "height": 428,
      "format": {
        "width": 359,
        "height": 428,
        "ratio": "359:428",
        "platform": "표정 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "07_expression_surprised",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/07_expression_surprised.png",
          "filename": "07_expression_surprised.png"
        }
      ],
      "thumbnail": "assets/07_expression_surprised.preview.webp"
    },
    {
      "id": "08_expression_curious",
      "title": "궁금",
      "category": "expressions",
      "subcategory": "표정 참고",
      "tags": [
        "표정 참고"
      ],
      "src": "assets/08_expression_curious.png",
      "type": "image",
      "width": 375,
      "height": 422,
      "format": {
        "width": 375,
        "height": 422,
        "ratio": "375:422",
        "platform": "표정 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "08_expression_curious",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/08_expression_curious.png",
          "filename": "08_expression_curious.png"
        }
      ],
      "thumbnail": "assets/08_expression_curious.preview.webp"
    },
    {
      "id": "09_expression_proud",
      "title": "뿌듯",
      "category": "expressions",
      "subcategory": "표정 참고",
      "tags": [
        "표정 참고"
      ],
      "src": "assets/09_expression_proud.png",
      "type": "image",
      "width": 392,
      "height": 373,
      "format": {
        "width": 392,
        "height": 373,
        "ratio": "392:373",
        "platform": "표정 참고"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "09_expression_proud",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/09_expression_proud.png",
          "filename": "09_expression_proud.png"
        }
      ],
      "thumbnail": "assets/09_expression_proud.preview.webp"
    },
    {
      "id": "10_pose_running",
      "title": "달려요",
      "category": "poses",
      "subcategory": "동작",
      "tags": [
        "동작"
      ],
      "src": "assets/10_pose_running.png",
      "type": "image",
      "width": 424,
      "height": 366,
      "format": {
        "width": 424,
        "height": 366,
        "ratio": "212:183",
        "platform": "동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "10_pose_running",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/10_pose_running.png",
          "filename": "10_pose_running.png"
        }
      ],
      "thumbnail": "assets/10_pose_running.preview.webp"
    },
    {
      "id": "11_pose_cheering",
      "title": "응원해요",
      "category": "poses",
      "subcategory": "동작",
      "tags": [
        "동작"
      ],
      "src": "assets/11_pose_cheering.png",
      "type": "image",
      "width": 541,
      "height": 464,
      "format": {
        "width": 541,
        "height": 464,
        "ratio": "541:464",
        "platform": "동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "11_pose_cheering",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/11_pose_cheering.png",
          "filename": "11_pose_cheering.png"
        }
      ],
      "thumbnail": "assets/11_pose_cheering.preview.webp"
    },
    {
      "id": "12_pose_like",
      "title": "좋아요",
      "category": "poses",
      "subcategory": "동작",
      "tags": [
        "동작"
      ],
      "src": "assets/12_pose_like.png",
      "type": "image",
      "width": 424,
      "height": 338,
      "format": {
        "width": 424,
        "height": 338,
        "ratio": "212:169",
        "platform": "동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "12_pose_like",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/12_pose_like.png",
          "filename": "12_pose_like.png"
        }
      ],
      "thumbnail": "assets/12_pose_like.preview.webp"
    },
    {
      "id": "13_pose_thinking",
      "title": "생각 중",
      "category": "poses",
      "subcategory": "동작",
      "tags": [
        "동작"
      ],
      "src": "assets/13_pose_thinking.png",
      "type": "image",
      "width": 452,
      "height": 338,
      "format": {
        "width": 452,
        "height": 338,
        "ratio": "226:169",
        "platform": "동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "reference-only",
      "transparent": true,
      "metadata": {
        "internalId": "13_pose_thinking",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/13_pose_thinking.png",
          "filename": "13_pose_thinking.png"
        }
      ],
      "thumbnail": "assets/13_pose_thinking.preview.webp"
    },
    {
      "id": "14_use_laptop",
      "title": "노트북과 함께",
      "category": "poses",
      "subcategory": "활용 동작",
      "tags": [
        "활용 동작"
      ],
      "src": "assets/14_use_laptop.png",
      "type": "image",
      "width": 519,
      "height": 398,
      "format": {
        "width": 519,
        "height": 398,
        "ratio": "519:398",
        "platform": "활용 동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "lesson-notice",
      "transparent": true,
      "metadata": {
        "internalId": "14_use_laptop",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/14_use_laptop.png",
          "filename": "14_use_laptop.png"
        }
      ],
      "thumbnail": "assets/14_use_laptop.preview.webp"
    },
    {
      "id": "15_use_reading",
      "title": "책과 함께",
      "category": "poses",
      "subcategory": "활용 동작",
      "tags": [
        "활용 동작"
      ],
      "src": "assets/15_use_reading.png",
      "type": "image",
      "width": 623,
      "height": 436,
      "format": {
        "width": 623,
        "height": 436,
        "ratio": "623:436",
        "platform": "활용 동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "book-recommendation",
      "transparent": true,
      "metadata": {
        "internalId": "15_use_reading",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/15_use_reading.png",
          "filename": "15_use_reading.png"
        }
      ],
      "thumbnail": "assets/15_use_reading.preview.webp"
    },
    {
      "id": "16_use_checklist",
      "title": "체크리스트",
      "category": "poses",
      "subcategory": "활용 동작",
      "tags": [
        "활용 동작"
      ],
      "src": "assets/16_use_checklist.png",
      "type": "image",
      "width": 591,
      "height": 450,
      "format": {
        "width": 591,
        "height": 450,
        "ratio": "197:150",
        "platform": "활용 동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "lesson-notice",
      "transparent": true,
      "metadata": {
        "internalId": "16_use_checklist",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/16_use_checklist.png",
          "filename": "16_use_checklist.png"
        }
      ],
      "thumbnail": "assets/16_use_checklist.preview.webp"
    },
    {
      "id": "17_use_coffee",
      "title": "커피 한 잔",
      "category": "poses",
      "subcategory": "활용 동작",
      "tags": [
        "활용 동작"
      ],
      "src": "assets/17_use_coffee.png",
      "type": "image",
      "width": 429,
      "height": 428,
      "format": {
        "width": 429,
        "height": 428,
        "ratio": "429:428",
        "platform": "활용 동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "lesson-notice",
      "transparent": true,
      "metadata": {
        "internalId": "17_use_coffee",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/17_use_coffee.png",
          "filename": "17_use_coffee.png"
        }
      ],
      "thumbnail": "assets/17_use_coffee.preview.webp"
    },
    {
      "id": "18_use_message",
      "title": "응원 메시지",
      "category": "poses",
      "subcategory": "활용 동작",
      "tags": [
        "활용 동작"
      ],
      "src": "assets/18_use_message.png",
      "type": "image",
      "width": 568,
      "height": 431,
      "format": {
        "width": 568,
        "height": 431,
        "ratio": "568:431",
        "platform": "활용 동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "lesson-notice",
      "transparent": true,
      "metadata": {
        "internalId": "18_use_message",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/18_use_message.png",
          "filename": "18_use_message.png"
        }
      ],
      "thumbnail": "assets/18_use_message.preview.webp"
    },
    {
      "id": "19_use_thanks",
      "title": "감사해요",
      "category": "poses",
      "subcategory": "활용 동작",
      "tags": [
        "활용 동작"
      ],
      "src": "assets/19_use_thanks.png",
      "type": "image",
      "width": 583,
      "height": 445,
      "format": {
        "width": 583,
        "height": 445,
        "ratio": "583:445",
        "platform": "활용 동작"
      },
      "description": "4K 참고 시트에서 원래 해상도로 추출한 투명 PNG. 개별 파일은 4K가 아니며 새 고정 원형의 외형 기준과 비교해 사용하세요.",
      "promptKey": "thank-you",
      "transparent": true,
      "metadata": {
        "internalId": "19_use_thanks",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "원본 PNG 추출",
        "createdAt": "2026-10-18",
        "referenceId": "53411b27-5557-4c21-b240-ddf2dfb9ebe4",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/19_use_thanks.png",
          "filename": "19_use_thanks.png"
        }
      ],
      "thumbnail": "assets/19_use_thanks.preview.webp"
    },
    {
      "id": "instagram-01",
      "title": "인스타 카드뉴스 · 표지",
      "category": "samples",
      "subcategory": "카드뉴스",
      "tags": [
        "카드뉴스"
      ],
      "src": "assets/instagram-01.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "카드뉴스"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "instagram-carousel-5",
      "transparent": false,
      "metadata": {
        "internalId": "instagram-01",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/instagram-01.png",
          "filename": "instagram-01.png"
        }
      ],
      "thumbnail": "assets/instagram-01.preview.webp"
    },
    {
      "id": "instagram-02",
      "title": "인스타 카드뉴스 · 아이디어",
      "category": "samples",
      "subcategory": "카드뉴스",
      "tags": [
        "카드뉴스"
      ],
      "src": "assets/instagram-02.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "카드뉴스"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "instagram-carousel-5",
      "transparent": false,
      "metadata": {
        "internalId": "instagram-02",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/instagram-02.png",
          "filename": "instagram-02.png"
        }
      ],
      "thumbnail": "assets/instagram-02.preview.webp"
    },
    {
      "id": "instagram-03",
      "title": "인스타 카드뉴스 · 수업 기록",
      "category": "samples",
      "subcategory": "카드뉴스",
      "tags": [
        "카드뉴스"
      ],
      "src": "assets/instagram-03.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "카드뉴스"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "instagram-carousel-5",
      "transparent": false,
      "metadata": {
        "internalId": "instagram-03",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/instagram-03.png",
          "filename": "instagram-03.png"
        }
      ],
      "thumbnail": "assets/instagram-03.preview.webp"
    },
    {
      "id": "instagram-04",
      "title": "인스타 카드뉴스 · 서로 응원",
      "category": "samples",
      "subcategory": "카드뉴스",
      "tags": [
        "카드뉴스"
      ],
      "src": "assets/instagram-04.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "카드뉴스"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "instagram-carousel-5",
      "transparent": false,
      "metadata": {
        "internalId": "instagram-04",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/instagram-04.png",
          "filename": "instagram-04.png"
        }
      ],
      "thumbnail": "assets/instagram-04.preview.webp"
    },
    {
      "id": "instagram-05",
      "title": "인스타 카드뉴스 · 마무리",
      "category": "samples",
      "subcategory": "카드뉴스",
      "tags": [
        "카드뉴스"
      ],
      "src": "assets/instagram-05.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "카드뉴스"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "instagram-carousel-5",
      "transparent": false,
      "metadata": {
        "internalId": "instagram-05",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/instagram-05.png",
          "filename": "instagram-05.png"
        }
      ],
      "thumbnail": "assets/instagram-05.preview.webp"
    },
    {
      "id": "reels-cover",
      "title": "릴스 · 세로 커버",
      "category": "samples",
      "subcategory": "릴스",
      "tags": [
        "릴스"
      ],
      "src": "assets/reels-cover.png",
      "type": "image",
      "width": 1080,
      "height": 1920,
      "format": {
        "width": 1080,
        "height": 1920,
        "ratio": "9:16",
        "platform": "릴스"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "reels-vertical",
      "transparent": false,
      "metadata": {
        "internalId": "reels-cover",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/reels-cover.png",
          "filename": "reels-cover.png"
        }
      ],
      "thumbnail": "assets/reels-cover.preview.webp"
    },
    {
      "id": "youtube-01",
      "title": "유튜브 썸네일 · 수업 아이디어",
      "category": "samples",
      "subcategory": "유튜브",
      "tags": [
        "유튜브"
      ],
      "src": "assets/youtube-01.png",
      "type": "image",
      "width": 1280,
      "height": 720,
      "format": {
        "width": 1280,
        "height": 720,
        "ratio": "16:9",
        "platform": "유튜브"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "youtube-lesson-thumbnail",
      "transparent": false,
      "metadata": {
        "internalId": "youtube-01",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/youtube-01.png",
          "filename": "youtube-01.png"
        }
      ],
      "thumbnail": "assets/youtube-01.preview.webp"
    },
    {
      "id": "youtube-02",
      "title": "유튜브 썸네일 · 도전 응원",
      "category": "samples",
      "subcategory": "유튜브",
      "tags": [
        "유튜브"
      ],
      "src": "assets/youtube-02.png",
      "type": "image",
      "width": 1280,
      "height": 720,
      "format": {
        "width": 1280,
        "height": 720,
        "ratio": "16:9",
        "platform": "유튜브"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "youtube-workshop-thumbnail",
      "transparent": false,
      "metadata": {
        "internalId": "youtube-02",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/youtube-02.png",
          "filename": "youtube-02.png"
        }
      ],
      "thumbnail": "assets/youtube-02.preview.webp"
    },
    {
      "id": "logo-horizontal",
      "title": "로고 · 가로형 워드마크",
      "category": "samples",
      "subcategory": "로고·QR",
      "tags": [
        "로고·QR"
      ],
      "src": "assets/logo-horizontal.png",
      "type": "image",
      "width": 1800,
      "height": 620,
      "format": {
        "width": 1800,
        "height": 620,
        "ratio": "90:31",
        "platform": "로고·QR"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "association-wordmark",
      "transparent": true,
      "metadata": {
        "internalId": "logo-horizontal",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/logo-horizontal.png",
          "filename": "logo-horizontal.png"
        }
      ],
      "thumbnail": "assets/logo-horizontal.preview.webp"
    },
    {
      "id": "logo-profile",
      "title": "로고 · 프로필 배지",
      "category": "samples",
      "subcategory": "로고·QR",
      "tags": [
        "로고·QR"
      ],
      "src": "assets/logo-profile.png",
      "type": "image",
      "width": 1080,
      "height": 1080,
      "format": {
        "width": 1080,
        "height": 1080,
        "ratio": "1:1",
        "platform": "로고·QR"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "instagram-square",
      "transparent": true,
      "metadata": {
        "internalId": "logo-profile",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "투명 PNG",
          "href": "assets/logo-profile.png",
          "filename": "logo-profile.png"
        }
      ],
      "thumbnail": "assets/logo-profile.preview.webp"
    },
    {
      "id": "qr-logo",
      "title": "QR 로고 · 홈페이지 연결",
      "category": "samples",
      "subcategory": "로고·QR",
      "tags": [
        "로고·QR"
      ],
      "src": "assets/qr-logo.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "로고·QR"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "qr-logo",
      "transparent": false,
      "metadata": {
        "internalId": "qr-logo",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/qr-logo.png",
          "filename": "qr-logo.png"
        }
      ],
      "thumbnail": "assets/qr-logo.preview.webp"
    },
    {
      "id": "class-announcement",
      "title": "수업 안내 · 오늘의 배움",
      "category": "samples",
      "subcategory": "수업 안내",
      "tags": [
        "수업 안내"
      ],
      "src": "assets/class-announcement.png",
      "type": "image",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "수업 안내"
      },
      "description": "고정 캐릭터 PNG를 레이어로 배치한 활용 시안. 텍스트와 배경만 응용하세요.",
      "promptKey": "lesson-notice",
      "transparent": false,
      "metadata": {
        "internalId": "class-announcement",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "PNG",
          "href": "assets/class-announcement.png",
          "filename": "class-announcement.png"
        }
      ],
      "thumbnail": "assets/class-announcement.preview.webp"
    },
    {
      "id": "motion-carousel",
      "title": "움직이는 캐러셀 · MP4",
      "category": "samples",
      "subcategory": "모션",
      "tags": [
        "모션"
      ],
      "src": "assets/motion-carousel.mp4",
      "type": "video",
      "width": 1080,
      "height": 1350,
      "format": {
        "width": 1080,
        "height": 1350,
        "ratio": "4:5",
        "platform": "모션"
      },
      "description": "완성 카드가 전환되는 모션 캐러셀.",
      "promptKey": "motion-carousel",
      "transparent": false,
      "metadata": {
        "internalId": "motion-carousel",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "VIDEO",
          "href": "assets/motion-carousel.mp4",
          "filename": "motion-carousel.mp4"
        }
      ],
      "thumbnail": "assets/instagram-01.preview.webp"
    },
    {
      "id": "motion-carousel-gif",
      "title": "움직이는 캐러셀 · GIF",
      "category": "samples",
      "subcategory": "모션",
      "tags": [
        "모션"
      ],
      "src": "assets/motion-carousel.gif",
      "type": "gif",
      "width": 432,
      "height": 540,
      "format": {
        "width": 432,
        "height": 540,
        "ratio": "4:5",
        "platform": "모션"
      },
      "description": "웹에서 미리 볼 수 있는 모션 캐러셀 GIF.",
      "promptKey": "motion-carousel",
      "transparent": false,
      "metadata": {
        "internalId": "motion-carousel-gif",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "GIF",
          "href": "assets/motion-carousel.gif",
          "filename": "motion-carousel.gif"
        }
      ],
      "thumbnail": "assets/instagram-01.preview.webp"
    },
    {
      "id": "reels-motion",
      "title": "릴스 · 모션 샘플",
      "category": "samples",
      "subcategory": "릴스",
      "tags": [
        "릴스"
      ],
      "src": "assets/reels-motion.mp4",
      "type": "video",
      "width": 1080,
      "height": 1920,
      "format": {
        "width": 1080,
        "height": 1920,
        "ratio": "9:16",
        "platform": "릴스"
      },
      "description": "고정 PNG 레이어를 유지하는 세로 모션.",
      "promptKey": "reels-vertical",
      "transparent": false,
      "metadata": {
        "internalId": "reels-motion",
        "jobId": null,
        "seed": null,
        "provider": "Higgsfield",
        "model": "고정 PNG 레이어 합성",
        "createdAt": "2026-10-18",
        "referenceId": "fb354839-756c-4a37-83f7-d325f969a9dc",
        "status": "review"
      },
      "downloads": [
        {
          "label": "VIDEO",
          "href": "assets/reels-motion.mp4",
          "filename": "reels-motion.mp4"
        }
      ],
      "thumbnail": "assets/reels-cover.preview.webp"
    }
  ],
  "tools": [
    {
      "name": "Higgsfield",
      "initial": "H",
      "url": "https://higgsfield.ai/",
      "description": "이미지·영상 만들기 · 이미지를 업로드하고 참조 이미지로 지정한 뒤 통합 프롬프트를 붙여넣어요. 선택한 모델에서 이미지 입력을 지원하는지 확인해요.",
      "domain": "higgsfield.ai"
    },
    {
      "name": "ChatGPT Images",
      "initial": "C",
      "url": "https://chatgpt.com/images",
      "description": "대화로 이미지 편집 · TIO PNG를 첨부한 뒤 통합 프롬프트로 편집할 내용을 요청해요.",
      "domain": "chatgpt.com"
    },
    {
      "name": "Google Gemini",
      "initial": "G",
      "url": "https://gemini.google.com/",
      "description": "참조 이미지로 만들기 · TIO PNG를 업로드하고 통합 프롬프트를 붙여넣어 만들거나 수정해요.",
      "domain": "gemini.google.com"
    },
    {
      "name": "Adobe Firefly",
      "initial": "A",
      "url": "https://firefly.adobe.com/",
      "description": "이미지·배경 제작 · 선택 모델의 참조 이미지 옵션을 확인해요. 캐릭터 고정이 필요하면 배경을 만든 뒤 원형 PNG를 그대로 배치해요.",
      "domain": "firefly.adobe.com"
    },
    {
      "name": "Canva AI",
      "initial": "C",
      "url": "https://www.canva.com/ai-image-generator/",
      "description": "이미지 만들고 문구 편집 · 이미지 생성에는 참조 이미지와 프롬프트를 쓰고, 편집기에서는 TIO PNG를 직접 배치해 카드뉴스·썸네일 문구를 편집해요.",
      "domain": "www.canva.com"
    },
    {
      "name": "Midjourney",
      "initial": "M",
      "url": "https://www.midjourney.com/",
      "description": "이미지 참조로 시안 만들기 · 사용 중인 모델에 맞는 이미지 참조 또는 편집 기능에 TIO PNG를 넣고 영문 통합 프롬프트를 사용해요.",
      "domain": "www.midjourney.com"
    }
  ]
};
