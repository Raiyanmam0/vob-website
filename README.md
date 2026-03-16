# Voice of Business — Recruitment Website

A dark, cinematic Game of Thrones themed recruitment site for the Voice of Business organization.

## 🚀 Deploy to Vercel

### 1. Install Dependencies
```bash
npm install
```

### 2. Asset Paths
Your assets are already placed in `/public`:
- `/public/hero-bg.png` — foggy GoT scene (hero background)
- `/public/throne-bg.png` — Iron Throne image (wings section background)
- `/public/logo.png` — Voice of Business white logo
- `/public/got-theme.mp3` — Game of Thrones theme music

> If you need to swap images, just replace the files in `/public/` keeping the same filenames,
> or update the `src` references in the components.

### 3. Run Locally
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### 4. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or push to GitHub and connect repo on [vercel.com](https://vercel.com).

---

## 📁 Structure

```
vob-website/
├── app/
│   ├── globals.css       # Global styles, custom animations, fonts
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Main page combining all sections
├── components/
│   ├── HeroSection.tsx   # Landing section with audio button
│   ├── TransitionSection.tsx # Parallax transition between sections
│   ├── WingsSection.tsx  # 8 swords / wings interactive section
│   └── EmberParticles.tsx # Floating ember particle effect
└── public/
    ├── hero-bg.png
    ├── throne-bg.png
    ├── logo.png
    └── got-theme.mp3
```

## 🎨 Customization

### Update Wing Descriptions
In `components/WingsSection.tsx`, find the `WINGS` array and update `description` fields.

### Update Sword Positions
Adjust `swordPositions` array in `WingsSection.tsx` for different layouts.

### Change Colors
CSS variables are in `app/globals.css`:
```css
--got-gold: #C9A84C;
--got-ember: #FF6B35;
--got-steel: #8B9BB4;
```

### Fonts
Google Fonts loaded: **Cinzel**, **Cinzel Decorative**, **EB Garamond**
