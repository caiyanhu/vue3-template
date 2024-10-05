import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

import AP from "@/views/AP.vue";
import Distributed from "@/views/Distributed.vue";
import Home from "@/views/Home.vue";
import MySQL from "@/views/MySQL.vue";
import PostgreSQL from "@/views/PostgreSQL.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/mysql",
    name: "MySQL",
    component: MySQL,
  },
  {
    path: "/pg",
    name: "PostgreSQL",
    component: PostgreSQL,
  },
  {
    path: "/distributed",
    name: "Distributed",
    component: Distributed,
  },
  {
    path: "/ap",
    name: "AP",
    component: AP,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
