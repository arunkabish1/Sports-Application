import MatchDisplay from "./MatchDisplay";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
      <h3 className="text-l font-bold font-custom">
        {" "}
        Date : {formattedDate} <br /> Time : {formattedTime} <br /> Currency :{" "}
        {formattedCurrency}{" "}
      </h3>
      {t("Live and completed matches")}
      <MatchDisplay />
    </>
  );
};

export default Match;
