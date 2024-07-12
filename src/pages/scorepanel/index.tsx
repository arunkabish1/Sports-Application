import React, { Suspense, useState, useEffect } from "react";
import AccountLayout from "../../layout/account";
import Match from "../match";
import Article from "../article";
import Fav from "../favourite";
import ErrorBoundary from "../../components/Errorboundary";

const Scorepanel: React.FC = () => {
  const storedLanguage = localStorage.getItem("selectedLanguage");
  const initialLanguage = storedLanguage || "en";

  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
  ];

  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

  const isSmallScreen = window.innerWidth >= 320 && window.innerWidth <= 767;
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <div className="flex items-center mb-4">
            <label className="mr-2">Select Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <AccountLayout />
          <Match selectedLanguage={selectedLanguage} />
          <div className="grid grid-cols-4 gap-1">
            {isSmallScreen ? (
              <div className="col-span-4">
                <Article selectedLanguage={selectedLanguage} />
              </div>
            ) : (
              <div className="col-span-3">
                <Article selectedLanguage={selectedLanguage} />
              </div>
            )}

            {isSmallScreen ? (
              <div className="col-span-4">
                <Fav />
              </div>
            ) : (
              <div className="col-span-1">
                <Fav />
              </div>
            )}
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Scorepanel;
