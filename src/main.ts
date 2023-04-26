import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import VueToast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(VueToast);
app.use(store);

app.mount("#app");
