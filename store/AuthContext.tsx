import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUser } from "@/lib/appwrite";

type AuthContextType = {
  isLoggedIn: boolean;
  user: any;
  isLoading: boolean;
  setUser: any;
  setIsLoggedIn: any;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function useAuthContext() {
  const authCtx = useContext(AuthContext);

  if (authCtx === null) {
    throw new Error("AuthContext is null - That should not be the case!");
  }

  return authCtx;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, isLoggedIn, user, setUser, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
