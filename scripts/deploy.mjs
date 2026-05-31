// One-command deploy to GitHub Pages.
//   npm run deploy
// Builds the static site with the correct project-site basePath, then force-pushes
// the `out/` folder to the `gh-pages` branch. GitHub Pages serves it automatically.
//
// Requires: git authenticated to push (gh auth login / credential manager).
// Reads owner/repo from the `origin` remote, so it works on any fork.

import { execFileSync } from 'node:child_process'
import { existsSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { stdio: 'inherit', ...opts })
const capture = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: 'utf8', ...opts }).trim()

// ── 1. Figure out owner/repo from the git remote ──────────────────────
let remote
try {
  remote = capture('git', ['remote', 'get-url', 'origin'])
} catch {
  console.error('No `origin` remote. Add one: git remote add origin <url>')
  process.exit(1)
}
const m = remote.match(/github\.com[:/]([^/]+)\/([^/.]+)(?:\.git)?$/i)
if (!m) {
  console.error('origin is not a github.com remote:', remote)
  process.exit(1)
}
const owner = m[1]
const repo = m[2]
const basePath = `/${repo}`
const siteUrl = `https://${owner.toLowerCase()}.github.io/${repo}`
const pushUrl = `https://github.com/${owner}/${repo}.git`

console.log(`\n▶ Deploying ${owner}/${repo}`)
console.log(`  basePath: ${basePath}`)
console.log(`  live URL: ${siteUrl}/\n`)

// ── 2. Build the static export with the right env ─────────────────────
const buildEnv = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_SITE_URL: siteUrl,
}
if (existsSync('.next')) rmSync('.next', { recursive: true, force: true })
if (existsSync('out')) rmSync('out', { recursive: true, force: true })

console.log('▶ Building…')
// On Windows, npm is a .cmd shim → must run through a shell.
execFileSync('npm', ['run', 'build'], { stdio: 'inherit', env: buildEnv, shell: true })

// GitHub Pages would otherwise run Jekyll and drop the _next/ folder.
writeFileSync(join('out', '.nojekyll'), '')

// ── 3. Publish out/ to the gh-pages branch ────────────────────────────
const outDir = join(process.cwd(), 'out')
const git = (args) => run('git', args, { cwd: outDir })
const gitQuiet = (args) => {
  try { execFileSync('git', args, { cwd: outDir, stdio: 'ignore' }) } catch { /* ignore */ }
}

console.log('\n▶ Publishing to gh-pages…')
// Remove any prior repo via git itself (Windows fs.rmSync trips on .git locks).
const dotGit = join(outDir, '.git')
if (existsSync(dotGit)) {
  try { rmSync(dotGit, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }) } catch { /* ignore */ }
}
git(['init', '-q'])
gitQuiet(['branch', '-M', 'gh-pages'])
git(['checkout', '-q', '-B', 'gh-pages'])
git(['add', '-A'])
git(['-c', 'user.email=deploy@pdm.local', '-c', 'user.name=PDM Deploy', 'commit', '-q', '-m', 'Deploy static site'])
git(['push', '-f', pushUrl, 'gh-pages'])

console.log(`\n✅ Deployed. Live in ~1 min at:\n   ${siteUrl}/\n`)
console.log('(You can delete the leftover out/.git folder anytime; the next deploy reinitializes it.)')
