# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Lab Page**: Added new interactive experiments section.
  - **Fuzzy Search**: Real-time text search demo using `fuse.js`.
  - **Snake Game**: Classic game implementation using HTML5 Canvas.
- **Sidebar Navigation**: Replaced top navigation with a modern, collapsible sidebar layout.
  - Responsive design with mobile drawer.
  - Smooth animations using Framer Motion.
- **Utility**: Added `cn` utility for better class merging (`clsx` + `tailwind-merge`).

### Changed
- **Internationalization**: Converted all UI text and code comments from Chinese to English.
- **Layout**: Complete refactor of `MainLayout` to support sidebar architecture.

### Fixed
- **Blog Loading**: Fixed infinite loading issue on Blog page by adding proper error handling and dependency checks.
- **Build System**: Resolved TypeScript build errors (TS7034, TS7005) in new components.

## [0.1.0] - 2024-02-07

### Fixed
- Resolved TypeScript build errors (TS1484) by using `import type` for ReactNode.
- Fixed unused variable warnings (TS6133) in image utility functions.

### Added
- Initial project setup with React, Vite, TypeScript, and Tailwind CSS.
- GitHub Actions workflow for automated deployment to GitHub Pages.
- Basic routing structure with React Router.
- Markdown blog support.
