# Blog Platform

A modern blogging platform with authentication, posts, comments, and likes.

## Features
- User authentication (Signup/Login/Logout)
- Create, read, update, delete blog posts
- Rich text editor (Tinymce)
- Comments system
- Like posts and comments
- Responsive design

## Tech Stack
- React + Vite
- Tailwind CSS
- Appwrite (Backend-as-a-Service)
- React Router
- Redux Toolkit

## Setup
1. Clone repo
2. `npm install`
3. Create `.env` file with Appwrite credentials
4. `npm run dev`

## Environment Variables
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_collection_id
VITE_APPWRITE_COMMENTS_COLLECTION_ID=your_comments_collection_id
VITE_APPWRITE_LIKES_COLLECTION_ID=your_likes_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id


## Deployment
- Frontend: 
- Backend: 