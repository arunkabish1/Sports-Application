import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Transition } from "@headlessui/react";

interface ArticleInfo {
  thumbnail: string | undefined;
  id: number;
  title: string;
  image: string;
  summary: string;
  content: string;
  date: string;
  sport: {
    id: number;
    name: string;
  };
  
}

const Modal: React.FC<{ id: number }> = ({ id }) => {
  const [article, setArticle] = useState<ArticleInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchArticleDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article details");
      }

      const data: ArticleInfo = await response.json();
      setArticle(data);
    } catch (error) {
      console.error("Error fetching article details", error);
    }
  };
  // console.log("article:",article);

  useEffect(() => {
    fetchArticleDetails();
  }, [id]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
      >
        Read Full Article
      </button>

      <Transition show={isOpen} as={React.Fragment}>
        <div className="fixed inset-0 z-50">
          <div className="sm:block text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity">
                <div className="fixed inset-0 bg-black opacity-75"></div>
              </div>
            </Transition.Child>

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block overflow-y-auto max-h-[80vh] align-bottom bg-[#ffffff] rounded-lg text-left overflow-y-autoshadow-xl transform transition-all sm:w-3/4 sm:my-10">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {article && (
                    <div>
                      <div className="flex justify-between  rounded-lg mb-2">
                      <h4 className="text-2xl bg-[#c7e3e2] rounded-lg font-bold p-1 px-3">{article.sport.name}
                      </h4>                      
                        <button
                          onClick={closeModal}
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          X
                        </button>
                      </div>
                      <div className="p-1 bg-[#c7e3e2] border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer">
                      <h3 className="text-2xl mb-2 font-bold text-center p-1 ">{article.title}</h3>
                      <img className=" w-12/12 h-9/12 object-cover rounded" src={article.thumbnail} alt="article image" />
                        <h4 className="text-xl font-bold text-center p-1">Article Summary</h4>
                        <p className="text-gray-800 font-semibold">{article.summary}</p>
                        <h4 className="text-xl font-bold text-center p-1">Article Content</h4>
                        <p className="text-gray-800 font-semibold">{article.content}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Modal;
