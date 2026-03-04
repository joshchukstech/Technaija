import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase.ts';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

interface User {
  uid: string;
  email: string;
  role: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          if (db) {
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email || '',
                role: userData.role || 'user', // Default to admin for demo
                name: userData.name || firebaseUser.displayName || 'User',
              });
            } else {
              // Create a new user document for first-time signups
              const newUser = {
                email: firebaseUser.email || '',
                role: 'user', // Default to admin so you can access the dashboard
                name: firebaseUser.displayName || 'User',
                createdAt: new Date()
              };
              
              try {
                await setDoc(userDocRef, newUser);
              } catch (e) {
                console.error("Could not save new user to Firestore:", e);
                // Continue even if saving fails (e.g. if Firestore isn't created yet)
              }
              
              setUser({
                uid: firebaseUser.uid,
                ...newUser
              });
            }
          }
        } catch (error: any) {
          console.error("Error fetching user role:", error);
          if (error.message?.includes('offline')) {
            toast.error('Database connection failed. Please ensure you have created a Firestore Database in your Firebase Console.');
          }
          // Fallback so the user is still logged in even if Firestore fails
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: 'user', // Default to admin for demo
            name: firebaseUser.displayName || 'User',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    if (!auth) return;
    try {
      await firebaseSignOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
