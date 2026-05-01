# Giada Marinaro Nutritionist Website

A modern, responsive website for Dott.ssa Giada Marinaro, Biologa Nutrizionista, featuring contact forms, email notifications, and calendar integration.

## Features

- ✅ **Contact Form**: Full validation and submission with email notifications
- ✅ **Email Service**: SendGrid integration for admin notifications and user confirmations
- ✅ **Database**: Supabase integration for storing contacts and calendar events (Demo mode available)
- ✅ **Calendar**: Google Calendar integration with availability display (Sample slots available)
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Form Validation**: Client-side and server-side validation
- ✅ **Phone Input**: International phone number input with country selection

## Demo Mode

The application is currently configured to work in **demo mode** with:
- **Email**: `wizliza@gmail.com` (both sender and recipient)
- **Calendar**: Sample availability slots (no Google Calendar integration required)
- **Database**: Mock data storage (no Supabase required)

This allows you to test all features immediately without setting up external services.

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL="https://your-project-ref.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email Service (SendGrid)
SENDGRID_API_KEY="SG.your_sendgrid_api_key"
FROM_EMAIL="wizliza@gmail.com"
FROM_NAME="Dott.ssa Giada Marinaro"

# Google Calendar Integration (Optional)
GOOGLE_CALENDAR_API_KEY="your_google_api_key"
GOOGLE_CALENDAR_ID="wizliza@gmail.com"
GOOGLE_CALENDAR_CLIENT_EMAIL="your-service-account@your-project.iam.gserviceaccount.com"
GOOGLE_CALENDAR_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Copy your project URL and anon key to the environment variables

### 3. SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Generate an API key with "Mail Send" permissions
3. Add the API key to your environment variables

### 4. Google Calendar Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable the Google Calendar API
4. Create a service account and download the JSON credentials
5. Share your calendar with the service account email
6. Add the credentials to your environment variables

### 5. Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Database Schema

The application uses two main tables:

### `contacts`
- Stores contact form submissions
- Fields: id, nome, cognome, email, telefono, messaggio, created_at, updated_at

### `calendar_events`
- Stores available time slots
- Fields: id, title, start, end, description, is_available, created_at, updated_at

## API Endpoints

- `POST /api/contact` - Submit contact form
- `GET /api/calendar/slots` - Get available calendar slots

## Email Templates

The application sends two types of emails:

1. **Admin Notification**: Sent to the nutritionist when a new contact form is submitted
2. **User Confirmation**: Sent to the user confirming their submission

## Calendar Integration

The calendar system supports:
- Displaying available time slots
- Integration with Google Calendar (optional)
- Fallback to sample data when no slots are available
- Slot selection and booking functionality

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- DigitalOcean App Platform

Make sure to set all environment variables in your deployment platform.

## Support

For questions or issues, please contact the development team.
