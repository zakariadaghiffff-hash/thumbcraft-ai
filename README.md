# ThumbCraft AI — AI YouTube Thumbnail Generator

A complete AI SaaS web application for generating, editing, and exporting high-CTR YouTube thumbnails.

![ThumbCraft AI](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue?logo=tailwindcss)

## Features

### Landing Page
- Premium futuristic SaaS design with glassmorphism and neon gradients
- Hero section with animated background orbs and particle grid
- AI thumbnail showcase gallery
- Pricing section with 3-tier plans
- Customer testimonials with star ratings
- CTA sections with smooth Framer Motion animations

### Authentication
- Email/Password login and registration
- Google OAuth integration via Firebase Auth
- Protected dashboard routes
- User session management

### Dashboard
- Prompt input with AI-powered suggestions
- Reference image upload via drag & drop
- 5 thumbnail style presets (MrBeast, Gaming, Documentary, Tech, Cinematic)
- Generate 4 thumbnail variations per prompt
- Thumbnail gallery with download, edit, and delete actions
- Generation history with Supabase persistence
- Quick stats and pro tips sidebar

### AI Thumbnail Generator
- OpenAI DALL-E 3 integration for HD image generation
- Style-specific prompt engineering for each preset
- Reference image context for guided generation
- 1792x1024 HD output with 4 variations

### Thumbnail Editor
- Canvas-based image editor (1280x720)
- Add/edit/drag text elements with customizable:
  - Font size, color, rotation
  - Text shadow effects
- Image adjustments (brightness, contrast, saturation)
- Neon glow effects with color picker and intensity control
- Quick presets (Enhance Colors, Cinematic Look, Add Neon Glow)
- Export as 1280x720 PNG

### UI/UX
- Full dark mode design
- Glassmorphism card effects
- Neon gradient accents (purple, blue, cyan, pink, green)
- Smooth hover effects and micro-animations
- Framer Motion page transitions
- Loading skeletons and states
- Responsive design (mobile, tablet, desktop)
- Custom scrollbar styling

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Components | shadcn/ui (custom) |
| Animations | Framer Motion |
| Auth | Firebase Authentication |
| Database | Supabase (PostgreSQL) |
| AI | OpenAI DALL-E 3 API |
| Icons | Lucide React |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project
- Supabase project
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd thumbcraft-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your API keys in .env.local
# Then start the dev server
npm run dev
```

### Environment Variables

See `.env.example` for all required environment variables:

- **Firebase**: API key, auth domain, project ID, etc.
- **Supabase**: Project URL and anon key
- **OpenAI**: API key for DALL-E 3

### Supabase Schema

Run this SQL in your Supabase SQL editor:

```sql
CREATE TABLE thumbnails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  default_style TEXT DEFAULT 'mrbeast',
  export_quality TEXT DEFAULT 'hd',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_thumbnails_user_id ON thumbnails(user_id);
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── generate/     # AI thumbnail generation endpoint
│   │   └── thumbnails/   # CRUD operations for thumbnails
│   ├── auth/
│   │   ├── login/        # Login page
│   │   └── register/     # Registration page
│   ├── dashboard/        # Main dashboard
│   ├── editor/           # Thumbnail editor
│   ├── layout.tsx        # Root layout with AuthProvider
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles & CSS variables
├── components/
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard-specific components
│   ├── editor/           # Editor components
│   ├── landing/          # Landing page sections
│   ├── shared/           # Navbar, Footer
│   └── ui/               # Reusable UI primitives
├── contexts/
│   └── AuthContext.tsx    # Firebase auth context
├── lib/
│   ├── firebase.ts       # Firebase configuration
│   ├── openai.ts         # OpenAI integration
│   ├── supabase.ts       # Supabase client & queries
│   └── utils.ts          # Utility functions
└── types/
    └── index.ts          # TypeScript type definitions
```

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
