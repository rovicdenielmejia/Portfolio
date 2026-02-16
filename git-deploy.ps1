# Run this in PowerShell from the Portfolio folder (or from Desktop: .\Portfolio\git-deploy.ps1)
# If you get "index.lock" error, close Cursor/VS Code first, then run again.

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (Test-Path .git\index.lock) {
    Remove-Item .git\index.lock -Force
}

git add .
git commit -m "Initial commit: portfolio site ready for Netlify"
git branch -M main
Write-Host ""
Write-Host "Done. Next: create a repo on GitHub, then run:"
Write-Host '  git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git'
Write-Host "  git push -u origin main"
Write-Host ""
