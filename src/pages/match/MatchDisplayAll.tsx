import React from 'react';
import { useEventsState } from '../../context/match/context';

const MatchDisplayAll: React.FC = () => {
  const state = useEventsState();
  const { events, loading, hasError, errorMsg } = state ?? { events: [], loading: false, hasError: false, errorMsg: "" };

  if (loading) {
    return <span>Loading...</span>;
  }

  if (hasError) {
    return <span>{errorMsg}</span>;
  }

  return (
    <div className="flex flex-wrap gap-4 ml-5">
      {events.map((event: any) => (
        <div key={event.id} className="w-full p-4 bg-[#0DD3CF] border border-black rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer">
          <div className="flex justify-between">
            <h5 className="mb-2 text-xl font-medium tracking-tight">
              <span className="text-neutral-800 font-semibold">{event.sportName}</span>
            </h5>
          </div>
          <p className="mb-2 font-medium tracking-tight">
            <span className="font-semibold">{event.name && event.name.split('at')[0]}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default MatchDisplayAll;
