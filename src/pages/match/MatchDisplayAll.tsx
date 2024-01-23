import React, { useEffect, useState } from "react";
import { useEventsState } from "../../context/match/context";
import Scoreboard from "../../assets/scoreboard.gif";
import Modal from "./Modal";
import { API_ENDPOINT } from "../../config/constants";

const MatchDisplayAll: React.FC = () => {
  const state = useEventsState();
  const { events, loading, hasError, errorMsg } = state ?? {
    events: [],
    loading: false,
    hasError: false,
    errorMsg: "",
  };

  const [scoresbyId, setScoresbyId] = useState<Record<number, string>>({});
  const [whenScoresloading, setWhenScores] = useState(true);

  const fetchScoresbyId = async () => {
    setWhenScores(true);

    const fetchPromises = events.map(async (event) => {
      try {
        const response = await fetch(`${API_ENDPOINT}/matches/${event.id}`);
        const data = await response.json();
        setScoresbyId((prevScores) => ({ ...prevScores, [event.id]: data.score }));
      } catch (error) {
        console.error(`when Fetching Error${event.id}`, error);
      }
    });

    try {
      await Promise.all(fetchPromises);
    } catch (error) {
      console.error("promise error", error);
    } finally {
      setWhenScores(false);
    }
  };

  useEffect(() => {
    fetchScoresbyId();
  }, [events]);

  const handlelivescore = () => {
    fetchScoresbyId();
  };

  if (loading) {
    return <span>Loading</span>;
  }

  if (hasError) {
    return <span>{errorMsg}</span>;
  }

  const ongoingEvents = events.filter((event: any) => event.isRunning);

  return (
    <div className="ml-5 mt-5">
      <div className="flex flex-row gap-2 ml-1 mt-3">
        <img className="h-9" src={Scoreboard} alt="Scoreboard" />
        <h1 className="text-2xl font-bold">Live Score</h1>
      </div>
      <div className="flex gap-8 overflow-x-auto">
        {ongoingEvents.map((event: any) => (
          <div key={event.id} className="p-2">
            <div className="w-96 p-4 bg-[#c7e3e2] border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer">
              <div className="flex justify-between">
                <h5 className="mb-1 text-xl">
                  <span className="mb-2 text-black font-bold bg-[#88c2c0] px-2 rounded-lg">{event.sportName}</span>
                </h5>
              </div>
              <p className="mb-2 font-medium tracking-tight">
                <span className="font-bold text-zinc-800 bg-[#88c2c0] px-2 rounded-lg">
                  {event.name && event.name.split("at")[0]}
                </span>
                <div className=" bg-[#88c2c0] rounded-lg p-1">
                  <p className="font-bold text-xl text-black">Score</p>
                  <p className="p-1">
                    <span>
                      {event.teams[0].name}: {whenScoresloading ? 'Loading...' : (scoresbyId[event.id] && `${scoresbyId[event.id][event.teams[0].name]}`)}
                    </span>
                    <br />
                    <span>
                      {event.teams[1].name}: {whenScoresloading ? 'Loading...' : (scoresbyId[event.id] && `${scoresbyId[event.id][event.teams[1].name]}`)}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between">
                <button className="rounded-md bg-blue-500 px-4 py-2 mt-2 text-sm font-medium text-white hover:bg-blue-600" onClick={handlelivescore}>
          Refresh Score
        </button>
                  <Modal id={event.id} />
                </div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchDisplayAll;
