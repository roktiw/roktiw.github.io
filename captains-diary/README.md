# Captain's Diary landing page

Public static download landing in the existing `roktiw/roktiw.github.io` GitHub Pages source repository.

- Entry point: `/captains-diary/index.html`
- GitHub Pages address: `https://farmar.io/captains-diary/` (existing repository's `CNAME` is `farmar.io`; actual serving depends on Pages/DNS settings).
- No framework, dependencies, cookies, external analytics, service worker or build step.
- The public GitHub Releases API is used read-only to discover the latest `diary-v*` pre-release **only when both native-tested platform ZIPs and SHA256SUMS are present**.
- If no verified release assets are listed, fallback links target the last green GitLab download artifacts, explicitly labeled **private / GitLab access required**.
- Windows stays disabled and is never misrepresented as native-tested.

## Enabling anonymous downloads

The source GitLab repo `roktiw/captains-diary` is private. The optional `publish:github` CI job uploads its green, checksum-verified `download:apps` artifacts to public GitHub pre-releases in this repository.

Set a **masked and protected** GitLab CI/CD variable `GITHUB_RELEASE_TOKEN` with a fine-grained GitHub token restricted to `roktiw/roktiw.github.io` and `Contents: read and write`. Do not embed it in this public repository or in GitLab tracked files. Rerun the pipeline for `main` after enabling the variable; `publish:github` will then run. CI job must retain its `needs: download:apps` gate. The GitHub release tag pins a GitLab commit SHA.

macOS remains ad-hoc signed and not notarized in this alpha. Announce that clearly to users. Do not copy ZIP binaries into Git history or GitHub Pages.

## Site behavior

This project already uses a custom `CNAME`; this addition does not alter the site's root content or any existing workflows. The site is static and will be visible once GitHub Pages is configured to publish this branch/path. In case the custom domain isn't active, inspect Settings → Pages and DNS; do not assume a successful Git commit proves live publication.
