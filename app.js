/**
 * arsalanrc.github.io
 *
 * Everything the page does at runtime: translation, the two toggles, and the
 * four live readouts. No framework and no build step, because the page is
 * served by GitHub Pages straight out of the repository.
 *
 * The rule the whole design rests on: every readout here is real. The clock is
 * the visitor's clock, the percentage is the real scroll position, the cursor
 * follows the real pointer. Nothing is a drawing of a feature. A fake readout
 * would be worse than none at all, because the page is claiming precision.
 */

const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------- strings -- */

const STRINGS = {
  en: {
    "meta.title": "Arsalan Khadim · Software architect",

    "ruler.live": "LIVE",
    "chrome.status": "8 repos live · 263 tests green",
    "nav.work": "Work",
    "nav.numbers": "Numbers",
    "nav.approach": "Approach",
    "nav.contact": "Contact",
    "nav.lang": "DE",
    "cursor.you": "you",

    "hero.badgeStrong": "Eight repositories",
    "hero.badgeRest": "public, tested, running",
    "hero.kicker": "Software architect · Full-stack engineer",
    "hero.title": 'I make systems<br>agree with <span class="accent">each other</span>.',
    "hero.lede":
      "Warehouse systems, ERP integrations and logistics APIs by day. Engines, libraries and things you can click the rest of the time. Everything below runs in a browser, and every one of them tells you what it will not do.",
    "hero.ctaPlay": "Play the chess engine",
    "hero.ctaWork": "See the work",

    "numbers.eyebrow": "By the numbers",
    "numbers.title": "Counted, not estimated",
    "numbers.lede":
      "Read off the API rather than remembered, because a stale number on a portfolio reads as neglect rather than as a snapshot.",
    "numbers.repos": "Public repositories",
    "numbers.tests": "Tests passing",
    "numbers.deps": "Runtime dependencies",
    "numbers.prs": "Merged pull requests",
    "numbers.capsLabel": "What I actually do",
    "numbers.cap1": "Systems architecture",
    "numbers.cap2": "ERP and warehouse integration",
    "numbers.cap3": "Distributed correctness",
    "numbers.cap4": "Engines and search",
    "numbers.cap5": "Developer tooling",
    "numbers.capsBody":
      "The day job is making systems that were never designed to talk to each other exchange data reliably, every day, without anyone noticing. The repositories are where the same problems get solved from scratch and written down.",
    "numbers.stackLabel": "Shipping today",
    "numbers.stackBody":
      "A language appears here once something public is written in it. Rust, C++, C and C# are on the plan and are deliberately not on this list yet.",

    "work.eyebrow": "Work",
    "work.title": "Things you can open right now",
    "work.lede":
      "No install, no sign-up. Five of the six run in your browser the moment you click them, and the sixth is private and written up instead.",
    "work.hover": "hover to scroll",
    "work.private": "private repository",
    "work.stylo":
      "Nineteen stylometric features of a text, each against the range a corpus of human academic writing actually occupies. It never says who wrote something, and the limitations sit above the numbers rather than below them.",
    "work.outbox":
      "Commit a database change and publish an event without them coming apart. Two systems cannot commit together, so the fix is not a better ordering of the two calls: it is refusing to have two commits.",
    "work.recon":
      "Two systems disagree about a stock count. Most of those disagreements are formatting rather than fact, so every tolerance is opt-in and named per field. Reads CSV, or streams straight from Postgres.",
    "work.chess":
      "A complete chess engine: full FIDE rules and a minimax bot with alpha-beta pruning. The demo puts the evaluation, legal move count and position hash on screen beside the board.",
    "work.patterns":
      "The logic that keeps system-to-system integrations correct. Idempotency and retry with full jitter, each shipped with the failure it prevents and the way people usually get it wrong.",
    "work.arena":
      "28 games on one platform under a single architectural rule: game logic never touches React. Every engine is pure TypeScript, which is why 940 tests run without a DOM.",

    "how.eyebrow": "Approach",
    "how.title": "How I think about building",
    "how.p1t": "The type system is the comment that cannot go stale",
    "how.p1":
      "Where a rule can be made impossible to break, it should be, instead of written down and hoped for. One library takes a live connection and never a pool, purely so the dangerous version cannot be written at all.",
    "how.p2t": "Test the thing that only breaks under load",
    "how.p2":
      "The claim query in pg-outbox publishes, retries and dead-letters flawlessly with a single relay. It duplicates only under concurrency, which means the untested version ships and then fails at somebody else's three in the morning.",
    "how.p3t": "A plausible number is worse than a crash",
    "how.p3":
      "Two bugs in stylo were found by measuring a corpus and looking at the outliers, not by a test. Neither threw. They returned numbers you would believe, which is the failure that survives review.",
    "how.p4t": "Say what it cannot do, prominently",
    "how.p4":
      "Every README here leads with the limitations rather than burying them. Being straight about the edges is what makes the middle credible, and it is the part most projects skip.",
    "how.note":
      "None of the above is a principle I read somewhere. Each one is written down because getting it wrong cost me something first, and the cost is in the repository history if you want to check.",

    "contact.eyebrow": "Get in touch",
    "contact.note": "LinkedIn is the contact route. No email published anywhere, on purpose.",

    "foot.workHead": "Work",
    "foot.elseHead": "Elsewhere",
    "foot.source": "Source of this page",
    "foot.built": "Built by hand, no template",
    "foot.legal": "© 2026 Arsalan Khadim",
  },

  de: {
    "meta.title": "Arsalan Khadim · Softwarearchitekt",

    "ruler.live": "LIVE",
    "chrome.status": "8 Repos live · 263 Tests grün",
    "nav.work": "Projekte",
    "nav.numbers": "Zahlen",
    "nav.approach": "Haltung",
    "nav.contact": "Kontakt",
    "nav.lang": "EN",
    "cursor.you": "du",

    "hero.badgeStrong": "Acht Repositories",
    "hero.badgeRest": "öffentlich, getestet, im Betrieb",
    "hero.kicker": "Softwarearchitekt · Full-Stack-Engineer",
    "hero.title": 'Ich bringe Systeme<br>dazu, sich <span class="accent">zu einigen</span>.',
    "hero.lede":
      "Tagsüber Lagerverwaltung, ERP-Integrationen und Logistik-APIs. Den Rest der Zeit Engines, Bibliotheken und Dinge, die man anklicken kann. Alles hier läuft im Browser, und jedes davon sagt, was es nicht kann.",
    "hero.ctaPlay": "Schach-Engine spielen",
    "hero.ctaWork": "Projekte ansehen",

    "numbers.eyebrow": "In Zahlen",
    "numbers.title": "Gezählt, nicht geschätzt",
    "numbers.lede":
      "Aus der API gelesen statt aus dem Gedächtnis, denn eine veraltete Zahl in einem Portfolio wirkt nachlässig und nicht wie eine Momentaufnahme.",
    "numbers.repos": "Öffentliche Repositories",
    "numbers.tests": "Tests grün",
    "numbers.deps": "Laufzeit-Abhängigkeiten",
    "numbers.prs": "Gemergte Pull Requests",
    "numbers.capsLabel": "Was ich tatsächlich mache",
    "numbers.cap1": "Systemarchitektur",
    "numbers.cap2": "ERP- und Lageranbindung",
    "numbers.cap3": "Verteilte Korrektheit",
    "numbers.cap4": "Engines und Suche",
    "numbers.cap5": "Entwicklerwerkzeuge",
    "numbers.capsBody":
      "Im Beruf geht es darum, Systeme, die nie füreinander gedacht waren, jeden Tag zuverlässig Daten austauschen zu lassen, ohne dass es jemandem auffällt. In den Repositories werden dieselben Probleme von Grund auf gelöst und aufgeschrieben.",
    "numbers.stackLabel": "Aktuell im Einsatz",
    "numbers.stackBody":
      "Eine Sprache steht hier, sobald etwas Öffentliches darin geschrieben ist. Rust, C++, C und C# sind geplant und stehen bewusst noch nicht dabei.",

    "work.eyebrow": "Projekte",
    "work.title": "Direkt ausprobieren",
    "work.lede":
      "Keine Installation, keine Anmeldung. Fünf der sechs laufen sofort im Browser, das sechste ist privat und stattdessen beschrieben.",
    "work.hover": "zum Scrollen hovern",
    "work.private": "privates Repository",
    "work.stylo":
      "Neunzehn stylometrische Merkmale eines Textes, jedes gegen den Bereich gestellt, den ein Korpus menschlicher akademischer Prosa tatsächlich einnimmt. Wer etwas geschrieben hat, sagt es nie, und die Grenzen stehen über den Zahlen statt darunter.",
    "work.outbox":
      "Eine Datenbankänderung committen und ein Event veröffentlichen, ohne dass beides auseinanderfällt. Zwei Systeme können nicht gemeinsam committen, also ist die Lösung keine bessere Reihenfolge der Aufrufe, sondern sich zu weigern, zwei Commits zu haben.",
    "work.recon":
      "Zwei Systeme sind sich über einen Bestand uneinig. Die meisten Widersprüche sind Formatierung und nicht Inhalt, deshalb wird jede Toleranz bewusst und pro Feld gesetzt. Liest CSV oder streamt direkt aus Postgres.",
    "work.chess":
      "Eine vollständige Schach-Engine: alle FIDE-Regeln und ein Minimax-Bot mit Alpha-Beta-Pruning. Die Demo zeigt Bewertung, Anzahl legaler Züge und Stellungs-Hash direkt neben dem Brett.",
    "work.patterns":
      "Die Logik, die Integrationen zwischen Systemen korrekt hält. Idempotenz und Retry mit Full Jitter, jeweils mit dem Fehlerfall, den sie verhindern, und der typischen falschen Umsetzung.",
    "work.arena":
      "28 Spiele auf einer Plattform unter einer einzigen Architekturregel: Spiellogik fasst React nie an. Jede Engine ist reines TypeScript, deshalb laufen 940 Tests ganz ohne DOM.",

    "how.eyebrow": "Haltung",
    "how.title": "Wie ich an Bauen herangehe",
    "how.p1t": "Das Typsystem ist der Kommentar, der nicht veralten kann",
    "how.p1":
      "Wo sich eine Regel unmöglich machen lässt, sollte sie unmöglich sein, statt aufgeschrieben und erhofft. Eine Bibliothek nimmt bewusst eine offene Verbindung und niemals einen Pool, damit sich die gefährliche Variante gar nicht schreiben lässt.",
    "how.p2t": "Prüfen, was erst unter Last kaputtgeht",
    "how.p2":
      "Die Claim-Query in pg-outbox veröffentlicht, wiederholt und schreibt Dead Letters tadellos, solange ein einzelnes Relay läuft. Sie dupliziert erst unter Nebenläufigkeit, und deshalb geht die ungetestete Fassung in Betrieb und scheitert nachts um drei bei jemand anderem.",
    "how.p3t": "Eine plausible Zahl ist schlimmer als ein Absturz",
    "how.p3":
      "Zwei Fehler in stylo kamen dadurch ans Licht, dass ein Korpus vermessen und die Ausreißer angesehen wurden, nicht durch einen Test. Keiner stürzte ab. Sie lieferten Zahlen, die man glaubt, und das ist der Fehler, der ein Review übersteht.",
    "how.p4t": "Deutlich sagen, was nicht geht",
    "how.p4":
      "Jede README hier beginnt mit den Grenzen, statt sie hinten zu verstecken. Ehrlich über die Ränder zu sein macht die Mitte glaubwürdig, und genau diesen Teil lassen die meisten Projekte weg.",
    "how.note":
      "Nichts davon ist ein Grundsatz, den ich irgendwo gelesen habe. Jeder steht hier, weil es mich vorher etwas gekostet hat, und die Kosten stehen in der Repo-Historie, falls jemand nachsehen will.",

    "contact.eyebrow": "Kontakt",
    "contact.note": "LinkedIn ist der Weg. Keine E-Mail-Adresse veröffentlicht, mit Absicht.",

    "foot.workHead": "Projekte",
    "foot.elseHead": "Anderswo",
    "foot.source": "Quelltext dieser Seite",
    "foot.built": "Von Hand gebaut, keine Vorlage",
    "foot.legal": "© 2026 Arsalan Khadim",
  },
};

/* ----------------------------------------------------------- translation -- */

const dict = () => STRINGS[root.lang] ?? STRINGS.en;

function applyLang(lang) {
  root.lang = lang;
  const d = dict();

  for (const el of document.querySelectorAll("[data-i18n]")) {
    const v = d[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  }
  /* A separate attribute for the few strings that legitimately carry markup,
     so the common path never assigns innerHTML. */
  for (const el of document.querySelectorAll("[data-i18n-html]")) {
    const v = d[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  }

  if (d["meta.title"]) document.title = d["meta.title"];
  try { localStorage.setItem("ak-lang", lang); } catch { /* private mode */ }
}

document.getElementById("lang-btn")?.addEventListener("click", () => {
  applyLang(root.lang === "de" ? "en" : "de");
});

/* ----------------------------------------------------------------- theme -- */

document.getElementById("theme-btn")?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", next === "dark" ? "#070E17" : "#4E9BD9");
  try { localStorage.setItem("ak-theme", next); } catch { /* private mode */ }
});

/* ----------------------------------------------------------------- clock -- */
/* The visitor's clock, not a server's and not a fake one. Ticking once a second
   is the point: a still clock reads as a screenshot of a clock. */

const clock = document.getElementById("clock");
const footClock = document.getElementById("foot-clock");

function tick() {
  const now = new Date();
  const hms = now.toLocaleTimeString(root.lang === "de" ? "de-DE" : "en-GB", { hour12: false });
  if (clock) clock.textContent = hms;
  if (footClock) {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "local";
    footClock.textContent = `${hms} · ${zone}`;
  }
}

tick();
setInterval(tick, 1000);

/* -------------------------------------------------------- scroll readout -- */
/* The ruler fill and the percentage badge are one measurement shown two ways,
   so they are computed once and written together. */

const fill = document.getElementById("ruler-fill");
const pct = document.getElementById("pct");
const totop = document.getElementById("totop");

let queued = false;

function onScroll() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (fill) fill.style.width = `${(p * 100).toFixed(2)}%`;
    if (pct) pct.textContent = `${Math.round(p * 100)}%`;
    totop?.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.6);
    revealPass();
  });
}

addEventListener("scroll", onScroll, { passive: true });
addEventListener("resize", onScroll, { passive: true });
onScroll();

totop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
});

/* ---------------------------------------------------------------- cursor -- */
/* Follows the real pointer. The CSS already hides it on touch and under reduced
   motion; this bails out too, so the listener is never even attached. */

const cursor = document.getElementById("cursor");

if (cursor && !reduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf = 0;

  /* Eased rather than pinned. A label welded to the pointer reads as a bug;
     trailing very slightly reads as somebody else's cursor, which is the idea. */
  const follow = () => {
    cx += (x - cx) * 0.32;
    cy += (y - cy) * 0.32;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.4 ? requestAnimationFrame(follow) : 0;
  };

  addEventListener("pointermove", (e) => {
    x = e.clientX;
    y = e.clientY;
    /* First real move: place it before revealing, so it never flashes at the
       origin on its way to the pointer. */
    if (!cursor.classList.contains("is-live")) {
      cx = x; cy = y;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      cursor.classList.add("is-live");
    }
    if (!raf) raf = requestAnimationFrame(follow);
  }, { passive: true });

  /* A pointer that leaves the window has no position worth drawing. */
  addEventListener("pointerleave", () => cursor.classList.remove("is-live"));
}

/* ---------------------------------------------------------------- reveal -- */
/* Staggered within a group, so a row of four cards arrives as a row rather than
   as four separate events.
 *
 * Deliberately not an IntersectionObserver. The obvious version was one, and it
 * left a third of the page permanently invisible: the observer coalesces its
 * callbacks, so any element that enters and leaves the viewport between two
 * ticks never reports as intersecting and never gets revealed. Fast scrolling,
 * a deep link into the middle of the page, or End all reproduce it, and the
 * failure is silent and permanent, which is the worst shape a bug can have on
 * a page whose entire job is to be read.
 *
 * A position check cannot miss in the same way: anything at or above the
 * threshold is revealed, whether it got there by scrolling or by teleporting. */

const pending = reduced ? [] : [...document.querySelectorAll(".reveal")];

if (reduced) {
  for (const el of document.querySelectorAll(".reveal")) el.classList.add("is-in");
}

function revealPass() {
  if (!pending.length) return;
  const limit = innerHeight * 0.92;

  for (let i = pending.length - 1; i >= 0; i--) {
    const el = pending[i];
    if (el.getBoundingClientRect().top >= limit) continue;

    const group = [...(el.parentElement?.children ?? [])]
      .filter((c) => c.classList.contains("reveal"));
    el.style.transitionDelay = `${Math.min(group.indexOf(el), 5) * 70}ms`;
    el.classList.add("is-in");
    pending.splice(i, 1);
  }
}

/* ------------------------------------------------------------------------- */

applyLang(root.lang === "de" ? "de" : "en");
revealPass();

/* Images settling and fonts swapping both move things down the page, and an
   element that was below the fold at load can end up above it afterwards
   without a scroll event ever firing. */
addEventListener("load", revealPass);
document.fonts?.ready.then(revealPass);
