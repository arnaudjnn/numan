This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can try the profile enrich function by running the following command:

```
curl -i -H "Content-Type: application/json" -X GET http://localhost:3000/api/enrich-profile?position=Global%20Marketing%20and%20Communication%20Manager
```

or directly by opening the following url in you browser:

http://localhost:3000/api/enrich-profile?position=Global%20Marketing%20and%20Communication%20Manager
