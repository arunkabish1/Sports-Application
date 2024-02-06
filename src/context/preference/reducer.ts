export enum UserPreferencesActionTypes {
  FETCH_REQUEST = "FETCH_REQUEST",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAILURE = "FETCH_FAILURE",
  PATCH_REQUEST = "PATCH_REQUEST",
  PATCH_SUCCESS = "PATCH_SUCCESS",
  PATCH_FAILURE = "PATCH_FAILURE",
  REORDER = "REORDER",
}

export interface UserPreferenceData {
  teams: number[];
  sports: number[];
}

export interface UserPreferencesState {
  userPreferences: UserPreferenceData;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialUserPreferencesState: UserPreferencesState = {
  userPreferences: {
    teams: [1, 2],
    sports: [2, 1, 3],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type UserPreferencesAction =
  | { type: UserPreferencesActionTypes.FETCH_REQUEST }
  | { type: UserPreferencesActionTypes.FETCH_SUCCESS; payload: UserPreferenceData }
  | { type: UserPreferencesActionTypes.FETCH_FAILURE; payload: string }
  | { type: UserPreferencesActionTypes.PATCH_REQUEST }
  | { type: UserPreferencesActionTypes.PATCH_SUCCESS }
  | { type: UserPreferencesActionTypes.PATCH_FAILURE; payload: string }
  | { type: UserPreferencesActionTypes.REORDER; payload: UserPreferenceData };

export const UserPreferencesReducer = (
  state: UserPreferencesState,
  action: UserPreferencesAction
): UserPreferencesState => {
  switch (action.type) {
    case UserPreferencesActionTypes.FETCH_REQUEST:
      return { ...state, isLoading: true };
    case UserPreferencesActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, userPreferences: action.payload };
    case UserPreferencesActionTypes.FETCH_FAILURE:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case UserPreferencesActionTypes.PATCH_REQUEST:
      return { ...state, isLoading: true };
    case UserPreferencesActionTypes.PATCH_SUCCESS:
      return { ...state, isLoading: false };
    case UserPreferencesActionTypes.PATCH_FAILURE:
      return { ...state, isLoading: false, isError: true, errorMessage: action.payload };
    case UserPreferencesActionTypes.REORDER:
      return { ...state, userPreferences: action.payload };
    default:
      return state;
  }
};
