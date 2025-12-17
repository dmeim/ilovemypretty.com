---
name: Gift Website for Girlfriend
overview: Create a React-based gift website with NFC card integration, featuring feelings, letters, and memories sections. Content will be managed through markdown files with JSON configs for easy updates, and deployed to GitHub Pages.
todos:
  - id: setup-vite-react
    content: Initialize Vite + React project with React Router and react-markdown
    status: completed
  - id: create-folder-structure
    content: Create folder structure in public/ with sample feelings (happy, sad, worried)
    status: completed
    dependencies:
      - setup-vite-react
  - id: create-sample-content
    content: Create sample config.json and markdown files for feelings
    status: completed
    dependencies:
      - create-folder-structure
  - id: build-routing
    content: Set up React Router with all routes (including hidden letters/memories)
    status: completed
    dependencies:
      - setup-vite-react
  - id: create-components
    content: Build reusable components (Layout, Card, Gallery, MarkdownRenderer)
    status: completed
    dependencies:
      - setup-vite-react
  - id: build-content-loader
    content: Create utility to dynamically load config.json and markdown files
    status: completed
    dependencies:
      - create-components
  - id: build-pages
    content: Create all page components that load and display markdown content
    status: completed
    dependencies:
      - build-routing
      - build-content-loader
  - id: implement-theming
    content: Apply per-page theming from config.json
    status: completed
    dependencies:
      - build-pages
  - id: style-responsive
    content: Add responsive styling with mobile-first approach
    status: completed
    dependencies:
      - build-pages
  - id: configure-navigation
    content: Set up navigation with letters/memories hidden but routes accessible
    status: completed
    dependencies:
      - build-pages
  - id: configure-github-pages
    content: Configure vite.config.js and deployment scripts for GitHub Pages
    status: completed
    dependencies:
      - style-responsive
      - configure-navigation
---

# Gift Website Plan (Updated)

## Tech Stack

- **React** with React Router for navigation
- **Vite** as build tool
- **Markdown files** for content with `react-markdown` for rendering
- **JSON configs** for structure and theming
- **GitHub Pages** for hosting

## Project Structure

```
/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Card.jsx        # Card component for galleries
│   │   ├── Gallery.jsx     # Gallery grid layout
│   │   ├── Layout.jsx      # Common layout wrapper
│   │   └── MarkdownRenderer.jsx  # Markdown content renderer
│   ├── pages/              # Route pages
│   │   ├── Home.jsx        # / - Welcome message
│   │   ├── FeelingGallery.jsx    # /feeling
│   │   ├── FeelingDetail.jsx     # /feeling/:emotion
│   │   ├── LetterGallery.jsx     # /letter (hidden from nav)
│   │   ├── LetterDetail.jsx      # /letter/:letter_title
│   │   ├── MemoryGallery.jsx     # /memory (hidden from nav)
│   │   └── MemoryDetail.jsx      # /memory/:memory_name
│   ├── App.jsx            # Main app with routing
│   └── main.jsx           # Entry point
├── public/
│   ├── feelings/           # Feelings content
│   │   ├── happy/
│   │   │   ├── config.json
│   │   │   ├── message.md
│   │   │   └── verses.md
│   │   ├── sad/
│   │   │   ├── config.json
│   │   │   ├── message.md
│   │   │   └── verses.md
│   │   └── worried/
│   │       ├── config.json
│   │       ├── message.md
│   │       └── verses.md
│   ├── letters/            # Letters content (hidden from nav)
│   │   └── [letter-folders]/
│   ├── memories/           # Memories content (hidden from nav)
│   │   └── [memory-folders]/
│   └── assets/             # Shared resources
│       ├── images/
│       ├── gifs/
│       └── videos/
├── index.html
├── package.json
└── vite.config.js
```

## Content Structure

### Feelings: `public/feelings/[emotion]/config.json`

```json
{
  "title": "Happy",
  "message": "message.md",
  "verses": "verses.md",
  "theming": {
    "backgroundColor": "#FFF9E6",
    "textColor": "#333333",
    "accentColor": "#FFD700"
  }
}
```

### Markdown Files Support

- Embedded images: `![alt text](../../assets/images/cat.jpg)`
- GIFs: `![celebration](../../assets/gifs/party.gif)`
- Videos: `<video src="../../assets/videos/video.mp4" controls />`
- Links: [`Watch this`](https://youtube.com/...)

### Letters & Memories Structure

Similar folder-based approach:

- `public/letters/[letter-title]/config.json` + markdown
- `public/memories/[memory-name]/config.json` + markdown

Routes will work but won't appear in navigation yet.

## Key Features

1. **Folder-based IDs**: Folder name = route parameter (e.g., `happy/` → `/feeling/happy`)
2. **Dynamic Content Loading**: Fetch config.json, then load referenced markdown files
3. **Rich Markdown Content**: Support for images, videos, GIFs, links
4. **Per-page Theming**: Each feeling can have custom colors
5. **Hidden Navigation**: Letters & memories routes exist but hidden from nav
6. **Responsive Design**: Mobile-first for NFC scanning

## Implementation Details

### Loading Content Flow

```mermaid
flowchart TD
    Route[User visits /feeling/happy] --> FetchConfig[Fetch /feelings/happy/config.json]
    FetchConfig --> ParseConfig[Parse config for markdown paths]
    ParseConfig --> FetchMD[Fetch message.md and verses.md]
    FetchMD --> RenderMD[Render markdown with react-markdown]
    RenderMD --> ApplyTheme[Apply theming from config]
```

### Navigation Component

- Show: Home, Feelings Gallery
- Hide: Letters Gallery, Memories Gallery
- All routes remain accessible via direct URL

## GitHub Pages Deployment

1. Configure `vite.config.js` with base path
2. Markdown and config files in `public/` are copied as-is
3. Deploy: `npm run deploy` pushes to gh-pages branch

## NFC Card URLs

Direct links to feelings:

- `https://[username].github.io/[repo]/feeling/happy`
- `https://[username].github.io/[repo]/feeling/sad`
- etc.