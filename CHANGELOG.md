# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Critical Runtime Crash**: Fixed `i18n` initialization issue where configuration was not imported in entry file.
- **LanguageSwitcher**: Added safe access to `i18n.language` to prevent white screen crashes on load.
- **Critical 404 Bug**: Fixed timing race condition in SPA routing for GitHub Pages.
  - Moved redirect restoration from inline script to React lifecycle.
  - Removed artificial 1.5s loading delay that prevented router initialization.
  - Added `.nojekyll` file to prevent GitHub Pages Jekyll processing.
  - Fixed language attributes (changed from zh-CN to en).
- Build verification for 404.html deployment.

### Added
- **Free Search API Integration**: Agent now uses DuckDuckGo API for real web searches via CORS proxy.
- **Complete i18n Support**: Translated all pages (About, Projects, Blog, NotFound) to Chinese.
- Translation files for about, projects, blog, and notfound namespaces.
- Post-build verification script for 404.html.

### Changed
- **Search Tool**: Removed mock fallback data; search now returns empty results on failure as requested.
- Search tool upgraded from mock implementation to real DuckDuckGo searches.
- All page components now support language switching.
- App.tsx initialization logic (removed loading delay, added redirect restoration).

### Technical
- Integrated `api.allorigins.win` CORS proxy for DuckDuckGo API access.
- Extended i18n configuration with 4 additional namespaces.
- Fixed GitHub Pages SPA routing pattern (sessionStorage redirect).

## [0.1.0] - 2024-02-07

### Fixed
- Resolved TypeScript build errors (TS1484) by using `import type` for ReactNode.
- Fixed unused variable warnings (TS6133) in image utility functions.

### Added
- Initial project setup with React, Vite, TypeScript, and Tailwind CSS.
- GitHub Actions workflow for automated deployment to GitHub Pages.
- Basic routing structure with React Router.
- Markdown blog support.
