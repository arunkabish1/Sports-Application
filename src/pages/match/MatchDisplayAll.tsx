import React, { useEffect, useState } from "react";
import { useEventsState } from "../../context/match/context";
import Scoreboard from "../../assets/scoreboard.gif";
import Modal from "./Modal";
import { API_ENDPOINT } from "../../config/constants";
import FetchUserPreferences from "../preference/Fetch";

const MatchDisplayAll: React.FC = () => {
  const state = useEventsState();
  const { events, hasError, errorMsg } = state ?? {
    events: [],
    loading: false,
    hasError: false,
    errorMsg: "",
  };

  const [userSportsPreferences, setUserSportsPreferences] = useState<string[]>(
    []
  );
  const [userTeamPreferences, setUserTeamPreferences] = useState<string[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [scoresById, setScoresById] = useState<Record<number, string>>({});
  const [scoresLoading, setScoresLoading] = useState(true);

  const handleFetchPreferences = (preferences: any) => {
    const preferredSports = preferences?.sports || [];
    const preferredTeams = preferences?.teams || [];

    setUserSportsPreferences(preferredSports);
    setUserTeamPreferences(preferredTeams);
  };

  useEffect(() => {
    if (
      userSportsPreferences.length === 0 &&
      userTeamPreferences.length === 0
    ) {
      setFilteredEvents(events);
    } else {
      const filteredEvents = events.filter(
        (event) =>
          userSportsPreferences.includes(event.sportName) ||
          event.teams.some((team) => userTeamPreferences.includes(team.name))
      );
      setFilteredEvents(filteredEvents);
    }
  }, [events, userSportsPreferences, userTeamPreferences]);

  const fetchScoresById = async () => {
    setScoresLoading(true);

    const fetchPromises = filteredEvents.map(async (event) => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches/${event.id}`);
        const data = await response.json();
        setScoresById((prevScores) => ({
          ...prevScores,
          [event.id]: data.score,
        }));
      } catch (error) {
        console.error(`Error fetching scores for event ${event.id}`, error);
      }
    });

    try {
      await Promise.all(fetchPromises);
    } catch (error) {
      console.error("Promise error", error);
    } finally {
      setScoresLoading(false);
    }
  };

  useEffect(() => {
    fetchScoresById();
  }, [filteredEvents]);

  const handleLiveScore = () => {
    if (filteredEvents.filter((event: any) => event.isRunning)) {
      fetchScoresById();
    }
  };

  if (hasError) {
    return <span>{errorMsg}</span>;
  }

  const liveMatches = filteredEvents.filter((event: any) => event.isRunning);
  const endedMatches = filteredEvents.filter((event: any) => !event.isRunning);

  return (
    <div className="mt-5">
      <div className="flex flex-row gap-2 mt-3">
        <img className="h-9" src={Scoreboard} alt="Scoreboard" />
        <h1 className="text-2xl font-bold">Live Score</h1>
      </div>
      <div className="grid grid-flow-col overflow-x-auto">
        {liveMatches.map((event: any) => (
          <div key={event.id} className="p-2">
            <div
              style={innerWidth > 768 ? { width: "350px" } : { width: "100%" }}
              className="p-2 min-w-[300px] bg-[#c7e3e2] border  border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer"
            >
              <div className="flex justify-between">
                <h5 className="mb-1 text-xl">
                  <span className="mb-2 text-black font-bold bg-[#88c2c0] px-2 rounded-lg">
                    {event.sportName}
                  </span>
                </h5>
              </div>
              <p className="mb-2 font-medium tracking-tight">
                <span className="font-bold text-zinc-800 bg-[#88c2c0] px-2 rounded-lg">
                  {event.name && event.name.split("at")[0]}
                </span>
                <div className=" bg-[#88c2c0] rounded-lg p-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-xl text-black">Score</p>
                    <span className="text-red-600 font-bold">Live Match</span>
                  </div>
                  <p className="p-1">
                    <span>
                      {event.teams[0].name}:{" "}
                      {scoresLoading
                        ? "Loading..."
                        : scoresById[event.id] &&
                          `${scoresById[event.id][event.teams[0].name]}`}
                    </span>
                    <br />
                    <span>
                      {event.teams[1].name}:{" "}
                      {scoresLoading
                        ? "Loading..."
                        : scoresById[event.id] &&
                          `${scoresById[event.id][event.teams[1].name]}`}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    className="rounded-md bg-blue-500 px-4 py-2 mt-2 text-sm font-medium text-white hover:bg-blue-600"
                    onClick={handleLiveScore}
                  >
                    Refresh Scores
                  </button>
                  <Modal id={event.id} />
                </div>
              </p>
            </div>
          </div>
        ))}
        {endedMatches.map((event: any) => (
          <div key={event.id} className="p-2">
            <div
              style={innerWidth > 768 ? { width: "350px" } : { width: "100%" }}
              className="p-2 min-w-[300px] bg-[#c7e3e2] border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer"
            >
              <div className="flex justify-between">
                <h5 className="mb-1 text-xl">
                  <span className="mb-2 text-black font-bold bg-[#88c2c0] px-2 rounded-lg">
                    {event.sportName}
                  </span>
                </h5>
              </div>
              <p className="mb-2 font-medium tracking-tight">
                <span className="font-bold text-zinc-800 bg-[#88c2c0] px-2 rounded-lg">
                  {event.name && event.name.split("at")[0]}
                </span>

                <div className=" bg-[#88c2c0] rounded-lg p-1">
                  <div className="flex justify-between">
                    <p className="font-bold text-xl text-black">Score</p>
                    <span className="text-gray-600 font-bold">Match Ended</span>
                  </div>
                  <p className="p-1">
                    <span>
                      {event.teams[0].name}:{" "}
                      {scoresLoading
                        ? "Loading..."
                        : scoresById[event.id] &&
                          `${scoresById[event.id][event.teams[0].name]}`}
                    </span>
                    <br />
                    <span>
                      {event.teams[1].name}:{" "}
                      {scoresLoading
                        ? "Loading..."
                        : scoresById[event.id] &&
                          `${scoresById[event.id][event.teams[1].name]}`}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <Modal id={event.id} />
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
      <FetchUserPreferences onFetchPreferences={handleFetchPreferences} />
    </div>
  );
};

export default MatchDisplayAll;
