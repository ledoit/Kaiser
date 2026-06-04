# Matrix Maze (Kaiser project)

Adaptive stems: `base`, `pressure`, `chase`, `dread` → files `matrix_maze_*.wav` / `.ogg`.

## Quick links

- Live sketch: `sessions/matrix-maze-bg.tidal`
- Render blocks: `sessions/matrix-maze-render-presets.tidal`
- Brief: `notes/matrix-maze-direction.md`
- Stem checklist: `export/stem-render-checklist.md`

## Clients

Configured in `project.json` → `clients`. Today:

- **Matrix Maze app** — from `Games/Matrix-Maze/app`: `npm run music:sync` (runs `scripts/sync-music-from-kaiser.js --project matrix-maze`).

After `export/convert-stems` produces files under `export/out/`, sync copies OGG (and MP3 when present) into the game’s `public/audio/music/`.
