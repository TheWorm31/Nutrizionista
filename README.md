# Nutritionist Website - Dott.ssa Giada Marinaro

A professional, modern landing page for **Dott.ssa Giada Marinaro**, a Biologist Nutritionist based in Rome. The website features an integrated booking system, a contact management platform, and a dedicated section for the "Sta Schiscia" social media content.

## 🚀 Features

- **Professional Landing Page**: Clean, responsive design optimized for conversion and trust.
- **Online Booking System**: Integrated `react-big-calendar` allowing clients to see availability and request slots directly.
- **Dynamic Contact Form**: Validation-ready form with international phone number support (`react-phone-number-input`).
- **"Sta Schiscia" Section**: A custom-designed area to showcase the nutritionist's unique social media content format.
- **Database Integration**: Lead and appointment management powered by **Supabase**.
- **Automated Notifications**: Email confirmations and lead notifications via **SendGrid**.
- **GDPR Compliant**: Integrated Cookie Banner and Manager for privacy compliance.
- **SEO Optimized**: Advanced meta tags, OpenGraph support, and structured data for better search engine ranking.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Custom CSS
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Email Service**: [SendGrid](https://sendgrid.com/)
- **Calendar**: [React Big Calendar](https://jquense.github.io/react-big-calendar/)
- **State Management**: React Hooks (useState, useEffect)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/            # API Routes (Contact, Calendar)
│   ├── globals.css     # Design System & Global Styles
│   ├── layout.tsx      # Root Layout & Metadata
│   └── page.tsx        # Main Landing Page
├── components/         # Reusable UI Components (Calendar, Cookie Manager)
├── lib/                # Utility functions (Supabase client, Email, Cookies)
public/
├── immagini/           # Brand assets and photography
└── robots.txt / sitemap.xml # SEO configuration
```

## 🚀 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd giada-marinaro-website
   ```

2. **Environment Variables**
   Create a `.env.local` file based on `env.template`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   SENDGRID_API_KEY=your_key
   ```

3. **Database Setup**
   Execute the `supabase-schema.sql` script in your Supabase SQL Editor to create the necessary tables (`contacts`, `calendar_events`).

4. **Install & Run**
   ```bash
   npm install
   npm run dev
   ```

## 📊 Business Logic

- **Contacts**: Form submissions are stored in Supabase and triggered via `/api/contact`.
- **Availability**: Slots are fetched from Supabase and displayed in the `AvailabilityCalendar`.
- **Emails**: Automated emails are sent to both the professional and the client upon form submission.

## 📞 Contact Information

- **Email**: info@giadamarinaro.com
- **Web**: [www.giadamarinaro.com](https://www.giadamarinaro.com)

---

**Developed for Dott.ssa Giada Marinaro - Biologa Nutrizionista Roma**