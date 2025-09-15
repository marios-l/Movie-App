# Movie App

A React application built with [Vite](https://vitejs.dev/) and [TypeScript](https://www.typescriptlang.org/).

---

## Tech Stack
- React
- Vite
- TypeScript

---

## Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

---

## Clone the Repository (Git)

### Using HTTPS
```bash
git clone https://github.com/marios-l/Movie-App.git
```
---

## Run in Development
If you use VS Code, open the project from the path with:
```bash
code .
```

Install dependencies 
```bash
npm install
```

Start the Vite dev server:
```bash
npm run dev
```
---

## Tech Choices

- **React** – Requested.
- **TypeScript** – Type safety, better IDE tooling & DX, fewer runtime bugs. Cleaner domain models and API types.
- **Vite** – Fast dev server and production build. Simple config, nice DX.
- **Routing:** – React Router for navigation.
- **UI/Styling:** – Chakra UI chosen for the great amount of UI elements and ease of use.
- **HTTP client:** – Fetch with axios with centralized base URL.
- **Lint/Format:** ESLint + Prettier – Consistent style.
- **Build script:** `tsc -b && vite build` – Fails the build on type errors before bundling.

---

## State & Data Flow & Architectural choices

- **Local UI state** (search input & year drop down list) always in sync with data via `useState`.
- **Backend** (data from the TMDB API):
  - Declarative `useQuery` for fetching movie results.
  - Caching movie results with combination (movie keyword + year + page) and `staleTime`
- **Data** (TMDB API):
  - **Requests**
    → Changes on either movie keyword, year or page requested, trigger a new request via `useQuery`.
  - **Responses**
    → There is a maximum total of 500 pages and maximum total of 10000 movie results for each response from the API.
    → Used pagination to render the results, based on API responses.
- **Loading UX**:
  - Spinners while requesting data.
  - Old data (movie list) is still shown until new data arrives.
- **Error page**
  -- 404 generic error page for urls that do not exist.
- **Authentication**
  - Centralized with **AuthContext** providing `user`, `login` and `logout`.
  - **Fake login:** compares against hardcoded credentials and issues a mock user.
  - **Persistence:** session is saved to `localStorage` and rehydrated on app start.
  - **Logout:** clears context state and removes the user session key from `localStorage`.
- **Favorites page**
  - Managed through a custom **`useFavorites`** hook with `favorites` `add`, `remove`, `toggle`, `isFavorite` helpers.
  - Users can **save** movies directly from API results.
  - **Favorites Page:** shows the favorites list with option to **remove** items.
  - **Persistence:** favorites are stored in `localStorage` and rehydrated on app start.

> Note: I used a custom `useFavorites` hook for simplicity. This keeps state local to each caller, which is great for small apps. The trade-off is that multiple components won’t automatically share updates. If Favorites usage grows app-wide (header badges, lists, etc), I would wrap the hook in a Context so all consumers stay in sync without prop drilling.