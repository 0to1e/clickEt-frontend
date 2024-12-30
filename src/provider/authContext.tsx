// src/provider/authContext.tsx
import { createContext, ReactNode, useState } from "react";

interface IAuthValues {
  full_name?: string;
  user_name?: string;

  role?:string;
  profile_url?: string;
}

interface IAuthContext {
  user: IAuthValues | null;
  setUser: React.Dispatch<React.SetStateAction<IAuthValues | null>>; 
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IAuthValues | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
