import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/myreservation/:id",
    name: "Myreservation",
    component: () =>
      import("../views/Myreservation.vue"),
  },
  {
    path: "/reservation/:id",
    name: "ReservationForm",
    component: () =>
      import("../views/ReservationForm.vue"),
  },
  {
    path: "/confirm/:id",
    name: "confirmationForm",
    component: () =>
      import("../views/Confirm.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
