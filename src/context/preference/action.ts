import { UserPreferencesActionTypes, UserPreferencesAction, UserPreferenceData } from "./reducer";
import { API_ENDPOINT } from "../../config/constants";

export const fetchUserPreferences = async (dispatch: React.Dispatch<UserPreferencesAction>) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: UserPreferencesActionTypes.FETCH_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user preferences");
    }

    const data: UserPreferenceData = await response.json();
    dispatch({ type: UserPreferencesActionTypes.FETCH_SUCCESS, payload: data });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({ type: UserPreferencesActionTypes.FETCH_FAILURE, payload: "Unable to load user preferences" });
  }
};

export const patchUserPreferences = async (
  dispatch: React.Dispatch<UserPreferencesAction>,
  sports: any,
  teams: any
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: UserPreferencesActionTypes.PATCH_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        preferences: {
          teams: teams,
          sports: sports,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update user preferences");
    }
    dispatch({ type: UserPreferencesActionTypes.PATCH_SUCCESS });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({ type: UserPreferencesActionTypes.PATCH_FAILURE, payload: "Unable to update user preferences" });
  }
};
