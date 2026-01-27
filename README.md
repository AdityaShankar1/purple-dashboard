# Learning Management System (LMS)

A comprehensive Learning Management System built with Next.js, React, and Node.js/Express.

## Features

### User Features
- ✅ Course enrollment and progress tracking
- ✅ Material access (PDF, Video, Documents)
- ✅ Quiz attempts with auto-grading
- ✅ Assignment submission and grading
- ✅ Certificate generation and download
- ✅ Real-time notifications
- ✅ Page refresh state persistence

### Admin Features
- ✅ Course management (CRUD)
- ✅ Material upload and organization
- ✅ Quiz and assignment creation
- ✅ User progress monitoring
- ✅ Certificate management and download
- ✅ Notification system
- ✅ Analytics and metrics

## Project Structure

\`\`\`
├── app/
│   ├── dashboard/              # User dashboard pages
│   ├── dashboardAdmin/         # Admin dashboard pages
│   ├── auth/                   # Authentication pages
│   └── api/                    # API routes
├── components/
│   ├── dashboard/              # User components
│   ├── dashboardAdmin/         # Admin components
│   └── Layouts/                # Layout components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
└── server/                     # Backend (Node.js/Express)
    ├── src/
    │   ├── models/             # MongoDB models
    │   ├── routes/             # API routes
    │   ├── middleware/         # Auth middleware
    │   └── server.js           # Express server
    └── package.json
\`\`\`

## Installation

### Frontend
\`\`\`bash
npm install
npm run dev
\`\`\`

### Backend
\`\`\`bash
cd server
npm install
npm run dev
\`\`\`

## Environment Variables

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### Backend (.env)
\`\`\`
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (admin)
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)

### Materials
- `GET /api/materials/course/:courseId` - Get course materials
- `POST /api/materials` - Upload material (admin)
- `DELETE /api/materials/:id` - Delete material (admin)

### Certificates
- `GET /api/certificates/user` - Get user certificates
- `GET /api/admin/certificates` - Get all certificates (admin)
- `GET /api/certificates/:id/download` - Download certificate
- `DELETE /api/certificates/:id` - Delete certificate (admin)

### Assignments
- `GET /api/assignments/course/:courseId` - Get course assignments
- `POST /api/assignments` - Create assignment (admin)
- `PUT /api/assignments/:id` - Update assignment (admin)
- `DELETE /api/assignments/:id` - Delete assignment (admin)

### Quizzes
- `GET /api/quizzes/course/:courseId` - Get course quizzes
- `POST /api/quizzes` - Create quiz (admin)
- `PUT /api/quizzes/:id` - Update quiz (admin)
- `DELETE /api/quizzes/:id` - Delete quiz (admin)

### Enrollments
- `GET /api/enrollments/user/ongoing` - Get ongoing courses
- `GET /api/enrollments/completed` - Get completed courses
- `POST /api/enrollments/enroll` - Enroll in course

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

## Key Features Implemented

1. **State Persistence**: Uses localStorage and sessionStorage to maintain state across page refreshes
2. **Auto-Certificate Generation**: Certificates are automatically generated when course progress reaches 100%
3. **Real-time Notifications**: Users are notified of new materials, quizzes, assignments, and certificates
4. **Admin Dashboard**: Comprehensive admin panel for managing courses, users, and content
5. **Progress Tracking**: Automatic progress calculation based on materials viewed, quizzes attempted, and assignments submitted
6. **Role-Based Access Control**: Different views and permissions for users and admins

## Testing

### Test Credentials
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## Deployment

### Frontend (Vercel)
\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Backend (Heroku/Railway)
\`\`\`bash
cd server
npm run build
# Deploy to your hosting platform
\`\`\`

## License

MIT
