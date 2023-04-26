import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/HomeView.vue";
import SingleCat from "@/views/SingleCat.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: (route) => ({ breedId: route.query.breedId }),
  },
  {
    path: "/cats/:breedId",
    name: "singleCat",
    component: SingleCat,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
