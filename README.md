# Dr. Lucas L. Maldonado — Portfolio Website

Professional portfolio for Dr. Lucas L. Maldonado, PhD  
**Head of Bioinformatics & Translational Genomics**

---

## Structure

```
/
├── index.html          ← Main HTML
├── css/
│   └── styles.css      ← All styles (CSS variables, responsive)
├── js/
│   └── main.js         ← Canvas animation, scroll effects, counters
└── assets/
    └── images/         ← Place your profile photo here (portrait.jpg)
```

## Deployment

### GitHub Pages
1. Push all files to your repository root
2. Go to Settings → Pages → Deploy from branch `main`

### Netlify
1. Drag the folder to [app.netlify.com/drop](https://app.netlify.com/drop)  
   — or connect the GitHub repository for continuous deployment

## Customizations

### Add your profile photo
Place a photo at `assets/images/portrait.jpg` and replace the portrait placeholder div in `index.html`:

```html
<!-- Replace .portrait-placeholder div with: -->
<img src="assets/images/portrait.jpg" alt="Dr. Lucas L. Maldonado"
     style="width:100%;border-radius:12px;border:1px solid var(--border);" />
```

### Update profile links
In `index.html`, update the `href` attributes for:
- NCBI Profile
- Scopus Profile  
- LinkedIn Profile
- GitHub Profile

### Color palette
All colors are CSS variables in `css/styles.css` under `:root`.

---

Built with: HTML · CSS · Vanilla JavaScript · No frameworks
