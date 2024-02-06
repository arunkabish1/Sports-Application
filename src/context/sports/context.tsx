// context.tsx
import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

const SportsContext = createContext<any>(null);

export const SportsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    sports: [],
    loading: false,
    error: null,
  });

  return (
    <SportsContext.Provider value={{ state, dispatch }}>
      {children}
    </SportsContext.Provider>
  );
};

export const useSportsState = () => {
  const context = useContext(SportsContext);
  if (context === undefined) {
    throw new Error('useSportsState must be used within a SportsProvider');
  }
  return context.state;
};

export const useSportsDispatch = () => {
  const context = useContext(SportsContext);
  if (context === undefined) {
    throw new Error('Error');
  }
  return context.dispatch;
};
