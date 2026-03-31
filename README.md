# Tech9ja Blog

A full-stack Serverless blog application for a Nigerian tech entrepreneur.

## Features

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend (BaaS)**: Firebase (Firestore for Database, Firebase Auth for Authentication)
- **Image Upload**: Cloudinary (Unsigned Uploads directly from the client)

## Setup Instructions

1.  **Environment Variables**:
    Copy `.env.example` to `.env` and fill in the required values:
    -   `VITE_FIREBASE_*`: Your Firebase project configuration.
    -   `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
    -   `VITE_CLOUDINARY_UPLOAD_PRESET`: An **Unsigned** upload preset created in your Cloudinary settings.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```

4.  **Create Admin User**:
    - Go to your Firebase Console -> Authentication -> Users.
    - Click "Add User" and create an account (e.g., `admin@tech9ja.com` / `admin123`).
    - *Optional (for strict role checking)*: Go to Firestore Database, create a `users` collection, add a document with the Document ID matching the user's UID, and add a field `role` with the value `"admin"`. (The app currently defaults to treating logged-in users as admins for demo purposes).

5.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## Project Structure

-   `src/firebase.ts`: Firebase initialization.
-   `src/context/AuthContext.tsx`: Firebase Authentication state management.
-   `src/pages/`: React pages (Home, BlogList, AdminDashboard, etc.) interacting directly with Firestore.
-   `src/components/`: Reusable UI components.

## Technologies

-   **Frontend**: React, Tailwind CSS, Lucide React, Framer Motion, React Router DOM, React Hot Toast.
-   **Backend/Services**: Firebase (Auth, Firestore), Cloudinary (REST API).
