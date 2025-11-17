# GSAP Landing Page Demo 

A modern, animated cocktail bar landing page built with React and GSAP (GreenSock Animation Platform). 

**Note:** This is my personal project for learning GSAP animations. The code includes detailed comments throughout to help me (and hopefully others) understand how each animation works, even if you're new to GSAP.

## Demo

![Demo Showcase](./public/videos/demo-showcase.mp4)


## Features

- **Scroll-triggered animations** - Elements animate as you scroll through the page
- **Text splitting effects** - Character and word-by-word animations
- **Parallax scrolling** - Decorative elements move at different speeds
- **Video scrubbing** - Control video playback with scroll position
- **Mask reveal animations** - Dramatic image unveiling effects
- **Interactive slider** - Smooth transitions between cocktail recipes
- **Responsive design** - Optimized for mobile and desktop

## About the Code

Since I'm still learning GSAP, I've added **detailed inline comments** throughout the components to document:
- What each animation does
- Why certain properties are used
- How ScrollTrigger works
- Timeline sequencing and positioning
- Common GSAP patterns

Even if you've never used GSAP before, you can follow along by reading the comments in:
- `Hero.jsx` - Text animations, parallax, and video scrubbing
- `Navbar.jsx` - Scroll-triggered navbar background change
- `Cocktails.jsx` - Simple parallax leaf animations
- `About.jsx` - Timeline sequencing with overlap
- `Art.jsx` - Advanced mask reveal and pinning
- `Menu.jsx` - Dependency-triggered animations for slider transitions
- `Contact.jsx` - Staggered animations with position parameters

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **ScrollTrigger** - GSAP plugin for scroll-based animations
- **SplitText** - GSAP plugin for text splitting
- **React Responsive** - Media query hooks
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx        # Hero section with text animations and video
│   ├── Navbar.jsx      # Animated navigation bar
│   ├── Cocktails.jsx   # Cocktail menu with parallax
│   ├── About.jsx       # About section with image grid
│   ├── Art.jsx         # Mask reveal animation showcase
│   ├── Menu.jsx        # Interactive cocktail slider
│   └── Contact.jsx     # Footer with contact information
├── constants/          # Data for cocktails, menu items, etc.
├── App.jsx            # Main app component
└── index.css          # Global styles and Tailwind setup
```

## Credits

Shoutout to **[JavaScript Mastery](https://www.youtube.com/@javascriptmastery)** for the inspiration and tutorial that helped shape this project!

## License

This project is open source and available for educational purposes.

---

