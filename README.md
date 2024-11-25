# Chatly

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

In This project, I work with Edge Runtime and retrieval augmented generation (RAG).

## Tech Stack

- Next.js
- Typescript
- TanStack Query
- Clerk Auth
- Drizzle ORM + Neon DB
- Stripe

## AI Tech Stack

- PineconeDB
- Langchain
- Open AI
- Vercel AI SDK

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Applying changes to the database

You can directly apply changes to your database using the drizzle-kit push command. This is a convenient method for quickly testing new schema designs or modifications in a local development environment, allowing for rapid iterations without the need to manage migration files:

```
npx drizzle-kit push
```

### Browsing the database

You can browse your database using the drizzle-kit studio command. This will open a web-based interface that allows you to interact with your database, view data, and run queries:

```
npx drizzle-kit studio
```

Drizzle ORM: Focuses on defining and interacting with the database schema using TypeScript.<br/>
Drizzle Kit: Provides tools for managing database schema changes and migrations, and offers additional utilities for database interaction.

## What are Vector Embeddings? 
Vector embeddings are a way to represent data as points in a multidimensional space, where similar data points cluster together. This compact representation captures the semantic relationships and similarities between data points, making it possible to perform mathematical operations and comparisons on the data.

In Chatly, we use vector embeddings to enable AI-powered interactions with PDF documents. This is how retrieval augmented generation works:

1. **Obtain the PDF**: The first step is to obtain the PDF.
2. **Split and Segment**: The second step is to split and segment the PDF. Langchain helps us with this process.
3. **Vectorize and Embed**: The third step is to vectorize and embed individual documents.
4. **Store Vectors**: The fourth step is to store the vectors into PineconeDB.
5. **Search the PDF**: We then try to search the PDF as a query.
6. **Embed the Query**: The fifth step is to embed the query.
7. **Query PineconeDB**: The sixth step is to query PineconeDB for similar vectors.
8. **Extract Metadata**: The seventh step is to extract the metadata of the similar vectors.
9. **Feed Metadata into OpenAI**: The eighth step is to feed the metadata into an OpenAI prompt.

This process allows the AI to understand and retrieve relevant information from the document, making it possible to chat with the AI about the content of the PDF.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
