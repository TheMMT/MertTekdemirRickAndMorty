# Rick and Morty Character Explorer

A Next.js 15 application that allows users to browse and filter Rick and Morty characters using the [Rick and Morty API](https://rickandmortyapi.com).

## Features

- Browse characters from the Rick and Morty universe
- Filter characters by status (alive, dead, unknown) and gender (female, male, genderless, unknown)
- Server-Side Rendering (SSR) for improved performance and SEO
- Modern UI using shadcn/ui components and Tailwind CSS
- URL query parameter-based filtering
- Pagination support

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui for UI components
- Zustand for state management
- React Query for API data fetching
- nuqs for URL query parameter management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

- `src/app`: Next.js app router pages and layouts
- `src/components`: React components
  - `src/components/ui`: shadcn/ui components
- `src/hooks`: Custom React hooks
  - `src/hooks/api`: API-related hooks using React Query
- `src/lib`: Utility functions and providers
- `src/store`: Zustand store for state management
- `src/types`: TypeScript type definitions
