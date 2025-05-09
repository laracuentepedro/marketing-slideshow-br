# Export HTML Slides to Images and PDF

This project contains slides as HTML files (`1.html`, `2.html`, ..., `15.html`). To generate high-resolution images and a PDF deck:

## 1. Install Puppeteer

```
npm install puppeteer
```

## 2. Export Slides as PNG Images

```
node export-slides.js
```

- This generates `slide-1.png`, `slide-2.png`, ..., `slide-15.png` in the project directory.
- Images are 1920x1080 at retina quality (device scale 2).

## 3. Combine PNGs into a Single PDF

You can use [ImageMagick](https://imagemagick.org/) (install via `brew install imagemagick` on Mac) to combine images:

```
convert slide-*.png slides.pdf
```

Or, with Ghostscript (alternative):

```
gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=slides.pdf slide-*.png
```

---

**Tip:** You can adjust the viewport size in `export-slides.js` if you want a different resolution.

**Note:** For best results, ensure all assets (images, fonts, etc.) referenced by your slides are available locally.
