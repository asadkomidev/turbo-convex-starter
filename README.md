# Turbo Convex Starter Kit

<div align="center">
  <img src="https://necessary-bloodhound-36.convex.cloud/api/storage/ad406632-eabb-4b58-a28b-3044e5ef3f3a" alt="Turbo Convex Starter Kit" width="100%" />
  <p>The Ultimate SaaS Starter Kit built with Convex, Turborepo, and Next.js</p>
</div>

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fasadkomidev%2Fturbo-convex-starter)
[![GitHub stars](https://img.shields.io/github/stars/asadkomidev/turbo-convex-starter)](https://github.com/asadkomidev/turbo-convex-starter/stargazers)
[![License](https://img.shields.io/github/license/asadkomidev/turbo-convex-starter)](https://github.com/asadkomidev/turbo-convex-starter/blob/main/LICENSE)

</div>

## 🚀 Features

- 📦 [Turborepo](https://turbo.build/repo) - High-performance build system for monorepos
- ⚡️ [Next.js 14](https://nextjs.org/) - React framework with App Router
- 🔄 [Convex](https://www.convex.dev/) - Real-time backend with automatic cache updates
- 🎨 [Shadcn/UI](https://ui.shadcn.com/) - Beautiful and accessible UI components
- 🎯 [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- 💅 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 💳 [Polar.sh](https://polar.sh/) - Integrated payments and subscriptions
- 📨 [Resend](https://resend.com/) - Email service for transactional emails
- 🔐 [Auth.js](https://authjs.dev/) - Authentication with multiple providers
- 🏗️ [React Hook Form](https://react-hook-form.com/) - Form validation and handling
- 📊 [Zustand](https://zustand-demo.pmnd.rs/) - State management
- 🎭 [Zod](https://zod.dev/) - Schema validation

## 📋 Prerequisites

- Node.js 18+ and pnpm
- [Convex](https://dashboard.convex.dev/) account
- [Polar.sh](https://polar.sh/) account for payments
- [GitHub](https://github.com/) account for authentication

## 🛠️ Getting Started

### Option 1: Using the CLI (Recommended)

Create a new project with our official CLI:

```bash
npm create @tcn-dev/tcn
```

The CLI will guide you through:

1. Project name selection
2. Template configuration
3. Dependencies installation
4. Environment setup

### Option 2: Manual Setup

1. Clone the repository:

```bash
git clone https://github.com/asadkomidev/turbo-convex-starter.git
cd turbo-convex-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your environment variables:

```env
# Auth
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=

# Convex
NEXT_PUBLIC_CONVEX_URL=

# Payments
POLAR_ACCESS_TOKEN=
POLAR_ORGANIZATION_ID=
POLAR_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=
```

5. Start the development server:

```bash
pnpm dev
```

### Key Directories

#### `/apps/web`

- Modern Next.js 14 application with App Router
- Feature-based architecture for better scalability
- Real-time dashboard features
- Marketing pages with modern UI components

#### `/packages/backend`

- Convex backend implementation
- Email service integration with templates
- User management and authentication
- Subscription and billing management
- Real-time database functionality

#### `/packages/ui`

- Shared UI component library
- Built on top of shadcn/ui
- Fully customizable components
- Consistent design system

## 🔐 Authentication

- GitHub OAuth
- Email OTP

## 🚀 Deployment

1. Deploy your Convex backend:

```bash
npx convex deploy
```

2. Deploy your Next.js application to Vercel:

```bash
pnpm run deploy
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Turborepo](https://turbo.build/repo)
- [Next.js](https://nextjs.org/)
- [Convex](https://www.convex.dev/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Polar.sh](https://polar.sh/)

## 📧 Support

If you find this template helpful, please give it a ⭐️
