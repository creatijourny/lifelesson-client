# 🌱 LifeLesson

> **Capture experiences. Share wisdom. Grow together.**

LifeLesson is a modern full-stack platform where people can preserve meaningful life experiences, discover wisdom shared by others, and build a personal collection of lessons that inspire growth.

The platform combines a beautiful user experience with premium features, secure authentication, subscription management, and a powerful admin dashboard.

---

## ✨ Features

### 🌍 Public Experience

- Browse public life lessons without signing in
- Search lessons by title
- Filter lessons by category
- Featured Lessons section controlled by Admin
- Responsive, animated UI with Framer Motion

### 👤 User Features

- Secure authentication with Better Auth
- Create and publish personal life lessons
- Save favorite lessons
- Manage personal lessons
- Edit or delete own lessons
- View profile and subscription status

### 💎 Premium Features

- Premium-only lesson publishing
- Premium lesson access protection
- Stripe-powered subscription system
- Premium badges throughout the platform

### 🛡️ Admin Dashboard

- Dashboard analytics
- User growth chart
- Lesson growth chart
- Manage users
- Promote users to Admin
- View Premium members
- Manage all lessons
- Feature lessons
- Mark lessons as reviewed
- Toggle Free ↔ Premium
- Delete inappropriate content
- Reported lessons moderation
- Pagination
- Filters by category, visibility, and flags

---

## 🚀 Tech Stack

### Frontend

- Next.js 15
- React
- HeroUI
- Framer Motion
- Gravity UI Icons
- Recharts
- Tailwind CSS

### Backend

- Express.js
- MongoDB
- Better Auth
- JSON Web Token (JWT)
- jose-cjs (JWKS verification)

### Payments

- Stripe Checkout
- Stripe Webhooks
- Premium subscription management

---

## 🖼️ UI Highlights

- Frosted glass navigation
- Animated Hero Slider
- Dynamic Featured Lessons
- Premium gradient cards
- Interactive dashboard charts
- Smooth page transitions
- Fully responsive design

---

## 📂 Project Structure

```text
life-lesson/
├── client/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── public/
│   └── ...
│
├── server/
│   ├── middleware/
│   ├── routes/
│   ├── index.js
│   └── ...
│
└── README.md

------------------------------------------------------------------
------------------------------------------------------------------
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
