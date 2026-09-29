RHODEX UZBEKISTAN — WEBSITE FILES
=================================

UPLOAD EVERYTHING IN THIS FOLDER TO YOUR WEB ROOT, KEEPING THE STRUCTURE.

  /index.html          root — sends visitors to the PRODUCT CATALOGUE in their language
                       (main page = /uz/products.html and /ru/products.html)
  /robots.txt
  /sitemap.xml         submit to Google Search Console + Yandex Webmaster

  /uz/products         MAIN PAGE — hero, product grid, quiz call-to-action
  /uz/product?p=slug   product detail + "order in Telegram" button
  /uz/skintest         skin quiz
  /uz/results          before/after gallery
  (same names under /ru/.  Old Uzbek/Russian file names — mahsulotlar,
   teri-testi, produkty … — stay as tiny redirect files so old ads,
   Google results and shared links keep working.)

  /css/site.css        shared readability layer: fonts, text sizes, figures — SHARED
  /fonts/              self-hosted Inter + Lora (Latin, Uzbek ʻ, Cyrillic)
  /images/education/   article diagrams, one file per language (-uz / -ru)
  /images/brand/       logo lockups, catalogue hero photos
  /images/lifestyle/   lifestyle photo per product (shown on product page)
  /data/products.js    all 16 products, both languages — SHARED
  /images/products/    16 product photos — SHARED
  /images/quiz/        <-- ADD THE 4 FACE FILES HERE
                           oily.webp  dry.webp  combination.webp  normal.webp

BEFORE GOING LIVE
-----------------
1. Add the 4 quiz face images to /images/quiz/
2. If your domain is not rhodex.uz, replace it everywhere:
     grep -rl "rhodex.uz" . | xargs sed -i "s|https://rhodex.uz|https://YOURDOMAIN|g"
3. natijalar.html (before/after) and /education/ are linked but not built yet.
   Either build them or remove those two nav links.

EDITING PRODUCTS
----------------
Everything lives in /data/products.js. Change it once and every page updates.
  - published:false     hides a product from the grid and its detail page
  - tags:[...]          controls filtering and the chips shown
  - kfda:[...]          controls the gold KFDA line (leave empty = no line)


═══════════════════════════════════════════════════════════════════
BEFORE / AFTER RESULTS  —  /data/results.js
═══════════════════════════════════════════════════════════════════

5 CASES LIVE (consent:true, owner confirmed written consent 2026-09-28).
Set consent:false on any case the moment permission is withdrawn.

TO ADD A RESULT
  1. Get written consent from the client and note where it is filed.
  2. Save ONE image, 1200 x 900 px WebP: before on the LEFT half,
     after on the RIGHT half (each half 600 x 900), same angle and light.
       /images/results/r06-....webp
  3. Add an entry in results.js. `months` is a number; if the real time
     is not whole months, also add  duration:{uz:"1 oy 20 kun", ru:"1 мес. 20 дн."}
     — never round up. layout:'collage' for ready-made 2x2 collages.

RESULTS APPEAR AUTOMATICALLY IN THREE PLACES
  · /uz/results.html  and  /ru/results.html   — full gallery + filter
  · quiz result page   — filtered to that visitor's own concerns
  · product pages      — filtered to that product

Photo requirements: same lighting, same angle, same distance, no filter,
no makeup in either shot. State the real timeframe — never round up.


═══════════════════════════════════════════════════════════════════
EDUCATION  —  /education/uz/  and  /education/ru/
═══════════════════════════════════════════════════════════════════

7 articles + hub, both languages, all cross-linked to products and quiz.

  skin-types  skin-barrier  dry-vs-dehydrated  pigmentation
  sun-protection  acne-and-pores  aging-and-firmness
  (same English names in /education/uz/ and /education/ru/)

Diagrams: skin-types, barrier, acne/pores and ageing articles use
illustrations from the purchased "70 Diagrams" pack, cropped and
relabelled in Uzbek and Russian (/images/education/). Dry-vs-dehydrated,
pigmentation and SPF articles keep their original SVG diagrams.
Check that the pack's licence covers use on a commercial website.
