# Blog Platform

A modern full-stack blogging platform with authentication, posts, comments, and likes.

## 🚀 Live Demo
[Coming soon - Deploy to Vercel]

## ✨ Features
- **🔐 Authentication**: User signup, login, logout with Appwrite Auth
- **📝 Rich Text Editor**: Create and edit posts with TinyMCE
- **💬 Comments**: Real-time comments on posts
- **❤️ Likes**: Like posts and comments
- **🎨 Modern UI**: Responsive design with Tailwind CSS
- **📱 Mobile Friendly**: Works on all devices

## 🛠️ Tech Stack

**Frontend:**
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) React 19
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) Vite
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) Tailwind CSS
- ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white) Redux Toolkit
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) React Router DOM

**Backend (BaaS):**
- ![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white) Appwrite

**UI & Forms:**
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white) React Hook Form
- ![TinyMCE](https://img.shields.io/badge/TinyMCE-1792E4?style=for-the-badge) TinyMCE

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/I-Saad-07/blog-platform.git
   cd blog-platform
   
2. **Install dependencies**
   npm install

3. **Set up environment variables** 
   VITE_APP_APPWRITE_URL=""
   VITE_APPWRITE_PROJECT_ID=""
   VITE_APPWRITE_DATABASE_ID=""
   VITE_APPWRITE_USERS_COLLECTION_ID=""
   VITE_APPWRITE_BUCKET_ID=""
   VITE_APPWRITE_COMMENTS_COLLECTION_ID=""
   VITE_APPWRITE_LIKES_COLLECTION_ID=""

4. **Run development server**
   npm run dev
