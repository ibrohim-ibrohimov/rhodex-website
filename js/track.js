/* ═══════════════════════════════════════════════════════════════════
   RHODEX — ANALYTICS (Meta Pixel + optional Yandex Metrica)
   Loaded in <head> of every page. One place to change IDs.

   Events sent:
     PageView            every page                     (Meta standard)
     ViewContent         product page, with product id  (Meta standard)
     QuizStart           quiz "start" button            (custom)
     QuizComplete        quiz result shown              (custom, skin type)
     Lead                Telegram button on quiz result (Meta standard) ← optimise ads for this
     Contact             any other Telegram link        (Meta standard)
   ═══════════════════════════════════════════════════════════════════ */
var RHODEX_PIXEL_ID = '1873816187313952';
var RHODEX_YM_ID    = 113159948;       // Yandex Metrica counter (rhodex.uz)

/* ── Meta Pixel (official base code) ── */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', RHODEX_PIXEL_ID);
fbq('track', 'PageView');

/* ── Yandex Metrica (switches on when RHODEX_YM_ID is set) ── */
if (RHODEX_YM_ID) {
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  ym(RHODEX_YM_ID, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });
}

/* ── One call for both tools ──
   rxTrack('Lead', {...})            → Meta standard event + Metrica goal "Lead"
   rxTrack('QuizStart', {...}, true) → Meta custom event   + Metrica goal "QuizStart" */
var RX_STANDARD = { PageView:1, ViewContent:1, Lead:1, Contact:1 };
function rxTrack(name, params) {
  try {
    if (window.fbq) fbq(RX_STANDARD[name] ? 'track' : 'trackCustom', name, params || {});
    if (RHODEX_YM_ID && window.ym) ym(RHODEX_YM_ID, 'reachGoal', name, params || {});
  } catch (e) {}
}

/* ── Telegram clicks anywhere on the site ── */
document.addEventListener('click', function (ev) {
  var a = ev.target.closest && ev.target.closest('a[href*="t.me/"]');
  if (!a) return;
  if (a.id === 'tgBtn') rxTrack('Lead', { content_name: 'quiz_telegram', lang: document.documentElement.lang });
  else rxTrack('Contact', { content_name: 'telegram_link', page: location.pathname });
}, true);
