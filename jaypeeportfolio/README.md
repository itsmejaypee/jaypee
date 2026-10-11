# Jaypee Portfolio

Portfolio for Ron Jaypee V. Matienzo, based on the attached résumé. The original React components retain the background grid, scroll reveals, spring carousel, card glow, image lightbox, button transitions, mobile navigation, and theme ripple.

## Run locally

From this `jaypeeportfolio` folder:

```powershell
npm install
npm run dev
```

From the parent `MY PORTFOLIO DESIGN` folder, `npm run dev` also launches this app. If dependencies need reinstalling, run `npm run setup` from the parent folder. Keep the terminal running while viewing the portfolio; stopping it makes localhost links unavailable.

To view the built portfolio from another device on the same Wi-Fi, run `npm run phone` from either folder and open the printed Network URL. This uses port 4173 and serves `dist/`. Rebuild with `npm run build` after source changes. Stop any previous server on port 4173 before starting it.

## Build

```powershell
npm run build
npm run preview
```

The production website is generated in `dist/`. A static host must rewrite page requests (`/projects`, `/experience`, `/stack`, `/certifications`, `/resume`) to `index.html`.

Content and links are in `src/data/portfolioData.js`. Photos and the résumé PDF are in `public/assets/`.

The GitHub button links to `https://github.com/itsmejaypee`. LinkedIn uses the résumé URL. The Résumé button opens an in-site viewer that renders the attached PDF without forcing a download. Certificates and project photos open in a compact, centered image viewer, with zoom and close controls.
