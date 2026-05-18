# Biranchi - Creative Designer & Developer Portfolio

## 🚀 Project Overview

A modern, high-performance portfolio website built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**. Features a beautiful dark theme with neon accents, smooth animations, and fully responsive design.

**Live**: [biranchi.dev](https://biranchi.dev)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building](#building)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## ✨ Features

- ⚡ **Lightning-fast** - Vite + React for optimal performance
- 🎨 **Modern Design** - Custom dark theme with neon green accents
- 📱 **Fully Responsive** - Works perfectly on all devices
- ✅ **Accessible** - WCAG compliant components (Radix UI)
- 🎬 **Smooth Animations** - Framer Motion for elegant transitions
- 📧 **Contact Form** - EmailJS integration for direct messaging
- 🔒 **Type Safe** - Full TypeScript support
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Vite 5** - Next-generation build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Router** - Client-side routing

### Backend & Services
- **Supabase** - Database and auth
- **EmailJS** - Email service
- **React Query** - Data fetching & caching

### Development
- **ESLint** - Code quality
- **Vite SWC** - Fast transpilation
- **TypeScript ESLint** - TS linting

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (use [nvm](https://github.com/nvm-sh/nvm) for version management)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/biranchiproject/My-Portfolio.git
cd My-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 💻 Development

```bash
# Start dev server with hot reload
npm run dev

# Run linter
npm run lint

# Preview production build locally
npm run preview
```

## 🏗️ Building

```bash
# Production build
npm run build

# Development build
npm run build:dev
```

Build output is in the `dist/` folder, ready for deployment.

## 🌐 Deployment

### Cloudflare Pages
1. Push to GitHub
2. Connect repository in Cloudflare Pages dashboard
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Deploy!

### Manual Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 📁 Project Structure

```
My-Portfolio/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── Projects.tsx
│   │   └── ...
│   ├── ui/               # shadcn-ui components
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── dist/                 # Production build
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies

```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to customize the theme:
```typescript
neon: {
  green: "hsl(var(--neon-green))"
}
```

### Content
Update component files in `src/components/` to modify content and styling.

### Metadata
Edit `index.html` for SEO and social meta tags.

## 📧 Contact Form

Uses EmailJS for email handling. Set up by:
1. Create account at [EmailJS](https://www.emailjs.com)
2. Add your service ID and template ID to the form component

## 🔧 Environment Variables

Create `.env.local` if needed:
```
VITE_API_URL=your_api_url
```

## 📄 License

© 2026 Biranchi Narayan Sahoo. All rights reserved.

## 🤝 Support

For issues or questions, please create an issue on [GitHub](https://github.com/biranchiproject/My-Portfolio/issues)

---

Built with ❤️ by Biranchi
