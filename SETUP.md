# Local Development Setup

## Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

## Frontend Setup

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd lms-frontend
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Create .env.local
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Frontend will be available at `http://localhost:3000`

## Backend Setup

### 1. Navigate to Server Directory
\`\`\`bash
cd server
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Create .env File
\`\`\`
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your-development-secret-key
PORT=5000
NODE_ENV=development
\`\`\`

### 4. Start MongoDB (if local)
\`\`\`bash
mongod
\`\`\`

### 5. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Backend will be available at `http://localhost:5000`

## Database Setup

### Option 1: Local MongoDB
\`\`\`bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod
\`\`\`

### Option 2: MongoDB Atlas
1. Create account at mongodb.com
2. Create cluster
3. Create database user
4. Get connection string
5. Update MONGODB_URI in .env

## Testing

### Test Admin Login
- Email: admin@example.com
- Password: admin123

### Test User Login
- Email: user@example.com
- Password: user123

## Common Issues

### Port Already in Use
\`\`\`bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
\`\`\`

### MongoDB Connection Error
- Verify MongoDB is running
- Check connection string
- Verify database user credentials

### CORS Errors
- Ensure backend is running
- Check NEXT_PUBLIC_API_URL
- Verify CORS middleware in server.js

## Development Workflow

1. Start MongoDB
2. Start backend server (`npm run dev` in server/)
3. Start frontend server (`npm run dev` in root)
4. Open http://localhost:3000
5. Login with test credentials
6. Test features

## Code Structure

### Frontend
- `/app` - Next.js pages and API routes
- `/components` - React components
- `/hooks` - Custom React hooks
- `/lib` - Utility functions

### Backend
- `/server/src/models` - MongoDB schemas
- `/server/src/routes` - API endpoints
- `/server/src/middleware` - Authentication
- `/server/src/server.js` - Express app

## Next Steps

1. Customize branding and colors
2. Add more courses and materials
3. Implement email notifications
4. Add payment integration
5. Set up analytics
