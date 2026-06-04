@echo off
setlocal

REM Usage:
REM   export\convert-stems.bat <project-id>
REM Example:
REM   export\convert-stems.bat matrix-maze

set "ROOT_DIR=%~dp0.."
for %%I in ("%ROOT_DIR%") do set "ROOT_DIR=%%~fI"

if "%~1"=="" (
  echo Error: missing project id.
  echo Usage: export\convert-stems.bat ^<project-id^>
  exit /b 1
)

node "%ROOT_DIR%\scripts\convert-stems.js" --project "%~1"
exit /b %errorlevel%
