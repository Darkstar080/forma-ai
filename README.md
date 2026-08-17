# Forma AI

AI-augmented dynamic form engine. Monorepo (npm workspaces).

## Structure

```
forma-ai/
├── apps/
│   ├── client/     React + Vite + React Hook Form + Zustand
│   └── server/     Express + Mongoose (MongoDB) + LangChain (add in Week 2)
├── packages/
│   └── shared/     Schema/type contracts shared between client and server
└── .github/workflows/ci.yml
```

## Setup

```bash
npm install
cp apps/server/.env.example apps/server/.env
# edit apps/server/.env with your MongoDB URI and LLM API key
```

## Run

```bash
npm run dev:server   # http://localhost:4000
npm run dev:client   # http://localhost:5173
```

## Team tracks

| Track | Folder | Owner |
|---|---|---|
| Backend / Schema | apps/server/src/models, src/routes | TBD |
| AI / LLM extraction | apps/server/src/services | TBD |
| Frontend | apps/client/src | TBD |

## Branch convention

`feature/<track>-<short-description>`, e.g. `feature/backend-schema-model`.
PRs into `main` require 1 approval (set this up in repo Settings → Branches).
