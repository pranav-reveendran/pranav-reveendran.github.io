# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, featuring a Claude-inspired design theme.

## 🚀 Features

- **Modern Design**: Clean, professional layout inspired by Claude's aesthetic
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with Vite for fast development and optimized builds
- **Accessibility**: Motion-safe animations and proper ARIA labels
- **Type Safe**: Full TypeScript support for better development experience
- **Component Library**: Built with shadcn/ui components for consistency

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Variables for theming
- **Build Tool**: Vite
- **UI Components**: shadcn/ui, Radix UI primitives
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── animations/     # Animation components
│   ├── hero/           # Hero section components
│   └── ...
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── pages/              # Page components
├── styles/             # Global styles and themes
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎨 Customization

### Theme
The website uses CSS custom properties for theming. You can customize colors in:
- `src/styles/theme.css` - Theme definitions
- `tailwind.config.ts` - Tailwind color extensions

### Content
Update your personal information in:
- `src/data/` - Personal data and content
- Component files for specific sections

## 🚀 Deployment

This project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and TypeScript
# Portfolio Deployment Sat Jun  7 18:26:39 PDT 2025
