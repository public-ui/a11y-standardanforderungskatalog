### Anleitung: Integration der Web-App in die Webseite

Diese Anleitung beschreibt, wie Sie die externe Web-App, die unter `https://kolibri.bund.de/stdanfkat/current/` gehostet wird, in die Webseite unter der URL
**`https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/standardanforderungskatalog/standardanforderungskatalog-node.html`** integrieren.

---

#### **1. Einbindung der Web-App**

1. Öffnen Sie den Quellcode der Ziel-Webseite.
2. Fügen Sie im `<head>`-Bereich und `<body>` den folgenden Code ein, um die Web-App zu laden:

```html
<!doctype html>
<html lang="de">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Standardanforderungskatalog</title>

		<!-- CSS der Web-App -->
		<link rel="stylesheet" href="https://kolibri.bund.de/stdanfkat/current/main.css" />
	</head>
	<body>
		<!-- Platzhalter für die Web-App -->
		<div id="bmi-standardanforderungskatalog-app" data-base-uri-config="https://kolibri.bund.de/stdanfkat/current/"></div>

		<!-- JavaScript der Web-App -->
		<script src="https://kolibri.bund.de/stdanfkat/current/main.js"></script>
	</body>
</html>
```

---

#### **2. Erklärung der Einbindung**

1. **CSS-Datei**:

   - Über das `<link>`-Tag wird die Datei `main.css` von `https://kolibri.bund.de/stdanfkat/current/` eingebunden. Diese Datei enthält das Styling der Web-App.

2. **Platzhalter für die Web-App**:

   - Das `<div>`-Element mit der ID `bmi-standardanforderungskatalog-app` fungiert als Container, in den die Web-App dynamisch geladen wird.
   - Das Attribut `data-base-uri-config` gibt die Basis-URL der statischen Ressourcen an.

3. **JavaScript-Datei**:
   - Über das `<script>`-Tag wird die Datei `main.js` von `https://kolibri.bund.de/stdanfkat/current/` geladen. Diese Datei enthält die Logik zur Initialisierung und Darstellung der Web-App im Container.

---

#### **3. Cross-Origin Resource Sharing (CORS)**

Da die Ressourcen der Web-App (`main.js`, `main.css`) auf einem anderen Host (`kolibri.bund.de`) liegen, muss der Server `kolibri.bund.de` so konfiguriert sein, dass er **Cross-Origin Resource Sharing (CORS)** unterstützt.

##### **Was ist CORS?**

CORS (Cross-Origin Resource Sharing) ist ein Mechanismus, der es ermöglicht, dass Webbrowser Ressourcen von einem anderen Ursprungs-Host (Domain) laden dürfen. Dies ist wichtig, wenn die Zielseite `https://www.barrierefreiheit-dienstekonsolidierung.bund.de` Inhalte von `https://kolibri.bund.de` lädt.

##### **Notwendige CORS-Konfiguration auf `kolibri.bund.de`:**

Der Webserver von `kolibri.bund.de` muss folgende HTTP-Header für die Ressourcen zurückgeben:

```http
Access-Control-Allow-Origin: https://www.barrierefreiheit-dienstekonsolidierung.bund.de
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

**Erklärung der Header:**

- **`Access-Control-Allow-Origin`**: Gibt an, welche Ursprungs-Domain (`https://www.barrierefreiheit-dienstekonsolidierung.bund.de`) auf die Ressourcen zugreifen darf.
- **`Access-Control-Allow-Methods`**: Listet die erlaubten HTTP-Methoden, z. B. `GET` für das Abrufen der Dateien.
- **`Access-Control-Allow-Headers`**: Definiert, welche Header beim Zugriff verwendet werden dürfen, z. B. `Content-Type`.

**Hinweis**:

- Ohne die korrekte CORS-Konfiguration blockiert der Browser den Zugriff auf die Ressourcen und zeigt Fehler in der Konsole an (z. B. "CORS policy: No 'Access-Control-Allow-Origin' header is present").

---

#### **4. Integration in die Webseite**

1. Bearbeiten Sie den Quellcode der Webseite unter `https://www.barrierefreiheit-dienstekonsolidierung.bund.de/Webs/PB/DE/standardanforderungskatalog/standardanforderungskatalog-node.html`.
2. Fügen Sie den oben genannten Code ein:
   - **CSS und JavaScript** sollten in den `<head>`- bzw. `<body>`-Bereich eingefügt werden.
   - Das `<div>` mit der ID `bmi-standardanforderungskatalog-app` sollte an der Stelle eingefügt werden, wo die Web-App angezeigt werden soll.

---

#### **5. Skalierung der Schriftgröße**

Um die Schriftgrößen-Skalierung der Web-App korrekt an die CMS-Konfiguration mit einer Root-Font-Size von 10px anzupassen, ist es notwendig, die Custom Property `--kolibri-root-font-size` zu definieren. Dies stellt sicher, dass alle `rem`-Berechnungen innerhalb der Web-App konsistent mit der Schriftgröße der übergeordneten CMS-Seite erfolgen und keine inkonsistente Darstellung der Schriftgrößen entsteht. Ohne diese Anpassung würden die von der Web-App verwendeten Standardwerte (typischerweise auf Basis einer Root-Font-Size von 16px) zu unerwünschten Größenverhältnissen führen.

##### **5.1. Über das `style`-Attribut im `<div>`-Container:**

Definieren Sie die Custom Property direkt im Container der Web-App:

```html
<div id="bmi-standardanforderungskatalog-app" data-base-uri-config="https://kolibri.bund.de/stdanfkat/current/" style="--kolibri-root-font-size: 10;"></div>
```

##### **5.2. Über ein `<style>`-Tag (global auf der Seite):**

Falls mehrere Komponenten oder Bereiche die Anpassung benötigen, kann die Custom Property in einem `<style>`-Tag global definiert werden:

```html
<style>
	#bmi-standardanforderungskatalog-app {
		--kolibri-root-font-size: 10;
	}
</style>
<div id="bmi-standardanforderungskatalog-app" data-base-uri-config="https://kolibri.bund.de/stdanfkat/current/"></div>
```

---

#### **Warum ist das notwendig?**

Die CMS-Seite setzt eine Root-Font-Size von 10px, während die Web-App standardmäßig von einer Root-Font-Size von 16px ausgeht. Da die Web-App `rem`-Einheiten verwendet, basieren diese auf der Root-Font-Size des aktuellen Kontexts. Ohne Anpassung würde die Schriftgröße in der Web-App zu groß dargestellt werden und nicht mit den CMS-Standards übereinstimmen. Durch die gezielte Definition von `--kolibri-root-font-size` wird eine konsistente Skalierung innerhalb der Web-App gewährleistet, während der Rest der Webseite unberührt bleibt.

#### **6. Tests**

1. **Zugriff testen**:

   - Öffnen Sie die Ziel-Webseite in einem Browser.
   - Überprüfen Sie, ob die Web-App korrekt geladen wird.

2. **Netzwerkprüfung**:

   - Verwenden Sie die Entwicklerkonsole (F12 → Netzwerk), um sicherzustellen, dass `main.js` und `main.css` fehlerfrei geladen werden.

3. **Fehlerbehebung bei CORS**:
   - Wenn die Ressourcen blockiert werden, überprüfen Sie die Server-Konfiguration auf `kolibri.bund.de` und stellen Sie sicher, dass die CORS-Header korrekt gesetzt sind.

---

#### **6. Abschluss**

Nach der Integration und erfolgreichen Tests wird die Web-App auf der Zielseite angezeigt und ist einsatzbereit. Denken Sie daran, die Webseite regelmäßig zu testen, insbesondere nach Updates auf `kolibri.bund.de`.
