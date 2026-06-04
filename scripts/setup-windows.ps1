param(
  [string]$GameAppPath = "..\..\Games\Matrix-Maze\app"
)

$ErrorActionPreference = "Stop"

Write-Host "Kaiser setup (Windows) starting..."

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error "Node.js is required. Install Node LTS first, then rerun."
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "ffmpeg not found. Attempting install via winget..."
  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Error "winget not available. Install ffmpeg manually and rerun setup."
  }
  winget install -e --id Gyan.FFmpeg
} else {
  Write-Host "ffmpeg already available."
}

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Error "ffmpeg still not found in PATH after install. Restart terminal and rerun."
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$gameApp = Resolve-Path (Join-Path $repoRoot $GameAppPath)

Write-Host "Installing Matrix-Maze app dependencies at $gameApp ..."
Push-Location $gameApp
npm install
Pop-Location

Write-Host "Setup complete."
Write-Host "Next loop: export\convert-stems.bat matrix-maze  then  (from Games\Matrix-Maze\app)  npm run music:sync"

