Here’s the updated **README.md** that includes full Supabase setup instructions alongside the interactive background component installation.

```markdown
Portfolio – Next.js + Supabase + Interactive Network Background

A modern portfolio application built with Next.js 14, Supabase (auth, database, storage), and a full‑screen interactive particle field powered by React Three Fiber.

---

 ✨ Features

- 🎨 Immersive background – Cursor‑responsive particle network with bloom & glitch effects.
- 🔐 Supabase authentication** – Email/password, OAuth (Google, GitHub), session management.
- 🗄️ Database – PostgreSQL with migrations, row‑level security.
- 📄 Resume builder – Dynamic resume generation.
- 📁 File storage** – Upload and manage user files.
- 🚀 Server components & actions – Next.js App Router with server actions.
- 📱 Fully responsive – Works on all devices.

---

📦 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A [Supabase](https://supabase.com) account (free tier is fine)
- Git

---

🛠️ Installation

1. Clone the repository


git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Supabase

#### a. Create a Supabase project

- Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a new project.
- Note your **Project URL** and **Anon / Secret keys** (from Project Settings → API).

#### b. Configure environment variables

Create a `.env.local` file in the root of your project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # optional, for admin operations

# Optional: for OAuth
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ Never commit `.env.local`. It’s already in `.gitignore`.

#### c. Run database migrations

The project includes migrations in `supabase/migrations/`. Apply them using the Supabase CLI:

```bash
# Install Supabase CLI (if not already)
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Push migrations to your remote database
supabase db push
```

Alternatively, you can copy the SQL from `supabase/migrations/*.sql` and run it manually in the Supabase SQL Editor.

#### d. Set up storage buckets

The app expects a bucket named `resumes` for file uploads. Create it via:

- Supabase Dashboard → Storage → Create a new bucket → name: `resumes`, public or private as needed.
- Then set up Row Level Security (RLS) policies (provided in migrations).

---

## 🚀 Running the project

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The interactive background will be active on all pages.

### Production build

```bash
npm run build
npm start
```

---

## 🎨 Interactive Background Component

The background is located in `app/components/NetworkBackground.jsx`.  
It uses **React Three Fiber** and **Three.js** to create a full‑screen particle vortex.

### Customization

Edit the constants at the top of `NetworkBackground.jsx`:

| Constant | Description | Default |
|----------|-------------|---------|
| `PARTICLE_COUNT` | Number of glowing particles | 180 |
| `CONNECT_DIST` | Max distance for connection lines | 3.2 |
| `MOUSE_ATTRACT_STRENGTH` | How strongly particles follow mouse | 0.008 |
| `MOUSE_RADIUS` | Radius of magnetic effect | 1.8 |
| `COLORS` | Palette (background, particles, lines) | Pink/Cyan |

To disable post‑processing effects (Bloom, Glitch), comment out the `<EffectComposer>` block.

> 💡 **Cursor not visible?** The component does **not** hide the cursor. If yours disappears, check for any global `cursor: none` CSS.

---

## 🗄️ Supabase Schema Overview

The main tables used in this project:

- `users` – extended Supabase auth users (handled via triggers)
- `resumes` – stored resume data (JSON, title, visibility)
- `profile` – user profiles (avatar, bio, social links)

All tables have Row Level Security (RLS) enabled – see `supabase/migrations` for policies.

---

## 🧪 Testing Supabase connection

After setting up `.env.local`, you can test the client:

```typescript
// app/lib/supabase/client.ts already configured
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
const { data } = await supabase.from('resumes').select('*')
```

---

## 📁 Project Structure (relevant parts)

```
portfolio/
├── app/
│   ├── actions/            # Server actions (resume CRUD, auth)
│   ├── admin/              # Admin dashboard (protected)
│   ├── api/                # API routes (e.g., webhooks)
│   ├── auth/               # Authentication pages (login, signup, callback)
│   ├── components/         # Reusable UI components
│   │   └── NetworkBackground.jsx   # Interactive 3D background
│   ├── demo/               # Demo pages
│   ├── lib/
│   │   └── supabase/       # Supabase clients (admin, client, server)
│   ├── resume-builder/     # Resume builder feature
│   ├── layout.tsx
│   └── page.tsx
├── lib/                    # Shared utilities
├── public/                 # Static assets
├── supabase/
│   ├── migrations/         # SQL migrations (applied via CLI)
│   └── config.toml         # Supabase CLI config
├── .env.local              # Environment variables (ignored)
└── package.json
```

---

## 🔧 Troubleshooting

### Supabase errors

- **“relation does not exist”** – Migrations haven’t been run. Run `supabase db push`.
- **“permission denied”** – RLS is blocking. Check your policies or use service role key for admin operations.
- **Auth session not found** – Ensure you’ve set `NEXT_PUBLIC_SUPABASE_URL` and `ANON_KEY` correctly, and that cookies are being handled (see `lib/supabase/server.ts`).

### Background not showing

- Make sure `three`, `@react-three/fiber`, `@react-three/drei`, and `@react-three/postprocessing` are installed.
- Check browser console for WebGL errors (some environments block WebGL).
- Reduce `PARTICLE_COUNT` if performance is low.

---

## 📄 License

MIT – free for personal and commercial use.

---

## 🙌 Acknowledgements

- [Next.js](https://nextjs.org)
- [Supabase](https://supabase.com)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js](https://threejs.org)

---

**Enjoy building your portfolio!** 🚀
```

This README now covers:

- Full Supabase setup (project creation, env vars, migrations via CLI)
- Storage bucket creation
- Overview of schema and RLS
- Testing instructions
- Troubleshooting specific to Supabase and the 3D background
- Updated project structure reflecting your image

You can copy-paste this as your `README.md`. Adjust the repository URL and any specific table names if needed.



# 👨‍💻 Author

Built with passion by **Amu** ❤️

If you like this project, please consider:

```bash
git clone <your-repo-url>
cd portfolio
npm install
npm run dev
```

⭐ Star the repository
💖 Support the project
🚀 Start building amazing things

---

# 🌌 Final Note

A cinematic particle-powered frontend paired with Supabase scalability.
Tiny glowing constellations in the UI, industrial-strength data pipes underneath.

Happy coding 💜


**Enjoy your interactive background!** 🎨✨
```

This README covers:

- Installation steps for Next.js + required packages
- Usage example with proper z‑index layering
- Customisation table for easy tweaking
- Explanation of core mechanics
- Troubleshooting for common issues (cursor, performance, TypeScript)
- Folder structure and license

You can adjust the preview image URL or remove it if not needed.


