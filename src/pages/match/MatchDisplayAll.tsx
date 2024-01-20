import React from "react";
import { useEventsState } from "../../context/match/context";
import Scoreboard from "../../assets/scoreboard.gif";
import Modal from "./Modal";


const MatchDisplayAll: React.FC = () => {
  const state = useEventsState();
  const { events, loading, hasError, errorMsg } = state ?? {
    events: [],
    loading: false,
    hasError: false,
    errorMsg: "",
  };
console.log("Events:",events);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (hasError) {
    return <span>{errorMsg}</span>;
  }

  const ongoingEvents = events.filter((event: any) => event.isRunning);
  console.log("Running events:", ongoingEvents);
  
  const modelId = (id: number) => {
    console.log(id);
    return <Modal id={id} />;
  }


  return (
    <div className="ml-5 mt-5">
      <div className="flex flex-row gap-2 ml-1 mt-3">
      <img className="h-9" src={Scoreboard} />
        <h1 className=" text-2xl font-bold">Live Score</h1>
      </div>

      <div className="flex gap-8 overflow-x-auto">
        {ongoingEvents.map((event: any) => (
          <div key={event.id} className="p-2">
            <div className="w-96 p-4 bg-[#c7e3e2] border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer ">
              <div className="flex justify-between">
                <h5 className="mb-1 text-xl">
                  <span className="mb-2 text-black font-bold">
                    {event.sportName}
                  </span>
                </h5>
              </div>
              <p className="mb-2 font-medium tracking-tight ">
                <span className="font-bold text-zinc-700">
                  {event.name && event.name.split("at")[0]}
                </span>
                <br />
                <div>{modelId(event.id)}</div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchDisplayAll;