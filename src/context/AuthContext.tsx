import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser,
  AuthError 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import { User } from '../types';
import { Shield } from 'lucide-react';
import { useToast } from './ToastContext';

interface AuthContextProps {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  currentUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  logOut: async () => {},
  authError: null,
});

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-purple-700 bg-opacity-95 z-50">
    <div className="text-center">
      <Shield className="animate-pulse h-16 w-16 text-pink-400 mx-auto" />
      <p className="mt-4 text-white font-medium">Loading...</p>
    </div>
  </div>
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
      try {
        if (user) {
          const formattedUser: User = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          };
          setCurrentUser(formattedUser);
          
          // Check if user exists in Firestore
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          
          if (!userSnap.exists()) {
            // Create new user record
            await setDoc(userRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              createdAt: new Date(),
            });
          }
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error during auth state change:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      const authError = error as AuthError;
      const errorMessage = getAuthErrorMessage(authError);
      setAuthError(errorMessage);
      showToast('error - '+ errorMessage);
    }
  };

  const logOut = async () => {
    try {
      setAuthError(null);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      const authError = error as AuthError;
      const errorMessage = getAuthErrorMessage(authError);
      setAuthError(errorMessage);
      showToast('error - '+ errorMessage);
    }
  };

  // Helper function to provide user-friendly error messages
  const getAuthErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        return 'Sign in canceled. The popup was closed.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection and try again.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/operation-not-allowed':
        return 'This operation is not allowed.';
      case 'auth/account-exists-with-different-credential':
        return 'An account already exists with the same email address but different sign-in credentials.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logOut,
    authError,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};