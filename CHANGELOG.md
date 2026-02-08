# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- **Build System**: Resolved TypeScript build failures causing exit code 2.
  - Added missing `@types/three` dependency for 3D components.
  - Fixed `verbatimModuleSyntax` errors by using `import type` for MediaPipe types.
  - Resolved `bufferAttribute` type mismatch in React Three Fiber components.
  - Cleaned up unused variables and imports across multiple files (`FaceMesh3D`, `Icons`, `About`, `Projects`).

### Added
- **Dynamic Site Title**: Title now automatically switches between "Cloud Wide" and "云潮工作室" based on language.
- **Lab Search**: Integrated a real-time fuzzy search bar in the Lab index page, replacing the standalone demo page.
- **Dynamic Resume**: Resume page now automatically calculates years of experience (from 2022) and project counts.
- **3D Visuals**: Enhanced Face Recognition lab with cyberpunk shader effects and point cloud rendering.

### Changed
- **Home Page Redesign**: Complete visual overhaul with "Playful/Experimental" theme.
  - Added **Space Grotesk** and **JetBrains Mono** fonts for distinct typography.
  - Implemented **Interactive Hero** with animated text and floating background elements.
  - Added playful **micro-interactions** (tilt, rotate, scale) to Bento Grid cards.
  - Moved Contact section to a **Header Action Button** with tooltip for a cleaner layout.
- **Home Page**: Optimized layout to remove excessive bottom whitespace.
- **Lab UI**: Refined Lab and Agent pages to use "exquisite" design patterns (gradients, blur effects) instead of stark borders.
- **Experience Data**: Replaced mock "Tech Company" data with real "Independent Developer" and "Student" roles.
- **Localization**: Completed i18n support for all Lab experiments and removed forced English default.

### Removed
- **Fuzzy Search Page**: Deleted standalone page in favor of integrated search functionality.
- **Mock Data**: Removed "Contributions" stat and generic timeline data.
- **Resume Page**: Transformed into an interactive Bento Grid with live GitHub data sync.
- **Print Support**: Added optimized print styles for the Resume page.

### Changed
- **Global Design**: Complete visual overhaul of Blog, About, and Projects pages with "Exquisite" design standards.
- **Navigation**: Refactored sidebar with top-aligned toggle and fixed horizontal scrolling issues.
- **Snake Game**: Fixed UX issue where arrow keys scrolled the window.
- **Lab Pages**: Polished UI for Agent, Fuzzy Search, and Face 3D pages with micro-interactions and improved layouts.

### Added
- **3D Face Lab**: New experiment featuring real-time 3D face tracking with Cyberpunk aesthetic.
- **Unique Page Designs**:
  - **Agent**: Modern AI Chat interface with glassmorphism.
  - **Snake**: Retro Arcade Dark mode with CRT effects.
  - **Fuzzy Search**: Command Palette style with gradients.
  - **Face 3D**: Sci-fi/Futuristic dashboard theme.
- **Feature Pages**: Migrated Lab experiments (Agent, Snake, Fuzzy Search) to dedicated pages with their own routes (`/lab/agent`, `/lab/snake`, `/lab/fuzzy-search`).
- **Branding**: Added custom "XYZ Hourglass" SVG icon.
- **UI**: Added "hide scrollbar" optimization for collapsed sidebar.

### Changed
- **i18n**: Set default language to English (en).
- **Navigation**: Updated Lab page to serve as a gallery menu linking to sub-pages.
- **Router**: Added new sub-routes for lab experiments.

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
