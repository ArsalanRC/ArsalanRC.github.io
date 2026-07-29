# arsalanrc.github.io

[English](#english) · [Deutsch](#deutsch)

### [→ arsalanrc.github.io](https://arsalanrc.github.io)

---

## English

My portfolio. Built by hand, no template, no site generator.

### What is interesting about it

**The hero is a real 3D scene showing real work.** A glTF model whose six card slots hold actual screenshots of actual projects: the Game Arena lobby, a Ludo game, the 23-language switcher, RTL Arabic, the chess demo, integration-patterns. It follows your mouse.

**The 3D is progressive enhancement, not the page.** A still grid of the same screenshots renders immediately. three.js is imported only after first paint, and the canvas fades in over the grid once the model is ready. No WebGL, a failed fetch, or `prefers-reduced-motion` all leave a page that reads exactly as intended. The portfolio never depends on a 1.2 MB library arriving.

**three.js is vendored, not loaded from a CDN.** Nothing third-party can rate-limit or break it.

**English and German, light and dark.** Both auto-detect and then remember your choice, applied by an inline script before first paint so there is no flash of the wrong one.

### Two bugs worth writing down

**Nothing rendered at all.** The bounding box was measured before `updateMatrixWorld`, so it returned raw local coordinates (9465 units) rather than the real world size (339), and the camera ended up 14,000 units away from something the size of a speck. Always update world matrices before `Box3.setFromObject`.

**Every texture was flipped.** The reflex with a `.glb` is `flipY = false`, because glTF puts the UV origin top-left while three.js assumes bottom-left. Wrong here: this file came out of `THREE.GLTFExporter`, so its UVs already followed three's convention and the loader default was right all along.

### Running it

Static files, no build step:

```bash
python3 -m http.server 8000
```

### Layout

```
index.html      markup and the no-flash theme script
style.css       design tokens, light and dark by role
app.js          language, theme, and the 3D hero
assets/         the model and the card screenshots
vendor/         three.js and GLTFLoader, vendored deliberately
```

---

## Deutsch

Mein Portfolio. Von Hand gebaut, kein Template, kein Generator.

### Was daran interessant ist

**Der Hero ist eine echte 3D-Szene mit echter Arbeit darin.** Ein glTF-Modell, dessen sechs Kartenplätze tatsächliche Screenshots tatsächlicher Projekte tragen: die Game-Arena-Lobby, eine Ludo-Partie, der Sprachumschalter mit 23 Sprachen, arabisches RTL, die Schach-Demo, integration-patterns. Die Szene folgt der Maus.

**Das 3D ist Zusatz, nicht die Seite.** Ein statisches Raster derselben Screenshots erscheint sofort. three.js wird erst nach dem ersten Rendern geladen, das Canvas blendet sich darüber, sobald das Modell bereit ist. Ohne WebGL, bei fehlgeschlagenem Laden oder bei `prefers-reduced-motion` bleibt eine Seite, die genau so funktioniert wie gedacht. Das Portfolio hängt nie daran, dass 1,2 MB Bibliothek ankommen.

**three.js liegt im Repo, nicht auf einem CDN.** Kein Dritter kann es drosseln oder kaputt machen.

**Englisch und Deutsch, hell und dunkel.** Beides erkennt die Voreinstellung und merkt sich danach die Wahl, gesetzt von einem Inline-Skript vor dem ersten Rendern, damit nichts kurz falsch aufblitzt.

### Zwei Fehler, die festzuhalten sich lohnt

**Es wurde überhaupt nichts gerendert.** Die Bounding Box wurde vor `updateMatrixWorld` gemessen und lieferte deshalb rohe lokale Koordinaten (9465 Einheiten) statt der echten Weltgröße (339). Die Kamera stand danach 14.000 Einheiten von etwas entfernt, das so groß war wie ein Staubkorn. Weltmatrizen also immer vor `Box3.setFromObject` aktualisieren.

**Alle Texturen waren gespiegelt.** Der Reflex bei einer `.glb` ist `flipY = false`, weil glTF den UV-Ursprung oben links setzt, three.js aber unten links annimmt. Hier war das falsch: Die Datei stammt aus `THREE.GLTFExporter`, ihre UVs folgten also längst der Konvention von three, und die Voreinstellung des Loaders war von Anfang an richtig.

### Lokal starten

Statische Dateien, kein Build-Schritt, siehe oben.

### Aufbau

Siehe die Dateiübersicht im englischen Teil.
