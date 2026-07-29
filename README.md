# Post Composer

A React + Vite app for drafting a single post and checking it against the rules of multiple social platforms (Twitter/X, Instagram, Facebook, LinkedIn) before publishing.

## Features

- **Multi-platform selection** — toggle any combination of Twitter/X, Instagram, Facebook, and LinkedIn.
- **Live validation per platform** — character limit, hashtag limit, and media requirements are checked as you type, with errors and warnings shown per platform.
- **Media attachments** — add and remove media items; each platform's max media count is enforced.
- **Character counter** — live progress bar per platform showing usage against that platform's limit.
- **Publish flow** — the Publish button is disabled until the post is valid for every selected platform. On publish, a "Post published" confirmation banner appears.
- **Reset** — clears the text, media, and platform selection back to the default state.

## Project Structure

```
post-composer/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                        # App entry point
    ├── PostComposer.jsx                # Main composer component (state, publish/reset logic)
    ├── PostComposer.css                # Styles
    ├── platforms.js                    # Per-platform config (char limit, hashtag limit, media rules)
    ├── utils/
    │   └── validation.js                # validateForPlatform() — returns errors/warnings for a platform
    └── components/
        ├── PlatformSelector.jsx        # Platform toggle buttons
        ├── MediaUploader.jsx           # Add/remove media items
        ├── CharBar.jsx                 # Character usage progress bar
        └── PlatformValidationCard.jsx  # Per-platform validation summary card
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

This starts the Vite dev server (default: `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Output is generated in `dist/`.

### Preview the production build

```bash
npm run preview
```

## Platform Rules

| Platform      | Character Limit | Max Hashtags | Max Media | Media Required |
|---------------|-----------------|--------------|-----------|-----------------|
| Twitter / X   | 280             | 10           | 4         | No              |
| Instagram     | 2,200           | 30           | 10        | Yes             |
| Facebook      | 63,206          | 30           | 10        | No              |
| LinkedIn      | 3,000           | 5            | 9         | No              |

These are defined in `src/platforms.js` and can be adjusted there.

## Notes

- Publishing is simulated — no actual network request is made to any platform. The "Post published" banner is a client-side confirmation only.
- The Reset button clears the composer back to its initial state (empty text, no media, Twitter/X selected).

## Deploying to GitHub Pages

This repo is set up to deploy manually using the `gh-pages` package — it builds your app and pushes the `dist` folder to a `gh-pages` branch. No GitHub Actions needed.

### One-time setup

1. Push this repo to GitHub to your `main` branch (see steps below if you haven't already).
2. Install dependencies if you haven't:
   ```bash
   npm install
   ```

### Deploy

Every time you want to publish the latest version:

```bash
npm run deploy
```

This runs `vite build` and pushes the contents of `dist/` to the `gh-pages` branch automatically.

### Enable Pages (first time only)

1. On GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **Deploy from a branch**.
3. Set the branch to **gh-pages** and folder to **/ (root)**.
4. Save. Your site will be live at:
   ```
   https://<your-username>.github.io/post-composer/
   ```

### Important: base path

`vite.config.js` sets:
```js
base: "/post-composer/"
```
This must match your repository name exactly (case-sensitive), or assets won't load correctly on Pages. If you name your repo something other than `post-composer`, update this value to `/<your-repo-name>/` before deploying.

If you deploy elsewhere instead (Vercel, Netlify, a custom domain), change `base` back to `"/"`.

### Pushing to GitHub from scratch

```bash
cd post-composer
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/post-composer.git
git push -u origin main
```

Then run `npm run deploy` to publish the site.
