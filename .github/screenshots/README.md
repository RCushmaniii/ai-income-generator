# Screenshots

This directory contains screenshots and images used in the GitHub repository README and documentation.

## Directory Structure

```
.github/screenshots/
├── README.md           # This file
├── hero-*.png          # Homepage/hero screenshots
├── snapshot-*.png      # Snapshot view screenshots
├── forecast-*.png      # Forecast view screenshots
├── mobile-*.png        # Mobile responsive screenshots
└── features-*.png      # Feature-specific screenshots
```

## Naming Conventions

Use descriptive, kebab-case filenames:

- `hero-desktop-light.png` - Homepage on desktop in light mode
- `hero-desktop-dark.png` - Homepage on desktop in dark mode
- `snapshot-view-desktop.png` - Snapshot calculator view
- `forecast-view-desktop.png` - Forecast view with charts
- `mobile-navigation.png` - Mobile menu/navigation
- `currency-selector.png` - Currency selection feature
- `scenario-builder.png` - Three-scenario planning interface

## Image Guidelines

- **Format:** PNG for UI screenshots (supports transparency)
- **Resolution:** 1920x1080 or higher for desktop, actual device resolution for mobile
- **Compression:** Optimize images before committing (use tools like TinyPNG)
- **Max Size:** Keep individual files under 500KB when possible
- **Naming:** Use descriptive names that indicate what's shown

## Usage in README

Reference screenshots in the main README.md using relative paths:

```markdown
![Snapshot View](.github/screenshots/snapshot-view-desktop.png)
```

Or with alt text and title:

```markdown
![Snapshot calculator showing income breakdown](.github/screenshots/snapshot-view-desktop.png 'Snapshot View')
```
