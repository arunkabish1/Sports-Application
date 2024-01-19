import { API_ENDPOINT } from "../../config/constants";

export const fetchArticle = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") || "";
  console.log("Fetching article....");
  dispatch({ type: "REQUEST_ARTICLES" });

  try {
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch articles: ${response.status}`);
      dispatch({
        type: "FAILURE_ARTICLES",
        payload: "Unable to load the articles from the API.",
      });
      return;
    }

    const articlesData = await response.json();
    console.log("API Response:", articlesData);

    dispatch({ type: "RECEIVE_ARTICLES", payload: articlesData });
  } catch (error) {
    console.error("Error fetching articles:", error);
    dispatch({
      type: "FAILURE_ARTICLES",
      payload: "Unable to load the articles from the API.",
    });
  }
};
