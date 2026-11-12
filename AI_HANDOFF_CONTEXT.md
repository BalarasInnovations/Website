# Balaras Innovations Website — AI Handoff & Context Pack

> **How to use this with ChatGPT, Claude, or other AI tools:**
> Upload or paste this `AI_HANDOFF_CONTEXT.md` file along with whichever file you want to edit (`index.html`, `about.html`, `supply.html`, `solutions.html`, `app.js`, or `styles.css`). It gives the AI complete knowledge of the site structure, content, styling rules, and scripts.

---

## 1. Ready-to-Copy Prompt for ChatGPT / Other AI Tools

Copy and paste the block below at the start of your ChatGPT conversation:

```text
You are helping me maintain and customize my static website for "Balaras Innovations / Balaras Technologies" (https://balaras.in).

### Tech Stack & Architecture
- Pure static HTML5 + pre-compiled Tailwind CSS v3.4.19 (`styles.css`) + Vanilla JavaScript (`app.js`).
- No build step required; runs directly on any static server (`python -m http.server 3000`) or Netlify (`netlify.toml` + `_redirects`).
- Font: `Plus Jakarta Sans` (Google Fonts).
- Brand Colors:
  - Primary Blue: `hsl(217.2 91.2% 59.8%)` (`bg-primary`, `text-primary`, `border-primary`) and `#4aa1e0` (`bg-[#4aa1e0]`, `hover:bg-[#3d8bc4]`)
  - Secondary / Light Gray: `#f3f4f6` (`bg-secondary`, `bg-[#f3f4f6]`)
  - Dark Neutral: `text-neutral-800`, `text-neutral-900`, `bg-neutral-900`

### Important Styling Constraint
Because `styles.css` is a pre-compiled Tailwind stylesheet (not running a live Tailwind JIT compiler), any new HTML elements must either:
1. Reuse existing Tailwind utility classes already present in the HTML/CSS, OR
2. Append any new custom CSS rules at the end of `styles.css` or in a `<style>` tag.

### Duplicate Clean-URL Pages
When editing `supply.html`, `solutions.html`, or `about.html`, also keep `supply/index.html`, `solutions/index.html`, and `about/index.html` in sync (note that files inside subfolders use `../styles.css`, `../app.js`, and `../assets/...`).
```

---

## 2. Project Directory Structure

**Local Path:** `C:\Users\TLN RAO\.gemini\antigravity\scratch\balaras-clone`

```text
balaras-clone/
├── index.html                        # Home page (Hero slider, Who Are We, Feature carousel, Sectors + 4 Environmental Analysis products, Contact form)
├── supply.html                       # Supply page (Glassware, Plastics & Media, Water Treatment, MEP Engineering)
├── solutions.html                    # Enterprise Solutions page (4 interactive tabs: Electronics/AV, Fire Detection, Cyber Security, Access Control)
├── about.html                        # About Us page (Our Story & Mission, Expertise Driven by Research, Mission/Vision, Core Values)
├── supply/index.html                 # Clean-URL copy of supply.html (/supply)
├── solutions/index.html              # Clean-URL copy of solutions.html (/solutions)
├── about/index.html                  # Clean-URL copy of about.html (/about)
├── styles.css                        # Pre-compiled Tailwind CSS v3.4.19 stylesheet
├── app.js                            # All frontend interactivity (sticky header, mobile drawer, hero sliders, sector tabs, lightbox, Netlify form handler)
├── netlify.toml                      # Netlify build, redirects, and asset caching config
├── _redirects                        # Netlify clean-URL rewrite rules
├── AI_HANDOFF_CONTEXT.md             # This AI handoff documentation file
└── assets/                           # All local images, icons, and product specification sheets
    ├── favicon.ico                   # Site favicon
    ├── logo1.png                     # Balaras Technologies header & footer logo
    ├── hero.jpg                      # Hero Slide 1 image (Precision Water Testing Equipment)
    ├── environmental-analysis.jpg    # Hero Slide 2 image (Environmental Analysis Equipment)
    ├── bl-strato-data-logger.jpg     # Env Product 1: BL-Strato DataLogger spec sheet
    ├── wireless-radio-transceiver.jpg# Env Product 2: BX-TRx Telemetry spec sheet
    ├── demodulator-bd-uhf-01.jpg     # Env Product 3: BD-UHF Demodulator spec sheet
    ├── bt-uhf-transmitter.jpg        # Env Product 4: BT-UHF Transmitter spec sheet
    ├── watertesting.jpg              # Feature Carousel Slide 1 (Water Quality Solutions — Thermo branding removed)
    ├── lab-reagents.jpg              # Feature Carousel Slide 2 & Supply Glassware image
    ├── labconsumables.jpeg           # Feature Carousel Slide 3 (Laboratory Consumables)
    ├── collab.jpg                    # Strategic Innovation section image
    ├── bentopic2.png                 # Services bento grid main image
    ├── industrial-water.jpg          # Sectors We Serve: Industrial & Process image
    ├── laboratory-research.jpg       # Sectors We Serve: Lab & Research image
    ├── innovation.jpg                # Our Approach & About Us research image
    ├── supply-hero.jpg               # Supply page hero banner
    ├── plastic.png                   # Supply page: Plastics & Media image
    ├── wpf.jpg                       # Supply page: Water Treatment image
    ├── MEP.jpg                       # Supply page: MEP Engineering Solutions image
    └── solutions-hero.jpg            # Solutions page hero banner
```

---

## 3. Complete Site Content & Customizations Summary

### A. Global Header & Footer (All Pages)
- **Navigation Links:** `Home` (`index.html`), `Supply` (`supply.html`), `Solutions` (`solutions.html`), `About Us` (`about.html`), and `Contact Us` button (`#consultation`).
- **Footer Brand Tagline & Contact Info:**
  - Tagline: `"Pioneering Technological Innovation for a cleaner, safer world."`
  - Emails: `info@balaras.in`, `vasu@balaras.in`
  - Phone: `+91 8500007757`
  - Copyright: `© 2025 Balaras Innovations. All rights reserved.`

---

### B. Home Page (`index.html`)

#### 1. Top Hero Auto-Slider (`[data-hero-text]`, `[data-hero-img]`, `[data-hero-dot]`)
Cycles automatically every **5 seconds** between 4 slides:
- **Slide 1 (`0`):**
  - Badge: `Pioneering Water Testing Excellence`
  - Heading: `Precision Water` / `Testing Equipment`
  - Description: *"A trusted manufacturer and supplier of high-precision water testing equipment, chemicals, and reagents."*
  - CTA Button: `Read More` (`#services`)
  - Image: `assets/hero.jpg`
- **Slide 2 (`1`):**
  - Badge: `Pioneering Environmental Excellence`
  - Heading: `Environmental` / `Analysis Equipment`
  - Description: *"Advanced automatic weather station data loggers, UHF telemetry transmitters, transceivers, and demodulators for precision field monitoring."*
  - CTA Button: `Read More` (`#solutions`)
  - Image: Sub-slider cycling through the 4 real product specification brochures (`assets/bl-strato-data-logger.jpg`, `assets/wireless-radio-transceiver.jpg`, `assets/demodulator-bd-uhf-01.jpg`, `assets/bt-uhf-transmitter.jpg`) with `object-contain` on white background.
- **Slide 3 (`2`):**
  - Badge: `Advanced Research & Science`
  - Heading: `Lab & Research` / `Analytical Solutions`
  - Description: *"Equipping high-end research laboratories with precision glassware, reagents, analytical test kits, and specialized instruments."*
  - CTA Button: `Read More` (`#solutions`)
  - Image: `assets/laboratory-research.jpg`
- **Slide 4 (`3`):**
  - Badge: `Industrial Automation & Process`
  - Heading: `Industrial & Process` / `Monitoring Systems`
  - Description: *"Optimizing industrial water treatment, manufacturing workflows, and compliance with continuous online process monitors."*
  - CTA Button: `Read More` (`#solutions`)
  - Image: `assets/industrial-water.jpg`

#### 2. WHO ARE WE? Section
- **Text:**
  > *"We are a team of specialized professionals with extensive expertise in Water Analysis, Environmental Analysis, Medical, Biotechnology, Laboratory and Educational Sectors"*

#### 3. Secondary Feature Carousel (3 Slides, 7-second interval)
1. **Water Quality Solutions** (`assets/watertesting.jpg` — cleaned of third-party logos): *"We supply comprehensive water quality testing equipment including handheld meters, multiparameter sondes, CTDs, and automatic water samplers."*
2. **Laboratory Accessories** (`assets/lab-reagents.jpg`): *"Our precision laboratory equipment encompasses desiccators, hotplates, micropipettes, pipetting aids, circulating baths, and weighing balances."*
3. **Laboratory Consumables** (`assets/labconsumables.jpeg`): *"Premium wholesale laboratory consumables. High-quality, precisely manufactured plastic consumables with fast and reliable delivery."*

#### 4. Strategic Innovation (`#about-us`) & Services Bento Grid (`#services`)
- **Your Partner for Strategic Innovation** (`assets/collab.jpg`)
- **Services Bento Cards** (`assets/bentopic2.png`):
  1. *Handheld Meters & Sensors* — Portable precision for on-site water quality analysis.
  2. *Multiparameter Sondes* — Advanced probes for comprehensive water profiling.
  3. *Automatic Water Samplers* — Reliable automated sampling for compliance and research.
  4. *Online / Process Monitors* — Continuous monitoring for industrial and municipal water.

#### 5. Sectors We Serve (`#solutions`) & Environmental Analysis Products
Three sector cards on the left (`Environmental Analysis`, `Industrial & Process`, `Lab & Research`) switch the right preview panel.

Under **Environmental Analysis**, there are **4 Products** (in both the interactive sub-carousel `#env-sub-carousel` that auto-slides every 4 seconds and the 4-column product grid `#env-products-grid` below it, with full-screen lightbox zoom on click):

| Order | Product Name | Badge / Code | Image File | Key Specifications Summary |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **BL-Strato DataLogger** | `BL-Strato` | `assets/bl-strato-data-logger.jpg` | AT32F437ZMT7 32-bit ARM Cortex-M4F MCU, 16 analog channels (ADS1220 24-bit ADC, up to 4.0 kSPS), 4 digital inputs (5V), 4 relay outputs (500 mA), SDI-12 (up to 10 sensors), Dual RS-485 (Modbus RTU), Ethernet (10/100 Mbps RMII), 4G/LTE telemetry, USB Host, microSD logging, 16×2 LCD, 6-key keypad, RTC with GPS/4G/NTP sync, 2×12V & 2×5V switched outputs. |
| **2** | **BX-TRx Telemetry** | `BX-TRx` | `assets/wireless-radio-transceiver.jpg` | 902–928 MHz operating frequency, 276 kbps link rate, 230.4 kbps serial baud rate, up to 40 km range, up to 1000 mW RF output, 12–60V DC input (3S–12S battery compatible, XT30 connector), USB Type-C + TTL interfaces, compact 55 g aluminium enclosure, external antenna. |
| **3** | **BD-UHF Demodulator** | `BD-UHF` | `assets/demodulator-bd-uhf-01.jpg` | Model BD-UHF-01, 74MHz±10MHz input frequency, -45 to -55 dBm input signal level, 1KHz step size, ±4KHz frequency uncertainty, ±5dB dynamic range, BPSK (Burst) modulation, programmable data rate (300 bps / 1.2 / 2.4 / 4.8 Kbps), BNC Female RF input, RS-232 output, 230V AC power supply, 0–50°C operating temp, Standard 19" Rack (up to 2U height). |
| **4** | **BT-UHF Transmitter** | `BT-UHF` | `assets/bt-uhf-transmitter.jpg` | UHF telemetry transmitter, 402–403 MHz frequency band, programmable 3–10 W RF output power, PCM / BPSK modulation, GPS synchronization, RS-232 control interface, robust metal enclosure with external RF connector. |

#### 6. Get in Touch Form (`#consultation`)
- Configured with `name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field"`.
- Fields: `name` (Full Name), `email` (Email), `company` (Company - Optional), `message` (Your Message).
- Client-side validation & toast notification in `app.js`.

---

### C. About Us Page (`about.html` & `about/index.html`)
- **Hero:** `Our Story & Mission` — *"Pioneering technological innovation in water testing with a focus on precision and excellence."*
- **Section: Expertise Driven by Research**
  - **Paragraph 1:**
    > *"Balaras Technologies is a team of dedicated professionals driven by intensive field research and practical application. Our journey is fueled by a specialized focus in Water Analysis, Environmental Analysis, Medical, Biotechnology"*
  - **Paragraph 2:**
    > *"Today, we are a forward-thinking manufacturer and supplier of water testing equipment, chemicals, and reagents, serving environmental, industrial, and educational sectors globally."*
  - **Bullet Points:** Global standards of precision, Expert technical consultation, Comprehensive after-sales support, Sustainable and efficient solutions.
- **Mission & Vision Cards** + **Our Core Values** (Quality Excellence, Customer Centric, Continuous Innovation).

---

### D. Supply Page (`supply.html` & `supply/index.html`)
- **Hero:** `Global Supply Ecosystem`
- **Life Science Solutions:**
  1. **Laboratory / Glassware** (`assets/lab-reagents.jpg`): Adapters, Beakers, Bottles, Burettes, Columns, Condensers, Crucibles, Dessicators, Dishes, Distillations, Flasks, Glass Hydrometer, Joints, Pipettes, Reagent Bottles, Tubes, Volumetric Flask.
  2. **Laboratory / Plastics & Media** (`assets/plastic.png`): Cell Culture, Cryogenic, Cryogenic Boxes, CryoKing Combo, Drosophila, Freezer Racks, Instruments, Liquid, Microbiology, Reagent, Sample.
  3. **Laboratory / Water Treatment** (`assets/wpf.jpg`): Coagulants & Flocculants, pH Management & Descaling, Disinfection & Conditioning, Right Purity Grade.
- **MEP Engineering Solutions** (`assets/MEP.jpg`):
  1. *Electrical Engineering* (Power Distribution, Lighting Systems, Earthing & Protection, UPS & Power Backup)
  2. *Life Safety & Security* (Fire Alarm Systems, Fire Fighting, Smoke Management, Access Control & CCTV)
  3. *Communication Systems* (Data & Voice Systems, Public Address, PABX Infrastructure, Structured Cabling)
  4. *Public Health Engineering* (Water Supply, Drainage & Sewerage, Storm Water, Solar Water Heating)

---

### E. Solutions Page (`solutions.html` & `solutions/index.html`)
- **Hero:** `Enterprise Solutions` — *"Integrated technological excellence across Audio-Visual, Fire Safety, and Cyber Security."*
- **4 Interactive Tabs** (switched via `[role="tab"]` and `[role="tabpanel"]` in `app.js`):
  1. **Electronics / AV:** 8-step *End-to-End Audio-Video Solutions Workflow*
  2. **Fire Detection:** 9-card *Electronics / Fire Detection — What We Offer* grid
  3. **Cyber Security:** 8-step *VAPT & Security Audit Workflow*
  4. **Access Control:** 8-step *Biometric & Access Control Workflow*

---

## 4. Interactive JavaScript Reference (`app.js`)

All client-side behavior is in `C:\Users\TLN RAO\.gemini\antigravity\scratch\balaras-clone\app.js`, organized into 6 modules:
1. **Sticky / Auto-Hide Header:** Transparent at top on `data-page="home"`, Frosted white (`bg-white/95 backdrop-blur-md border-b shadow-sm`) on scroll, hides when scrolling down past `80px` and reappears on scroll up.
2. **Mobile Navigation Drawer:** Opens/closes `#mobile-drawer` and `#mobile-drawer-backdrop`.
3. **Top Hero Banner Auto-Slider (`2b`):** Cycles `[data-hero-text]`, `[data-hero-img]`, and `[data-hero-dot]` every `5000ms`.
4. **Secondary Feature Carousel (`3`):** Cycles the 3 feature slides (`Water Quality Solutions`, `Laboratory Accessories`, `Laboratory Consumables`) every `7000ms`.
5. **Sectors We Serve + Environmental Analysis Sub-Carousel & Lightbox (`4`):**
   - Switches active sector card on hover/click.
   - Cycles `.env-slide-btn` and `[data-env-panel]` every `4000ms` across the 4 Environmental Analysis products.
   - Opens any `.env-lightbox-trigger` image in a full-screen zoom modal (`z-[100] bg-black/80`).
6. **Enterprise Solutions Tabs (`5`) & Netlify Consultation Form (`6`):**
   - Switches tabs on `/solutions.html`.
   - Validates and submits the `#consultation` form via `fetch("/", { method: "POST", ... })` for Netlify Forms.
