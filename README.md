# Parcel Delivery Management System - Full Stack Application

A complete full-stack web application built with React.js, Node.js/Express, and MySQL for managing parcel delivery services.

## Project Structure

```
parcel-delivery-system/
├── frontend/                          # React.js frontend
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── Navigation.js
│   │   │   └── ProtectedRoute.js
│   │   ├── pages/                    # All page components
│   │   │   ├── HomePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── UserDashboard.js
│   │   │   ├── CreateParcelPage.js
│   │   │   ├── TrackParcelPage.js
│   │   │   ├── ParcelHistoryPage.js
│   │   │   ├── ProfilePage.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── ManageUsersPage.js
│   │   │   ├── ManageParcelsPage.js
│   │   │   ├── AgentDashboard.js
│   │   │   └── AssignedParcelsPage.js
│   │   ├── services/
│   │   │   └── api.js               # Axios API configuration
│   │   ├── styles/                  # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
│
├── backend-node/                     # Node.js/Express backend
│   ├── config/
│   │   ├── database.js              # Database configuration
│   │   └── db.js                    # Database connection pool
│   ├── controllers/
│   │   ├── authController.js        # Auth logic
│   │   ├── parcelController.js      # Parcel logic
│   │   ├── adminController.js       # Admin logic
│   │   └── agentController.js       # Agent logic
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   ├── parcelRoutes.js          # Parcel endpoints
│   │   ├── adminRoutes.js           # Admin endpoints
│   │   └── agentRoutes.js           # Agent endpoints
│   ├── models/
│   │   ├── User.js                  # User model
│   │   ├── Parcel.js                # Parcel model
│   │   ├── DeliveryAgent.js         # Agent model
│   │   └── DeliveryHistory.js       # History model
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification
│   │   └── errorHandler.js          # Error handling
│   ├── server.js                    # Main server file
│   ├── .env                         # Environment variables
│   └── package.json
│
└── database_schema.sql              # Database schema

## Features

### User Features
- User registration and login with JWT authentication
- Create and book parcels
- Real-time parcel tracking
- View parcel history
- Profile management

### Admin Features
- Manage all users
- Manage all parcels
- Assign parcels to delivery agents
- View dashboard statistics
- Filter parcels by status

### Agent Features
- View assigned parcels
- Update parcel delivery status
- Add delivery notes and location
- Mark parcels as delivered
- Update availability status

## Technology Stack

### Frontend
- React.js 18
- React Router v6
- Axios for API calls
- Plain CSS for styling
- No TypeScript

### Backend
- Node.js
- Express.js
- MySQL database
- JWT for authentication
- bcryptjs for password hashing

### Database
- MySQL
- Relational design with proper indexes
- 4 main tables: users, parcels, delivery_agents, delivery_history

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile
- PUT `/api/auth/profile` - Update profile

### Parcels
- POST `/api/parcels/create` - Create new parcel
- GET `/api/parcels/my-parcels` - Get user's parcels
- GET `/api/parcels/:id` - Get parcel details
- GET `/api/parcels/track/:id` - Track parcel
- PUT `/api/parcels/:id/status` - Update parcel status
- DELETE `/api/parcels/:id` - Delete parcel

### Admin
- GET `/api/admin/users` - Get all users
- DELETE `/api/admin/users/:id` - Delete user
- GET `/api/admin/parcels` - Get all parcels
- GET `/api/admin/parcels/status/:status` - Filter by status
- POST `/api/admin/parcels/:id/assign` - Assign agent
- GET `/api/admin/stats` - Get statistics

### Agent
- POST `/api/agent/register` - Register as agent
- GET `/api/agent/parcels` - Get assigned parcels
- PUT `/api/agent/parcels/:id/status` - Update status
- PUT `/api/agent/availability` - Update availability

## Installation & Setup Instructions

See the detailed setup guide below in the chat for step-by-step installation instructions.
