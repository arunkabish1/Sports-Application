import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Transition } from "@headlessui/react";

interface EventInfo {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: Record<string, string>;
  teams: { id: number; name: string }[];
  sportName: string;
  playingTeam: number;
  story: string;
}

const Modal: React.FC<{ id: number }> = ({ id }) => {
  const [events, setEvents] = useState<EventInfo | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchEventDetails = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }

      const data: EventInfo = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching match details", error);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const renderScore = () => {
    if (events && events.score) {
      return (
        <div>
          <ul>
            {Object.entries(events.score).map(([team, points]) => (
              <li key={team}>
                {team}: {points}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="rounded-md bg-blue-500 px-4 py-2 mt-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Read More
        </button>
      </div>
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
                <div className="fixed  inset-0 bg-black opacity-75 "></div>
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
              <div className="inline-block overflow-y-auto max-h-[90vh] mt-10 align-bottom bg-[#ffffff] rounded-lg text-left overflow-y-autoshadow-xl transform transition-all sm:w-3/4 sm:my-10 ">
                <div className="px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {events && (
                    <div>
                      <div className="grid grid-cols-2 items-end">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="fixed top-0 right-0 mt-4 mr-4 z-50 flex justify-center items-center rounded-full border border-transparent shadow-sm bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-110 p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 animate-close"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex">
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
                      </div>

                      <h1 className="text-2xl font-bold text-center p-1">
                        {events.sportName}
                      </h1>
                      <h2 className="text-xl font-bold text-center p-1">
                        {events.name && events.name.split("at")[0]}
                      </h2>
                      <h3 className="text-l font-bold text-center">
                        At{events.name && events.name.split("at")[1]}
                      </h3>
                      <div className="p-1 bg-[#c7e3e2] mb-2 mt-3 border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer ">
                        <div className="flex p-6">
                          <h3 className=" text-4xl font-bold ">Score:</h3>
                          <h3 className="text-l ml-5 font-bold">
                            {renderScore()}
                          </h3>
                        </div>
                        <p className="p-1 text-zinc-900">
                          Match Location : {events.location}
                        </p>
                        <p className=" p-1 text-zinc-900">
                          Starting Time : {events.startsAt}
                        </p>
                        <p className=" p-1 text-zinc-900">
                          Ending Time : {events.endsAt}
                        </p>
                      </div>

                      <div className="p-1 bg-[#c7e3e2] border border-gray-400 rounded-lg shadow-md text-grey-100 hover:bg-gray-300 cursor-pointer">
                        <h4 className="text-xl font-bold text-center p-1">
                          Match Summary
                        </h4>
                        <p className="text-gray-800 font-semibold">
                          {events.story}
                        </p>
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
