# Forma AI — Team Git Workflow
 
Read this once, fully, before your first commit. It's short on purpose.
 
## Branches
 
- `main` — always working. Only updated by merging `dev` in, at each milestone
  (Mid-Project Review, Final Review), once tested.
- `dev` — integration branch. Everyone's finished work lands here first.
- `feature/<short-name>` — one per task, e.g. `feature/backend-schema-model`,
  `feature/llm-extraction-prompt`, `feature/dynamic-form-renderer`
**Rule: nobody pushes directly to `main` or `dev`.** Both are protected on
GitHub — a direct push will be rejected. Everything goes through a Pull
Request (PR).
 
---
 
## A) One-time setup — every teammate does this once
 
```bash
git clone https://github.com/<your-org-or-username>/forma-ai.git
cd forma-ai
npm install
```
 
That single `npm install` at the root installs the client, server, and
shared packages together — this is a monorepo using npm workspaces.
**Don't `cd` into `apps/client` or `apps/server` and run `npm install`
separately** — that creates a second, conflicting lockfile.
 
Then set up your local environment file:
 
```bash
cp apps/server/.env.example apps/server/.env
```
 
Fill in your own MongoDB URI (and LLM API key once that's added in Week 2).
`.env` is gitignored — never commit it.
 
---
 
## B) Daily workflow — every task, every person
 
**1. Start a new task from an up-to-date `dev`:**
 
```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-task-name
```
 
**2. Work, commit often, with clear messages:**
 
```bash
git add .
git commit -m "feat: add showIf condition evaluation to form renderer"
```
 
Prefixes to use: `feat:` (new functionality), `fix:` (bug fix), `chore:`
(config/cleanup, no feature change).
 
**3. Push your branch:**
 
```bash
git push -u origin feature/your-task-name
```
 
(Only the first push needs `-u`; after that, just `git push`.)
 
**4. Open a Pull Request on GitHub:**
 
- Base branch: `dev`  ← Compare branch: `feature/your-task-name`
- Short description of what you changed and why
- Tag someone for review if the change touches `packages/shared` (see Hard
  Rule 3 below) — otherwise self-merge is fine
**5. Address review feedback by pushing more commits to the same branch** —
the PR updates automatically, no need to open a new one.
 
**6. Once approved (or self-reviewed), merge** — "Squash and merge," to keep
`dev`'s history clean.
 
---
 
## C) If `dev` has moved on while you were working
 
Before you finish, sync your branch so you're not merging stale code:
 
```bash
git checkout feature/your-task-name
git fetch origin
git merge origin/dev
```
 
Resolve any conflicts shown, then:
 
```bash
git add .
git commit -m "merge dev into feature branch"
git push
```
 
---
 
## D) Milestone: promoting `dev` into `main`
 
Only after `dev` has been tested and is actually stable — done via PR, same
as any other merge:
 
```bash
git checkout main
git pull origin main
git checkout -b release/milestone-1
git merge dev
git push -u origin release/milestone-1
```
 
Open a PR from `release/milestone-1` into `main` on GitHub, merge it there.
 
---
 
## Hard rules — these are not suggestions
 
1. **No direct pushes to `main` or `dev`** — always a feature branch + PR.
   GitHub will reject a direct push either way, but don't rely on that as
   your first line of defense.
2. **`packages/shared/src/index.js` is a shared contract.** It defines the
   field/schema shape that the backend's LLM extraction output, the MongoDB
   schema, and the React form fields all have to agree on. If you need to
   change it, tell the team first — don't quietly edit it inside your own
   feature branch. A silent change here breaks the other two tracks without
   any error message telling you why.
3. **The golden rule for the form renderer: form structure comes ONLY from
   the backend JSON schema, never hardcoded in a component.** If you catch
   yourself writing something like `if (formId === "auto_insurance") { render
   this specific field }`, stop — that's the exact problem this architecture
   exists to eliminate. Every field, label, and branching rule should trace
   back to the schema, not to a conditional in your JSX.
4. **AI extraction output must match `packages/shared` field IDs exactly.**
   If the LLM returns `"vehicleMake"` but the schema defines `"vehicle"`,
   the form won't populate and it'll look like a frontend bug when it's
   actually a prompt/schema mismatch. Check this first before debugging
   anything else in that pipeline.
5. **Commit often, in small pieces.** A PR that changes 500 lines is much
   harder to review than five PRs that change 100 lines each.
---
 
## If something breaks
 
- **Push rejected, "protected branch"** — you tried pushing to `main`/`dev`
  directly. Make a feature branch instead.
- **Merge conflict** — don't panic, don't force anything. Paste the exact
  conflict markers to the team if you're not sure how to resolve it.
- **`node_modules` showing up in your `git status`** — something's wrong
  with `.gitignore` recognition, or you ran `npm install` inside a
  subfolder instead of the root. Stop and check before committing.
- **`npm audit` shows vulnerabilities** — check the "Known issues" section
  in the root `README.md` first. If it's the esbuild/Vite one, it's already
  been reviewed and accepted (dev-server only, not production-facing) —
  don't spend time re-fixing it.