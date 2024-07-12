import React, { Suspense, useEffect } from "react";
import ArticleDisplay from "./ArticalDisplay";
import { useTranslation } from "react-i18next";

interface ChildProps {
  selectedLanguage: string;
}

const Article: React.FC =  ({selectedLanguage}: ChildProps) => {
  const { t, i18n: { changeLanguage } } = useTranslation();

  useEffect(() => {
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  return (
    <>
      <div className="col-span-3">
      <h1 className="text-xl font-bold font-custom">{t('Sports Articles')}</h1>
        <ArticleDisplay />
      </div>
    </>
  );
};

export default Article;
