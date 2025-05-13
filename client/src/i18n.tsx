import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import AR_lang from "./locales/ar/translation.json";
import EN_lang from "./locales/en/translation.json";
const resources = {
  en: {
    translation: EN_lang,
  },
  ar: {
    translation: AR_lang,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // detect language and do localstorage
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
