# Standardanforderungskatalog

## 1. Einleitung

Der Standardanforderungskatalog ist eine Webanwendung (SPA/PWA) die es mittels eines Konfigurator ermöglicht, einen spezifischen Anforderungskatalog für die Barrierefreiheit zu erstellen. Für die Durchführung der Tests, kann der spezifische Anforderungskatalog als HTML oder CSV heruntergeladen werden.

## 2. Entwicklung

### 2.1. Voraussetzungen

- [Node.js](https://nodejs.org/en/) (>= 18)
- [PNPM](https://pnpm.js.org/) (>= 8)

### 2.2. Installation

```bash
pnpm i
```

### 2.3. Entwicklungsserver

```bash
pnpm start
```

### 2.4. Build

```bash
pnpm build
```

## 3. Betrieb

### 3.1. Voraussetzungen

Für den Betrieb der Webanwendung wird ein Webserver benötigt, der die statischen Dateien ausliefert. Die Webanwendung kann auch ohne Webserver lokal betrieben werden.

### 3.2. Artefakte

Für den Betrieb der Webanwendung werden folgende Artefakte benötigt:

| Artefakt         | Beschreibung                    | Dateiname                                        |
| ---------------- | ------------------------------- | ------------------------------------------------ |
| SPA/PWA          | Webanwendung                    | `standardanforderungskatalog.tgz`                |
| Excel-Datenbasis | Datenbasis für den Konfigurator | `katalog.xlsx` (ggf. schon in App-Zip enthalten) |

Die folgenden Konfigurationsdateien werden mit dem Anwendungsartefakt mitgeliefert und ermöglichen das Konfigurieren der Webanwendung ohne erneutes Bauen:

| Artefakt      | Beschreibung                              | Dateiname                 |
| ------------- | ----------------------------------------- | ------------------------- |
| Daten         | Schema der Daten                          | `data.json`               |
| Glossar       | Texte zur Begriffsklärung                 | `glossary.json`           |
| Arten         | Konfigurationsdatei für die Arten         | `kindOptions.json`        |
| Eigenschaften | Konfigurationsdatei für die Eigenschaften | `solutionProperties.json` |
| Sprachtexte   | Konfigurationsdatei für Sprachtexte       | `de.json`                 |

### 3.2. Deployment

Die Webanwendung wird nach dem Bauen (CI) als gepackte und versioniertes Artefakt zum Deployment bereitgestellt.

#### 3.2.1. Hochladen

1. Entpacken des Artefakts (`standardanforderungskatalog.tgz`)
2. Kopieren der Anwendung aus dem `dist`-Ordner auf den Webserver (satische Ablage, quasi wie Bilder)
3. Kopieren der Excel-Datei auf den Webserver in den Ordner `config/katalog.xlsx` (soweit noch nicht vorhanden)

#### 3.2.2. Einrichten

Nachdem die statischen Dateien auf dem Webserver liegen, muss die Webanwendung in den Kontext der Website eingebunden werden. Dazu muss in die HTML-Seite (Datei) folgende Zeile eingefügt werden:

```diff
<!doctype html>
<html lang="de" dir="ltr">
	<head>
		...
+		<link rel="stylesheet" href="assets/bundes/style.css" />
+		<link rel="stylesheet" href="assets/codicons/codicon.css" />
+		<link rel="stylesheet" href="main.css" />
		...
	</head>
	<body>
		...
+		<div id="bmi-stab-app"></div>
+		<script async src="main.js"></script>
+		<script>
+			var ua = window.navigator.userAgent;
+			if (ua.indexOf('MSIE ') > 0) {
+				document.getElementById('bmi-stab-app').innerHTML =
+					'Diese Anwendung basiert auf neuen Technologien, die vom abgekündigten Microsoft <strong>Internet Explorer</strong> nicht unterstützt werden! Bitte verwenden Sie einen aktuellen Brower, wie bspw. Google <strong>Chrome</strong>, Mozilla <strong>Firefox</strong> oder Microsoft <strong>Egde</strong>.';
+			}
+		</script>
+		<noscript>Diese Webseite erfordert, dass Sie JavaScript aktivieren.</noscript>
		...
	</body>
</html>
```

### 3.2.3. PWA konfigurieren

Die Webanwendung kann als PWA konfiguriert werden. Hierzu müssen Meta-Angaben in die HTML-Seite (Datei) eingefügt und die `manifest.json` angepasst werden.

> **Hinweis:** Die `starturl` muss in der HTML-Seite (Datei) und in der `manifest.json` auf den korrekten URL-Pfad (z. B. `/home/tools/standardandorderungskatalog`) angepasst werden.

HTML-Datei:

```diff
<!doctype html>
<html lang="de" dir="ltr">
	<head>
		...
		<link rel="stylesheet" href="assets/bundes/style.css" />
		<link rel="stylesheet" href="assets/codicons/codicon.css" />
		<link rel="stylesheet" href="main.css" />

+		<!-- PWA setup -->
+		<link rel="manifest" href="manifest.json" />
+		<meta name="mobile-web-app-capable" content="yes" />
+		<meta name="apple-mobile-web-app-capable" content="yes" />
+		<meta name="application-name" content="BMI | StAB" />
+		<meta name="apple-mobile-web-app-title" content="BMI | StAB" />
+		<meta name="theme-color" content="#fff" />
+		<meta name="background_color" content="#fff" />
+		<meta name="msapplication-navbutton-color" content="#fff" />
+		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
+		<meta name="msapplication-starturl" content="/" />
+		<link rel="icon" sizes="128x128" href="assets/kolibri.png" />
+		<link rel="icon" type="image/x-icon" href="assets/kolibri.ico" />
+		<link rel="apple-touch-icon" sizes="128x128" href="assets/kolibri.png" />
		...
	</head>
	<body>
		...
		<div id="bmi-stab-app"></div>
		<script async src="main.js"></script>
		<script>
			var ua = window.navigator.userAgent;
			if (ua.indexOf('MSIE ') > 0) {
				document.getElementById('bmi-stab-app').innerHTML =
					'Diese Anwendung basiert auf neuen Technologien, die vom abgekündigten Microsoft <strong>Internet Explorer</strong> nicht unterstützt werden! Bitte verwenden Sie einen aktuellen Brower, wie bspw. Google <strong>Chrome</strong>, Mozilla <strong>Firefox</strong> oder Microsoft <strong>Egde</strong>.';
			}
		</script>
		<noscript>Diese Webseite erfordert, dass Sie JavaScript aktivieren.</noscript>
		...
	</body>
</html>
```

`manifest.json`:

```json
{
	"icons": [
		{
			"src": "/icon_512x512.ba0b3efe133170306035467dbe28cff1.png",
			"sizes": "512x512",
			"type": "image/png"
		},
		{
			"src": "/icon_384x384.a552049f576969b3f536037c97ef0300.png",
			"sizes": "384x384",
			"type": "image/png"
		},
		{
			"src": "/icon_256x256.2e8c6fc30a727e60089a273c60e34ecc.png",
			"sizes": "256x256",
			"type": "image/png"
		},
		{
			"src": "/icon_192x192.c5401d0c5b544020fbfbb085220ada9a.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/icon_128x128.a9e29f6aee003252b6596fd8c52c9dec.png",
			"sizes": "128x128",
			"type": "image/png"
		},
		{
			"src": "/icon_96x96.b2fcdc7f2fd2ea93863cf0a204708c10.png",
			"sizes": "96x96",
			"type": "image/png"
		}
	],
	"name": "Standardanforderungskatalog für die Barrierefreiheit",
	"short_name": "BMI StAB",
	"orientation": "portrait",
	"display": "standalone",
	"start_url": "/",
	"description": "Die Anwendung erstellt einen Anforderungskatalog zum Testen der Barrierefreiheit.",
	"lang": "de-DE",
	"theme_color": "#fff",
	"background_color": "#fff"
}
```
