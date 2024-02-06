import { TeamInfo } from "./reducer";

export const addFavTeam = (team: TeamInfo) => ({
  type: "ADD_FAV_TEAM",
  team,
});

export const removeFavTeam = (teamId: number) => ({
  type: "REMOVE_FAV_TEAM",
  teamId,
});

export const setFavTeams = (teams: TeamInfo[]) => ({
  type: "SET_FAV_TEAMS",
  teams,
});
