# arsalanrc.github.io

[English](./README.md) · **Deutsch**

### [→ arsalanrc.github.io](https://arsalanrc.github.io)

---

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

Statische Dateien, kein Build-Schritt:

```bash
python3 -m http.server 8000
```

### Aufbau

```
index.html      Markup und das Theme-Skript gegen das Aufblitzen
style.css       Das Designsystem: Tokens, Komponenten, beide Themes
app.js          Übersetzung, die zwei Schalter, die Live-Anzeigen
assets/cards/   Screenshots der Projekte
```

Das Designsystem steht in [`DESIGN-SYSTEM.md`](https://github.com/ArsalanRC/personal-development) und gilt für jede Projektseite.

## Autor

Arsalan Khadim, Softwarearchitekt und Full-Stack-Engineer.

- [LinkedIn](https://www.linkedin.com/in/muhammad-arsalan-khadim-b87550259/)
- [GitHub](https://github.com/ArsalanRC)

## Lizenz

MIT, siehe [LICENSE](./LICENSE).
