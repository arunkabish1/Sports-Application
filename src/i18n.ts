import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enJSON from './locales/en.json';
import esJSON from './locales/es.json';
import frJSON from './locales/fr.json';
import deJSON from './locales/de.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { ...enJSON },
    es: { ...esJSON },
    fr: { ...frJSON },
    de: { ...deJSON}
  },
  lng: "en",
});