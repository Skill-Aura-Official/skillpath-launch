# Skillpath launch

A React/TypeScript career-platform prototype maintained in Skill-Aura-Official's repository. The UI includes jobs and internships, companies, a candidate profile/dashboard, recruiter job posting, authentication and career-help views. It originated from a Lovable starter and uses Vite, shadcn/ui and Tailwind CSS; existing contributor and dependency attribution is preserved.

## Current implementation

Supabase supplies the authentication/data client. `supabase/migrations` contains schema and policy migrations. `src/services/realTimeJobApi.ts` returns mock job listings for named job sources; these are not verified live provider feeds. `src/components/AIAssistant.tsx` uses local keyword-based responses and a simulated delay, not a demonstrated external language-model service. UI labels must not be taken as evidence of live job sourcing or AI accuracy.

## Local development

Use Node.js and npm compatible with the locked Vite 5 dependencies (Node 24.3.0 was used for the build check). From the repository root:

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

The configured development port is 8080. Read the printed URL if that port is occupied. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for an authorized development project; these are browser-visible settings. Never use a service-role key in a Vite variable. `VITE_API_URL` is referenced by job services but does not turn mock providers into live integrations. Preserve existing configuration and do not copy committed environment values into another installation.

Review and apply the SQL files under `supabase/migrations` to the intended development project through an authorized Supabase workflow, in filename order. This review did not apply cloud migrations or provision accounts. Authentication uses Supabase; no default user or administrator is supplied. Verify signup, redirects, roles and row-level policies against your project before use with real data.

## Build and checks

```sh
npm run build
npm run lint
npm run preview -- --host 127.0.0.1
```

`build:dev` is also available for a development-mode bundle. No automated test script is declared. Builds/lint do not prove cloud authentication, recruiter authorization or real job availability. Deployment needs SPA route fallback and the correct public build configuration; no hosted deployment was verified here. A Lovable project link is not required for local development.

If the page fails during initialization, verify Supabase configuration. If lists show examples, inspect the mock provider implementation before attributing the issue to a remote service. There is no repository licence file in this revision; this README grants no new licence and preserves all existing notices.

## Documentation review checks (2026-11-07)

Clean installation (lifecycle scripts disabled) and build passed on Node 24.3.0. The source repair now passes lint with zero errors and 12 existing warnings, plus `npx tsc -p tsconfig.app.json --noEmit`. Profile consumers use the role already fetched from `user_roles`; generated profile types, explicit icon/prop types and unknown-error narrowing replace unchecked types. Live cloud workflows remain unverified.
