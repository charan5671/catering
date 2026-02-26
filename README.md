# Srinu Lunch Basket 🍱

Srinu Lunch Basket is a premium, full-stack web application designed for a home-style lunch delivery service. It features a stunning, responsive UI and seamless WhatsApp integration for instant ordering.

## ✨ Features

- **Premium UI/UX**: Built with Next.js, Tailwind CSS 4, and the Outfit font for a high-end feel.
- **Dynamic Menu**: Fetches real-time menu items from a MongoDB database.
- **WhatsApp Integration**: Automatically generates professional order messages with dish details, quantity, and delivery addresses.
- **Robust Backend**: Secure API built with Express, Mongoose, Zod validation, and security headers.
- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Running locally or on Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/charan5671/catering.git
   cd catering
   ```

2. Install dependencies for both Frontend and Backend:
   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` folder (refer to `.env.example`).
   - (Optional) Configure `frontend/.env.local` if you change the API URL.

4. Seed the database with initial menu items:
   ```bash
   cd backend
   npx ts-node src/seed.ts
   cd ..
   ```

### Running the Application

Start both the frontend and backend concurrently:
```bash
npm run dev
```

The application will be available at:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4, Lucide React.
- **Backend**: Node.js, Express, MongoDB, Mongoose, Zod.
- **Integration**: WhatsApp Click-to-Chat API.

## 📞 WhatsApp Integration

To update the recipient phone number, edit `frontend/src/app/page.tsx` and search for:
```javascript
const whatsappUrl = `https://wa.me/91XXXXXXXXXX?...`;
```
Replace `91XXXXXXXXXX` with the actual mobile number (with country code).

---

Built with ❤️ for Srinu Lunch Basket.
