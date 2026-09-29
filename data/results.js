/* ═══════════════════════════════════════════════════════════════════════
   RHODEX UZBEKISTAN — BEFORE / AFTER RESULTS
   Single source of truth. Feeds three surfaces:
     · /results          — the full gallery, filterable by concern
     · quiz result page         — filtered to the visitor's own concerns
     · product detail pages     — filtered to that product
   Add a new case here and it appears in all three.

   ── CONSENT IS ENFORCED IN CODE ─────────────────────────────────────
   Nothing renders unless `consent:true`. This is not a formality: these
   are identifiable faces, and publishing one without written permission
   is a legal and reputational risk that outweighs any marketing gain.
   `consentRef` records WHERE that permission is filed, so the claim can
   be checked later by someone who wasn't in the conversation.
   Set consent:false the moment permission is unclear or withdrawn.

   ── HONEST TIMELINES ────────────────────────────────────────────────
   `months` is mandatory and always displayed. Never round up, never omit.
   A result that took two months must not be shown as if it took one.

   ── VOCABULARY ──────────────────────────────────────────────────────
   `concerns` uses the SAME ids as products.js — that is what lets the
   quiz match a visitor's diagnosis to a relevant photo.
   `products` uses product slugs from products.js.
   ═══════════════════════════════════════════════════════════════════════ */

const RESULTS = [

  {
    id: 'r01',
    image: '../images/results/r01-soap-acne.webp',
    layout: 'pair',                     // 'pair' = left before, right after
    months: 1,
    products: ['luminar-facial-soap'],
    concerns: ['blemish-prone', 'redness-prone', 'uneven-tone'],
    consent: true,
    consentRef: 'Owner confirmed written consent 2026-09-28',
    note: {
      uz: "Faqat tozalovchi sovun: yuz va peshonadagi faol toshmalar soni kamaydi, qizarish pasaydi, teri toni tekislandi.",
      ru: "Только очищающее мыло: активных высыпаний на щеках и лбу стало меньше, покраснение ушло, тон выровнялся."
    }
  },

  {
    id: 'r02',
    image: '../images/results/r02-soap-serum-cream.webp',
    layout: 'pair',
    months: 2,                          // real range: 1.5–2 months (see duration)
    duration: { uz: "1,5–2 oy", ru: "1,5–2 мес." },
    products: ['luminar-facial-soap', 'intensive-whitening-serum', 'lucent-complexion-cream'],
    concerns: ['blemish-prone', 'uneven-tone', 'uneven-texture', 'congested'],
    consent: true,
    consentRef: 'Owner confirmed written consent 2026-09-28',
    note: {
      uz: "Toshmadan keyingi qizil dogʻlar va notekis tekstura kamaydi, teri silliq va yorqin koʻrinadi.",
      ru: "Уменьшились красные пятна после высыпаний и неровная текстура, кожа выглядит гладкой и сияющей."
    }
  },

  {
    id: 'r03',
    image: '../images/results/r03-soap-emu-mask-spray-spf.webp',
    layout: 'pair',
    months: 1,
    products: ['luminar-facial-soap', 'rehydro-skin-solution', 'nutritive-emu-cream',
               'multi-protection-cream', 'white-mask'],
    concerns: ['dull', 'uneven-tone', 'dehydrated', 'redness-prone'],
    consent: true,
    consentRef: 'Owner confirmed written consent 2026-09-28',
    note: {
      uz: "Anti-age toʻplami (sovun, sprey, Emu krem, Multi SPF, maska): teri namlandi, qizarish kamaydi, ton tekislandi.",
      ru: "Антивозрастной набор (мыло, спрей, Emu крем, Multi SPF, маска): кожа увлажнилась, покраснение уменьшилось, тон выровнялся."
    }
  },

  {
    id: 'r04',
    image: '../images/results/r04-soap-spray-spf.webp',
    layout: 'pair',
    months: 1.7,                        // 1 month 20 days (see duration)
    duration: { uz: "1 oy 20 kun", ru: "1 мес. 20 дн." },
    products: ['luminar-facial-soap', 'rehydro-skin-solution', 'multi-protection-cream'],
    concerns: ['blemish-prone', 'redness-prone', 'congested'],
    consent: true,
    consentRef: 'Owner confirmed written consent 2026-09-28',
    note: {
      uz: "Yonoq va iyakdagi koʻplab yalligʻlangan toshmalar deyarli yoʻqoldi, qizarish sezilarli kamaydi.",
      ru: "Многочисленные воспалённые высыпания на щеках и подбородке почти исчезли, покраснение заметно уменьшилось."
    }
  },

  {
    id: 'r05',
    image: '../images/results/r05-soap-4months.webp',
    layout: 'pair',                     // rebuilt from the 2x2 collage: before (top row) left, after (bottom row) right
    months: 4,
    products: ['luminar-facial-soap'],
    concerns: ['blemish-prone', 'uneven-tone', 'dull'],
    consent: true,
    consentRef: 'Owner confirmed written consent 2026-09-28',
    note: {
      uz: "Faqat tozalovchi sovun, 4 oy muntazam: toshmalar va ulardan qolgan dogʻlar kamaydi, teri tiniqlashdi.",
      ru: "Только очищающее мыло, 4 месяца регулярно: высыпаний и следов от них стало меньше, кожа стала чище."
    }
  }

];

/* ── Helpers ───────────────────────────────────────────────────────────
   Every accessor goes through live(), so an un-consented case cannot leak
   onto a page by accident — including via the quiz or a product listing. */

const liveResults = () => RESULTS.filter(r => r.consent === true);

const resultsForConcern = (c) => liveResults().filter(r => r.concerns.includes(c));

/* Quiz passes the visitor's own concern list; best match first, so the
   photo shown is the one closest to what they were just diagnosed with. */
const resultsForConcerns = (list) => {
  if (!list || !list.length) return liveResults();
  return liveResults()
    .map(r => ({ r, hits: list.filter(c => r.concerns.includes(c)).length }))
    .filter(x => x.hits > 0)
    .sort((a, b) => b.hits - a.hits)
    .map(x => x.r);
};

/* Label shown on every card. `duration` holds the exact wording when the
   real timeframe is not a whole number of months — never round it. */
const durationLabel = (r, lang) =>
  (r.duration && (r.duration[lang] || r.duration.uz)) || (r.months + (lang === 'ru' ? ' мес.' : ' oy'));

const resultsForProduct = (slug) => liveResults().filter(r => r.products.includes(slug));

/* Concerns that actually have a photo — used to build the gallery filter
   so it never offers a button that returns nothing. */
const resultConcerns = () => {
  const used = new Set(liveResults().flatMap(r => r.concerns));
  return typeof CONCERNS !== 'undefined'
    ? Object.keys(CONCERNS).filter(c => used.has(c))
    : [...used];
};
