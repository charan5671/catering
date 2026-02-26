# Srinu Lunch Basket - Backend 🛠️

The backend power for Srinu Lunch Basket, built with modern Node.js practices.

## 📁 Structure

- `src/models`: Mongoose schemas for User, MenuItem, and Booking.
- `src/routes`: API endpoints for authentication, menu management, and booking processing.
- `src/schemas`: Zod validation schemas for incoming requests.
- `src/middlewares`: Auth, Error handling, and File upload logic.
- `src/seed.ts`: Initial data script to populate the menu.

## ⚙️ Configuration

Requires a `.env` file with:
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret for authentication tokens.
- `PORT`: Server port (default: 5000).

## 🚀 Scripts

- `npm run dev`: Start development server with ts-node-dev.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm start`: Run the production build.
- `npx ts-node src/seed.ts`: Seed initial menu data.
