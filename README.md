# SocialApp

A social media app built with Next.js, Supabase, Drizzle and Tailwind CSS.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: the main [Next.js](https://nextjs.org/) app
- `@repo/ui`: a React component library (built with [Tailwind CSS](https://tailwindcss.com/)) including shadcn ui components
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```
cd repo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd repo
supabase start
pnpm dev
```

The supabase container stack includes the following web services:
- Studio (http://localhost:54323) - Supabase's web-based UI for managing your database
- Inbucket (http://localhost:54324) - An email testing service

Authentication is handled by Supabase, and any email sent by the app will be captured by Inbucket in development.

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd repo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```
