import React, { useEffect } from "react";
import { fetchArticle } from "../../context/article/action";
import { useArticleDispatch } from "../../context/article/context";
import FavouriteDisplay from "./favouritedisplay";

const Favourite: React.FC = () => {
  const dispatchArticles = useArticleDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetchArticle(dispatchArticles);
    };

    fetchData();
  }, [dispatchArticles]);

  return (
  <>
      <FavouriteDisplay />
      </>
  );
};

export default  Favourite;
