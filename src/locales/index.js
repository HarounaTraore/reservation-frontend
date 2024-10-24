import { createI18n } from 'vue-i18n';
import fr from "./fr.json";
import en from "./en.json";
import ar from "./ar.json";

const i18n = createI18n({
  // locale: "fr",
  fallbackLocale: "en", 
  messages: {
    en, 
    fr, 
    ar, 
  },
});

export default i18n;
