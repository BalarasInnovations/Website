# Balaras Innovations (`balaras.in`) — Local Clone

A complete, pixel-accurate local clone of **[balaras.in](https://balaras.in)** (*Balaras Innovations | Water Testing Solutions*), including all pages, compiled Tailwind CSS styles, interactive components, and locally downloaded image assets.

## Project Structure

- `index.html` — **Home Page**: Hero section, "Who Are We?", auto-rotating product feature carousel, "Your Partner for Strategic Innovation", bento grid of water testing equipment, interactive "Sectors We Serve" showcase, "Our Approach", and "Get in Touch" consultation form with validation & toast notifications.
- `supply.html` (and `supply/index.html`) — **Supply Page**: Global Supply Ecosystem hero, Life Science Solutions (*Laboratory / Glassware*, *Laboratory / Plastics & Media*, *Laboratory / Water Treatment*), and *MEP Engineering Solutions* (*Electrical Engineering*, *Life Safety & Security*, *Communication Systems*, *Public Health Engineering*).
- `solutions.html` (and `solutions/index.html`) — **Solutions Page**: Enterprise Solutions hero and interactive 4-tab workflow & service matrix:
  1. **Electronics / AV** (*End-to-End Audio-Video Solutions Workflow*)
  2. **Fire Detection** (*Electronics / Fire Detection — What We Offer*)
  3. **Cyber Security** (*VAPT & Security Audit Workflow*)
  4. **Access Control** (*Access Control Solutions — What We Offer*)
- `about.html` (and `about/index.html`) — **About Us Page**: Our Story & Mission hero, Expertise Driven by Research, Mission & Vision cards, and Core Values (*Quality Excellence*, *Customer Centric*, *Continuous Innovation*).
- `styles.css` — Full compiled Tailwind CSS v3.4.19 stylesheet from `balaras.in`.
- `app.js` — Client-side interactivity (scroll-aware sticky/auto-hide header, mobile slide-over navigation drawer, hero feature carousel, interactive sector switcher, Enterprise Solutions tabs, and consultation form validation + toast notification).
- `assets/` — All first-party and external images downloaded locally (`logo1.png`, `watertesting.jpg`, `collab.jpg`, `bentopic2.png`, `labconsumables.jpeg`, `plastic.png`, `wpf.jpg`, `MEP.jpg`, `favicon.ico`, plus all high-resolution laboratory & infrastructure images).

## How to Run Locally

### Option 1: Local HTTP Server (Recommended)
Run Python's built-in HTTP server from this directory:

```powershell
python -m http.server 3000
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Option 2: Open Directly in Browser
Because all asset paths and links use relative paths, you can also double-click `index.html` directly in Windows File Explorer.
