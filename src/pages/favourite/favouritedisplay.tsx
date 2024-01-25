import React, { useState } from "react";
import Favoritebar from "./Favbar";
import { useArticleState } from "../../context/article/context";
import Modal from "./Modal";

const FavouriteDisplay: React.FC = () => {
  const [selectedPlay, setSelectedPlay] = useState<string | null>("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>("");

  const state = useArticleState();
  const { articlesData, error, errorMsg } = state;


  if (error) {
    return <span>{errorMsg}</span>;
  }

  const filteredArticles = articlesData.filter((articleData) => {
    if (selectedPlay && articleData.sport.name !== selectedPlay) {
      return false;
    }
    if (
      selectedTeam &&
      (!articleData.teams ||
        !articleData.teams.some((team) => team.name === selectedTeam))
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="mt-12">
      <Favoritebar
        setSelectedPlay={setSelectedPlay}
        setSelectedTeam={setSelectedTeam}
      />
      <div className="flex flex-col gap-1">
        {filteredArticles.length === 0 ? (
          <div className="text-center text-zinc-600 font-semibold bg-[#c7e3e2] rounded-lg p-1">
            No articles found
          </div>
        ) : (
          filteredArticles.map((articleData) => (
            <div
              key={articleData.id}
              className="p-4 mb-4 bg-[#c7e3e2] rounded-lg shadow-md"
            >
              <div className="flex flex-row ">
                <div className="flex-grow">
                  <div>
                    <span className="bg-zinc-400 rounded-lg p-1 text-xl font-bold tracking-wider text-black">
                      {articleData.sport.name}
                    </span>
                  </div>
                  <div className="mt-5 ml-2">
                    <span className="text-2xl font-bold tracking-normal">
                      {articleData.title}
                    </span>
                  </div>
                  <p className="mt-2 ml-2">
                    <span className="text-black font-semibold">
                      {articleData.summary}
                    </span>
                  </p>
                  <div className="flex justify-end">
                    <div>
                      <Modal id={articleData.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FavouriteDisplay;
