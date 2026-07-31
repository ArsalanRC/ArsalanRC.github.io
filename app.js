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
    "hero.title": 'I build whole systems.<br>Interface to <span class="accent">integration</span>.',
    "hero.lede":
      "Warehouse systems, ERP integrations and logistics APIs are the day job. Engines, libraries and playable demos fill the rest. Everything below is public, tested, and opens in a browser, so you can judge it yourself rather than take my word for it.",
    "hero.ctaPlay": "Play the chess engine",
    "hero.ctaWork": "See the work",

    "numbers.eyebrow": "By the numbers",
    "numbers.title": "Counted, not estimated",
    "numbers.lede":
      "Every number below is read off the API, not recalled from memory. A stale figure on a portfolio reads as neglect rather than as a snapshot.",
    "numbers.repos": "Public repositories",
    "numbers.tests": "Tests passing",
    "numbers.deps": "Runtime dependencies",
    "numbers.prs": "Merged pull requests",
    "numbers.capsLabel": "What I actually do",
    "numbers.capsLead": 'Pixels to <span class="accent">pipelines</span>.',
    "numbers.cap1": "Systems architecture",
    "numbers.cap2": "ERP and warehouse integration",
    "numbers.cap3": "Distributed correctness",
    "numbers.cap4": "Engines and search",
    "numbers.cap5": "Developer tooling",
    "numbers.capsBody":
      "My day job is connecting systems that were never built to talk to each other, reliably, every day, without anyone noticing. The repositories are where I solve the same problems from scratch, with nobody's deadline pressing on the design, and write down what I learned while it is still fresh.",
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
      "It measures nineteen features of a text and shows each one against the range that real human academic writing occupies. It never tells you who wrote anything; that is not a question nineteen numbers can answer, and the limits sit above the results rather than in a footnote below them.",
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
      "A comment that says \"do not pass a connection pool here\" is a comment somebody will skip. So recon's Postgres source accepts one open connection and nothing else. Its cursor lives on the server, on the connection that opened it, and a pool hands out a different connection every call. The type turns that mistake into code you cannot write.",
    "how.p2t": "Test the thing that only breaks under load",
    "how.p2":
      "Run pg-outbox with a single relay and it looks perfect: events publish, retries back off, failures land in the dead-letter table. Start a second relay and both can claim the same row. The bug needs concurrency to show up, which is why an untested version ships without complaint, runs for weeks, and then wakes somebody up at three in the morning.",
    "how.p3t": "A plausible number is worse than a crash",
    "how.p3":
      "Two bugs in stylo turned up because I measured a corpus and stared at the few numbers that made no sense. No test caught them. Neither one crashed. Both returned figures you would read straight past, and that is the kind of failure that survives review.",
    "how.p4t": "Say what it cannot do, and say it first",
    "how.p4":
      "Every README here opens with what the project cannot do instead of hiding it near the bottom. Being clear about the limits is what makes the rest of it worth believing, and it is usually the part that gets left out.",
    "how.note":
      "None of this came out of a book. Each one is here because getting it wrong cost me something first, and the cost is in the commit history if you want to look.",

    "contact.eyebrow": "Get in touch",
    "contact.note": "LinkedIn is the way to reach me. No email address published anywhere, on purpose.",

    "foot.workHead": "Work",
    "foot.elseHead": "Elsewhere",
    "foot.source": "Source of this page",
    "foot.built": "Built by hand, no template",
    "foot.legal": "© 2026 Arsalan Khadim",
    "foot.creditPre": "Visual direction adapted from",
    "foot.creditPost": ". Built from scratch, no code or assets taken.",
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
    "hero.title": 'Ich baue ganze Systeme.<br>Vom Interface zur <span class="accent">Integration</span>.',
    "hero.lede":
      "Lagerverwaltung, ERP-Integrationen und Logistik-APIs sind der Beruf. Engines, Bibliotheken und spielbare Demos füllen den Rest. Alles hier unten ist öffentlich, getestet und läuft im Browser, damit du es selbst beurteilen kannst statt mir glauben zu müssen.",
    "hero.ctaPlay": "Schach-Engine spielen",
    "hero.ctaWork": "Projekte ansehen",

    "numbers.eyebrow": "In Zahlen",
    "numbers.title": "Gezählt, nicht geschätzt",
    "numbers.lede":
      "Jede Zahl hier unten ist aus der API gelesen, nicht aus dem Gedächtnis. Eine veraltete Angabe in einem Portfolio wirkt nachlässig und nicht wie eine Momentaufnahme.",
    "numbers.repos": "Öffentliche Repositories",
    "numbers.tests": "Tests grün",
    "numbers.deps": "Laufzeit-Abhängigkeiten",
    "numbers.prs": "Gemergte Pull Requests",
    "numbers.capsLabel": "Was ich tatsächlich mache",
    "numbers.capsLead": 'Von Pixeln bis zu <span class="accent">Pipelines</span>.',
    "numbers.cap1": "Systemarchitektur",
    "numbers.cap2": "ERP- und Lageranbindung",
    "numbers.cap3": "Verteilte Korrektheit",
    "numbers.cap4": "Engines und Suche",
    "numbers.cap5": "Entwicklerwerkzeuge",
    "numbers.capsBody":
      "Im Beruf verbinde ich Systeme, die nie füreinander gedacht waren. Zuverlässig, jeden Tag, ohne dass es jemandem auffällt. In den Repositories löse ich dieselben Aufgaben noch einmal von Grund auf, ohne fremden Abgabetermin im Nacken, und schreibe die Erkenntnisse auf, solange sie frisch sind.",
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
      "Neunzehn stylometrische Merkmale eines Textes, jedes gegen den Bereich gestellt, den echte menschliche Fachprosa tatsächlich einnimmt. Wer den Text verfasst hat, sagt es nie; das ist keine Frage, die neunzehn Zahlen beantworten können, und die Einschränkungen stehen über dem Ergebnis statt in einer Fußnote darunter.",
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
      "Ein Kommentar mit „hier bitte keinen Pool übergeben“ ist ein Kommentar, den jemand überliest. Die Postgres-Quelle in recon nimmt deshalb genau eine offene Verbindung und sonst nichts. Ihr Cursor liegt auf dem Server, auf der Verbindung, die ihn geöffnet hat, und ein Pool gibt bei jedem Aufruf eine andere heraus. Der Typ macht aus dem Fehler Code, den man nicht schreiben kann.",
    "how.p2t": "Prüfen, was erst unter Last kaputtgeht",
    "how.p2":
      "Mit einem einzelnen Relay sieht pg-outbox tadellos aus: Events gehen raus, Retries warten gestaffelt, Fehlschläge landen in der Dead-Letter-Tabelle. Startet man ein zweites Relay, können beide dieselbe Zeile beanspruchen. Der Fehler braucht Nebenläufigkeit, um sichtbar zu werden. Genau deshalb geht eine ungetestete Fassung klaglos in Betrieb, läuft wochenlang mit und holt dann nachts um drei jemanden aus dem Bett.",
    "how.p3t": "Eine plausible Zahl ist schlimmer als ein Absturz",
    "how.p3":
      "Zwei Fehler in stylo kamen heraus, weil ich ein Korpus vermessen und auf die paar Werte gestarrt habe, die keinen Sinn ergaben. Kein Test hat sie gefunden. Keiner der beiden stürzte ab. Beide lieferten Zahlen, über die man einfach hinwegliest, und das ist die Sorte Fehler, die ein Review übersteht.",
    "how.p4t": "Sagen, was nicht geht, und zwar zuerst",
    "how.p4":
      "Jede README hier beginnt damit, was das Projekt nicht kann, statt es weit unten zu verstecken. Klarheit über die Grenzen ist das, was den Rest glaubwürdig macht, und genau dieser Teil fehlt meistens.",
    "how.note":
      "Nichts davon stammt aus einem Buch. Jeder Punkt steht hier, weil es mich vorher etwas gekostet hat, und die Kosten stehen in der Commit-Historie, falls jemand nachsehen will.",

    "contact.eyebrow": "Kontakt",
    "contact.note": "LinkedIn ist der Weg. Keine E-Mail-Adresse veröffentlicht, mit Absicht.",

    "foot.workHead": "Projekte",
    "foot.elseHead": "Anderswo",
    "foot.source": "Quelltext dieser Seite",
    "foot.built": "Von Hand gebaut, keine Vorlage",
    "foot.legal": "© 2026 Arsalan Khadim",
    "foot.creditPre": "Gestalterische Richtung übernommen von",
    "foot.creditPost": ". Von Grund auf gebaut, kein Code und keine Assets übernommen.",
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
