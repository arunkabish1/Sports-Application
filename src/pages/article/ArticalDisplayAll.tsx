import React, { useEffect, useState } from "react";
import { useArticleState } from "../../context/article/context";
import Modal from "./Modal";
import ArticleBar from "./ArticleBar";
import loadinggif from "../../assets/loading.gif";
import { fetchUserPreferences } from "../../context/preference/action"; 
import { useFetchSports } from "../../context/sports/action";

const ArticalDisplayAll: React.FC = () => {
  const state = useArticleState();
  const { articlesData, loading, error, errorMsg } = state;
  const { sports } = useFetchSports();
  const [Userselected, setUserselected] = useState<number | null>(null);
  const [Option, setOption] = useState("date");
  const [userPreferences, setUserPreferences] = useState<any>(null);
  const [articleBarLoading, setArticleBarLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUserPreferences((data) => {
      setUserPreferences(data);
      setArticleBarLoading(false);
    });
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
  ? sortitem.filter((article) => {
      if (Array.isArray(Userselected)) {
        return Userselected.includes(article.sport.id);
      } else {
        return article.sport.id === Userselected;
      }
    })
  : sortitem;

  if (articleBarLoading) {
    return (
      <div>
        <img className="flex justify-center" src={loadinggif} alt="Loading" />
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <span>{errorMsg}</span>;
  }

  return (
    <>
      <ArticleBar
        sportnames={sports}
        Userselected={Userselected}
        userSport={(UserselectedId: number | null) => setUserselected(UserselectedId)}
        Orderchange={handleSortChange}
      />

      <div className="flex flex-col gap-1">
        {filteredArticles.length === 0 ? (
          <span className="text-2xl flex font-bold text-zinc-700 bg-[#c7e3e2] rounded-lg p-3 justify-center track">
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