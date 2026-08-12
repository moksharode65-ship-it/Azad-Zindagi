# 🌟 Azad Zindagi Foundation — NGO Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Integrated-0C2340?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)

> **Azad Zindagi Foundation** is a registered Section 8 non-profit organization based in Maharashtra, India. Dedicated to protecting rescued, missing, and trafficked children through tracing, community awareness, POCSO guidance, education, and holistic rehabilitation.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features & Highlights](#-key-features--highlights)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Development Server](#running-development-server)
- [Admin & Donation Integration](#-admin--donation-integration)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [License & Contact](#-license--contact)

---

## 🛡️ Overview

The **Azad Zindagi Foundation Web Platform** is designed to provide an engaging, high-impact digital presence for the organization. Built with modern web aesthetics (glassmorphism, smooth animations, dynamic dark mode), it enables supporters to learn about the organization's initiatives, track journey milestones, explore real success stories, and make secure online donations.

### Core Objectives:
* 🔍 **Child Tracing & Rescue**: Assisting law enforcement and families in locating missing and trafficked children.
* 📚 **Education Drive**: Providing access to formal schooling, learning kits, and mentorship.
* ⚖️ **Legal & POCSO Support**: Spreading awareness regarding child rights and protection laws.
* 🤝 **Community Action**: Empowering local grassroots networks across Maharashtra.

---

## ✨ Key Features & Highlights

* 🎨 **Glassmorphism & Modern UI**: Futuristic, accessible dark mode layout with custom Indian-flag inspired color accents (Saffron & Emerald accents).
* 🛡️ **Interactive Trust Hero Section**: Highlighting key verification badges, dynamic partner marquee, and real-time impact counters.
* 🌌 **Radial Orbital Timeline**: A custom interactive visual timeline detailing the history and growth milestones of Azad Zindagi Foundation.
* 🃏 **Draggable Testimonial Cards**: Smooth, physics-driven card stack showcase built with Framer Motion for real beneficiary stories.
* 💳 **Razorpay Donation Gateway**: Integrated online payment workflow allowing supporters to make direct contributions, select predefined/custom amounts, and input donor details.
* 🔐 **Secure Admin Portal**: Restricted dashboard (`/admin/login`, `/admin/donations`) for authorized admins to view and manage incoming donation logs.
* ⚡ **Performance & SEO Ready**: Next.js 16 App Router, standard OpenGraph metadata, JSON-LD Schema integration, dynamic sitemap, and robots.txt generation.

---

## 🛠️ Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), Glassmorphism Utilities |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons & UI Base** | [Lucide React](https://lucide.dev/), Radix UI Slot, Class Variance Authority (`cva`) |
| **Payment Gateway** | [Razorpay API](https://razorpay.com/) |

---

## 📂 Project Architecture

```
azad-foundation/
├── public/                     # Static assets (logos, icons, favicons, metadata images)
├── src/
│   ├── app/                    # Next.js App Router structure
│   │   ├── admin/              # Admin dashboard & authentication
│   │   │   ├── donations/      # Admin donation tracking view
│   │   │   └── login/          # Admin portal login interface
│   │   ├── api/                # API Endpoints
│   │   │   ├── admin/          # Admin authentication & data routes
│   │   │   └── donate/         # Razorpay checkout & webhook verification
│   │   ├── donate/             # Dedicated Donation page
│   │   ├── globals.css         # Custom CSS variables, glassmorphism, animations
│   │   ├── layout.tsx          # Root layout with SEO Metadata & ThemeProvider
│   │   ├── page.tsx            # Main Landing Page (Hero, Mission, Initiatives, Timeline, Impact)
│   │   ├── robots.ts           # Dynamic SEO Robots configuration
│   │   └── sitemap.ts          # Dynamic Sitemap generation
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Core design components (Button, Card, Badge, Orbit, Hero)
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── glassmorphism-trust-hero.tsx
│   │   │   └── orbit-section.tsx
│   │   ├── theme-provider.tsx  # Next-themes provider
│   │   └── theme-toggle.tsx    # Light/Dark mode switcher
│   └── lib/                    # Utility functions
│       └── utils.ts            # Tailwind class merger (clsx + tailwind-merge)
├── .env.example                # Template for environment configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies & script manifests
├── SETUP.md                    # Supplemental setup notes
└── README.md                   # Repository documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
* [Node.js](https://nodejs.org/) (version 18.x or higher)
* `npm` (v9+) or `pnpm` / `yarn` / `bun`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moksharode65-ship-it/Azad-Zindagi.git
   cd Azad-Zindagi/azad-foundation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` or `.env.local` file in the `azad-foundation` root directory by copying `.env.example`:

```bash
cp .env.example .env.local
```

Populate the required keys:

```env
# Razorpay Credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_AUTH_TOKEN=your_secure_random_token

# Google Auth & API (Optional)
GOOGLE_CLIENT_ID=
JWT_SECRET=
```

### Running Development Server

Start the local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to view the application.

---

## 💳 Admin & Donation Integration

### 1. Razorpay Payment Flow
* Users can click **"Donate Now"** on the main website or navigate to `/donate`.
* Select or enter custom amounts in INR (₹).
* The API endpoint `/api/donate` initializes a Razorpay order.
* Upon successful payment, transaction details are verified and recorded.

### 2. Admin Dashboard
* Navigate to `/admin/login` to authenticate with your `ADMIN_PASSWORD`.
* Access `/admin/donations` to view donor receipts, transaction IDs, and overall collection metrics.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Launches local development server on `localhost:3000` |
| `npm run build` | Builds optimized production bundle in `.next` |
| `npm run start` | Starts production server using built bundle |
| `npm run lint` | Runs ESLint checks for syntax and formatting rules |

---

## ☁️ Deployment

### Deploying on Vercel (Recommended)

1. Push your repository to GitHub.
2. Connect your repository to [Vercel](https://vercel.com).
3. Set the Environment Variables (`NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `ADMIN_PASSWORD`, etc.) in the Vercel Dashboard under **Settings > Environment Variables**.
4. Click **Deploy**. Vercel will automatically build and publish your site.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or have suggestions for improvements:

1. Fork the project.
2. Create a new feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📞 License & Contact

**Azad Zindagi Foundation**  
📍 Maharashtra, India  
🌐 Website: [azadzindagifoundation.org](https://azadzindagifoundation.org)  
📧 Email: info@azadzindagifoundation.org  

*Distributed under the MIT License. See `LICENSE` for more details.*
