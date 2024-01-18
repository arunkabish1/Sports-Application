import React, { createContext, useContext, useReducer } from "react";
import { reducer as eventsReducer, initialEventsState, EventsState, EventsActions } from "./reducer";

const EventsStateContext = createContext<EventsState | undefined>(undefined);
type EventsDispatch = React.Dispatch<EventsActions>;
const EventsDispatchContext = createContext<EventsDispatch | undefined>(undefined);

export const EventsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(eventsReducer, initialEventsState);

  return (
    <EventsStateContext.Provider value={state}>
      <EventsDispatchContext.Provider value={dispatch}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsStateContext.Provider>
  );
};

export const useEventsState = () => useContext(EventsStateContext);
export const useEventsDispatch = () => useContext(EventsDispatchContext);
