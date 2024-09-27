import "./style.css";

import { createApp } from "vue";

import directives from "@/directives";
import router from "@/router";

import App from "./App.vue";

const app = createApp(App);
app.use(router);
app.use(directives);
app.mount("#app");
