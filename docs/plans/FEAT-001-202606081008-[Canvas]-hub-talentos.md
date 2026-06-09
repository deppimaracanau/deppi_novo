# REASONS Canvas: Hub de Talentos

## R - Requirements
- **Goal:** Implement a "Hub de Talentos" (Talent Hub) to showcase students and alumni from all IFCE Maracanaú courses (IT, Engineering, Chemistry, Math, etc.) to the market.
- **Design:** Modern "Neo-brutalism" aesthetic (vibrant colors, thick black borders, hard shadows) with flip cards for each profile.
- **Data Source:** Initially planned for Google Sheets API, but simplified to a dedicated PostgreSQL table (`talentos`) for the MVP to avoid external dependencies.
- **Key Features:**
  - Flip cards showing basic info (front) and skills/links (back).
  - Search by name, course, or skill.
  - Filter by course via clickable chips.
  - Dynamically generated pixel-art avatars (via DiceBear API) based on names.
  - Emojis automatically mapped to technical skills.
  - CTA linking to a Google Form for new applications.
- **Definition of Done (DoD):**
  - Database migration creates `talentos` table.
  - REST API provides `GET /api/talentos` (public, approved only), `POST`, `PUT`, `DELETE` (protected).
  - Angular frontend implements `/talentos` lazy-loaded module.
  - Main navigation header includes a "Talentos" link.
  - Cross-browser 3D flip card animations work properly.
  - Fully responsive on mobile and desktop.

## E - Entities
- **Talento (Frontend Interface & JSON):**
  - `id`: String
  - `nome`: String
  - `curso`: String
  - `semestre`: String
  - `superpoder`: String
  - `bio`: String
  - `skills`: String[]
  - `github`: String (Optional)
  - `linkedin`: String (Optional)
  - `avatar_seed`: String
  - `foto`: String (Optional, direct Google Drive link)
  - `turno`: String
  - `disponibilidade`: String
  - `idiomas`: String[]
  - `experiencia`: String
  - `curriculo`: String (Optional)
  - `autorizado`: Boolean

## A - Approach
- **Backend/Data Pipeline:** The Python script parses all detailed form answers (Shift, Availability, Languages, Experience, Resume Link). It also transforms Google Drive photo links into direct image links. It retains unauthorized users but flags them as `autorizado: false`.
- **Frontend:** The Angular `TalentosModule` will display the actual `foto` if available, falling back to DiceBear `avatar_seed`.
- **Privacy Policy (Borrar):** For profiles where `autorizado` is `false`, the card will be rendered but a CSS class (`.blurred-card`) will obscure the personal data to respect privacy while showing platform activity.
- **Icons/Visuals:** Build a `SKILL_EMOJIS` dictionary to map technical keywords (like 'python', 'solidworks', 'cálculo') to relevant emojis, supporting all IFCE Maracanaú departments.

## S - Structure
- **Data Pipeline:**
  - `scripts/sync_talentos.py`: Python script that fetches from Google Sheets and writes JSON.
  - `src/assets/data/talentos.json`: The generated static JSON file (should be gitignored or generated in CI/CD).
- **Client (Angular):**
  - `src/app/features/talentos/talentos.module.ts` (Component + Module + Route)
  - `src/app/app.module.ts` (Lazy route registration)
  - `src/app/layout/components/header/header.component.ts` (Navigation)

## O - Operations
1. Create `scripts/sync_talentos.py` using `pandas` or `requests` (or `gspread` if using service account).
2. For public form data without auth, export the Google Sheet as CSV (`https://docs.google.com/spreadsheets/d/ID/export?format=csv`) to simplify the script.
3. The script downloads the CSV, parses columns (Nome, Curso, Semestre, Superpoder, Bio, Skills, GitHub, LinkedIn), and formats them into a JSON array.
4. Save the output to `src/assets/data/talentos.json`.
5. Refactor the Angular `TalentosModule` component to fetch `assets/data/talentos.json` via `HttpClient` instead of the backend API.
6. Remove the `talentos` PostgreSQL migration, seed, controller, and routes (optional, if we want to clean up the MVP code).

## N - Norms
- **CSS:** Use standard CSS classes for styling (neo-brutalism theme rules).
- **TypeScript:** Strict mode enabled. Use descriptive names. No `any` type where possible.
- **Security:** Public API endpoints must not expose unapproved profiles. Mutations must require authentication.
- **Commit/Naming:** Keep migrations sequential (e.g., `007_...`).

## S - Safeguards
- **Performance:** DiceBear avatars must use standard seed URLs and be cached by the browser.
- **UI Integrity:** Long bios must use CSS line-clamping to avoid breaking card layout (`-webkit-line-clamp: 3`).
- **Database:** Bio length is constrained at the database level (`varchar(150)`).

### SPDD Feature Update: Market Ready Badge
* **Context**: We need to highlight students who have experience so recruiters can quickly spot them.
* **Entity**: `Talento` in `talentos.module.ts`.
* **Action**: Introduced `.market-badge` UI element that conditionally displays `⚡ Pronto pro mercado` if `t.experiencia` is truthy and includes the word "Sim".
* **Constraint**: Must match neo-brutalism design and support Dark Mode seamlessly. Done via inline `[class]` binding and `:host-context([data-theme="dark"])`.
