# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development**: `pnpm dev` (starts Next.js dev server with Turbo)
- **Build**: `pnpm build` (runs database migrations, then builds the app)
- **Linting**: `pnpm lint` (Biome linting with auto-fix) or `pnpm lint:fix` (lint + format)
- **Formatting**: `pnpm format` (Biome formatter)
- **Testing**: `pnpm test` (Playwright e2e tests)

### Database Commands

- **Generate migrations**: `pnpm db:generate`
- **Run migrations**: `pnpm db:migrate`
- **Database studio**: `pnpm db:studio`
- **Push schema**: `pnpm db:push`

## Architecture Overview

This is a Next.js 15 AI chatbot application with the following architecture:

### Core Structure

- **App Router**: Uses Next.js App Router with grouped routes `(auth)` and `(chat)`
- **Authentication**: Next.js Auth.js with guest user support and middleware protection
- **Database**: PostgreSQL with Drizzle ORM, schema in `lib/db/schema.ts`
- **AI Integration**: AI SDK with multiple model providers routed through Vercel AI Gateway
- **Styling**: Tailwind CSS with shadcn/ui components

### Key Directories

- `app/`: Next.js App Router structure
  - `(auth)/`: Authentication pages and API routes
  - `(chat)/`: Chat interface and chat-related API endpoints
- `components/`: React components organized by feature
  - `ui/`: shadcn/ui base components
  - `elements/`: Chat-specific components (message, reasoning, etc.)
- `lib/`: Core utilities and configurations
  - `ai/`: AI model configuration and tool definitions
  - `db/`: Database schema, queries, and migrations
  - `editor/`: Rich text editor configuration (ProseMirror)
- `artifacts/`: Dynamic artifact system (code, text, image, sheet renderers)
- `hooks/`: Custom React hooks

### Key Features

- **Artifacts System**: Dynamic rendering of generated content (code, documents, spreadsheets, images)
- **Multimodal Chat**: Supports text, images, and file attachments
- **Document Editing**: Rich text editor with ProseMirror
- **Code Execution**: In-browser code execution environment
- **File Processing**: Support for various file formats including PDFs and spreadsheets
- **Authentication**: Guest users and registered users with session management

### AI Models & Tools

- Default models: Grok Vision and Grok Reasoning
- Built-in tools: weather, document creation/updates, suggestions
- Tool definitions in `lib/ai/tools/`

### Configuration

- **Biome**: Code formatting and linting (replaces ESLint/Prettier)
- **TypeScript**: Strict configuration with path aliases (`@/*`)
- **Tailwind**: v4.1.13 with custom configuration
- **Database**: Drizzle with PostgreSQL, migrations in `lib/db/migrations/`

### Testing

- **Playwright**: End-to-end testing with page objects in `tests/pages/`
- **Test environment**: Uses `PLAYWRIGHT=True` environment variable
- Test structure: `tests/e2e/`, `tests/pages/`, `tests/prompts/`

### Environment Setup

- Copy `.env.example` to `.env.local`
- Requires `POSTGRES_URL` and `AUTH_SECRET` at minimum
- For non-Vercel deployments: also need `AI_GATEWAY_API_KEY`