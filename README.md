# C300 Syndicate Website

A modern, animated website for the C300 Syndicate with Matrix-style effects and dark purple theme.

## Features

- Animated Matrix rain background effect
- Glitch effects on title and cards
- Parallax scrolling animations
- Member cards with hover effects
- Responsive design
- Dark theme with purple accents

## Files Structure

```
├── index.html          # Main HTML file
├── style.css           # All styling and animations
├── script.js           # JavaScript for animations and member data
├── members.json        # Member data (optional, data is embedded in script.js)
├── QWE.png            # Background image
└── Avatar images (9 PNG files)
```

## Deployment to GitHub Pages

### Option 1: Direct Upload

1. Create a new repository on GitHub
2. Upload all files to the repository:
   - index.html
   - style.css
   - script.js
   - members.json
   - QWE.png
   - All avatar images (u1595761674_*.png)
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Click Save
7. Your site will be available at: `https://[username].github.io/[repository-name]/`

### Option 2: Using Git Commands

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: C300 Syndicate website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/[username]/[repository-name].git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings as described in Option 1.

## Local Development

Simply open `index.html` in a web browser. No server required.

## Updating Members

To add or modify members, edit the `membersData` object in `script.js`:

```javascript
const membersData = {
    "members": [
        {
            "name": "Member Name",
            "discord": "discord_username",
            "avatar": "avatar_filename.png"
        }
    ]
};
```

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

## Credits

Built for the C300 Syndicate - Endless Online
