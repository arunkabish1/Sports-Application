import React, { useEffect } from "react";
import { fetchMatches } from "../../context/match/action";
import { useEventsDispatch } from "../../context/match/context";
import MatchDisplayAll from "./MatchDisplayAll";

const MatchDisplay: React.FC = () => {
  const dispatchMatches = useEventsDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatches);
  }, []);

  return (
    <div>
      <MatchDisplayAll />
    </div>
  );
};

export default MatchDisplay;
