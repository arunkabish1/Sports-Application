import React, { createContext, useContext, useReducer, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";

export interface TeamInfo {
  id: number;
  name: string;
  plays: string;
}

interface FavState {
  favoriteTeams: TeamInfo[];
}

const initialFavState: FavState = {
  favoriteTeams: [],
};

type FavActions =
  | { type: "ADD_FAV_TEAM"; team: TeamInfo }
  | { type: "REMOVE_FAV_TEAM"; teamId: number }
  | { type: "SET_FAV_TEAMS"; teams: TeamInfo[] };

const favReducer = (state: FavState, action: FavActions): FavState => {
  switch (action.type) {
    case "ADD_FAV_TEAM":
      return {
        ...state,
        favoriteTeams: [...state.favoriteTeams, action.team],
      };
    case "REMOVE_FAV_TEAM":
      return {
        ...state,
        favoriteTeams: state.favoriteTeams.filter(
          (team) => team.id !== action.teamId
        ),
      };
    case "SET_FAV_TEAMS":
      return {
        ...state,
        favoriteTeams: action.teams,
      };
    default:
      return state;
  }
};

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
