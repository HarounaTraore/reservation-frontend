import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
import  "@/assets/css/style.css"

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import i18n from "@/locales/index.js"
import router from "./router";
import axios from "axios";



const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(axios);
app.mount("#app");
