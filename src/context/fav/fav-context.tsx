import React, { createContext, useContext, useReducer, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { favReducer, initialFavState, FavState, FavActions } from "./reducer";

const FavStateContext = createContext<FavState | undefined>(undefined);
type FavDispatch = React.Dispatch<FavActions>;
const FavDispatchContext = createContext<FavDispatch | undefined>(undefined);

export const FavProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(favReducer, initialFavState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/teams`);
        if (!response.ok) {
          throw new Error("Fail");
        }
        const data: TeamInfo[] = await response.json();
        dispatch({ type: "SET_FAV_TEAMS", teams: data });
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <FavStateContext.Provider value={state}>
      <FavDispatchContext.Provider value={dispatch}>
        {children}
      </FavDispatchContext.Provider>
    </FavStateContext.Provider>
  );
};

export const useFavState = () => useContext(FavStateContext);
export const useFavDispatch = () => useContext(FavDispatchContext);
