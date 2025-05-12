# ATC_01202671449

# AreebEvent - Event Booking Platform

AreebEvent is a fullstack event booking platform built with the **MERN** stack and **TypeScript**. It enables users to discover and book events with ease, while providing administrators with tools to manage events effectively.

## Features

### User Authentication

- **Registration & Login:** Secure account creation using JWT
- **Role-Based Authorization:** Different access for users and admins

### Event Discovery

- **Browse Events:** Scroll through upcoming events in a modern UI
- **Search Functionality:** Filter events by name or description
- **Event Details:** View full info (venue, date, price, etc.)

### Booking Management

- **Book Events:** One-click event reservation
- **My Bookings:** View all your reserved events
- **Cancel Bookings:** Instantly cancel bookings

### Admin Dashboard

- **CRUD Events:** Create, edit, or delete events
- **Manage Platform:** Role-based controls for administrators

### User Experience

- **Responsive Design:** Mobile-first layout using Tailwind CSS
- **Loading States:** Skeletons and spinners enhance UX
- **Notifications:** Toast messages using `react-hot-toast`

## Tech Stack

### Frontend

- React 19 + TypeScript
- Tailwind CSS + Shadcn UI
- Redux Toolkit + React Context API
- React Router Dom
- Axios + React Hot Toast
- Vite

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT for Authentication
- Cookie-parser for session handling

## 📁 Folder Structure

```
areeb-event/
├── client/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── components/
│       │   ├── Dashboard/
│       │   ├── Home/
│       │   ├── Layout/
│       │   ├── MyBookings/
│       │   ├── ui/
│       │   └── utils/
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       ├── redux/
│       │   ├── slices/
│       │   └── store/
│       ├── Types/
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/abdo-ibrahim/ATC_01202671449.git
cd areeb-event
```

### 2. Install Dependencies

#### Frontend

```bash
cd client
npm install
# or
yarn install
```

#### Backend

```bash
cd server
npm install
# or
yarn install
```

### 3. Setup Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 4. Run the App

#### Frontend

```bash
cd client
npm run dev
```

#### Backend

```bash
cd server
npm start
```

## 🔗 API Endpoints

### Authentication

- `POST /api/v1/auth/register` — Register new user
- `POST /api/v1/auth/login` — Login user
- `GET /api/v1/auth/logout` — Logout user

### Events

- `GET /api/v1/events/getAllEvents` (public)
- `GET /api/v1/events/getEventById/:id` (public)
- `POST /api/v1/events/createEvent` (admin only)
- `PUT /api/v1/events/updateEvent/:id` (admin only)
- `DELETE /api/v1/events/deleteEvent/:id` (admin only)

### Bookings

- `GET /api/v1/bookings/getAllBookings` (user only)
- `POST /api/v1/bookings/createBooking` (user only)
- `DELETE /api/v1/bookings/deleteBooking/:id` (user only)

## Usage

### As a User
1. Visit the homepage to browse events
2. Use search bar to find events
3. Click "Book Now" to reserve a spot (login required)
4. View or cancel your bookings in "My Bookings"

### As an Admin
1. Login with admin credentials
2. Go to `/dashboard`
3. Create, edit, or delete events
