import React, { useEffect } from "react";
import { fetchArticle } from "../../context/article/action";
import { useArticleDispatch } from "../../context/article/context";
import ArticleDisplayAll from "./ArticalDisplayAll";

const ArticleDisplay: React.FC = () => {
  const dispatchArticles = useArticleDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await fetchArticle(dispatchArticles);
    };

    fetchData();
  }, [dispatchArticles]);

  return (
  <>
      <ArticleDisplayAll />
      </>
  );
};

export default ArticleDisplay;
