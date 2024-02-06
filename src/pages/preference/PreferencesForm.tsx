import React, { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { patchUserPreferences } from "../../context/preference/action";
import { useUserPreferences } from "../../context/preference/context";
import { useFavState } from "../../context/fav/fav-context";
import { useFetchSports } from "../../context/sports/action";
import { fetchUserPreferences } from "../../context/preference/action";

function PreferencesForm({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<number[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const { dispatch: preferenceDispatch } = useUserPreferences();
  const favState = useFavState();
  const { sports: sportsDataList, isLoading: isLoadingSports, isError: isErrorSports } = useFetchSports();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsOpen(true);
      setSelectedSports([]);
      setSelectedTeams([]);
      await fetchUserPreferences(preferenceDispatch);
    };

    fetchInitialData();
  }, [preferenceDispatch]);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSportChange = (sportId: number) => {
    setSelectedSports((prevSelectedSports) =>
      prevSelectedSports.includes(sportId)
        ? prevSelectedSports.filter((id) => id !== sportId)
        : [...prevSelectedSports, sportId]
    );
  };

  const handleTeamChange = (teamId: number) => {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.includes(teamId)
        ? prevSelectedTeams.filter((id) => id !== teamId)
        : [...prevSelectedTeams, teamId]
    );
  };

  const handleSavePreferences = async () => {
    try {
      await patchUserPreferences(preferenceDispatch, selectedSports, selectedTeams);
      console.log('Selected sports:', selectedSports);
      console.log("Selected teams:", selectedTeams);
      closeModal();
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-black opacity-75"></div>
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
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:w-full sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      User Preferences
                    </h3>
                    <div className="mt-5">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Choose your favourite sports:
                          </label>
                          <div className="mt-2 grid grid-cols-2 gap-y-4">
                            {sportsDataList.map((sport) => (
                              <div key={sport.id} className="flex items-center">
                                <input
                                  id={`sport-${sport.id}`}
                                  name={`sport-${sport.id}`}
                                  type="checkbox"
                                  checked={selectedSports.includes(sport.id)}
                                  onChange={() => handleSportChange(sport.id)}
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor={`sport-${sport.id}`}
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  {sport.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Choose your favourite teams:
                          </label>
                          <div className="mt-2 grid grid-cols-4 gap-y-4 gap-x-9">
                            {favState.favoriteTeams.map((team) => (
                              <div key={team.id} className="flex items-center">
                                <input
                                  id={`team-${team.id}`}
                                  name={`team-${team.id}`}
                                  type="checkbox"
                                  checked={selectedTeams.includes(team.id)}
                                  onChange={() => handleTeamChange(team.id)}
                                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                />
                                <label
                                  htmlFor={`team-${team.id}`}
                                  className="ml-3 block text-sm font-medium text-gray-700"
                                >
                                  {team.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default PreferencesForm;
