export enum UserPreferenceListAvailableAction {
    FETCH_USERPREFERENCES_REQUEST = "FETCH_USERPREFERENCES_REQUEST",
    FETCH_USERPREFERENCES_SUCCESS = "FETCH_USERPREFERENCES_SUCCESS",
    FETCH_USERPREFERENCES_FAILURE = "FETCH_USERPREFERENCES_FAILURE",
  
    PATCH_USERPREFERENCES_REQUEST = "PATCH_USERPREFERENCES_REQUEST",
    PATCH_USERPREFERENCES_SUCCESS = "PATCH_USERPREFERENCES_SUCCESS",
    PATCH_USERPREFERENCES_FAILURE = "PATCH_USERPREFERENCES_FAILURE",
  
    REORDER_USERPREFERENCES = "REORDER_USERPREFERENCES",
  }
  
  export type UserPreferenceActions =
    | { type: UserPreferenceListAvailableAction.REORDER_USERPREFERENCES; payload: UserPreferenceData }
    | { type: UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_REQUEST }
    | { type: UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_SUCCESS; payload: UserPreferenceData }
    | { type: UserPreferenceListAvailableAction.FETCH_USERPREFERENCES_FAILURE; payload: string }
    | { type: UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_REQUEST }
    | { type: UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_SUCCESS }
    | { type: UserPreferenceListAvailableAction.PATCH_USERPREFERENCES_FAILURE; payload: string }
  ;
  
  // A type to hold dispatch actions in a context.
  export type UserPreferencesDispatch = React.Dispatch<UserPreferenceActions>;
  
  
  export type UserPreferenceData = {
    teams: number[];
    sports: number[];
  };
  
  
  export interface UserPreferenceListState {
    userpreferencesDataList: UserPreferenceData;
    isUserPreferenceLoading: boolean;
    isUserPreferenceError: boolean;
    errorUserPreferenceMessage: string;
  }
  