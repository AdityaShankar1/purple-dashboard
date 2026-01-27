# LMS Deployment Guide

## Prerequisites
- Node.js 18+
- MongoDB Atlas account or local MongoDB
- Vercel account (for frontend)
- Git repository

## Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
\`\`\`bash
npm run build
\`\`\`

### Step 2: Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Step 3: Set Environment Variables
In Vercel dashboard:
\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
\`\`\`

## Backend Deployment (Railway/Heroku)

### Step 1: Prepare Backend
\`\`\`bash
cd server
npm install
\`\`\`

### Step 2: Create .env file
\`\`\`
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/lms
JWT_SECRET=your-very-secure-secret-key
PORT=5000
NODE_ENV=production
\`\`\`

### Step 3: Deploy to Railway
\`\`\`bash
npm install -g railway
railway login
railway init
railway up
\`\`\`

### Step 4: Set Production Environment Variables
In Railway dashboard, add:
- MONGODB_URI
- JWT_SECRET
- NODE_ENV=production

## Database Setup

### MongoDB Atlas
1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update MONGODB_URI in .env

### Collections to Create
- users
- courses
- materials
- certificates
- enrollments
- quizzes
- assignments
- notifications
- quizSubmissions
- assignmentSubmissions

## Post-Deployment Checklist

- [ ] Frontend deployed and accessible
- [ ] Backend API running
- [ ] MongoDB connected
- [ ] Environment variables set
- [ ] CORS configured
- [ ] SSL certificates installed
- [ ] Admin account created
- [ ] Test login functionality
- [ ] Test course creation
- [ ] Test certificate generation
- [ ] Monitor error logs

## Troubleshooting

### CORS Issues
Update server.js:
\`\`\`javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
\`\`\`

### Database Connection Issues
- Check MongoDB connection string
- Verify IP whitelist
- Check database user permissions

### Certificate Generation Issues
- Ensure pdfkit is installed
- Check file permissions
- Verify temp directory exists

## Monitoring

### Frontend Monitoring
- Use Vercel Analytics
- Monitor error rates
- Check performance metrics

### Backend Monitoring
- Use Railway/Heroku logs
- Monitor API response times
- Track database queries

## Scaling

### Horizontal Scaling
- Use load balancer
- Deploy multiple backend instances
- Use Redis for caching

### Database Optimization
- Add indexes to frequently queried fields
- Archive old data
- Use database replication
