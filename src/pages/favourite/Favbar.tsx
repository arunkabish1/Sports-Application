import React, { useEffect, useState } from "react";
import {
  useFavState,
  useFavDispatch,
  TeamInfo,
} from "../../context/fav/context";
import { API_ENDPOINT } from "../../config/constants";

const Favoritebar: React.FC<{
  setSelectedPlay: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ setSelectedPlay, setSelectedTeam }) => {
  const favState = useFavState();
  const dispatch = useFavDispatch();
  const [selectedPlay, setSelectedPlayLocal] = useState("");
  const [selectedTeam, setSelectedTeamLocal] = useState("");
  // console.log("c",selectedPlay)
  // console.log("d",selectedTeam)
  useEffect(() => {
    const fetchTeamsByPlay = async () => {
      if (selectedPlay) {
        try {
          const response = await fetch(
            `${API_ENDPOINT}/teams?plays=${selectedPlay}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch teams for play: ${selectedPlay}`);
          }
          const data: TeamInfo[] = await response.json();
          dispatch({ type: "SET_FAV_TEAMS", teams: data });
        } catch (error) {
          console.error(`Error: ${selectedPlay}`, error);
        }
      }
    };

    fetchTeamsByPlay();
  }, [selectedPlay, dispatch]);

  const handlePlayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlayValue = event.target.value;
    // console.log(selectedPlayValue)

    setSelectedPlay(selectedPlayValue);
    setSelectedTeam("");
    setSelectedPlayLocal(selectedPlayValue);
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeamValue = event.target.value;
    // console.log(selectedTeamValue)
    setSelectedTeam(selectedTeamValue);
    setSelectedTeamLocal(selectedTeamValue);
    // console.log(selectedTeamValue);
    // console.log(selectedPlay);
  };

  return (
    <div className="bg-[#c7e3e2] p-1 mb-1 rounded-lg">
      <h2 className="text-xl font-bold text-zinc-700">Favorite Teams</h2>
      <div className="flex flex-col gap-2 p-1">
        <div>
          <label htmlFor="playsSelect" className="font-bold text-zinc-700">
            Select Sport:
          </label>
          <select
            id="playsSelect"
            className="rounded-lg bg-[#88c2c0] px-2 ml-2"
            onChange={handlePlayChange}
            value={selectedPlay}
          >
            <option value="">Select Sport</option>
            {Array.from(
              new Set(
                favState && favState.favoriteTeams.map((team) => team.plays)
              )
            ).map((play) => (
              <option key={play} value={play}>
                {play}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="teamsSelect" className="font-bold text-zinc-700">
            Select Team:
          </label>
          <select
            id="teamsSelect"
            className="rounded-lg bg-[#88c2c0] px-2 ml-2"
            onChange={handleTeamChange}
            value={selectedTeam}
          >
            <option value="">Select Team</option>
            {favState &&
              favState.favoriteTeams
                .filter((team) =>
                  selectedPlay ? team.plays === selectedPlay : true
                )
                .map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Favoritebar;
