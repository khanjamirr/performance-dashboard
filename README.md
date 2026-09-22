# Performance Report dashboard

A static, single-page HTML dashboard. No npm install or build step is required.

## Upload to GitHub

Upload `index.html`, `vercel.json`, and this `README.md` to the **root** of a new repository. Keep `index.html` named exactly as shown. Do not upload staffing reports or other private source data to a public repository.

## Deploy on Vercel

1. In Vercel, select **Add New → Project** and import this GitHub repository.
2. Select **Other** as the framework preset. Set the root directory to `./` (the repository root). Leave the build command blank and do not set an output directory.
3. Deploy. Vercel serves `index.html` at the project's HTTPS address. Future commits to the connected branch redeploy the site.

If Vercel previously selected a framework and reports an output-directory error, clear the project's **Build & Deployment** overrides and redeploy. The included `vercel.json` explicitly deploys `index.html` as a static file.

## GitHub Pages alternative

Under **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save. The dashboard will be available at `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/` once Pages finishes publishing.

## Data and browser requirements

- Imported data lives in the browser's local storage (IndexedDB when available), scoped to the deployed site's origin and browser profile. Publishing the site does **not** publish or synchronize uploaded reports. Changing the site's domain gives it a different storage origin; export your data first if you need to move it.
- The optional local folder sync depends on browser support and permission for the File System Access API. Hosting over HTTPS meets its secure-context requirement but does not grant file access automatically.
- Chart, spreadsheet and PDF features load third-party scripts from cdnjs; fonts load from Google Fonts. Those resources need an internet connection.
- This dashboard has no server-side login or access control. If your reports contain confidential staffing or candidate information, use restricted hosting and follow your organization's data-handling rules before sharing its URL.
