#### final-project-cpe500
  - Payment processor application, https://final-project-cpe500.vercel.app/

- **Tech stack**:
  - [Next.js](https://nextjs.org/) - Next.js for our frontend.
  - [Supabase](https://supabase.com/) - Serveless backend and database infra

### React/Next.js project structure

- `components` - UI Components shared across the app
- `hooks` - Custom hooks
- `pages` - Next.js pages
  - `api` - Next.js API routes
  - `_app.page.tsx` - A scaffold that wraps around all pages
  - `index.page.tsx` - Home page
  - `[page-name]` - Page name
    - `index.page.tsx` - Page content
    - `components` - UI Components used only on this page
  - `global.css` - Global styles
- `public` - Static files, images, fonts, etc.
- `lib` - Custom code, utils and function shared across the app

### Naming conventions

- `camelCase` for variables, functions and methods.
- `PascalCase` for components and classes.
- `kebab-case` for files and folders.
