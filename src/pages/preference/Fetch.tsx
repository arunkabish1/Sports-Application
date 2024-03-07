import React, { useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";

const FetchUserPreferences: React.FC<{ onFetchPreferences: (preferences: any) => void }> = ({ onFetchPreferences }) => {
  useEffect(() => {
    const fetchUserPreferences = async () => {
      const token = localStorage.getItem("authToken") ?? "";

      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        console.log("User preferences data:", data);
        onFetchPreferences(data.preferences);
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    };

    fetchUserPreferences();
  }, []);

  return null;
};

export default FetchUserPreferences;
