# Matrix-Maze Stem Render Checklist

Use this with:

- `projects/matrix-maze/sessions/matrix-maze-render-presets.tidal`

Target format before conversion: `WAV 48kHz 24-bit`.

## File naming (exact)

- `matrix_maze_base.wav`
- `matrix_maze_pressure.wav`
- `matrix_maze_chase.wav`
- `matrix_maze_dread.wav`

## Fastest recording method

1. Open `matrix-maze-render-presets.tidal`.
2. Copy/paste the block matching the stem you are recording.
3. Record the output to the exact WAV filename in this checklist.
4. Repeat for each stem.

### 1) base

- Record 64 cycles minimum

### 2) pressure

- Record 32 cycles minimum

### 3) chase

- Record 32 cycles minimum

### 4) dread

- Record 16-32 cycles minimum

## Looping guidance

- Start and stop at clean bar boundaries.
- Keep each stem length an integer multiple of the same loop size.
- Trim trailing silence and avoid clipping.

## After WAVs are in `export/inbox/`

1. From Kaiser root: `export/convert-stems.bat matrix-maze` (or `./export/convert-stems.sh matrix-maze`).
2. In each client (see `project.json` → `clients`): e.g. from `Games/Matrix-Maze/app`, `npm run music:sync`.

