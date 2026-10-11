# Jaypee Portfolio Workspace

The active portfolio is in `jaypeeportfolio/`. The parent-folder commands launch that app.

```powershell
npm run dev
```

Open the Local URL printed by Vite and keep the terminal running while using the site. Stop it with Ctrl+C when finished.

If dependencies need reinstalling, run `npm run setup` from this folder. To build the website, run `npm run build`; the output is in `jaypeeportfolio/dist/`.

See `jaypeeportfolio/README.md` for content locations and build instructions. The Résumé button displays the attached PDF inside the website. Certificate cards open the full image with zoom controls.

## View from a phone on the same Wi-Fi

```powershell
npm run phone
```

Open `http://192.168.100.36:4173` on the phone. Keep this computer and its server running. The phone and computer must use the same Wi-Fi; use the Network URL printed by the server if the computer's IP address changes. After changing the website, run `npm run build` to update the version served by this command.
