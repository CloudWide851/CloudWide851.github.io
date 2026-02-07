# CloudWide851's Personal Website

![Build Status](https://github.com/CloudWide851/CloudWide851.github.io/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A modern, responsive personal website built with the latest frontend technologies. Featuring a clean design, smooth animations, and a Markdown-based blog system.

🌐 **Live Demo**: [https://cloudwide851.github.io/](https://cloudwide851.github.io/)

## ✨ Features

- **Modern UI/UX**: Linear/Vercel-inspired minimalist design with Bento grid layout.
- **Smooth Animations**: Powered by `framer-motion` for page transitions and micro-interactions.
- **Markdown Blog**: Write posts in Markdown with syntax highlighting and GFM support.
- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Dark Mode Ready**: Architecture supports easy theme switching (coming soon).

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Deployment**: GitHub Pages (via GitHub Actions)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CloudWide851/CloudWide851.github.io.git
   cd CloudWide851.github.io
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## 📝 Blog Management

To add a new blog post:

1. Create a new `.md` file in `src/content/blog/`.
2. Add the required frontmatter:
   ```yaml
   ---
   title: Your Post Title
   date: 2024-02-07
   description: A short summary of your post
   tags: [react, tutorial]
   author: Your Name
   cover: https://images.unsplash.com/photo-ID
   ---
   ```
3. Write your content below the frontmatter.

## 🤝 Contact

- **Email**: [cloudwide851@gmail.com](mailto:cloudwide851@gmail.com)
- **GitHub**: [https://github.com/CloudWide851](https://github.com/CloudWide851)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
