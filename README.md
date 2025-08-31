# Authentication WebApp with MongoDB & JWT

A modern, responsive web application built with React, TypeScript, Express, and MongoDB featuring user authentication and notes management.

## Features

- ✅ Email/Password Authentication with JWT
- ✅ Form Validation with Error Handling
- ✅ JWT-based Authorization
- ✅ Notes Creation and Management
- ✅ Mobile-Responsive Design
- ✅ Modern UI with Smooth Animations
- ✅ MongoDB Database Integration

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, TypeScript, JWT
- **Database**: MongoDB (Atlas)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Yup Validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MongoDB Atlas**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string
   - Replace the `MONGODB_URI` in `backend/.env`

4. **Configure environment variables**:
   - Copy `backend/.env.example` to `backend/.env`
   - Update `MONGODB_URI` with your MongoDB Atlas connection string
   - Update `JWT_SECRET` with a secure random string

5. **Start the backend server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to project root**:
   ```bash
   cd ..
   ```

2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Authentication middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── types/          # TypeScript types
│   │   └── server.ts       # Main server file
│   ├── .env                # Environment variables
│   └── package.json
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── contexts/           # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # API client
│   ├── types/             # TypeScript types
│   └── App.tsx            # Main app component
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Notes
- `GET /api/notes` - Get user notes (protected)
- `POST /api/notes` - Create note (protected)
- `DELETE /api/notes/:id` - Delete note (protected)

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  googleId: String (optional),
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Notes Collection
```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  userId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with 7-day expiration
- Protected API routes with middleware
- Input validation and sanitization
- CORS configuration
- Secure password requirements (minimum 6 characters)

## Development

### Running Both Servers

1. **Terminal 1 - Backend**:
   ```bash
   cd backend && npm run dev
   ```

2. **Terminal 2 - Frontend**:
   ```bash
   npm run dev
   ```

### Environment Variables

**Backend (.env)**:
```
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-secure-jwt-secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Deployment

### Backend Deployment
- Deploy to services like Railway, Render, or Heroku
- Set environment variables in your hosting platform
- Ensure MongoDB Atlas allows connections from your hosting IP

### Frontend Deployment
- Build the project: `npm run build`
- Deploy the `dist` folder to Netlify, Vercel, or similar
- Update API base URL for production

## Contributing

1. Follow the existing code structure and naming conventions
2. Ensure all API endpoints have proper error handling
3. Test authentication flows thoroughly
4. Maintain responsive design across all screen sizes
5. Write clean, readable TypeScript code

## License

MIT License