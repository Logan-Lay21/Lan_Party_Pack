# The LAN Party Pack

A hub for browser games that run client-side. Play solo, better with friends on the same Wi-Fi. Every game is hosted on GitHub Pages, so players need internet to load it. The hub is a static React site: it lists games, links to each game's own repo and Pages site, and has a local Party Mode (playlist, players, scoreboard).

## Run it

```
npm install
npm run dev      # local dev server
npm run build    # outputs dist/
```

## Add a game

Add one object to `src/data/games.json`. Fields:

| Field | Meaning |
| --- | --- |
| `id` | URL slug, unique |
| `name`, `tagline` | Card and page text |
| `repo`, `playUrl` | GitHub repo and the hosted game |
| `thumbnail` | Path or URL to an image, or `null` for a generated tile |
| `accent` | Hex color used on the card |
| `minPlayers`, `maxPlayers` | Player counts |
| `modes` | e.g. `["Solo", "Co-op"]` |
| `connection` | `lan`, `online`, or `solo-only` |
| `platforms` | `["Desktop"]` or `["Desktop", "Mobile"]`. `Mobile` adds the Mobile friendly tag |
| `genres`, `length` | Filters. `length` is `Under 10 min`, `10 to 30 min`, or `30+ min` |
| `controls`, `howToJoin` | Game page content (`howToJoin` is a list of steps) |
| `author` | GitHub handle |

Thumbnails: drop images in `public/thumbs/` and set `"thumbnail": "./thumbs/yourgame.png"`.

## Deploy to GitHub Pages

1. Push to a repo's `main` branch.
2. In the repo, Settings > Pages > Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.

The app uses `HashRouter` and a relative `base`, so it works from any Pages sub-path without 404s.

## How Party Mode works (and its limits)

Party state (playlist, player names, scores) is saved in the host's browser via localStorage. There is no backend. Launching a game opens its own site, and players use that game's own join flow. A single party code that carries a room across games, or automatic scoring, would need a real-time layer (for example PeerJS, which Emberwake already bundles) and is not built yet.
