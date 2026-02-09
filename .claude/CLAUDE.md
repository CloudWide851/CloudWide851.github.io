# Claude Context Memory

This file records the context, architectural decisions, and operation logs for the CloudWide851.github.io project.

## Project Overview
- **Repository**: CloudWide851.github.io
- **Tech Stack**: React + TypeScript + Vite + Tailwind CSS
- **Deployment**: GitHub Pages (via GitHub Actions)
- **Design Style**: Modern Minimalist (Linear/Vercel inspired)

## Operation Logs
### 2026-02-09: Feature: C Tutorial & Web Search Agent Upgrade- **Task**: Added "Variables and Data Types" tutorial; Renamed AI Assistant to "Web Search Agent" with streaming responses, conversation persistence, and citation/source preview UI.


### 2026-02-09: Blog Archive & UI Enhancements
- **Task**: comprehensive blog upgrade and agent UI polish.
- **Changes**:
  - **Blog**: Implemented `BlogArchive` page with search, series filtering, and tag filtering.
  - **UI**: Added cover image support to blog posts and improved card layout.
  - **Fixes**: Resolved TypeScript errors in `BlogArchive.tsx` (unused imports, missing icons) and fixed C-tutorial runner.

### 2026-02-09: Bug Fix: Blog Loading (Buffer Error)
- **Task**: Fix blog loading failure due to `Buffer` not defined error.
- **Details**: Fixed `ReferenceError: Buffer is not defined` by replacing `gray-matter` (Node.js only) with `front-matter` (Browser compatible).
- **Lesson**: Avoid Node.js-specific libraries (like gray-matter) in client-side code; use browser-compatible alternatives.

### 2024-02-08: Home Page Refinement (Mixed Style) & Compact Layout
- **Task**: Redesign Home page to be cleaner ("OpenAI-style") and more compact, replacing static contact section with a floating button.
- **Changes**:
  - **Component**: Created `FloatingContactButton.tsx` (Bottom-right, copy-to-clipboard, animated).
  - **Layout**: Added `FloatingContactButton` to `MainLayout`.
  - **Hero**: Refined `InteractiveHero.tsx` -> removed chaotic blobs, added subtle breathing orbs and professional typography.
  - **Home**: Removed "Open to new opportunities" badge and bottom contact section. Added 3D tilt to Bento cards.
- **Design Decisions**:
  - **Floating Action Button (FAB)**: Solves the "compactness" request by moving the primary CTA out of the document flow while keeping it accessible.
  - **Mixed Style**: Balanced professional cleanliness (clean fonts, subtle gradients) with personal touches (tilt effects, "Available" status).
  - **Interaction**: "Copy to clipboard" is often more useful than opening a mail client directly.
- **Fixes**:
  - Resolved `TS6133` (unused import) in `FloatingContactButton`.

### 2024-02-08: Final Polish & "OpenAI" Aesthetic
- **Task**: Final cleanup to match strict professional standards.
- **Changes**:
  - **Cleanup**: Removed all Unicode emojis from the codebase (Hero titles, Buttons) to achieve a purely "clean" look.
  - **Git**: Ensured all files (including new `FloatingContactButton`) are correctly staged and committed.
- **Design Standard**:
  - **No Emojis**: Avoid using unicode emojis (✨, 🚀) in UI text. Use high-quality SVGs (Lucide) or pure typography instead.

### 2024-02-08: Home Page Personalization & Redesign
- **Task**: Overhaul home page for "Playful/Unique" personality and fix layout issues.
- **Changes**:
  - **Typography**: Added Google Fonts (Space Grotesk, Inter, JetBrains Mono) via CDN. Configured Tailwind.
  - **Hero**: Replaced generic static hero with `InteractiveHero.tsx` featuring animated typewriter effects and floating background elements.
  - **Layout**:
    - Removed bottom "Contact Section" to reduce whitespace.
    - Added floating "Contact Button" with tooltip in the header (MainLayout).
    - Reduced vertical spacing (`space-y-12`) and page height (`min-h-[70vh]`).
  - **Bento Grid**: Enhanced cards with hover rotations, scale effects, and playful micro-interactions.
  - **Clean Up**: Removed generic "Open to new opportunities" badge.
- **Design Decisions**:
  - **Font Pairing**: Space Grotesk (Headings) + Inter (Body) + JetBrains Mono (Accents) creates a modern, tech-savvy yet playful vibe.
  - **Interactivity**: Animations are used to delight (hover tilts, rotation) rather than distract.
  - **Header Contact**: Moves secondary action out of the main flow to keep the home page focused on "Who I am" and "What I do".

### 2024-02-08: Content & Visual Refinement
- **Task**: Optimize Lab search, refine visuals, fix layout issues, and replace mock data.
- **Changes**:
  - **Lab**: Converted "Fuzzy Search" to a feature of the Lab index page. Added `src/data/labExperiments.ts` for centralized data.
  - **Visuals**: Applied "exquisite" design to Agent page (glassmorphism, softer shadows). Enhanced 3D Face Lab with shaders.
  - **Resume**: Made "Years of Experience" and "Projects" count dynamic. Replaced mock job history with real context (2022 start).
  - **i18n**: Implemented dynamic document title ("Cloud Wide" / "云潮工作室") and enabled language persistence.
  - **Layout**: Fixed double padding issue on Home page.
- **Decisions**:
  - **Search**: Integrating search into the gallery is better UX than a standalone demo page.
  - **Resume**: Dynamic calculation ensures the resume never looks outdated.

### 2024-02-08: Build Stabilization & Type Safety
- **Task**: Fix TypeScript build errors blocking deployment (`pnpm run build` failed).
- **Root Cause**:
  - `verbatimModuleSyntax` enabled in `tsconfig` but not followed in imports.
  - Missing `@types/three` caused implicit `any` errors for Three.js imports.
  - React Three Fiber `bufferAttribute` props validation failure (TS2741).
  - Unused variables (TS6133) treated as errors in strict mode.
- **Changes**:
  - **Dependencies**: Added `@types/three` to `devDependencies`.
  - **Refactor**: Updated `FaceMesh3D.tsx` and `useFaceMesh.ts` to use `import type`.
  - **Cleanup**: Removed unused imports/variables in 6+ component files.
  - **Fix**: Explicitly passed `args` array to `bufferAttribute` to satisfy type requirements.
- **Lessons**:
  - **Strict Mode**: When `verbatimModuleSyntax` is on, always use `import type { Type }` for interfaces/types.
  - **3D Stack**: `@react-three/fiber` often requires explicit type casting or correct prop structures (like `args` for constructors) that differ from vanilla Three.js.

### 2024-02-08: Design System Overhaul & Global Polish
- **Task**: Comprehensive design upgrade to match "Claude/OpenAI" aesthetic.
- **Changes**:
  - **Design System**: Created custom SVG icons (`Icons.tsx`) replacing generic Lucide icons.
  - **Layout**: Fixed sidebar scrollbar issues and moved toggle to header.
  - **Resume**: Implemented Bento Grid layout with `api.github.com` integration.
  - **Content**: Redesigned Blog/Projects/About with rich typography and hero sections.
- **Decisions**:
  - **Iconography**: Switched to custom flat SVGs for a unique brand identity.
  - **Resume**: Fetching data client-side from GitHub API avoids build-time complexity while keeping data fresh.
  - **Styling**: Moved to a cleaner, higher-contrast palette (zinc-50/900) with subtle borders.

### 2024-02-07: Lab Redesign & 3D Face Feature
- **Task**: Redesign Lab pages with unique themes and add 3D Face Recognition.
- **Changes**:
  - **Themes**: Implemented distinct visual identities for each experiment (Retro, Modern, Sci-fi).
  - **New Feature**: Added `FaceRecognitionPage` with MediaPipe + React Three Fiber.
  - **Tech Stack**: Added `@mediapipe/face_mesh` and `three` dependencies.
- **Design Philosophy**:
  - Move away from generic cards to immersive, full-page experiences.
  - Each experiment page should feel like a distinct "mini-app" with its own atmosphere.

### 2024-02-07: Feature Enhancement - Lab Pages & Branding
- **Task**: Refactor Lab components to pages, set English default, optimize sidebar, add custom icon.
- **Changes**:
  - **Lab Architecture**: Split `Lab.tsx` into a menu page and 3 sub-pages (`AgentPage`, `SnakePage`, `FuzzySearchPage`).
  - **Routing**: Added `/lab/*` sub-routes.
  - **i18n**: Forced default language to 'en' in config.
  - **UI**: Hidden scrollbar in collapsed sidebar state.
  - **Assets**: Created `logo.svg` (XYZ hourglass) and updated `index.html`.
- **Decisions**:
  - Moved experiments to their own routes to allow for deep linking and better page weight management.
  - Used `overflow-hidden` for collapsed sidebar to prevent ugly scrollbars.

### 2024-02-07: Critical Hotfix - Runtime Crash & Mock Removal
- **Task**: Fix "i18next not initialized" error, "LanguageSwitcher" crash, and remove search mock data.
- **Root Cause**:
  - `src/i18n/config.ts` was defined but never imported in `src/main.tsx`, so i18n instance was undefined.
  - `LanguageSwitcher` accessed `i18n.language.startsWith` without checking if `i18n.language` existed.
- **Changes**:
  - Added `import './i18n/config'` to `src/main.tsx`.
  - Added safe navigation `(i18n.language || 'en')` to `LanguageSwitcher`.
  - Removed `mockFallback` function from search tool.
- **Lessons**:
  - **CRITICAL**: Defining a config file is not enough; it MUST be imported in the entry point to run side effects.
  - Always guard against `undefined` when accessing properties on external libraries (like i18n.language) during initialization.

### 2024-02-07: Critical 404 Fix, Search API Integration & Complete i18n
- **Task**: Fix 404 errors on page refresh/direct access, integrate free search API, complete translations.
- **Root Cause Analysis**:
  - **Issue 1**: Inline script in `index.html` executed `history.replaceState()` before React Router loaded.
  - **Issue 2**: Artificial 1.5s delay in `App.tsx` prevented router from handling restored paths.
  - **Issue 3**: No verification that `404.html` was copied to `dist/` during build.
  - **Issue 4**: Missing `.nojekyll` file for GitHub Pages.
- **Changes**:
  - Moved redirect restoration logic from `index.html` to `App.tsx` useEffect.
  - Removed artificial loading delay in `App.tsx`.
  - Added post-build verification script for `404.html`.
  - Created `public/.nojekyll` to disable Jekyll processing.
  - Fixed language attributes (zh-CN → en).
  - Replaced mock search with DuckDuckGo API using CORS proxy (allorigins.win).
  - Translated all remaining pages: About, Projects, Blog, BlogPost, NotFound.
  - Added 4 new translation namespaces to i18n config.
- **Issues Encountered**:
  - **Timing Race Condition**: Browser executed inline script before React mounted, causing router to miss path.
  - **Delayed Router Init**: 1.5s loading animation prevented router from intercepting GitHub Pages 404 response.
  - DuckDuckGo API has no CORS headers - solved with public CORS proxy.
  - Needed to parse nested DuckDuckGo response format (Abstract + RelatedTopics).
- **Lessons**:
  - **CRITICAL**: Never execute routing logic (history API) outside of React lifecycle in SPAs.
  - **CRITICAL**: Avoid artificial delays in App initialization - breaks SPA routing on GitHub Pages.
  - GitHub Pages 404 redirect pattern requires: 1) 404.html saves path to sessionStorage, 2) React restores path AFTER router mounts, 3) .nojekyll file present.
  - Free APIs often lack CORS - always plan for proxy solution.
  - Keep mock fallback for API failures (better UX).
  - Translation namespace organization: one namespace per page for clarity.

### 2024-02-07: Feature Implementation & Redesign
- **Task**: Internationalization, Sidebar Layout, Lab Experiments, Blog Fixes.
- **Changes**:
  - **I18n**: Converted all UI text to English.
  - **Navigation**: Moved from top navbar to collapsible sidebar.
  - **Lab**: Implemented Fuzzy Search (Fuse.js) and Snake Game (Canvas).
  - **Blog**: Added error handling to fix infinite loading state.
- **Issues Encountered**:
  - `TS7034/TS7005`: Implicit `any` types in Snake Game food generation. Fixed by explicit typing `let newFood: Point`.
  - `TS2307`: Missing `@/lib/utils` module. Fixed by creating the utility file.
  - Deprecation warning for `import.meta.glob` "as" option (noted for future refactor).

### 2024-02-07: Project Initialization & Fixes
- **Issue**: Site showing blank page after initial deployment.
- **Diagnosis**:
  - Suspected SPA routing issue on GitHub Pages.
  - Potential build artifact path issues.
- **Actions Taken**:
  - Updated `.gitignore` to exclude sensitive/unnecessary files.
  - Created `CHANGELOG.md` and `.claude/claude.md`.
  - Planning to fix `vite.config.ts` and `deploy.yml`.
  - Planning UI/UX overhaul with `framer-motion`.

### 2024-02-07: Build Fixes (TypeScript)
- **Issue**: GitHub Actions build failed with TS1484 and TS6133.
- **Diagnosis**:
  - `verbatimModuleSyntax` requires `import type` for types.
  - Unused variables `keyword`, `height`, `randomSeed` triggered strict linting errors.
- **Actions Taken**:
  - Updated `PageTransition.tsx` to use `import type { ReactNode }`.\
  - Prefixed unused args with `_` in `image.ts` and commented out unused variables.
- **Lesson**: Always run `pnpm run build` locally before pushing to catch strict TypeScript errors.

## Architectural Decisions
- **GitHub Pages SPA Routing**: Two-step pattern (404.html → sessionStorage → React restoration) with CRITICAL requirement: restoration must happen in React lifecycle, NOT inline scripts.
- **Search API**: DuckDuckGo Instant Answer API via CORS proxy for free, keyless web search.
- **i18n Namespaces**: One namespace per page/feature for better organization and code splitting.
- **Loading States**: Avoid artificial delays in App.tsx initialization - breaks SPA routing patterns.
- **Navigation**: Sidebar layout preferred over top bar for better scalability and modern aesthetic.
- **Lab Architecture**: Card-based expandable gallery for experiments to keep the UI clean.
- **Routing**: Using `BrowserRouter` with `404.html` redirection hack for GitHub Pages support.
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge` (`cn` utility) for dynamic classes.
- **Animations**: `framer-motion` for complex interactions.
- **Images**: Unsplash API for dynamic, high-quality placeholders.

### 2026-02-09: Feature: Agent UI & C Tutorials
- **Task**: Polish agent UI, add blog covers, create C tutorial #3.
- **Changes**:
  - **Agent UI**: Removed agent container for cleaner look.
  - **Blog**: Fixed blog covers and "view all" button functionality.
  - **Content**: Added C Tutorial #3 (Variables and Data Types).
  - **Research**: Investigated Judge0 compiler for potential future integration.
