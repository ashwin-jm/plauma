# Plauma

Plauma is a modern compliance-as-a-service web application designed to handle the heavy lifting of business compliance, licensing, and registrations. 

## 🚀 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Vanilla CSS (CSS Variables for dynamic light-mode theming)
- **Backend & Database**: Supabase (PostgreSQL, Auth, RLS)
- **State Management**: React Context API (`AuthProvider`)

## 🛠️ Features

- **Modern UI**: Clean, light-mode aesthetic with glassmorphism navbars, soft shadows, and micro-interactions.
- **Authentication**: Fully functional Sign In / Sign Up flow with Supabase Auth, client-side input sanitization, and graceful error mapping.
- **State Synchronization**: Global React Context ensures that signing in or out instantly updates the UI across all tabs.
- **Protected Routes**: The support/compliance portal (`#support`) is strictly protected and auto-redirects unauthenticated users.
- **Automated Profile Provisioning**: A secure PostgreSQL trigger automatically provisions a `public.profiles` record whenever a new user registers, with robust `COALESCE` safety and exception handling.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Supabase CLI (for local database development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root of the project with your Supabase credentials:
```env
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run the Local Database
Start the local Supabase environment to apply migrations and spin up the Postgres instance:
```bash
npx supabase start
```
*(If you make changes to the migrations, you can run `npx supabase db reset` to apply them)*

### 4. Start the Development Server
```bash
npm run dev
```

## 📂 Project Structure

- `src/components/`: Reusable UI elements (Navbar, Hero).
- `src/pages/`: Main application views (LandingPage, AuthPage, ProblemForm).
- `src/lib/`: Core utilities and integrations (`supabase.ts`, `AuthContext.tsx`).
- `supabase/migrations/`: SQL migration files defining the schema, RLS policies, and triggers.

## 🔒 Security Highlights

- **Row Level Security (RLS)**: Enforced on all tables (`public.profiles`, `public.support_requests`).
- **FOUC Prevention**: The UI intelligently masks content while the session hydrates on initial load to prevent flashing of unauthenticated states.
- **Exception Safety**: Database triggers use `EXCEPTION WHEN OTHERS` blocks to guarantee the auth flow never breaks due to metadata formatting errors.
