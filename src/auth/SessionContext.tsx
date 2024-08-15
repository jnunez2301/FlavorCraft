import React, { PropsWithChildren } from "react";
import User from "../model/User";

type SessionContextState = {
  userSession: User | null;
  setUserSession: (user: User) => void;
  clearUserSession: () => void;
};

const SessionContext = React.createContext<SessionContextState | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userSession, setUserSession] = React.useState<User | null>(null);
  const clearUserSession = () => {
    window.location.href = "/auth";
    setUserSession(null)
  };
  const values = {
    userSession,
    setUserSession,
    clearUserSession,
  };
  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
};
