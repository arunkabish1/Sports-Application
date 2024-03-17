import React, { useState, useMemo, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";

interface Bar {
  sportnames: { id: number; name: string }[];
  Userselected: number | null;
  userSport: (UserselectedId: number | null) => void;
  Orderchange: (sortOption: string) => void;
}

const ArticleBar: React.FC<Bar> = ({
  sportnames,
  Userselected,
  userSport,
  Orderchange,
}) => {
  const [userSports, setUserSports] = useState<string[]>([]);
  const [preferencesLoaded, setPreferencesLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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
        if (data.preferences && data.preferences.sports) {
          setUserSports(data.preferences.sports);
        }
        setPreferencesLoaded(true);
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!preferencesLoaded) {
      fetchUserPreferences();
    }
  }, []);

  const filteredSports = useMemo(() => {
    if (!preferencesLoaded || userSports.length === 0) {
      return sportnames;
    } else {
      const preferredSports = sportnames.filter((sport) =>
        userSports.includes(sport.name)
      );
      return preferredSports.length > 0 ? preferredSports : sportnames;
    }
  }, [preferencesLoaded, userSports, sportnames]);

  const showAllSports = () => {
    userSport(null);
  };

  const showYourNews = () => {
    if (userSports.length > 0) {
      const userSelectedSports = sportnames.filter((sport) =>
        userSports.includes(sport.name)
      );

      const selectedSportIds = userSelectedSports.map((sport) => sport.id);

      userSport(selectedSportIds);
    }
  };
  useEffect(() => {
    if (preferencesLoaded) {
      showYourNews();
    }
  }, [preferencesLoaded]);

  return (
    <div className="flex justify-around mb-1 overflow-x-auto bg-[#c7e3e2] rounded-lg p-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="rounded-lg items-center p-1 flex">
            {/* <label className="text-xl font-bold text-zinc-700 mr-3">
              Sort:
            </label> */}
            <select
              className="rounded-lg px-3 bg-[#88c2c0] h-8 text-zinc-700 hover:text-zinc-950 font-bold border-zinc-700 border"
              onChange={(e) => Orderchange(e.target.value)}
            >
              <option value="date">Date</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
            </select>
          </div>
          <div className="grid grid-flow-col overflow-x-auto items-center ">
            {(!preferencesLoaded || userSports.length === 0) && (
              <button
                className={`text-xl font-bold text-zinc-700 hover:text-zinc-900 ml-14 ${
                  Userselected === null
                    ? "border-b-4 border-solid border-zinc-700"
                    : ""
                }`}
                onClick={showAllSports}
              >
                All News
              </button>
            )}
            {userSports.length > 0 && (
              <button
                className={`text-xl font-bold text-zinc-700 hover:text-zinc-900 ml-14 ${
                  Userselected === null
                    ? "border-b-4 border-solid border-zinc-700"
                    : ""
                }`}
                onClick={showYourNews}
              >
                Your News
              </button>
            )}
            {filteredSports.map((sport) => (
              <button
                key={sport.id}
                className={`text-xl font-bold text-zinc-700 hover:text-zinc-900 ml-14 ${
                  Userselected === sport.id
                    ? "border-b-4 border-solid  border-zinc-700"
                    : ""
                }`}
                onClick={() => userSport(sport.id)}
              >
                {sport.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ArticleBar;
