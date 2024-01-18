import { API_ENDPOINT } from "../../config/constants";

export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") || "";

  console.log("Fetching matches...");
  dispatch({ type: "FETCH_EVENTS_REQUEST" });

  try {
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch matches. ${response.status}`);
    }

    console.log("Matches fetched.");
    const data = await response.json();
    console.log("Received data:", data);
    dispatch({ type: "FETCH_EVENTS_SUCCESS", payload: data.matches });
  } catch (error) {
    console.error("Error while fetching matches:", error);

    dispatch({
      type: "FETCH_EVENTS_FAILURE",
      payload: "Unable to load the matches with the API",
    });
  }
};
