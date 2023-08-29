import { User } from "@/lib/types";
import { generateUid } from "@/lib/utils";
import { useRouter } from "next/router";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export enum AuthState {
  SIGN_UP_REQUIRED,
  SIGN_IN_REQUIRED,
  LOADING,
  SIGN_IN_SUCCESS,
}

interface AuthContextData {
  authState: AuthState;
  user?: User;
  signIn: () => void;
  payemntLink?: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// TODO: fetch user from db and update authState
export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>(
    AuthState.SIGN_IN_REQUIRED
  );
  const [user, setUser] = useState<User>();
  const [payemntLink, setPayemntLink] = useState<string>();

  useEffect(() => {
    if ([AuthState.SIGN_IN_REQUIRED].includes(authState)) router.push("/login");
  }, [authState]);

  const signIn = useCallback(() => {
    // TODO: create wallet and payment link on sign up
    router.push("/");
    setAuthState(AuthState.SIGN_IN_SUCCESS);
    setPayemntLink(generateUid());
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authState,
        user,
        signIn,
        payemntLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (Object.keys(context).length == 0) {
    throw new Error(
      "useAuth context must be used within a AuthContextProvider"
    );
  }
  return context;
};
