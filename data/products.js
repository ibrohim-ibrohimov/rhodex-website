/* ═══════════════════════════════════════════════════════════════════════
   RHODEX UZBEKISTAN — PRODUCT DATA
   Single source of truth. The grid, the filters, the detail pages and the
   quiz protocol all read from this file. Change a product here, and every
   surface updates.

   Source: Product_panel__Uzbek_.pdf (16 active SKUs, 2026)
   Language: Uzbek Latin complete · Russian slots empty, ready to fill

   ── LOADING ─────────────────────────────────────────────────────────
   Loaded with a plain <script src="data/products.js"> tag, NOT an ES
   module import. Plain scripts work when you open the HTML by double-
   clicking (file://); module imports do not — the browser blocks them.
   Keep it this way so local preview works without a web server.

   ── HOW TO ADD RUSSIAN ──────────────────────────────────────────────
   Every translatable field is {uz:"...", ru:""}. Fill the ru value.
   Nothing else changes. Set lang='ru' and the site switches.

   ── BRAND ───────────────────────────────────────────────────────────
   RHODEX is the market-facing brand in Uzbekistan for the whole line.
   `brand` is always RHODEX. `koreanBottle` records what is physically
   printed on the Korean packaging — some units read REBIRTH. That field
   is internal reference only: never render it, but keep it, because it
   drives the "why does my bottle say Rebirth" support question.

   ── OPEN FLAGS ──────────────────────────────────────────────────────
   Items with `flags` are NOT ready to publish. See flags.js for the
   full list. `published:false` keeps a product out of the live grid.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Classification vocabularies ──────────────────────────────────────
   Two axes. SKIN_TYPES is what the skin IS; CONCERNS is what it NEEDS.
   Both arrays on each product are ORDERED — best fit / primary problem
   first — so chips and recommendations read in priority order.
   Pregnancy safety is a separate boolean, not a tag: it is a regulatory
   status, not a skin characteristic, and it must never be inferred.    */

const SKIN_TYPES = {
  'all'                 : { uz:"Barcha teri turlari", ru:"Все типы кожи" },
  'sensitive'           : { uz:"Sezgir", ru:"Чувствительная" },
  'dry'                 : { uz:"Quruq", ru:"Сухая" },
  'oily'                : { uz:"Yogʻli", ru:"Жирная" },
  'combi'               : { uz:"Kombi", ru:"Комбинированная" },
  'normal'              : { uz:"Normal", ru:"Нормальная" },
};

const CONCERNS = {
  'dehydrated'          : { uz:"Suvsizlangan", ru:"Обезвоженность" },
  'stressed'            : { uz:"Charchagan", ru:"Раздражение" },
  'dull'                : { uz:"Xira", ru:"Тусклость" },
  'congested'           : { uz:"Qora poralar", ru:"Забитые поры" },
  'blemish-prone'       : { uz:"Toshmaga moyil", ru:"Склонность к высыпаниям" },
  'uneven-texture'      : { uz:"Notekis tekstura", ru:"Неровная текстура" },
  'uneven-tone'         : { uz:"Notekis ton", ru:"Неровный тон" },
  'needs-brightening'   : { uz:"Yorqinlik kerak", ru:"Нехватка сияния" },
  'uv-protection'       : { uz:"Quyoshdan himoya", ru:"Защита от солнца" },
  'sweat-prone'         : { uz:"Terlashga moyil", ru:"Склонность к потливости" },
  'redness-prone'       : { uz:"Qizarishga moyil", ru:"Склонность к покраснениям" },
  'loss-of-firmness'    : { uz:"Taranglik yoʻqolishi", ru:"Потеря упругости" },
  'mature'              : { uz:"Yetuk teri", ru:"Зрелая кожа" },
  'wrinkles'            : { uz:"Ajinlar", ru:"Морщины" },
  'puffiness'           : { uz:"Shishish", ru:"Отёчность" },
  'fatigue'             : { uz:"Charchagan teri", ru:"Усталость кожи" },
  'dark-circles'        : { uz:"Koʻz ostida qorayish", ru:"Тёмные круги" },
  'uneven-eye-tone'     : { uz:"Notekis koʻz toni", ru:"Неровный тон вокруг глаз" },
};

const PREGNANCY_SAFE_LABEL = { uz:"Homiladorlik va emizish davrida xavfsiz", ru:"Безопасно при беременности и грудном вскармливании" };

/* Back-compat: some views still read TAGS. Merged lookup, same shape. */
const TAGS = Object.assign({},
  Object.fromEntries(Object.entries(SKIN_TYPES).map(([k,v]) => [k, Object.assign({group:'type'}, v)])),
  Object.fromEntries(Object.entries(CONCERNS).map(([k,v]) => [k, Object.assign({group:'concern'}, v)]))
);

/* ── Categories ───────────────────────────────────────────────────────
   English keys match the panel tabs and the packaging. Uzbek labels are
   for consumer-facing navigation.                                       */

const CATEGORIES = [
  { id:'cleansing',  en:"Cleansing",                        uz:"Tozalovchi",              ru:"Очищение" },
  { id:'hydration',  en:"Brightening & Hydration",          uz:"Yorqinlashtiruvchi va namlantiruvchi",   ru:"Осветление и увлажнение" },
  { id:'creams',     en:"Nourishing & Brightening Creams",  uz:"Oziqlantiruvchi kremlar", ru:"Питательные кремы" },
  { id:'spf',        en:"SPF",                              uz:"Quyoshdan himoya",      ru:"Защита от солнца" },
  { id:'eye',        en:"Eye",                              uz:"Koʻz atrofi",           ru:"Уход за кожей вокруг глаз" },
  { id:'sensitive',  en:"Sensitive & Deep Moisture Care",   uz:"Sezgir teri parvarishi", ru:"Уход за чувствительной кожей" },
  { id:'body',       en:"Body",                             uz:"Tana",                  ru:"Тело" }
];

/* ── KFDA notified actives ────────────────────────────────────────────
   Gold line appears ONLY when the active is confirmed present in the INCI.
   Never inferred, never decorative.                                     */

const KFDA = {
  niacinamide: { uz:"Niatsinamid (oqartiruvchi)",  ru:"Ниацинамид (отбеливающий)" },
  adenosine:   { uz:"Adenozin (ajinlarga qarshi)", ru:"Аденозин (против морщин)" },
  arbutin:     { uz:"Arbutin (oqartiruvchi)",      ru:"Арбутин (отбеливающий)" }
};

/* ═══════════════════════════════════════════════════════════════════════
   THE 16 PRODUCTS
   ═══════════════════════════════════════════════════════════════════════ */

const PRODUCTS = [

/* ─────────────────────────── CLEANSING ─────────────────────────────── */
{
  slug:'clear-gel', name:"Clear Gel", category:'cleansing',
  brand:"RHODEX", koreanBottle:"REBIRTH",
  volume:"250 ml", image:"../images/products/clear-gel.webp",
  subtitle:{ uz:"Chuqur Tozalovchi Gel", ru:"Глубоко очищающий гель" },
  band:{ uz:"Yorqinlashtiruvchi Tozalovchi Gel", ru:"Осветляющий очищающий гель" },
  kfda:[],
  skinTypes:['all','combi','oily','normal'],
  concerns:['congested','dull','blemish-prone','needs-brightening','uneven-tone'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Poralarni chuqur tozalaydi — makyaj qoldiqlari, kir va oʻlik hujayralarni ketkazadi",
    "Yumshoq mikrokoʻpik terini tabiiy namligini saqlagan holda tozalaydi",
    "Har bir yuvinishda teri tonini yorqinlashtiradi va tiniqlashtiradi",
    "PhytoG Stem Cell-R™ va PhytoG Complex A™ muammoli terini parvarish qiladi",
    "Tinchlantiradi va namlaydi — kundalik foydalanish uchun yetarlicha yumshoq",
    "Terini tetik, toza va qulay holatda qoldiradi"
  ], ru:["Глубоко очищает поры — удаляет остатки макияжа, загрязнения и отмершие клетки","Мягкая микропена очищает, сохраняя естественную влагу кожи","С каждым умыванием тон кожи становится светлее и чище","PhytoG Stem Cell-R™ и PhytoG Complex A™ ухаживают за проблемной кожей","Успокаивает и увлажняет — достаточно мягкий для ежедневного применения","Оставляет кожу свежей, чистой и комфортной"] },
  howto:{ uz:"Namlangan teriga oz miqdorda surtib, koʻpurguncha aylanma harakatlar bilan massaj qiling. Iliq suv bilan yuving, soʻng salqin suv bilan yakunlang va quritib oling. Ertalab va kechqurun qoʻllang.", ru:"Нанесите небольшое количество на влажную кожу и массируйте круговыми движениями до появления пены. Смойте тёплой водой, завершите прохладной и промокните насухо. Применяйте утром и вечером." },
  inci:{ uz:"Carthamus Tinctorius (safdur) gul ekstrakti, Morus Alba poʻstlogʻi ekstrakti, Scutellaria Baicalensis ildizi ekstrakti, Panax Ginseng kallus kulturasi ekstrakti, Daucus Carota Sativa (sabzi) kallus kulturasi ekstrakti, Camellia Sinensis kallus kulturasi ekstrakti, Cocamidopropyl Betaine, Disodium Cocoamphodiacetate", ru:"Экстракт цветков Carthamus Tinctorius (сафлор), экстракт коры Morus Alba, экстракт корня Scutellaria Baicalensis, экстракт каллусной культуры Panax Ginseng, экстракт каллусной культуры Daucus Carota Sativa (морковь), экстракт каллусной культуры Camellia Sinensis, Cocamidopropyl Betaine, Disodium Cocoamphodiacetate" },
  published:true, flags:[]
},
{
  slug:'luminar-facial-soap', name:"Luminar Facial Soap", category:'cleansing',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"120 g", image:"../images/products/luminar-facial-soap.webp",
  subtitle:{ uz:"Oʻsimlik Fermentli Tozalovchi Sovun", ru:"Очищающее мыло с растительными ферментами" },
  band:{ uz:"Oʻsimlik Fermentli Sovun", ru:"Мыло с растительными ферментами" },
  kfda:[],
  skinTypes:['all','combi','oily','sensitive'],
  concerns:['congested','blemish-prone','dull','dehydrated','stressed'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Quritmasdan tozalaydi — yogʻ kislotasidan iborat himoya qatlam hosil qiladi",
    "88% fermentlangan oʻsimlik kompleksi terining tabiiy himoyasini kuchaytiradi",
    "Yumshoq, moʻl koʻpik bir yuvishda makyaj va oʻlik hujayralarni ketkazadi",
    "Muntazam foydalanishda teri sezilarli tozalanadi va tiniqlashadi — toshmaga moyil terida isbotlangan",
    "Sezgir, charchagan terini tinchlantiradi va teri baryerini mustahkamlaydi",
    "Lactobacillus va Saccharomyces fermentlari terining antioksidant kuchini oshiradi"
  ], ru:["Очищает без пересушивания — образует защитный слой из жирных кислот","Ферментированный растительный комплекс (88%) усиливает естественную защиту кожи","Мягкая обильная пена за одно умывание удаляет макияж и отмершие клетки","При регулярном применении кожа заметно очищается и светлеет — подтверждено на коже, склонной к высыпаниям","Успокаивает чувствительную, уставшую кожу и укрепляет её барьер","Ферменты Lactobacillus и Saccharomyces повышают антиоксидантную защиту кожи"] },
  howto:{ uz:"Namlangan qoʻllar orasida sof koʻpik hosil qiling. Qon aylanishini yaxshilash uchun yuz va boʻyinga aylanma harakatlar bilan yengil massaj qiling. Iliq suvda yuvib, yumshoq sochiq bilan quritib oling. Ertalab va kechqurun qoʻllang.", ru:"Вспеньте мыло во влажных ладонях до образования плотной пены. Лёгкими круговыми движениями помассируйте лицо и шею для улучшения кровообращения. Смойте тёплой водой и промокните мягким полотенцем. Применяйте утром и вечером." },
  inci:{ uz:"Sut kislotasi bakteriyalari fermentlangan suyuqligi aralashmasi, Saccharomyces ferment filtrati, Emu yogʻi, Saururus Chinensis ekstrakti, Camellia Sinensis barg ekstrakti, Oryza Sativa (guruch) kepagi ekstrakti, Sodium Hyaluronate, Tocopherol (E vitamini)", ru:"Смесь ферментированной жидкости молочнокислых бактерий, фильтрат фермента Saccharomyces, масло эму, экстракт Saururus Chinensis, экстракт листьев Camellia Sinensis, экстракт рисовых отрубей Oryza Sativa, Sodium Hyaluronate, Tocopherol (витамин E)" },
  published:true, flags:[]
},
{
  slug:'doux-peeling-gel', name:"Doux Peeling Gel", category:'cleansing',
  brand:"RHODEX", koreanBottle:"REBIRTH",
  volume:"120 ml", image:"../images/products/doux-peeling-gel.webp",
  subtitle:{ uz:"Yumshoq Piling Gel", ru:"Мягкий пилинг-гель" },
  band:{ uz:"Oʻsimliklardan Tayyorlangan Piling Gel", ru:"Пилинг-гель на растительной основе" },
  kfda:[],
  skinTypes:['all','combi','oily','normal','sensitive'],
  concerns:['uneven-texture','congested','dull','blemish-prone','stressed'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Oʻlik hujayralar va iflosliklarni ketkazadi — yumshoq gommaj, ishqalashsiz",
    "Sellyuloza teri yangilanishini tiklaydi va taʼsirlanishni kamaytiradi",
    "Zanthoxylum va koʻk choy kundalik stressdan himoya qiladi",
    "Pulsatilla Koreana tinchlantiradi va sovutadi, qizarishni yumshatadi",
    "Ipak amino kislotalari (20+) va Arginin teri namligini tiklaydi",
    "Sabzavot-meva kompleksi (brokkoli, sabzi, pomidor) xira terini jonlantiradi"
  ], ru:["Удаляет отмершие клетки и загрязнения — мягкий гоммаж без жёсткого трения","Целлюлоза способствует обновлению кожи и снижает раздражение","Zanthoxylum и зелёный чай защищают от ежедневного стресса","Pulsatilla Koreana успокаивает и охлаждает, уменьшает покраснения","Аминокислоты шёлка (20+) и аргинин восстанавливают увлажнённость кожи","Овощно-фруктовый комплекс (брокколи, морковь, томат) оживляет тусклую кожу"] },
  howto:{ uz:"Koʻz va ogʻiz atrofini chetlab oʻtib, yuzning toza va quruq terisiga tekis surting. Barmoq uchlari bilan 1–2 daqiqa aylanma harakatda yengil massaj qiling; gel oʻlik hujayralarni yigʻib yumshoq tolalarga aylanadi. Iliq suv bilan yuving va toner bilan yakunlang. Teri sezgirligiga qarab, haftasiga 1–2 marta qoʻllang.", ru:"Нанесите ровным слоем на чистую сухую кожу лица, избегая области вокруг глаз и губ. Массируйте кончиками пальцев круговыми движениями 1–2 минуты; гель скатывается в мягкие хлопья, собирая отмершие клетки. Смойте тёплой водой и завершите тонером. Применяйте 1–2 раза в неделю в зависимости от чувствительности кожи." },
  inci:{ uz:"Cellulose, Hydrolyzed Silk, Zanthoxylum Piperitum meva ekstrakti, Pulsatilla Koreana ekstrakti, Camellia Sinensis barg ekstrakti, Arginine, Lepidium Meyenii (maka) ildizi ekstrakti, Allantoin", ru:"Cellulose, Hydrolyzed Silk, экстракт плодов Zanthoxylum Piperitum, экстракт Pulsatilla Koreana, экстракт листьев Camellia Sinensis, Arginine, экстракт корня Lepidium Meyenii (мака), Allantoin" },
  published:true, flags:[]
},

/* ─────────────────── BRIGHTENING & HYDRATION ───────────────────────── */
{
  slug:'rehydro-skin-solution', name:"Rehydro Skin Solution", category:'hydration',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"80/120 ml", image:"../images/products/rehydro-skin-solution.webp",
  subtitle:{ uz:"Namlantiruvchi Sprey", ru:"Увлажняющий спрей" },
  band:{ uz:"Ajinlarga qarshi Kosmetsevtika", ru:"Космецевтика против морщин" },
  kfda:['adenosine'],
  skinTypes:['all'],
  concerns:['dehydrated','fatigue','dull','wrinkles','congested'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Tegishi bilan bir zumda namlantiradi va namlikni teriga chuqur yetkazadi",
    "Quruq va suvsizlangan teriga sogʻlom yaltirash qaytaradi",
    "Yuz va boʻyindagi ajinlar koʻrinishini yumshatadi (adenozin, KFDA)",
    "Charchagan terini tetiklaydi va makyaj ustidan ideal",
    "Poralar koʻrinishini toraytiradi va kundalik atrof-muhit stressidan himoyalaydi"
  ], ru:["Мгновенно увлажняет при нанесении и доставляет влагу глубоко в кожу","Возвращает сухой и обезвоженной коже здоровое сияние","Делает морщины на лице и шее менее заметными (аденозин, KFDA)","Освежает уставшую кожу, идеален поверх макияжа","Визуально сужает поры и защищает от ежедневного негативного воздействия окружающей среды"] },
  howto:{ uz:"Koʻzni yuming; yuzga ~20 sm masofadan seping. Toner oʻrnida qoʻllang — tozalashdan soʻng, makyaj ustidan yoki teri quruq his qilingan vaqtda.", ru:"Закройте глаза; распылите на лицо с расстояния ~20 см. Используйте вместо тонера — после очищения, поверх макияжа или при ощущении сухости кожи." },
  inci:{ uz:"Adenosine, Sea Water (dengiz suvi), Hizikia Fusiforme ekstrakti, Codium Tomentosum ekstrakti, Enteromorpha Compressa ekstrakti, Laminaria Japonica ekstrakti", ru:"Adenosine, Sea Water (морская вода), экстракт Hizikia Fusiforme, экстракт Codium Tomentosum, экстракт Enteromorpha Compressa, экстракт Laminaria Japonica" },
  published:true, flags:[]
},
{
  slug:'intensive-whitening-serum', name:"Intensive Whitening Serum", category:'hydration',
  brand:"RHODEX", koreanBottle:"REBIRTH",
  volume:"90 ml", image:"../images/products/intensive-whitening-serum.webp",
  subtitle:{ uz:"Oqartiruvchi Serum", ru:"Отбеливающая сыворотка" },
  band:{ uz:"Yorqinlashtiruvchi Kosmetsevtika", ru:"Осветляющая космецевтика" },
  kfda:['niacinamide'],
  skinTypes:['all','sensitive','normal','combi'],
  concerns:['uneven-tone','needs-brightening','redness-prone','stressed','dehydrated','dull'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Teri tonini yorqinlashtiradi; sepkil va dogʻlarni kamaytirishga yordam beradi",
    "Kuchli oʻsimlik antioksidantlari kundalik teri stressidan himoya qiladi",
    "Qizarishni yoʻqotadi hamda sezgir, charchagan terini tinchlantiradi",
    "Yengil ampula teksturasi — tegishi bilan namlaydi, yopishqoq iz qoldirmaydi",
    "Muntazam foydalanishda teri sezilarli silliq va elastik boʻladi",
    "Kun boʻyi terining tetik koʻrinishini saqlaydi"
  ], ru:["Осветляет тон кожи; помогает уменьшить веснушки и пигментные пятна","Мощные растительные антиоксиданты защищают от ежедневного стресса","Устраняет покраснения и успокаивает чувствительную, уставшую кожу","Лёгкая ампульная текстура — увлажняет сразу, не оставляет липкости","При регулярном применении кожа становится заметно глаже и эластичнее","Сохраняет свежий вид кожи в течение всего дня"] },
  howto:{ uz:"Rhodex Rehydro Skin Solution bilan namlagandan soʻng, 2–3 tomchini barmoq uchiga tomizing va yuzga bir xil surting. Ertalab va kechqurun essence sifatida qoʻllang.", ru:"После нанесения Rhodex Rehydro Skin Solution нанесите 2–3 капли на кончики пальцев и равномерно распределите по лицу. Применяйте утром и вечером как эссенцию." },
  inci:{ uz:"Niacinamide, Centella Asiatica barg ekstrakti, Pulsatilla Koreana ekstrakti, Cynara Scolymus (artishok) barg ekstrakti, Calendula Officinalis gul ekstrakti, Helichrysum Arenarium gul ekstrakti, Beta-Glucan, Sodium Hyaluronate", ru:"Niacinamide, экстракт листьев Centella Asiatica, экстракт Pulsatilla Koreana, экстракт листьев Cynara Scolymus (артишок), экстракт цветков Calendula Officinalis, экстракт цветков Helichrysum Arenarium, Beta-Glucan, Sodium Hyaluronate" },
  published:true, flags:[]
},
{
  slug:'white-mask', name:"White Mask", category:'hydration',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"32 g × 8 dona", image:"../images/products/white-mask.webp",
  subtitle:{ uz:"Yuz Maskasi", ru:"Маска для лица" },
  band:{ uz:"Yorqinlashtiruvchi Kosmetsevtika", ru:"Осветляющая космецевтика" },
  kfda:['niacinamide'],
  skinTypes:['all','dry','normal','sensitive'],
  concerns:['dehydrated','dull','needs-brightening','uneven-tone','fatigue'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Terini namlik va foydali moddalarga toʻydiradi — bir maskada butun ampula",
    "Terini yorqinroq va tiniqroq qilish uchun yordam beradi (niatsinamid)",
    "Teri baryerini mustahkamlaydi, teri sogʻlom va bardoshli boʻladi",
    "Ekologik Tencel mato yuz shakliga ipakdek yopishib turadi",
    "Oʻsimlik ekstraktlari charchagan terini tinchlantiradi va tetiklaydi",
    "Terini elastik, toʻliq va yorqin holatda qoldiradi"
  ], ru:["Насыщает кожу влагой и питательными веществами — целая ампула в одной маске","Помогает сделать кожу светлее и чище (ниацинамид)","Укрепляет кожный барьер — кожа становится здоровой и устойчивой","Экологичная ткань Tencel прилегает к лицу, как шёлк","Растительные экстракты успокаивают и освежают уставшую кожу","Оставляет кожу эластичной, наполненной и сияющей"] },
  howto:{ uz:"Yuzni tozalagach, toner bilan tayyorlab oling. Maskani ochib, yuz va boʻyinga moslab tekis joylashtiring. 15–20 daqiqa dam oling, soʻng qolgan essensiyani yengil singdiring. Haftada 2–3 marta ishlating.", ru:"После очищения подготовьте кожу тонером. Разверните маску и ровно расправьте её на лице и шее. Оставьте на 15–20 минут, затем лёгкими движениями вбейте остатки эссенции. Применяйте 2–3 раза в неделю." },
  inci:{ uz:"Niacinamide, Sodium Hyaluronate, Centella Asiatica barg ekstrakti, Camellia Sinensis barg ekstrakti, Aloe Barbadensis barg ekstrakti, Glycyrrhiza Glabra (qizilmiya) ildizi ekstrakti, Phytosqualane, Allantoin", ru:"Niacinamide, Sodium Hyaluronate, экстракт листьев Centella Asiatica, экстракт листьев Camellia Sinensis, экстракт листьев Aloe Barbadensis, экстракт корня Glycyrrhiza Glabra (солодка), Phytosqualane, Allantoin" },
  published:true, flags:[]
},

/* ────────────────── NOURISHING & BRIGHTENING CREAMS ─────────────────── */
{
  slug:'moisture-collagen-cream', name:"Moisture Collagen Cream", category:'creams',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"50 ml", image:"../images/products/moisture-collagen-cream.webp",
  subtitle:{ uz:"Premium Qarishga Qarshi Krem", ru:"Премиальный антивозрастной крем" },
  band:{ uz:"Dengiz Kollageni Konsentrati", ru:"Концентрат морского коллагена" },
  kfda:[],
  skinTypes:['dry','normal','combi'],
  concerns:['loss-of-firmness','mature','dehydrated','wrinkles','dull'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Dengiz kollageni va gialuron kislotasi terini ichdan toʻldiradi",
    "Muntazam foydalanishda teri sezilarli yumshoq va silliq boʻladi",
    "Vaqt oʻtishi bilan taranglik va elastiklikni oshirishga yordam beradi",
    "E vitamini va skvalan terini kunlik stressdan himoyalaydi",
    "Shi va uzum danagi yogʻi uzoq muddatli va qulay namlik beradi",
    "Teri tinch, nurli va kun boʻyi yorqin koʻrinishda qoladi"
  ], ru:["Морской коллаген и гиалуроновая кислота наполняют кожу изнутри","При регулярном применении кожа становится заметно мягче и глаже","Со временем помогает повысить упругость и эластичность","Витамин E и сквалан защищают кожу от ежедневного стресса","Масло ши и масло виноградной косточки дают длительное комфортное увлажнение","Кожа остаётся спокойной, сияющей и свежей в течение всего дня"] },
  howto:{ uz:"Kechki parvarishning yakuniy bosqichi sifatida oz miqdorda yuz va boʻyinga surting — quruq va yetuk teri uchun kuniga ikki marta. Toʻliq singiguncha yengil harakatlar bilan yuqoriga qarab massaj qiling.", ru:"Нанесите небольшое количество на лицо и шею как завершающий этап вечернего ухода — для сухой и зрелой кожи дважды в день. Массируйте лёгкими движениями снизу вверх до полного впитывания." },
  inci:{ uz:"Eriydigan dengiz kollageni (1.5%), Gialuron kislotasi, Skvalan, Tokoferil asetati (E vitamini), Shi yogʻi, Uzum danagi yogʻi", ru:"Растворимый морской коллаген (1,5%), гиалуроновая кислота, сквалан, токоферола ацетат (витамин E), масло ши, масло виноградной косточки" },
  published:true, flags:[]
},
{
  slug:'nutritive-emu-cream', name:"Nutritive Emu Cream", category:'creams',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"50 ml", image:"../images/products/nutritive-emu-cream.webp",
  subtitle:{ uz:"Oziqlantiruvchi, Yoshartiruvchi Krem", ru:"Питательный омолаживающий крем" },
  band:{ uz:"Yorqinlashtiruvchi + Ajinga Qarshi Kosmetsevtika", ru:"Осветляющая + противоморщинная космецевтика" },
  kfda:['niacinamide','adenosine'],
  skinTypes:['dry','normal','sensitive','combi'],
  concerns:['dehydrated','mature','uneven-tone','needs-brightening','wrinkles','loss-of-firmness','fatigue'],
  pregnancySafe:true,
  benefits:{ uz:[
    "6.99% Emu yogʻi omega-3/6 ni chuqur singdirib, uzoq vaqtli namlikni tiklaydi",
    "Niatsinamid notekis tonni yorqinlashtiradi; Adenozin ajinlarni yumshatadi",
    "Boy koreys oʻsimlik ekstraktlari (Anjelika, Kornus, Jenshen) terini oziqlantiradi va jonlantiradi",
    "Tremella qoʻziqorini va shea moyi teriga toʻlinganlik, namlik va yorqinlik beradi",
    "Yengil krem ogʻirliksiz singadi — quruq, toliqqan teriga mos",
    "Yoshroq va nurli yuz koʻrinishi uchun kunlik anti-aging"
  ], ru:["Масло эму (6,99%) доставляет омега-3/6 в глубокие слои кожи и обеспечивает длительное увлажнение","Ниацинамид осветляет неровный тон; аденозин разглаживает морщины","Корейские растительные экстракты (дудник, кизил, женьшень) питают и оживляют кожу","Гриб Tremella и масло ши придают коже наполненность, влагу и сияние","Лёгкий крем впитывается, не утяжеляя кожу, — подходит для сухой, уставшей кожи","Ежедневный антивозрастной уход для более молодого и сияющего лица"] },
  howto:{ uz:"Rhodex Rehydro Skin Solution spreyidan soʻng, yetarli miqdorda olib, yuz va boʻyinga surting. Quruq teri uchun kremga 1–2 tomchi Rhodex Emu Gel aralashtiring. Ertalab va kechqurun foydalaning.", ru:"После нанесения спрея Rhodex Rehydro Skin Solution возьмите достаточное количество и нанесите на лицо и шею. Для сухой кожи добавьте в крем 1–2 капли Rhodex Emu Gel. Применяйте утром и вечером." },
  inci:{ uz:"Emu yogʻi (6.99%), Niacinamide, Adenosine, Butyrospermum Parkii (shea) moyi, Tremella Fuciformis sporokarp ekstrakti, Panax Ginseng ildizi ekstrakti, Angelica Gigas ildizi ekstrakti, Cornus Officinalis meva ekstrakti", ru:"Масло эму (6,99%), Niacinamide, Adenosine, масло Butyrospermum Parkii (ши), экстракт спорокарпа Tremella Fuciformis, экстракт корня Panax Ginseng, экстракт корня Angelica Gigas, экстракт плодов Cornus Officinalis" },
  published:true, flags:[]
},
{
  slug:'lucent-complexion-cream', name:"Lucent Complexion Cream", category:'creams',
  brand:"RHODEX", koreanBottle:"REBIRTH",
  volume:"50 ml", image:"../images/products/lucent-complexion-cream.webp",
  subtitle:{ uz:"Yorqinlashtiruvchi Krem", ru:"Осветляющий крем" },
  band:{ uz:"Yorqinlashtiruvchi Kosmetsevtika", ru:"Осветляющая космецевтика" },
  kfda:['niacinamide'],
  skinTypes:['all','dry','normal','sensitive'],
  concerns:['dull','uneven-tone','needs-brightening','dehydrated','redness-prone','stressed'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Xira tonni yoritadi va pigmentatsiya va dogʻlarni kamaytiradi (Niatsinamid)",
    "6 xil oʻsimlik ildiz hujayrasi ekstraktlari charchagan terini jonlantiradi va tiklaydi",
    "Oltin zarrachalari terini tinchlantiradi va yumshoq, yorqin nur beradi",
    "Keramid kompleksi terining tabiiy baryerini mustahkamlaydi",
    "Centella Asiatica terini tinchlantiradi va yoritadi — nozik teriga ham mos keladi",
    "Pardoz ostida mukammal turadigan yumshoqlik, elastiklik va namlik beradi"
  ], ru:["Осветляет тусклый тон, уменьшает пигментацию и пятна (ниацинамид)","Экстракты стволовых клеток шести растений оживляют и восстанавливают уставшую кожу","Частицы золота успокаивают кожу и придают ей мягкое сияние","Керамидный комплекс укрепляет естественный барьер кожи","Centella Asiatica успокаивает и осветляет — подходит и для нежной кожи","Придаёт коже мягкость, эластичность и увлажнённость — идеальная основа под макияж"] },
  howto:{ uz:"Serumdan soʻng, oz miqdorni peshona, burun, yonoq va iyakka nuqtalab surting. Yuz boʻylab yoying va toʻliq singguncha kaft bilan yengil bosing. Ertalab va kechqurun qoʻllang.", ru:"После сыворотки нанесите небольшое количество точками на лоб, нос, щёки и подбородок. Распределите по лицу и слегка прижмите ладонями до полного впитывания. Применяйте утром и вечером." },
  inci:{ uz:"Niacinamide, Gold (oltin), Panthenol, Ceramide NP, Phytosphingosine, Panax Ginseng kallus kulturasi ekstrakti, Daucus Carota Sativa (sabzi) kallus kulturasi ekstrakti, Camellia Sinensis kallus kulturasi ekstrakti, Carthamus Tinctorius (safdur) gul ekstrakti, Centella Asiatica barg ekstrakti", ru:"Niacinamide, Gold (золото), Panthenol, Ceramide NP, Phytosphingosine, экстракт каллусной культуры Panax Ginseng, экстракт каллусной культуры Daucus Carota Sativa (морковь), экстракт каллусной культуры Camellia Sinensis, экстракт цветков Carthamus Tinctorius (сафлор), экстракт листьев Centella Asiatica" },
  published:true, flags:[]
},

/* ──────────────────────────── SPF ──────────────────────────────────── */
{
  slug:'multi-protection-cream', name:"Multi Protection Cream", category:'spf',
  brand:"RHODEX", koreanBottle:"REBIRTH",
  volume:"50 ml", spf:"SPF50+ PA++++", image:"../images/products/multi-protection-cream.webp",
  subtitle:{ uz:"Quyoshdan Himoya Kremi", ru:"Солнцезащитный крем" },
  band:{ uz:"Quyoshdan Himoya + Yorqinlashtiruvchi + Ajinlarga Qarshi Kosmetsevtika", ru:"Солнцезащитная + осветляющая + противоморщинная космецевтика" },
  /* Arbutin appears in the INCI but is NOT part of the notification —
     confirmed as a supporting ingredient only. Whitening rests on
     Niacinamide, anti-wrinkle on Adenosine. The panel line is complete
     as printed. Do not add 'arbutin' here. */
  kfda:['niacinamide','adenosine'],
  skinTypes:['all','oily','combi','normal'],
  concerns:['uv-protection','sweat-prone','uneven-tone','needs-brightening','wrinkles'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Keng spektrli SPF50+ PA++++ terini UVA va UVB zararidan himoya qiladi",
    "Uchtasi birda: quyoshdan himoya, yorqinlik va ajinlarga qarshi parvarish",
    "Suvga chidamli — issiq va nam kunlarda ter va ter yogʻi taʼsiriga bardosh beradi",
    "Yengil tekstura tez singadi, yogʻlanish yoki oq iz qoldirmaydi",
    "Niatsinamid notekis tonni yorqinlashtiradi; Adenozin ajinlarni yumshatadi",
    "Atrof-muhit ifloslanish va oksidlovchi stressidan har kuni himoya qiladi"
  ], ru:["SPF50+ PA++++ широкого спектра защищает кожу от UVA- и UVB-излучения","Три в одном: защита от солнца, сияние и уход против морщин","Водостойкий — устойчив к поту и кожному салу в жаркие и влажные дни","Лёгкая текстура быстро впитывается, не оставляет жирного блеска и белых следов","Ниацинамид осветляет неровный тон; аденозин разглаживает морщины","Ежедневно защищает от загрязнения окружающей среды и окислительного стресса"] },
  howto:{ uz:"Quyoshga chiqishdan 20–30 daqiqa oldin, parvarishning oxirgi bosqichida surting. Oz miqdorda olib, koʻz atrofini chetlab, markazdan tashqariga qarab yuzga teng yoying. Quyosh ostida uzoq boʻlganda har 2–3 soatda qayta surting.", ru:"Нанесите как завершающий этап ухода за 20–30 минут до выхода на солнце. Возьмите небольшое количество и равномерно распределите по лицу от центра к краям, избегая области вокруг глаз. При длительном пребывании на солнце наносите повторно каждые 2–3 часа." },
  inci:{ uz:"Ethylhexyl Methoxycinnamate, Zinc Oxide, Titanium Dioxide, Niacinamide, Adenosine, Arbutin", ru:"Ethylhexyl Methoxycinnamate, Zinc Oxide, Titanium Dioxide, Niacinamide, Adenosine, Arbutin" },
  published:true, flags:[]
},
{
  slug:'overall-natural-balm', name:"Overall Natural Balm", category:'spf',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"50 ml", spf:"SPF50+ PA+++", image:"../images/products/overall-natural-balm.webp",
  subtitle:{ uz:"Tonal Quyosh Bazasi", ru:"Тональная солнцезащитная база" },
  band:{ uz:"Yorqinlashtiruvchi + Ajinlarga qarshi + Quyoshdan Himoya Kosmetsevtika", ru:"Осветляющая + противоморщинная + солнцезащитная космецевтика" },
  kfda:['arbutin','adenosine'],
  skinTypes:['sensitive','normal','dry','combi'],
  concerns:['uv-protection','redness-prone','uneven-tone','needs-brightening','wrinkles','dull'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Tonal bazada SPF50+ PA+++ keng spektrli quyoshdan himoya",
    "Teri tonini tenglashtiradi, qizarish va dogʻlarni tabiiy yopadi",
    "Yengil, nafas oluvchi tekstura — teridek koʻrinadi, niqob effekti yoʻq",
    "Sezgir, qizargan, charchagan terini himoya qilib tinchlantiradi",
    "Adenozin ajinlarni yumshatadi; Arbutin va guruch ekstrakti yorqinlik beradi",
    "3 ta vosita oʻrnini bosadi: quyosh kremi, praymer va tonal bazasi"
  ], ru:["Тональная база с защитой SPF50+ PA+++ широкого спектра","Выравнивает тон кожи, естественно маскирует покраснения и пятна","Лёгкая дышащая текстура — естественный вид, без эффекта маски","Защищает и успокаивает чувствительную, покрасневшую, уставшую кожу","Аденозин разглаживает морщины; арбутин и экстракт риса придают сияние","Заменяет три средства: солнцезащитный крем, праймер и тональную базу"] },
  howto:{ uz:"Parvarishdan soʻng, oz miqdorni qoʻl ustiga oling va peshona, yonoq, burun hamda iyakka nuqtalab surting. Barmoq uchlari yoki gubka bilan yuz cheti boʻylab yoying. Qoʻshimcha makyajdan oldin yakuniy bosqich sifatida qoʻllang.", ru:"После ухода возьмите небольшое количество на тыльную сторону ладони и нанесите точками на лоб, щёки, нос и подбородок. Распределите кончиками пальцев или спонжем от центра к краям лица. Используйте как завершающий этап ухода перед нанесением макияжа." },
  inci:{ uz:"Titanium Dioxide, Ethylhexyl Methoxycinnamate, Zinc Oxide, Adenosine, Arbutin, Aloe Barbadensis barg ekstrakti, Oryza Sativa (guruch) ekstrakti, Hydrolyzed Pearl", ru:"Titanium Dioxide, Ethylhexyl Methoxycinnamate, Zinc Oxide, Adenosine, Arbutin, экстракт листьев Aloe Barbadensis, экстракт Oryza Sativa (рис), Hydrolyzed Pearl" },
  published:true, flags:[]
},
{
  slug:'blanc-finish-cover-pact', name:"Blanc Finish Cover Pact", category:'spf',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"15 g", spf:"SPF50+ PA+++", image:"../images/products/blanc-finish-cover-pact.webp",
  subtitle:{ uz:"Kushon", ru:"Кушон" },
  band:{ uz:"Oqartiruvchi + Ajinlarga qarshi + Quyoshdan Himoya Kosmetsevtika", ru:"Отбеливающая + противоморщинная + солнцезащитная космецевтика" },
  kfda:['arbutin','adenosine'],
  skinTypes:['all','dry','sensitive','normal'],
  concerns:['uv-protection','uneven-tone','dull','needs-brightening','dehydrated','wrinkles'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Ixcham kushon formatida SPF50+ PA+++ keng spektrli himoya",
    "Yorqin, baxmaldek makyaj uchun yengil va shabnam qoplama",
    "Emu yogʻi va marvarid ekstrakti formulasi — quritmaydi, qatlamlanib qolmaydi",
    "Surilganda terini yorqinlashtiradi va ajinlarni yumshatadi (Arbutin + Adenozin)",
    "Kun davomida pardozni yangilab turish uchun ideal"
  ], ru:["Защита SPF50+ PA+++ широкого спектра в компактном формате кушона","Лёгкое покрытие с эффектом сияния для свежего бархатистого макияжа","Формула с маслом эму и экстрактом жемчуга — не сушит и не скатывается","При нанесении осветляет кожу и разглаживает морщины (арбутин + аденозин)","Идеален для обновления макияжа в течение дня"] },
  howto:{ uz:"Gubkani kushonga yengil bosib, kerakli miqdorda oling. Peshona, burun, yanoq va jagʻga yengil urish harakatlari bilan surting. Makyaj va quyoshdan himoyani yangilash uchun kun davomida qayta surting.", ru:"Слегка прижмите спонж к кушону и наберите нужное количество. Нанесите лёгкими вбивающими движениями на лоб, нос, щёки и подбородок. Обновляйте в течение дня для освежения макияжа и защиты от солнца." },
  inci:{ uz:"Titanium Dioxide, Ethylhexyl Methoxycinnamate, Zinc Oxide, Arbutin, Adenosine, Emu moyi, Anthemis Nobilis gul ekstrakti, Sodium Hyaluronate", ru:"Titanium Dioxide, Ethylhexyl Methoxycinnamate, Zinc Oxide, Arbutin, Adenosine, масло эму, экстракт цветков Anthemis Nobilis, Sodium Hyaluronate" },
  published:true, flags:[]
},

/* ──────────────────────────── EYE ──────────────────────────────────── */
{
  slug:'intensive-eye-contour-gel', name:"Intensive Eye Contour Gel", category:'eye',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"30 ml", image:"../images/products/intensive-eye-contour-gel.webp",
  subtitle:{ uz:"Sovutuvchi Koʻz Atrofi Geli", ru:"Охлаждающий гель для кожи вокруг глаз" },
  band:{ uz:"Tetiklashtiruvchi Koʻz Parvarishi Geli", ru:"Освежающий гель для кожи вокруг глаз" },
  kfda:[],
  /* PREGNANCY CHIP DELIBERATELY OMITTED.
     The Uzbek panel carries HOMILADORLIK VA EMIZISH DAVRIDA XAVFSIZ, but
     the INCI lists Retinyl Palmitate. Publishing a pregnancy-safe claim
     on a retinoid-containing product is the single highest-risk item in
     the catalogue. Chip stays off until Koo Jin-seok confirms. */
  skinTypes:['all','oily','combi','normal'],
  concerns:['puffiness','dark-circles','fatigue','uneven-eye-tone','dehydrated'],
  pregnancySafe:false,
  benefits:{ uz:[
    "Sovutuvchi gel shishgan, charchagan koʻzlarni bir zumda tetiklashtiradi",
    "Koʻz ostidagi qora doiralarni sezilarli yoritadi — dam olgan koʻrinish bagʻishlaydi",
    "Atelokollagen va Ginkgo Biloba charchoq belgilarini kamaytiradi",
    "Yogʻsiz, yengil tekstura tez singadi — yosh va yogʻli teri uchun ideal",
    "Rubin kukuni yumshoq, tinchlantiruvchi yorqinlik qoʻshadi",
    "Koʻz atrofidagi nozik terini tetiklaydi va yumshatadi"
  ], ru:["Охлаждающий гель мгновенно освежает отёкшие, уставшие глаза","Заметно осветляет тёмные круги под глазами — придаёт отдохнувший вид","Ателоколлаген и гинкго билоба уменьшают признаки усталости","Лёгкая текстура без масел быстро впитывается — идеальна для молодой и жирной кожи","Рубиновая пудра придаёт коже мягкое сияние и успокаивает её","Освежает и смягчает нежную кожу вокруг глаз"] },
  howto:{ uz:"Ertalab oz miqdorni koʻz atrofiga surting. Koʻz konturi boʻylab yumshoq yoying. Kuchliroq shishga qarshi taʼsir uchun foydalanishdan oldin muzlatgichda saqlang.", ru:"Утром нанесите небольшое количество вокруг глаз. Мягко распределите вдоль контура глаз. Для более выраженного эффекта против отёков храните в холодильнике перед применением." },
  inci:{ uz:"Atelocollagen, Ginkgo Biloba barg ekstrakti, Fagus Sylvatica urugʻi ekstrakti, Retinyl Palmitate, Tokoferil atsetat (E vitamini), Mannitol, Ruby Powder (rubin kukuni)", ru:"Atelocollagen, экстракт листьев Ginkgo Biloba, экстракт семян Fagus Sylvatica, Retinyl Palmitate, токоферола ацетат (витамин E), Mannitol, Ruby Powder (рубиновая пудра)" },
  published:true,
  flags:['pregnancy-chip-withheld']
},
{
  slug:'concentration-eye-cream', name:"Concentration Eye Cream", category:'eye',
  brand:"RHODEX", koreanBottle:"REBIRTH",
  volume:"60 ml", image:"../images/products/concentration-eye-cream.webp",
  subtitle:{ uz:"Quyuq Koʻz Parvarishi Kremi", ru:"Насыщенный крем для кожи вокруг глаз" },
  band:{ uz:"Yorqinlashtiruvchi + Ajinga Qarshi Kosmetsevtika", ru:"Осветляющая + противоморщинная космецевтика" },
  kfda:['niacinamide','adenosine','arbutin'],
  skinTypes:['dry','normal','combi'],
  concerns:['wrinkles','uneven-eye-tone','dark-circles','mature','loss-of-firmness','dehydrated'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Koʻz atrofidagi mayda ajinlar koʻrinishini sezilarli yumshatadi",
    "Qoraygan, charchagan koʻz atrofini yorqinlashtiradi — tetik koʻrinish beradi",
    "Bitta kremda uchta KFDA faol moddasi: Adenozin, Niatsinamid, Arbutin",
    "Oltita oʻsimlik ildiz hujayrasi va oʻsimlik kompleksi nozik terini jonlantiradi",
    "Keramid uchligi yupqa, nozik koʻz baryerini mustahkamlaydi va himoyalaydi",
    "Toʻyintiruvchi krem teksturasi — quruq, yetuk koʻz atrofi terisi uchun"
  ], ru:["Делает мелкие морщины вокруг глаз заметно менее выраженными","Осветляет потемневшую, уставшую зону вокруг глаз — придаёт свежий вид","Три активных компонента KFDA в одном креме: аденозин, ниацинамид, арбутин","Экстракты стволовых клеток шести растений и растительный комплекс оживляют нежную кожу","Комплекс из трёх керамидов укрепляет и защищает барьер тонкой кожи вокруг глаз","Насыщенная кремовая текстура — для сухой, зрелой кожи вокруг глаз"] },
  /* How-to-use cross-references Intensive Eye Contour Gel. That sentence
     is held back while the Eye Contour Gel is unpublished — a link to a
     product that isn't live is a dead end. Restore on resolution. */
  howto:{ uz:"Serumdan soʻng, nomsiz barmoqqa ozgina olib, koʻz suyagi atrofida (yuqori/pastki qovoqqa) ichidan tashqariga yengil surting. Ertalab va kechqurun qoʻllang. Quruq teri uchun Intensive Eye Contour Gel ustidan surting.", ru:"После сыворотки возьмите немного на безымянный палец и лёгкими движениями нанесите по орбитальной кости (на верхнее и нижнее веко) от внутреннего уголка глаза к внешнему. Применяйте утром и вечером. Для сухой кожи наносите поверх Intensive Eye Contour Gel." },
  inci:{ uz:"Adenosine, Niacinamide, Arbutin, Panax Ginseng kallus kulturasi ekstrakti, Daucus Carota Sativa (sabzi) kallus kulturasi ekstrakti, Camellia Sinensis kallus kulturasi ekstrakti, Ceramide NP, Centella Asiatica barg ekstrakti, Panthenol", ru:"Adenosine, Niacinamide, Arbutin, экстракт каллусной культуры Panax Ginseng, экстракт каллусной культуры Daucus Carota Sativa (морковь), экстракт каллусной культуры Camellia Sinensis, Ceramide NP, экстракт листьев Centella Asiatica, Panthenol" },
  published:true, flags:[]
},

/* ─────────────── SENSITIVE & DEEP MOISTURE CARE ────────────────────── */
{
  slug:'emu-gel', name:"Emu Gel", category:'sensitive',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"50 ml", image:"../images/products/emu-gel.webp",
  subtitle:{ uz:"Chuqur Tiklovchi Konsentrat", ru:"Глубоко восстанавливающий концентрат" },
  band:{ uz:"Chuqur Namlantiruvchi Konsentrat", ru:"Глубоко увлажняющий концентрат" },
  kfda:[],
  /* Panel prints QARIGAN. House convention for mature skin is YETUK TERI
     (see terminology lock). Mapped to 'yetuk' so the filter stays coherent;
     panel wording should be corrected on the next Canva pass. */
  skinTypes:['sensitive','dry','normal','combi'],
  concerns:['dehydrated','stressed','redness-prone','mature','loss-of-firmness','uneven-texture'],
  pregnancySafe:true,
  benefits:{ uz:[
    "98% sof Emu yogʻi — suvsizlangan, sezgir teri uchun kuchli namlik",
    "Omega-3 va Omega-6 charchagan, taʼsirlangan terini tiklaydi va tinchlantiradi",
    "Gipoallergen va yumshoq — eng taʼsirchan teri uchun ham xavfsiz",
    "Bir necha daqiqada terining ipakdek silliqligini va elastikligini tiklaydi",
    "Bir necha tomchi kifoya — alohida ishlatiladi yoki sevimli kremingiz taʼsirini oshiradi"
  ], ru:["98% чистого масла эму — мощное увлажнение для обезвоженной, чувствительной кожи","Омега-3 и омега-6 восстанавливают и успокаивают уставшую, раздражённую кожу","Гипоаллергенный и мягкий — безопасен даже для самой реактивной кожи","За несколько минут возвращает коже шелковистую гладкость и эластичность","Достаточно нескольких капель — используйте отдельно или усильте действие любимого крема"] },
  howto:{ uz:"Rhodex Rehydro Skin Solution bilan namlagandan soʻng, 2–3 tomchini barmoq uchiga tomizing va yuzga — yoki qoʻshimcha parvarish kerak boʻlgan joylarga — yengilgina bosing. Namlovchi kremingiz bilan ham aralashtirsa boʻladi. Ertalab va kechqurun qoʻllang.", ru:"После нанесения Rhodex Rehydro Skin Solution нанесите 2–3 капли на кончики пальцев и мягко вбейте в кожу лица — или в зоны, требующие дополнительного ухода. Можно смешать с увлажняющим кремом. Применяйте утром и вечером." },
  inci:{ uz:"Emu yogʻi (97.8%), Tokoferil atsetat (E vitamini), Backhousia Citriodora barg yogʻi, Lavandula Angustifolia (lavanda) yogʻi", ru:"Масло эму (97,8%), токоферола ацетат (витамин E), масло листьев Backhousia Citriodora, масло Lavandula Angustifolia (лаванда)" },
  published:true,
  flags:['qarigan-wording']
},

/* ──────────────────────────── BODY ─────────────────────────────────── */
{
  slug:'bonfit-body-lotion', name:"Bonfit Body Lotion", category:'body',
  brand:"RHODEX", koreanBottle:"RHODEX",
  volume:"200 ml", image:"../images/products/bonfit-body-lotion.webp",
  subtitle:{ uz:"Oziqlantiruvchi Tana Losyoni", ru:"Питательный лосьон для тела" },
  band:{ uz:"Atirgul & Emu Tana Losyoni", ru:"Лосьон для тела с розой и маслом эму" },
  kfda:[],
  skinTypes:['all','dry','sensitive','normal'],
  concerns:['dehydrated','uneven-texture','loss-of-firmness','dull','stressed'],
  pregnancySafe:true,
  benefits:{ uz:[
    "Emu yogʻi (omega-3/6) va shi yogʻi terini yumshoq, silliq qiladi va oziqlantiradi",
    "Namlikni uzoq saqlaydigan yoqimli himoya baryerini hosil qiladi",
    "Teri elastikligini saqlashga va notekis teksturasini tekislashga yordam beradi",
    "Nozik atirgul ifori kun boʻyi nafis sezilib, kayfiyatni koʻtaradi",
    "Centella Asiatica sezgir terini tinchlantiradi; ekstraktlar stressdan himoyalaydi",
    "Boy, tez singuvchi krem — yogʻli yoki yopishqoq emas"
  ], ru:["Масло эму (омега-3/6) и масло ши делают кожу мягкой, гладкой и питают её","Создаёт приятный защитный барьер, надолго удерживающий влагу","Помогает сохранить эластичность кожи и выровнять неровную текстуру","Нежный аромат розы деликатно ощущается весь день и поднимает настроение","Centella Asiatica успокаивает чувствительную кожу; экстракты защищают от стресса","Насыщенная, быстро впитывающаяся текстура — не жирная и не липкая"] },
  howto:{ uz:"Choʻmilgandan soʻng butun tanaga tekis surting va toʻliq singiguncha yengil massaj qiling. Teri quruq his qilinganda namlik taʼsirini uzaytirish uchun qayta surting. Qoʻl va boʻyin uchun ham ideal.", ru:"После душа равномерно нанесите на всё тело и массируйте лёгкими движениями до полного впитывания. Наносите повторно при ощущении сухости для продления увлажнения. Идеален также для рук и шеи." },
  inci:{ uz:"Emu yogʻi, Butyrospermum Parkii (shea) moyi, Rosa Centifolia gul ekstrakti, Rosa Centifolia gul moyi, Centella Asiatica ekstrakti, Hydrolyzed Glycosaminoglycans, Scutellaria Baicalensis ildizi ekstrakti, Glycyrrhiza Glabra (qizilmiya) ildizi ekstrakti, Tokoferil atsetat (E vitamini)", ru:"Масло эму, масло Butyrospermum Parkii (ши), экстракт цветков Rosa Centifolia, масло цветков Rosa Centifolia, экстракт Centella Asiatica, Hydrolyzed Glycosaminoglycans, экстракт корня Scutellaria Baicalensis, экстракт корня Glycyrrhiza Glabra (солодка), токоферола ацетат (витамин E)" },
  published:true, flags:[]
} 

];

/* ── Helpers ─────────────────────────────────────────────────────────── */
const live = () => PRODUCTS.filter(p => p.published);
const bySlug = s => PRODUCTS.find(p => p.slug === s);
const byCategory = c => live().filter(p => p.category === c);
const byTag = t => live().filter(p => p.skinTypes.includes(t) || p.concerns.includes(t));
const bySkinType = t => live().filter(p => p.skinTypes.includes(t));
const byConcern  = c => live().filter(p => p.concerns.includes(c));
const pregnancySafe = () => live().filter(p => p.pregnancySafe);
const held = () => PRODUCTS.filter(p => !p.published);

/* Tags actually in use on live products, in TAGS declaration order —
   so the filter bar never offers a tag that returns zero results. */
const activeSkinTypes = () => {
  const used = new Set(live().flatMap(p => p.skinTypes));
  return Object.keys(SKIN_TYPES).filter(t => used.has(t));
};
const activeConcerns = () => {
  const used = new Set(live().flatMap(p => p.concerns));
  return Object.keys(CONCERNS).filter(c => used.has(c));
};
