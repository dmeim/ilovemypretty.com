# I Love My Pretty

A gift website with NFC card integration for sharing feelings, messages, and Bible verses.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploying to GitHub Pages

1. Update the `base` path in `vite.config.js` to match your GitHub repository name:
   ```js
   base: '/your-repo-name/'
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

## Adding Content

### Adding a New Feeling

1. Create a new folder in `public/feelings/[emotion-name]/`
2. Add a `config.json`:
   ```json
   {
     "title": "Emotion Name",
     "message": "message.md",
     "verses": "verses.md",
     "theming": {
       "backgroundColor": "#FFF9E6",
       "textColor": "#5D4E37",
       "accentColor": "#FFD700"
     }
   }
   ```
3. Create `message.md` with your personal message
4. Create `verses.md` with Bible verses (use blockquotes for styling)
5. Add the feeling to `public/feelings/index.json`

### Adding a New Letter

1. Create a new folder in `public/letters/[letter-name]/`
2. Add a `config.json`:
   ```json
   {
     "title": "Letter Title",
     "date": "December 2024",
     "content": "content.md"
   }
   ```
3. Create `content.md` with your letter
4. Add the letter to `public/letters/index.json`

### Adding a New Memory

1. Create a new folder in `public/memories/[memory-name]/`
2. Add a `config.json`:
   ```json
   {
     "title": "Memory Title",
     "date": "December 2024",
     "description": "description.md"
   }
   ```
3. Create `description.md` with the memory
4. Add the memory to `public/memories/index.json`

## NFC Card Setup

Once deployed, program your NFC cards with URLs like:
- `https://ilovemypretty.com/#/feeling/happy`
- `https://ilovemypretty.com/#/feeling/sad`
- `https://ilovemypretty.com/#/feeling/worried`

## Assets

Place images, gifs, and videos in the `public/assets/` folder:
- `public/assets/images/` - Photos and images
- `public/assets/gifs/` - Animated GIFs
- `public/assets/videos/` - Video files

Reference them in markdown like:
```markdown
![Cat picture](/assets/images/cat.jpg)
```

