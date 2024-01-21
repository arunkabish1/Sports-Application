import React, { useEffect, useState } from "react";
import { useArticleState } from "../../context/article/context";
import Gif from "../../assets/book.gif";
import Modal from "./Modal";
import { API_ENDPOINT } from "../../config/constants";
import ArticleBar from "./ArticleBar";

const ArticalDisplayAll: React.FC = () => {
  const state = useArticleState();
  const { articlesData, loading, error, errorMsg } = state;

  const [sport, setSport] = useState([]);
  const [Userselected, setUserselected] = useState<number | null>(null);
  const [Option, setOption] = useState("date");

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/sports`);
        const data = await response.json();
        setSport(data.sports);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchSports();
  }, []);

  const modelId = (id: number) => {
    return <Modal id={id} />;
  };

  const handleSortChange = (option: string) => {
    setOption(option);
  };

  let sortitem = [...articlesData];

  switch (Option) {
    case "date":
      sortitem.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case "AZ":
      sortitem.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "ZA":
      sortitem.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }

  const filteredArticles = Userselected
    ? sortitem.filter((article) => article.sport.id === Userselected)
    : sortitem;

  if (loading) {
    return <span className="text-2xl font-semibold">Loading the articles</span>;
  }

  if (error) {
    return <span>{errorMsg}</span>;
  }

  return (
    <>
      <div className="flex flex-row gap-3 mb-4 overflow-x-auto">
        <img className="h-8" src={Gif} alt="Article icon" />
        <h1 className="text-2xl font-bold">Trending Articles</h1>
      </div>
      <ArticleBar
        sportnames={sport}
        Userselected={Userselected}
        userSport={(UserselectedId: number | null) => setUserselected(UserselectedId)}
        Orderchange={handleSortChange}
      />

      <div className="flex flex-col gap-1">
        {filteredArticles.length === 0 ? (
          <span className="text-2xl flex font-bold   text-zinc-700 bg-[#c7e3e2] rounded-lg p-4 justify-center tracking-widest">
            No articles found for the selected sport 
          </span>
        ) : (
          filteredArticles.map((articleData) => (
            <div
              key={articleData.id}
              className="p-4 mb-4 bg-[#c7e3e2] rounded-lg shadow-md"
            >
              <div className="flex flex-row ">
                <div className="flex-shrink-0 pr-4 w-1/4">
                  <div className="h-40 w-full">
                    <img
                      className="w-full h-full object-cover rounded"
                      src={articleData.thumbnail}
                      alt="Thumbnail"
                    />
                  </div>
                </div>
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
                    <div>{modelId(articleData.id)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ArticalDisplayAll;
