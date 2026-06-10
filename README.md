# EstateHub — Public Real Estate Website

A consumer-facing website that connects to the **shared RealEstate CRM backend**. This is a separate frontend project designed to live in its own git repo in the future.

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│  RealEstateWebsite  │     │   RealEstate CRM    │
│  (this project)     │     │   (admin UI)        │
│  Port: 5175         │     │   Port: 5173/5174   │
└─────────┬───────────┘     └─────────┬───────────┘
          │                           │
          │    ┌──────────────────────┤
          └───►│  RealEstateCRMBackend │
               │  Port: 3000           │
               │  /api/v1              │
               └───────────────────────┘
```

### Website as Receiver
- `GET /api/v1/public/properties` — displays available listings
- `GET /api/v1/public/properties/:id` — property detail page

### Website as Feeder
- `POST /api/v1/public/inquiries` — creates leads in CRM with source "Website"

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5175

### Environment

```
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WEBSITE_API_KEY=          # optional, matches backend WEBSITE_API_KEY
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, featured properties, inquiry form |
| Properties | `/properties` | All available listings from backend |
| Property Detail | `/properties/:id` | Single property + inquiry form |
| Contact | `/contact` | General inquiry form |

## Separate Git Repo

This folder is self-contained with its own `package.json`, `.env`, and build config. To split into a separate repo:

```bash
cd RealEstateWebsite
git init
git add .
git commit -m "Initial EstateHub website"
```

Point `VITE_API_BASE_URL` to your deployed backend in production.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Query + React Router
- React Hook Form + Zod
- Axios
# DurgaPropertyWebsite
