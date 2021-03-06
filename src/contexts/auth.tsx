import { useState, useEffect, useCallback, ReactNode } from "react";
import { createContext } from "use-context-selector";

import { auth, firebase } from "../services/firebase";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextData {
  user: User | undefined;
  handleSignInWithGoogle: () => Promise<void>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information Google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignInWithGoogle = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result?.user) {
      const { displayName, photoURL, uid } = result?.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleSignInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}
