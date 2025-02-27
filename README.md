#  Mini Event Management System

A full-stack event management application that allows users to create, manage, and register for events.

##  Features

- **User Authentication**
  - Register & Login with JWT
  - Protected routes for authenticated users
  
- **Event Management**
  - Create events with title, description, date, and location
  - View all upcoming events
  - Register for events
  - View registered attendees for an event
  
- **Search & Pagination**
  - Search events by title
  - Pagination for event listings

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication

### Frontend
- React.js
- TailwindCSS for styling

## 📋 API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Event Routes
- `GET /api/events` - Get all events 
- `GET /api/events/:id/attendees` - Get event attendee details
- `POST /api/events` - Create a new event (auth required)
- `POST /api/events/:id/register` - Register for an event (auth required)


## 🚀 Getting Started

### Installation

1. Clone the repository
```bash
git clone https://github.com/karthikacharya26/Warpbay-EMS.git
cd warpbay-ems
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory with:
```
MONGO_URI=your_mongo_address
JWT_SECRET=your_secret_key
```

5. Start the backend server
```bash
cd server
npm start
```

6. Start the frontend
```bash
cd client
npm run dev
```



