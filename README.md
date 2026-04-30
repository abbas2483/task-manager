# TaskFlow - Team Task Manager

A modern, collaborative project management application built with Next.js 15 and Firebase.

## 🚀 Features

- **Project Management** - Create projects with teams, Admin and Member roles
- **Task Tracking** - Kanban-style boards (To Do, In Progress, Done)
- **Team Collaboration** - Invite members, assign tasks, track progress
- **Dashboard Analytics** - Real-time stats on tasks and team productivity
- **Role-Based Access** - Admin and Member permissions
- **Real-time Updates** - Firebase Firestore for instant data sync

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend**: Firebase (Authentication, Firestore)
- **Styling**: CSS-in-JS (inline styles)
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Email/Password Authentication
   - Create a Firestore Database
   - Copy your Firebase config

4. **Configure environment variables**
   
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 🔥 Firebase Setup

### 1. Enable Authentication

1. Go to Firebase Console → Authentication
2. Enable **Email/Password** sign-in method

### 2. Create Firestore Database

1. Go to Firebase Console → Firestore Database
2. Click **Create database**
3. Choose **Production mode**
4. Select your preferred location

### 3. Set Firestore Security Rules

Go to Firestore → Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function getUserId() {
      return request.auth.uid;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create, update: if isAuthenticated() && getUserId() == userId;
    }
    
    // Projects collection
    match /projects/{projectId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.resource.data.createdBy == getUserId();
      allow update, delete: if isAuthenticated();
    }
    
    // Project members collection
    match /project_members/{membershipId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAuthenticated();
    }
    
    // Tasks collection
    match /tasks/{taskId} {
      allow read: if isAuthenticated();
      allow create, update, delete: if isAuthenticated();
    }
  }
}
```

## 📁 Project Structure

```
task-manager/
├── app/
│   ├── actions/          # Server actions (legacy)
│   ├── auth/            # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/       # Dashboard pages
│   │   ├── projects/
│   │   ├── settings/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx         # Landing page
├── components/          # Reusable components
│   ├── Header.tsx
│   └── Sidebar.tsx
├── lib/
│   └── firebase/        # Firebase configuration
│       ├── auth.ts      # Auth functions
│       ├── config.ts    # Firebase init
│       ├── firestore.ts # Database functions
│       ├── projects.ts  # Project operations
│       ├── tasks.ts     # Task operations
│       ├── types.ts     # TypeScript types
│       └── AuthContext.tsx
├── middleware.ts        # Auth middleware
└── package.json
```

## 🗄️ Database Structure

### Collections

#### 1. **users**
```typescript
{
  id: string              // Firebase Auth UID
  email: string
  fullName: string
  avatarUrl: string | null
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### 2. **projects**
```typescript
{
  id: string              // Auto-generated
  name: string
  description: string
  createdBy: string       // User ID
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### 3. **project_members**
```typescript
{
  id: string              // Auto-generated
  projectId: string
  userId: string
  role: 'admin' | 'member'
  joinedAt: Timestamp
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### 4. **tasks**
```typescript
{
  id: string              // Auto-generated
  projectId: string
  title: string
  description: string
  dueDate: Timestamp | null
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in_progress' | 'done'
  assignedTo: string | null
  createdBy: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

## 🔐 Authentication Flow

1. User signs up with email/password
2. Firebase creates auth account
3. App creates user profile in Firestore
4. User can login and access dashboard
5. Auth state managed by `AuthContext`

## 🎯 Key Features Explained

### Project Management
- Create projects with name and description
- Creator automatically becomes admin
- Admins can add/remove members
- Members can view and contribute

### Task Management
- Create tasks within projects
- Set priority (low, medium, high, urgent)
- Set due dates
- Assign to team members
- Track status (todo, in progress, done)

### Dashboard
- View all projects
- See task statistics
- Track overdue tasks
- Monitor team progress

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
npm run build
```

## 🐛 Troubleshooting

### "Not authenticated" error
- Make sure you're logged in
- Check Firebase Auth is enabled
- Verify environment variables

### "Permission denied" error
- Check Firestore Security Rules
- Ensure user has proper role
- Verify user is project member

### Tasks not loading
- Check project membership
- Verify Firestore indexes
- Check browser console for errors

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for internal use. All rights reserved.

## 🙏 Acknowledgments

- Built with Next.js 15
- Powered by Firebase
- Styled with modern CSS

---

**Last Updated:** 2026-04-30  
**Version:** 1.0.0  
**Built with** ❤️ **using Next.js & Firebase**
