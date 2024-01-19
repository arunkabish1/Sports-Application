import React from "react";
import { useArticleState } from "../../context/article/context";
import Gif from "../../assets/book.gif";



const ArticalDisplayAll: React.FC = () => {
  const state = useArticleState();
  console.log("Component State:", state);
  const { articlesData, loading, error, errorMsg } = state;
  console.log("Articles received:", articlesData);

  if (loading) {
    return (
      <span className="text-2xl font-semibold font-green">
        Loading the articles
      </span>
    );
  }

  if (error) {
    return <span>{errorMsg}</span>;
  }

  return (
    <>
      <div className="flex flex-row gap-3 mb-4">
        <img className="h-8" src={Gif} />
        <h1 className="text-2xl font-bold font-green-500">Articles</h1>
      </div>
      <div className="flex flex-col">
        {articlesData.map((articleData) => (
          <div
            key={articleData.id}
            className="p-4 mb-4 bg-[#c7e3e2] rounded-lg shadow-md"
          >
            <div className="flex flex-row">
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
      <span className="bg-zinc-400 rounded-lg p-1 text-xl font-bold tracking-wider text-black-700">
        {articleData.sport.name}
      </span>
    </div>
    <div className="mt-5 ml-2">
      <span className="text-2xl font-bold tracking-normal">
        {articleData.title}
      </span>
    </div>
    <p className="mt-2 ml-2">
      <span className="text-zinc-900 font-semibold">
        {articleData.summary}
      </span>
    </p>
    <div className="flex justify-end">
      <button
        type="button"
        id=""
        className="rounded-md bg-blue-500 px-4 py-2 mt-2 text-sm font-medium text-white hover:bg-blue-600"
      > 
        Read More
      </button>
    </div>
  </div>
</div>

          </div>
        ))}
      </div>
    </>
  );
};

export default ArticalDisplayAll;
