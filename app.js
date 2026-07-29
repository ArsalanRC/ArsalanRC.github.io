/**
 * arsalanrc.github.io
 *
 * Theme, language, and the 3D hero.
 *
 * The 3D is strictly progressive enhancement. The still grid underneath is the
 * real content and paints immediately; three.js is only imported after first
 * paint, and the canvas only fades in once the model is actually on screen. No
 * WebGL, a failed fetch, or reduced-motion all leave a page that still works.
 */

const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ------------------------------------------------------------------ copy

const STRINGS = {
  en: {
    "meta.title": "Arsalan Khadim · Software architect",
    "nav.lang": "Deutsch",
    "hero.kicker": "Software architect · Full-stack engineer",
    "hero.lede":
      "I make systems that were never designed to talk to each other exchange data reliably, every day, without anyone noticing. Warehouse management, ERP integrations, logistics APIs. The rest of the time I build engines and libraries from scratch.",
    "hero.playChess": "Play my chess engine",
    "hero.seePatterns": "See integration-patterns",

    "work.eyebrow": "Work",
    "work.title": "Things you can open right now",
    "work.lede":
      "No install, no sign-up. The first two run in your browser the moment you click them.",
    "work.chess":
      "A complete chess engine: full FIDE rules and a minimax bot with alpha-beta pruning. The demo puts the engine's evaluation, legal move count and position hash on screen beside the board.",
    "work.patterns":
      "The logic that keeps system-to-system integrations correct. Idempotency and retry with full jitter, each shipped with the failure it prevents and the way people get it wrong.",
    "work.arena":
      "28 games on one platform under a single architectural rule: game logic never touches React. Every engine is pure TypeScript, which is why 940 tests run without a DOM. Source is private.",

    "how.eyebrow": "Approach",
    "how.title": "How I think about building",
    "how.p1t": "Boundaries before features",
    "how.p1": "The layer split is the one decision you cannot cheaply undo later, so it deserves the time. Everything else is negotiable.",
    "how.p2t": "Purity where it counts",
    "how.p2": "Business logic that depends on no framework can actually be tested, reused and reasoned about. Push side effects to the edges and keep the middle honest.",
    "how.p3t": "Secure by default, not by review",
    "how.p3": "Row-level security enabled before the table has rows, and deny-by-default throughout. A permission you never granted cannot be the one that leaks.",
    "how.p4t": "Write it down",
    "how.p4": "Every project I own carries docs a new engineer, or an LLM, can read cold and be useful within the hour. The more people touch the code, the more this matters.",

    "contact.eyebrow": "Contact",
    "contact.title": "Get in touch",
    "contact.body": "Happy to walk through any of the architecture in a conversation, including the parts that are not public.",

    "foot.built": "Built by hand, no template",
    "foot.source": "Source",
  },

  de: {
    "meta.title": "Arsalan Khadim · Softwarearchitekt",
    "nav.lang": "English",
    "hero.kicker": "Softwarearchitekt · Full-Stack-Engineer",
    "hero.lede":
      "Ich bringe Systeme dazu, zuverlässig Daten auszutauschen, die nie dafür gebaut wurden. Jeden Tag, ohne dass es jemandem auffällt. Lagerverwaltung, ERP-Integrationen, Logistik-APIs. Den Rest der Zeit baue ich Engines und Bibliotheken von Grund auf.",
    "hero.playChess": "Schach-Engine spielen",
    "hero.seePatterns": "integration-patterns ansehen",

    "work.eyebrow": "Projekte",
    "work.title": "Direkt ausprobieren",
    "work.lede":
      "Keine Installation, keine Anmeldung. Die ersten beiden laufen sofort im Browser.",
    "work.chess":
      "Eine vollständige Schach-Engine: alle FIDE-Regeln und ein Minimax-Bot mit Alpha-Beta-Pruning. Die Demo zeigt Bewertung, Anzahl legaler Züge und Stellungs-Hash direkt neben dem Brett.",
    "work.patterns":
      "Die Logik, die Integrationen zwischen Systemen korrekt hält. Idempotenz und Retry mit Full Jitter, jeweils mit dem Fehlerfall, den sie verhindern, und der typischen falschen Umsetzung.",
    "work.arena":
      "28 Spiele auf einer Plattform unter einer einzigen Architekturregel: Spiellogik fasst React nie an. Jede Engine ist reines TypeScript, deshalb laufen 940 Tests ganz ohne DOM. Quellcode privat.",

    "how.eyebrow": "Herangehensweise",
    "how.title": "Wie ich an Software herangehe",
    "how.p1t": "Grenzen vor Features",
    "how.p1": "Die Schichtaufteilung ist die eine Entscheidung, die sich später nicht mehr billig zurücknehmen lässt. Also verdient sie die Zeit. Alles andere ist verhandelbar.",
    "how.p2t": "Reinheit dort, wo sie zählt",
    "how.p2": "Fachlogik ohne Framework-Abhängigkeit lässt sich wirklich testen, wiederverwenden und durchdenken. Seiteneffekte an den Rand, die Mitte bleibt sauber.",
    "how.p3t": "Sicher by default, nicht durch Review",
    "how.p3": "Row Level Security ist aktiv, bevor die Tabelle Zeilen hat, und im Zweifel wird verweigert. Ein Recht, das nie vergeben wurde, kann auch nicht leaken.",
    "how.p4t": "Aufschreiben",
    "how.p4": "Zu jedem Projekt gehören Dokumente, die ein neuer Entwickler oder ein LLM kalt lesen und binnen einer Stunde nutzen kann. Je mehr Leute den Code anfassen, desto wichtiger wird das.",

    "contact.eyebrow": "Kontakt",
    "contact.title": "Kontakt aufnehmen",
    "contact.body": "Über die Architektur spreche ich gern im Detail, auch über die Teile, die nicht öffentlich sind.",

    "foot.built": "Von Hand gebaut, kein Template",
    "foot.source": "Quellcode",
  },
};

const themeBtn = document.getElementById("theme-btn");
const langBtn = document.getElementById("lang-btn");

function applyLang(lang) {
  const dict = STRINGS[lang] ?? STRINGS.en;
  root.lang = lang;
  for (const node of document.querySelectorAll("[data-i18n]")) {
    const value = dict[node.dataset.i18n];
    if (value !== undefined) node.textContent = value;
  }
  document.title = dict["meta.title"];
  try { localStorage.setItem("ak-lang", lang); } catch { /* private mode */ }
}

function applyTheme(theme) {
  root.dataset.theme = theme;
  try { localStorage.setItem("ak-theme", theme); } catch { /* private mode */ }
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

langBtn.addEventListener("click", () => applyLang(root.lang === "de" ? "en" : "de"));
themeBtn.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

applyLang(root.lang === "de" ? "de" : "en");

// ------------------------------------------------------------------ 3D hero

/**
 * The model is a promo template: a ring, six 1700x950 card slots, and some
 * placeholder text geometry. The text meshes get hidden (real HTML type is
 * sharper and can be translated), the ring is recoloured to the page accent,
 * and each card slot receives a screenshot of an actual project.
 */
const CARD_TEXTURES = [
  "arena-lobby", "arena-ludo", "chess-board",
  "arena-languages", "patterns-retry", "arena-rtl",
];
/**
 * three.js sanitises glTF node names, so "project name" arrives as
 * "project_name". Compare on a normalised form rather than the raw string,
 * which is a silent no-op waiting to happen otherwise.
 */
const HIDE = new Set([
  "project name", "promo", "text", "your logo text", "yourlogo png",
  // The template's backdrop torus. It is a large gold ring that means nothing
  // and reads as a stray graphic rather than part of the work, so it goes.
  "bg shape",
]);
const norm = (s) => (s || "").toLowerCase().replace(/[_+]/g, " ").replace(/\s+/g, " ").trim();

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { return false; }
}

async function initScene() {
  if (reduced || !webglAvailable()) return;

  const THREE = await import("three");
  const { GLTFLoader } = await import("three/addons/GLTFLoader.js");

  const canvas = document.getElementById("scene");
  const stage = document.querySelector(".stage");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 4000);

  scene.add(new THREE.AmbientLight(0xffffff, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 4, 6);
  scene.add(key);

  const loader = new THREE.TextureLoader();
  const gltf = await new GLTFLoader().loadAsync("./assets/scene.glb");
  const model = gltf.scene;

  // A pivot so mouse-look rotates around the artwork rather than the origin.
  const pivot = new THREE.Group();
  scene.add(pivot);

  const ringColor = () =>
    new THREE.Color(getComputedStyle(root).getPropertyValue("--accent").trim() || "#E8A33D");

  const ringMaterials = [];
  let cardIndex = 0;

  model.traverse((o) => {
    if (!o.isMesh) return;
    const name = norm(o.name);

    if (HIDE.has(name)) { o.visible = false; return; }

    if (name.includes("1700x950")) {
      const file = CARD_TEXTURES[cardIndex++ % CARD_TEXTURES.length];
      const tex = loader.load(`./assets/cards/${file}.jpg`);
      tex.colorSpace = THREE.SRGBColorSpace;
      // No UV correction. The reflex with a .glb is to set flipY = false,
      // because glTF puts the UV origin top-left while three assumes
      // bottom-left. That is wrong here: this file was written by
      // THREE.GLTFExporter, so its UVs already follow three's convention and
      // the loader default is correct. Forcing flipY = false flipped every
      // screenshot vertically.
      o.material = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
      return;
    }

    // Everything else (the ring, mostly) takes the page accent so the scene
    // belongs to the palette instead of sitting on top of it as grey plastic.
    const mat = new THREE.MeshStandardMaterial({
      color: ringColor(), roughness: 0.45, metalness: 0.1,
    });
    o.material = mat;
    ringMaterials.push(mat);
  });

  pivot.add(model);

  // World matrices must be current before measuring. Box3.setFromObject reads
  // matrixWorld, and a freshly loaded graph still has identity matrices, so
  // measuring first returns raw local coordinates. Here that meant 9465 units
  // instead of the 339 the model actually occupies once its parent scale is
  // applied, and the camera ended up 14,000 units from a speck.
  scene.updateMatrixWorld(true);

  // Frame on the cards, which are the point, and let the ring fall behind.
  const cards = model.getObjectByName("cards") ?? model;
  const box = new THREE.Box3().setFromObject(cards);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  model.position.sub(center);                 // cards centred on the pivot origin

  /**
   * Distance that fits the artwork in both axes. Guessing a multiplier works
   * on one screen and crops on every other, because the horizontal fit depends
   * on the aspect ratio and the vertical one does not.
   */
  function frame() {
    const vFov = (camera.fov * Math.PI) / 180;
    const forHeight = size.y / 2 / Math.tan(vFov / 2);
    const forWidth = size.x / 2 / (Math.tan(vFov / 2) * camera.aspect);
    // Tight. With the backdrop ring gone the cards are the whole composition,
    // so they should fill the stage rather than float in the middle of it.
    const dist = Math.max(forHeight, forWidth) * 1.02;
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.near = dist / 100;
    camera.far = dist * 8;
    camera.updateProjectionMatrix();
  }

  window.addEventListener("themechange", () => {
    const c = ringColor();
    for (const m of ringMaterials) m.color.copy(c);
  });

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    frame();                                  // reframe: the fit is aspect-dependent
  }
  resize();
  addEventListener("resize", resize);

  // Mouse-look. Targets are eased toward rather than set directly, so the
  // scene drifts instead of snapping, and it keeps working from touch too.
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  const MAX = 0.28;
  function aim(clientX, clientY) {
    const r = stage.getBoundingClientRect();
    targetX = ((clientX - r.left) / r.width - 0.5) * 2 * MAX;
    targetY = ((clientY - r.top) / r.height - 0.5) * 2 * MAX * 0.6;
  }
  addEventListener("pointermove", (e) => aim(e.clientX, e.clientY), { passive: true });
  addEventListener("pointerleave", () => { targetX = 0; targetY = 0; });

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(stage);

  renderer.setAnimationLoop(() => {
    if (!visible) return;                     // do not burn battery off-screen
    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    // Rotate the pivot, not the scene, so the lights stay put and the model
    // turns rather than the whole world turning with it.
    pivot.rotation.y = curX;
    pivot.rotation.x = curY;
    renderer.render(scene, camera);
  });

  stage.classList.add("is-3d");
}

// Only after first paint, so the still hero is never held up by a 1.2 MB import.
addEventListener("load", () => {
  initScene().catch((err) => {
    // Failure is silent by design: the still grid is already on screen and the
    // page reads exactly as intended without any of this.
    console.warn("3D hero unavailable:", err);
  });
});
