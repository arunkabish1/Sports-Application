import MatchDisplay from "./MatchDisplay";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Scoreboard from "../../assets/scoreboard.gif";


interface ChildProps {
  selectedLanguage: string;
}

const Match = ({ selectedLanguage }: ChildProps) => {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();
  const date = new Date();
  const currencyValue = 12345.67;

  const langString = selectedLanguage + "-" + selectedLanguage.toUpperCase();

  const dateFormatter = new Intl.DateTimeFormat(langString, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(langString, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const currencyFormatter = new Intl.NumberFormat(langString, {
    style: "currency",
    currency: "JPY",
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);
  const formattedCurrency = currencyFormatter.format(currencyValue);

  useEffect(() => {
    changeLanguage(selectedLanguage);
  }, [selectedLanguage]);
  

  return (
    <>
      <div className="justify-center flex mb-9 bg-black text-white gap-6">
        <h3 className="text-l font-bold font-custom">
          {" "}
          Date : {formattedDate}
        </h3>
        <h3 className="text-l font-bold font-custom">
          {" "}
         Time : {formattedTime}{" "}
        </h3>
        <h3 className="text-l font-bold font-custom">
           Currency : {formattedCurrency}{" "}
        </h3>
      </div>
      <div className="flex">
      <img className="h-9" src={Scoreboard} alt="Scoreboard" />
      <h1 className="text-2xl font-bold">{t("Live and completed matches")}</h1>
      
      </div>
      <MatchDisplay />
      {/* djkbw */}
    </>
  );
};

export default Match;
