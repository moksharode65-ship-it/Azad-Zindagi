# Azad Foundation NGO Website - Setup Instructions

## Prerequisites

This project requires the following dependencies to be installed via npm. Due to disk space constraints, please ensure you have at least 1-2GB of free space before proceeding.

## Installation Steps

### 1. Free Up Disk Space (If Needed)

Before installing dependencies, free up disk space by:
- Emptying the Recycle Bin
- Running Disk Cleanup
- Clearing npm cache: `npm cache clean --force`
- Deleting temporary files

### 2. Install Dependencies

Navigate to the project directory and install all dependencies:

```bash
cd "C:\Users\Pradnya Rode\OneDrive\Desktop\VS CODE\AZAD FOUNDATION\azad-foundation"
npm install
```

### 3. Install Additional Dependencies

The project requires the following additional packages. Run:

```bash
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-slot
```

### 4. Run Development Server

```bash
npm run dev
```

The website will be available at `http://localhost:3000`

## Project Structure

```
azad-foundation/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles with custom animations
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main landing page with all sections
│   ├── components/
│   │   └── ui/
│   │       ├── badge.tsx                    # Shadcn Badge component
│   │       ├── button.tsx                   # Shadcn Button component
│   │       ├── card.tsx                     # Shadcn Card component
│   │       ├── radial-orbital-timeline.tsx  # Interactive timeline component
│   │       ├── testimonial-cards.tsx        # Draggable testimonial cards
│   │       └── glassmorphism-trust-hero.tsx # Hero section component
│   └── lib/
│       └── utils.ts           # Utility functions (cn helper)
├── package.json
└── SETUP.md
```

## Features

### Sections Included:
1. **Navigation** - Fixed header with smooth scroll links
2. **Hero Section** - Glassmorphism design with stats and partner marquee
3. **About Us** - Parallax scrolling background, mission statement
4. **Programs/Initiatives** - 6 program cards with icons
5. **Impact Stats** - Animated statistics with parallax
6. **Timeline** - Interactive radial orbital timeline showing journey
7. **Testimonials** - Draggable card stack with user stories
8. **Team/Leadership** - Team member profiles
9. **Blog/News** - Latest updates and stories
10. **Donate CTA** - Call-to-action with donation button
11. **Footer** - Contact info, quick links, social media

### Color Theme:
- **Primary**: Orange/Saffron (#ea580c)
- **Secondary**: Green (#16a34a)
- **Accent**: White
- Indian flag colors as requested

### Animations:
- Parallax scrolling effects
- Fade-in animations on scroll
- Interactive orbital timeline
- Draggable testimonial cards
- Smooth hover transitions
- Pulse and ping animations

### Technical Stack:
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion for animations
- Shadcn UI components
- Lucide React icons

## Donation Integration

The "Donate Now" buttons are currently placeholders. To integrate real donations:

1. **Razorpay**: Replace button onClick with Razorpay checkout
2. **Stripe**: Integrate Stripe Payment Links or Checkout
3. **External**: Link to existing donation page

Example for external link:
```tsx
<Button onClick={() => window.open('YOUR_DONATION_URL', '_blank')}>
  Donate Now
</Button>
```

## Customization

### To update content:
- Edit `src/app/page.tsx` - All section content is in this file
- Update timeline data, testimonials, programs, team members, blog posts arrays

### To update images:
- Replace Unsplash URLs with your own images
- All images use `https://images.unsplash.com/...` format

### To update colors:
- Edit `src/app/globals.css` for custom CSS variables
- Update gradient classes throughout `page.tsx`

## Production Build

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel (recommended for Next.js):

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

Or deploy to any platform supporting Next.js.
