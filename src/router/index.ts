import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/wiki/car/:trim",
            name: "car",
            component: () => import("../views/WikiPageView.vue"),
        },
        {
            path: "/wiki/engine/:engine",
            name: "engine",
            component: () => import("../views/WikiPageView.vue"),
        },
        {
            path: "/wiki/car/:trim/edit",
            name: "editCar",
            component: () => import("../views/EditWikiPageView.vue"),
        },
        {
            path: "/wiki/engine/:engine/edit",
            name: "editEngine",
            component: () => import("../views/EditWikiPageView.vue"),
        },
    ],
});

export default router;
