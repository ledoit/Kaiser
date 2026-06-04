# Stem Render Checklist

Target format before conversion: `WAV 48kHz 24-bit`.

## Naming

Use: `<stemPrefix>_<stem>.wav` where values come from `project.json`.

## Render steps

1. Load your `sessions/main.tidal`.
2. Solo/mute channels per stem plan.
3. Record at clean bar boundaries.
4. Place WAV files in `export/inbox/`.

## Build and sync

1. Kaiser root: `export/convert-stems.bat <project-id>` or `./export/convert-stems.sh <project-id>`.
2. Client app: run that project’s sync script (add under `Games/.../scripts/` and list it in `project.json` → `clients`).

