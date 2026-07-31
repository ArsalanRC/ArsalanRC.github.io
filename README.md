# arsalanrc.github.io

[English](#english) · [Deutsch](#deutsch)

### [→ arsalanrc.github.io](https://arsalanrc.github.io)

---

## English

My portfolio. Built by hand, no template, no site generator, no build step.

### The idea

**The page is dressed as the instrument it was built with.** A ruler down the top edge, selection handles around the headline, a cursor carrying a name tag, a clock that ticks. Call it a working surface rather than a brochure, which seems the honest shape for a page about building things.

**Every readout on it is true.** Your clock, not a picture of one. That percentage badge and the coral fill creeping along the ruler are a single real measurement of how far down you have scrolled, computed once and drawn twice, and the cursor chases your actual pointer. Nothing here is a drawing of a feature. Keeping to that is what stops the whole conceit turning into costume, and the one deliberate fiction, the dashed box around the headline, gives itself away on sight.

**Dark mode is night sky, not an inverted document.** Daylight here is three fixed gradient layers, so after sunset you get the same sky with stars in it. Colours are re-picked and never flipped: a coral that sings against pale blue turns to mud on navy.

**Work sits in browser chrome.** Every project gets a window frame with its real URL in the title bar, and hovering walks the screenshot down inside it. These projects are websites. Framing them as anything else would be a costume too.

**English and German, light and dark.** Both auto-detect, then remember, set by an inline script before first paint so nothing flashes in the wrong one.

### A bug worth writing down

**A third of the page was invisible and nothing reported an error.** Reveal-on-scroll began life as the obvious `IntersectionObserver`, which quietly left fourteen of thirty elements pinned at zero opacity forever. Observers coalesce their callbacks. So an element that enters and leaves the viewport between two ticks never once reports as intersecting, never gets revealed, and never complains. Scroll fast and you see it. A deep link into the middle of the page does it, and so does the End key.

What replaced it is a position check riding inside the scroll handler that already existed: anything above 92% of the viewport height gets revealed, whether it arrived by scrolling or by teleporting. You cannot miss a position the way you can miss an event.

Its shape is why it is written down. Silent, permanent, and hiding content on a page whose only job is to be read.

### Running it

Static files, no build step:

```bash
python3 -m http.server 8000
```

### Layout

```
index.html      markup and the no-flash theme script
style.css       the design system: tokens, components, both themes
app.js          translation, the two toggles, and the live readouts
assets/cards/   project screenshots
```

The design system is specified in [`DESIGN-SYSTEM.md`](https://github.com/ArsalanRC/personal-development) and is shared with every project page.

---

## Deutsch

Mein Portfolio. Von Hand gebaut, kein Template, kein Generator, kein Build-Schritt.

### Die Idee

**Die Seite ist wie das Werkzeug gestaltet, mit dem sie gebaut wurde.** Ein Lineal an der Oberkante, Auswahlgriffe um die Überschrift, ein Cursor mit Namensschild, eine laufende Uhr. Eine Arbeitsfläche statt einer Broschüre, und das ist die ehrliche Form für eine Seite übers Bauen.

**Jede Anzeige darauf stimmt.** Die Uhr ist deine Uhr. Das Prozent-Badge und die korallene Füllung im Lineal sind die echte Scroll-Position, einmal berechnet und zweimal gezeigt. Der Cursor folgt deinem echten Zeiger. Nichts hier ist die Zeichnung einer Funktion, und genau diese Regel verhindert, dass aus der Idee ein Kostüm wird. Die einzige bewusste Fiktion ist der gestrichelte Auswahlrahmen um die Überschrift, und der ist offensichtlich einer.

**Der Dunkelmodus ist Nachthimmel, kein invertiertes Dokument.** Das helle Thema ist ein Taghimmel aus drei fixierten Verlaufsebenen, das dunkle ist derselbe Himmel nach Sonnenuntergang, mit Sternen. Jede Farbe ist neu gewählt statt gespiegelt, denn ein Korallenton, der auf hellem Blau singt, wird auf Marineblau stumpf.

**Projekte stehen in Browser-Chrome.** Jedes Projekt sitzt in einem nachgebauten Browserfenster mit seiner echten URL in der Titelzeile, und der Screenshot wandert beim Hovern im Rahmen. Die Projekte sind Websites, also werden sie als Websites gerahmt.

**Englisch und Deutsch, hell und dunkel.** Beides erkennt die Voreinstellung und merkt sich danach die Wahl, gesetzt von einem Inline-Skript vor dem ersten Rendern, damit nichts kurz falsch aufblitzt.

### Ein Fehler, den festzuhalten sich lohnt

**Ein Drittel der Seite war unsichtbar, und nichts meldete einen Fehler.** Das Einblenden beim Scrollen begann als der naheliegende `IntersectionObserver`, und der ließ vierzehn von dreißig Elementen dauerhaft auf Deckkraft null. Der Observer fasst seine Callbacks zusammen, deshalb meldet sich ein Element, das zwischen zwei Ticks in den Viewport hinein und wieder heraus wandert, nie als sichtbar und wird nie eingeblendet. Schnelles Scrollen, ein Deep Link mitten in die Seite oder die Ende-Taste reproduzieren das alle.

Ersetzt ist er durch eine Positionsprüfung im ohnehin vorhandenen Scroll-Handler: Was oberhalb von 92% der Viewport-Höhe liegt, wird eingeblendet, egal ob es dorthin gescrollt oder gesprungen ist. Eine Position lässt sich nicht verpassen wie ein Ereignis.

Aufgeschrieben ist der Fall wegen seiner Form. Er war still, dauerhaft, und er versteckte Inhalte auf einer Seite, deren einzige Aufgabe das Gelesenwerden ist.

### Lokal starten

Statische Dateien, kein Build-Schritt, siehe oben.

### Aufbau

Siehe die Dateiübersicht im englischen Teil.
