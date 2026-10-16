# dimstunt.de

Personal site on GitHub Pages. Plain HTML + CSS, no build step.

- `index.html` + `style.css` — landing (Cyberpunk 2077 HUD frame, Cruelty Squad grime); `cv/` — sober, print-ready CV with its own `cv.css`
- `PRODUCT.md` / `DESIGN.md` — product truth and design system (kept out of the published site by `_config.yml`)
- `fonts/` — self-hosted woff2 (Big Shoulders, Chakra Petch, JetBrains Mono, Silkscreen; SIL Open Font License), no Google Fonts requests
- `og.png` — rendered by headless Chrome from `_og.html` (underscore files are not published); `img/face.png` — hand-authored pixel mascot
- `cv/dmitrii-cherkashin-cv.pdf` — static copy of `/cv/`; regenerate after editing the CV: serve the repo (`uv run python -m http.server 8765`) and run Chrome `--headless=new --print-to-pdf=cv/dmitrii-cherkashin-cv.pdf --no-pdf-header-footer http://127.0.0.1:8765/cv/`
- `404.html` — served by GitHub Pages for any missing path
