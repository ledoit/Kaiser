# Kaiser

Scalable **TidalCycles** workspace for scoring multiple games. **All built audio lives under** `projects/<project-id>/export/out/`. Client games **pull** from there with **their own** sync scripts (one per client), documented in each project’s `project.json` → `clients`.

## Paradigm

| Layer | Responsibility |
|--------|----------------|
| **Kaiser** `projects/<id>/` | Composition (sessions, notes), WAV inbox, **OGG/MP3 build output** |
| **Client** (e.g. `Games/Matrix-Maze/app`) | `scripts/sync-music-from-kaiser.js` (or similar), `npm run music:sync`, runtime paths in code |

No game install paths are embedded in Kaiser’s build step — only optional **documentation** in `project.json` → `clients` pointing at the client’s sync command.

## The loop

1. Prompt in chat (style, mood, intensity, what to change).
2. Edit the Tidal session under the right `projects/<id>/sessions/`.
3. Listen in Tidal (local real-time preview).
4. When approved, record stems into `projects/<id>/export/inbox/`.
5. Run **convert** from Kaiser root (outputs only under Kaiser).
6. Run **sync** in each client app that uses this score.
7. Test in the client and iterate.

## Prerequisites

- **Node.js** — for `scripts/convert-stems.js` only (no `package.json` at Kaiser root; run convert via `export/convert-stems.bat` or `.sh`)
- **ffmpeg** — stem conversion to OGG/MP3
- **TidalCycles + SuperCollider + SuperDirt** — live composition preview

## Default stack

- Composition: TidalCycles + SuperDirt + SuperCollider
- Master stems: WAV 48 kHz 24-bit in `export/inbox/`
- Build outputs: OGG (looping) + MP3 previews in `export/out/`
- Adaptive model: layered stems (per `project.json` → `stems`)
- Build tool: `ffmpeg` via `scripts/convert-stems.js`

## One-time setup (Windows)

From Kaiser root (PowerShell):

```powershell
powershell -ExecutionPolicy Bypass -File "./scripts/setup-windows.ps1"
```

## Matrix Maze (example)

### A) Quick listen in Tidal

Open and evaluate:

- `projects/matrix-maze/sessions/matrix-maze-bg.tidal`

### B) Build stems in Kaiser (after WAVs are in inbox)

Recording presets:

- `projects/matrix-maze/sessions/matrix-maze-render-presets.tidal`

WAV location:

- `projects/matrix-maze/export/inbox/`

Convert (from Kaiser root):

- Windows: `export\convert-stems.bat matrix-maze`
- Bash: `./export/convert-stems.sh matrix-maze`

Outputs:

- `projects/matrix-maze/export/out/ogg` and `.../mp3`

### C) Populate the game

From `Games/Matrix-Maze/app`:

```bash
npm run music:sync
```

This runs the **client-owned** script `scripts/sync-music-from-kaiser.js`, which copies from Kaiser’s `export/out/` into `public/audio/music/`. See `projects/matrix-maze/project.json` → `clients`.

### D) In-game test

Start Matrix Maze and click the viewport once to unlock audio.

## Prompt template (iterations)

> Project: matrix-maze. Keep what works in current groove. Change: \<what should feel different\>. Constraint: \<less intrusive / more intense / …\>. Make and update stems if needed.

## Project index

- Layout and conventions: [`projects/README.md`](projects/README.md)
- Matrix Maze score: [`projects/matrix-maze/`](projects/matrix-maze/)
- New project: copy [`projects/_template/`](projects/_template/), then add a client sync script under the target game.

## Add a new Kaiser project + client sync

1. Copy `projects/_template` to `projects/<new-project-id>/` and edit `project.json`.
2. Add `sessions/` and `notes/` as needed.
3. In the **client** repository, add something like `scripts/sync-music-from-kaiser.js` (copy from Matrix Maze and adjust `--project` default or npm script).
4. Register the client in Kaiser `project.json` → `clients`.


## License

All Rights Reserved © Philippe Ledoit
