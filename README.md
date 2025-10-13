# Quick — Simple Quick Portfolio

This is a simple quick portfolio. This repository contains a small static web project.

Files

- `index.html` — main HTML page
- `styles.css` — project styles
- `script.js` — JavaScript behavior
- `site.webmanifest` — web app manifest

How to run

Option 1 — Open in browser

- Double-click `index.html` or open it in your browser (Chrome, Edge, Firefox).

Option 2 — Local static server (recommended for service workers or fetches)

- Using Python 3:

```powershell
python -m http.server 8000
# then open http://localhost:8000
```

- Using Node (http-server):

```powershell
npx http-server -p 8000
# then open http://localhost:8000
```

Notes

- If you plan to use a service worker, host over http://localhost (a local server) rather than file://.
- Edit files in your favorite editor and refresh the browser to see changes.

License

- No license specified.
