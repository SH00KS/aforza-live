import { createApp } from "vue";
import { toastMsg } from "@/assets/scripts/toast.js";
import App from "./App.vue";
import "./assets/styles/acl-main.css";

const app = createApp(App);
app.config.globalProperties.$toastMsg = toastMsg;
app.mount("#app");
