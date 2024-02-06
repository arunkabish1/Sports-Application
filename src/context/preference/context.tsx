import React, { createContext, useContext, useReducer } from "react";
import { UserPreferencesReducer, initialUserPreferencesState, UserPreferencesState, UserPreferencesAction } from "./reducer";

type UserPreferencesContextType = {
  state: UserPreferencesState;
  dispatch: React.Dispatch<UserPreferencesAction>;
};

const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

export const UserPreferencesProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(UserPreferencesReducer, initialUserPreferencesState);

  return (
    <UserPreferencesContext.Provider value={{ state, dispatch }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error("useUserPreferences must be used within a UserPreferencesProvider");
  }
  return context;
};
