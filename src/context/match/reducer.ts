interface EventInfo {
  id: number;
  eventName: string;
  sportType: string;
  isLive: boolean;
  eventSummary: string;
  eventEndTime: string;
  teams: [];
}

export interface EventsState {
  events: EventInfo[];
  loading: boolean;
  hasError: boolean;
  errorMsg: string;
}

export const initialEventsState: EventsState = {
  events: [],
  loading: false,
  hasError: false,
  errorMsg: "",
};

export type EventsActions =
  | { type: "FETCH_EVENTS_REQUEST" }
  | { type: "FETCH_EVENTS_SUCCESS"; payload: EventInfo[] }
  | { type: "FETCH_EVENTS_FAILURE"; payload: string };

export const reducer = (
  state: EventsState = initialEventsState,
  action: EventsActions
): EventsState => {
  switch (action.type) {
    case "FETCH_EVENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_EVENTS_SUCCESS":
      return {
        ...state,
        events: action.payload,
        loading: false,
        hasError: false,
        errorMsg: "",
      };
    case "FETCH_EVENTS_FAILURE":
      return {
        ...state,
        loading: false,
        hasError: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};
