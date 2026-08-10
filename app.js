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
    "chrome.status": "8 repos live · 294 tests green",
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
      "By day I build warehouse systems, ERP integrations and logistics APIs. The rest of the time I write engines, libraries and demos you can play. Everything here is public and tested. Most of it opens in a browser, so you do not have to take my word for any of it.",
    "hero.ctaPlay": "Play the chess engine",
    "hero.ctaWork": "See the work",

    "numbers.eyebrow": "By the numbers",
    "numbers.title": "Counted, not estimated",
    "numbers.lede":
      "Every number here comes from the GitHub API, not from memory. They are checked again whenever something ships. If one is out of date, so is the page.",
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
      "My day job is making systems talk to each other that were never built to. Reliably, every day, without anyone noticing. The repos here are the same problems solved again from scratch. No deadline bending the design this time, and written up while I still remember why.",
    "numbers.stackLabel": "Shipping today",
    "numbers.stackBody":
      "A language appears here once something public is written in it. Rust, C++, C and C# are on the plan. That is precisely why they are not on the list yet.",

    "work.eyebrow": "Work",
    "work.title": "Things you can open right now",
    "work.lede":
      "No install, no sign-up. Five of the six open in your browser the moment you click. The sixth is private, so it gets a written case study instead.",
    "work.hover": "hover to scroll",
    "work.private": "private repository",
    "work.stylo":
      "Nineteen measurements of a text, each shown against the range real human academic writing occupies. It never guesses who wrote it. Nineteen numbers cannot answer that question, and the page says so at the top instead of in small print at the bottom.",
    "work.outbox":
      "Save a row and publish an event without the two coming apart. A database and a broker cannot commit together, so no ordering of the calls will save you. The fix is to stop having two commits. The event goes into the same database, in the same transaction, and a separate process sends it afterwards.",
    "work.recon":
      "Two systems disagree about a stock count. Most of the differences turn out to be formatting, not fact. So you switch tolerances on one field at a time and decide for yourself what counts as a match. Reads CSV, or streams straight from Postgres.",
    "work.chess":
      "A complete chess engine. Every FIDE rule, and a minimax bot with alpha-beta pruning. The demo puts the evaluation, the legal move count and the position hash beside the board while you play.",
    "work.patterns":
      "Two patterns that keep integrations from quietly corrupting data: idempotency, and retry with full jitter. Each is shown next to the failure it prevents. And next to the version people write by mistake.",
    "work.arena":
      "28 games on one platform, under a single rule: game logic never touches React. Every engine is plain TypeScript. That is how 940 tests run without a browser.",

    "how.eyebrow": "Approach",
    "how.title": "How I think about building",
    "how.p1t": "The type system is the comment that cannot go stale",
    "how.p1":
      "A comment that says \"do not pass a connection pool here\" is a comment somebody will skip. So recon's Postgres source accepts one open connection and nothing else. Its cursor lives on the server, on the connection that opened it, and a pool hands out a different connection every call. The type turns that mistake into code you cannot write.",
    "how.p2t": "Test the thing that only breaks under load",
    "how.p2":
      "Run pg-outbox with one relay and it looks perfect. Events publish, retries back off, failures land in the dead-letter table. Start a second relay and both can claim the same row. The bug needs concurrency to appear. So the untested version ships without complaint, runs for weeks, then wakes somebody at three in the morning.",
    "how.p3t": "A plausible number is worse than a crash",
    "how.p3":
      "Two bugs in stylo turned up because I measured a corpus and stared at the handful of numbers that made no sense. No test caught them. Neither one crashed. Both returned figures you would read straight past. That is the kind of failure that survives review.",
    "how.p4t": "Say what it cannot do, and say it first",
    "how.p4":
      "Every README here opens with what the project cannot do, rather than burying it at the bottom. Being straight about the limits is what makes the rest worth believing. It is also the part most projects leave out.",
    "how.note":
      "None of these came out of a book. Each one is here because getting it wrong cost me something first, and you can find the cost in the commit history.",

    "contact.eyebrow": "Get in touch",
    "contact.note": "LinkedIn is the best way to reach me. I do not publish an email address anywhere, and that is deliberate.",

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
    "chrome.status": "8 Repos live · 294 Tests grün",
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
      "Beruflich baue ich Lagerverwaltung, ERP-Integrationen und Logistik-APIs. In der übrigen Zeit entstehen Engines, Bibliotheken und Demos zum Ausprobieren. Alles auf dieser Seite ist öffentlich und getestet, das meiste läuft direkt im Browser. Du kannst es also selbst prüfen, statt mir glauben zu müssen.",
    "hero.ctaPlay": "Schach-Engine spielen",
    "hero.ctaWork": "Projekte ansehen",

    "numbers.eyebrow": "In Zahlen",
    "numbers.title": "Gezählt, nicht geschätzt",
    "numbers.lede":
      "Jede Zahl hier kommt aus der GitHub-API und nicht aus dem Gedächtnis, und wird bei jeder Änderung neu geprüft. Ist eine davon veraltet, dann ist es die Seite auch.",
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
      "Beruflich bringe ich Systeme dazu, miteinander zu reden, die nie dafür gedacht waren: zuverlässig, jeden Tag, ohne dass es jemandem auffällt. In den Repositories löse ich dieselben Aufgaben noch einmal von Grund auf, diesmal ohne Abgabetermin, der den Entwurf verbiegt, und schreibe sie auf, solange ich die Details noch weiß.",
    "numbers.stackLabel": "Aktuell im Einsatz",
    "numbers.stackBody":
      "Eine Sprache steht hier erst, wenn es etwas Öffentliches darin gibt. Rust, C++, C und C# sind geplant, und genau deshalb stehen sie noch nicht dabei.",

    "work.eyebrow": "Projekte",
    "work.title": "Direkt ausprobieren",
    "work.lede":
      "Keine Installation, keine Anmeldung. Fünf der sechs öffnen sich mit einem Klick im Browser. Das sechste ist ein privates Repository, dafür gibt es eine ausgeschriebene Fallstudie.",
    "work.hover": "zum Scrollen hovern",
    "work.private": "privates Repository",
    "work.stylo":
      "Misst neunzehn Eigenschaften eines Textes und stellt jede neben den Bereich, den echte menschliche Fachprosa einnimmt. Wer den Text geschrieben hat, rät es nie. Das können neunzehn Zahlen nicht beantworten, und die Seite sagt das oben statt im Kleingedruckten unten.",
    "work.outbox":
      "Eine Zeile speichern und ein Event veröffentlichen, ohne dass beides auseinanderfällt. Datenbank und Message Broker können nicht gemeinsam committen, deshalb hilft keine andere Reihenfolge der Aufrufe. Der Ausweg ist ein Commit statt zwei: Das Event geht in dieselbe Datenbank, in dieselbe Transaktion, und wird danach von einem eigenen Prozess verschickt.",
    "work.recon":
      "Zwei Systeme sind sich über einen Bestand uneinig. Die meisten Abweichungen sind Formatierung und nicht Inhalt, deshalb schaltest du Toleranzen Feld für Feld frei und entscheidest selbst, was als Treffer zählt. Liest CSV-Dateien oder streamt direkt aus Postgres.",
    "work.chess":
      "Eine vollständige Schach-Engine: alle FIDE-Regeln und ein Minimax-Bot mit Alpha-Beta-Pruning. Die Demo zeigt beim Spielen die Bewertung, die Anzahl legaler Züge und den Stellungs-Hash neben dem Brett.",
    "work.patterns":
      "Die zwei Muster, die verhindern, dass Integrationen zwischen Systemen still Daten beschädigen: Idempotenz und Retry mit Full Jitter. Jedes steht neben dem Fehler, den es verhindert, und neben der Variante, die man aus Versehen schreibt.",
    "work.arena":
      "28 Spiele auf einer Plattform, gebaut auf einer einzigen Regel: Die Spiellogik fasst React nie an. Jede Engine ist reines TypeScript, und genau deshalb laufen 940 Tests ganz ohne Browser.",

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
    "contact.note": "Über LinkedIn erreichst du mich am besten. Eine E-Mail-Adresse veröffentliche ich nirgends, und das ist Absicht.",

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
