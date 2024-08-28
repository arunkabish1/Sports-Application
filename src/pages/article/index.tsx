import React, { Suspense, useEffect } from "react";
import ArticleDisplay from "./ArticalDisplay";
import { useTranslation } from "react-i18next";
import Gif from "../../assets/book.gif";

interface ChildProps {
  selectedLanguage: string;
}

const Article: React.FC = ({ selectedLanguage }: ChildProps) => {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <>
      <div className="col-span-3">
        <div className="flex flex-row gap-3 mb-4 overflow-x-auto">
          <img className="h-8" src={Gif} alt="Article icon" />
          <h1 className="text-xl font-bold font-custom">
            {t("Sports Articles")}
          </h1>
        </div>

        <ArticleDisplay />
      </div>
    </>
  );
};

export default Article;
