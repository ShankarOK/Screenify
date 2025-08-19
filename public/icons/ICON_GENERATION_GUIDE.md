# PWA Icon Generation Guide

This guide helps you create all the required icons for the Screenify PWA.

## Required Icon Sizes

You need to create PNG icons in the following sizes:

- 70x70 (Windows tile)
- 72x72 (Android)
- 96x96 (Android)
- 128x128 (Chrome Web Store)
- 144x144 (Android)
- 150x150 (Windows tile)
- 152x152 (iOS)
- 180x180 (iOS)
- 192x192 (Android)
- 310x150 (Windows wide tile)
- 310x310 (Windows large tile)
- 384x384 (Android)
- 512x512 (Android splash screen)

## Icon Naming Convention

Save your icons with these exact filenames:

- `app-icon-70x70.png`
- `app-icon-72x72.png`
- `app-icon-96x96.png`
- `app-icon-128x128.png`
- `app-icon-144x144.png`
- `app-icon-150x150.png`
- `app-icon-152x152.png`
- `app-icon-180x180.png`
- `app-icon-192x192.png`
- `app-icon-310x150.png`
- `app-icon-310x310.png`
- `app-icon-384x384.png`
- `app-icon-512x512.png`

## Design Guidelines

### Base Design

- Use a simple, recognizable design that represents Screenify
- Consider using a combination of:
  - Document/resume icon
  - Scan/analysis symbol
  - AI/technology element
  - Screenify branding colors

### Color Scheme

- Primary: #3b82f6 (blue)
- Background: #ffffff (white)
- Accent colors as needed

### Icon Requirements

- **Maskable Icons**: Ensure important elements are within the safe zone (center 80% of the icon)
- **Contrast**: High contrast for visibility on various backgrounds
- **Simplicity**: Clear and recognizable at small sizes
- **Consistency**: All sizes should look cohesive

## Generation Tools

### Online Tools (Recommended)

1. **PWA Builder Icon Generator**: https://www.pwabuilder.com/imageGenerator
2. **Favicon.io**: https://favicon.io/favicon-converter/
3. **RealFaviconGenerator**: https://realfavicongenerator.net/

### Steps using PWA Builder:

1. Create a 512x512 base icon
2. Upload to PWA Builder Icon Generator
3. Download the generated icon pack
4. Rename files according to our naming convention
5. Place all icons in the `/public/icons/` directory

### Manual Creation

If creating manually:

1. Start with a 512x512 base design
2. Use design tools like Figma, Sketch, or Canva
3. Export each required size
4. Optimize PNGs for web (reduce file size)

## Testing

After creating icons:

1. Test the PWA installation on different devices
2. Check icon appearance in:
   - Browser install prompts
   - Home screen after installation
   - App drawer/start menu
   - Task switcher

## Notes

- The current manifest references these icons but they don't exist yet
- Once created, the PWA will be fully functional for installation
- Consider creating both regular and maskable versions for better compatibility
- Test icons on both light and dark backgrounds
