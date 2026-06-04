# Kaiser projects

Each subdirectory (except `_template`) is one **score / soundtrack** workspace.

## Layout per project

| Path | Purpose |
|------|---------|
| `project.json` | Stem names, prefix, optional `clients` (where to sync built audio) |
| `sessions/` | TidalCycles (or other) source |
| `notes/` | Direction and constraints |
| `export/inbox/` | Drop recorded `WAV` stems here (see checklist in `export/`) |
| `export/out/ogg` and `export/out/mp3` | Produced by `export/convert-stems.*` — **source of truth for game audio** |

Built files stay under Kaiser. **Do not** copy game paths into `project.json`; each client repo ships its own sync script that reads this folder.

## New project

1. Copy `_template` to `projects/<project-id>/`.
2. Edit `project.json` (`projectId`, `title`, `stemPrefix`, `stems`, entries, and later `clients`).
3. Add a **client-side** script (e.g. `Games/.../scripts/sync-music-from-kaiser.js`) and an npm script that runs it with `--project <project-id>`.
4. List that client in `clients` so the loop is documented in one place.

## Build and sync loop

1. Record WAVs into `export/inbox/` (names: `{stemPrefix}_{stem}.wav`).
2. From Kaiser root: `export/convert-stems.bat <project-id>` or `./export/convert-stems.sh <project-id>`.
3. In each client app directory, run that client’s `music:sync` (or equivalent).
