import "./style.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import directives from "@/directives";
import router from "@/router";

import App from "./App.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(directives);
app.mount("#app");
