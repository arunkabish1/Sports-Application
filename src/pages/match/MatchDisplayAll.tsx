import React from "react";
import { useEventsState } from "../../context/match/context";

const MatchDisplayAll: React.FC = () => {
  const state = useEventsState();
  const { events, loading, hasError, errorMsg } = state ?? {
    events: [],
    loading: false,
    hasError: false,
    errorMsg: "",
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  if (hasError) {
    return <span>{errorMsg}</span>;
  }

  const ongoingEvents = events.filter((event: any) => event.isRunning);
  console.log("Running events:", ongoingEvents);
  
  return (
    <div className="ml-5 ">
      <div className="flex flex-row">
        <svg
          className="w-12 h-12"
          width="100"
          height="100"
          viewBox="0 13 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        >
          <circle cx="50" cy="50" r="20">
            <animate
              attributeName="cx"
              values="50;40;50;60;50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="50" r="20" fill="#00FF00">
            <animate
              attributeName="cx"
              values="50;60;50;40;50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="50" r="20" fill="#FF0000">
            <animate
              attributeName="cx"
              values="50;40;50;60;50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <h1 className="text-2xl font-bold mb-4 ml">Live Score</h1>
      </div>

      <div className="flex gap-8">
        {ongoingEvents.map((event: any) => (
          <div key={event.id} className="p-2">
            <div className="w-96 p-4 bg-[#c7e3e2] border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer">
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
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchDisplayAll;
