export interface TeamInfo {
    id: number;
    name: string;
    plays: string;
  }
  
  export interface FavState {
    favoriteTeams: TeamInfo[];
  }
  
  export const initialFavState: FavState = {
    favoriteTeams: [],
  };
  
  export type FavActions =
    | { type: "ADD_FAV_TEAM"; team: TeamInfo }
    | { type: "REMOVE_FAV_TEAM"; teamId: number }
    | { type: "SET_FAV_TEAMS"; teams: TeamInfo[] };
  
  export const favReducer = (state: FavState, action: FavActions): FavState => {
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
  