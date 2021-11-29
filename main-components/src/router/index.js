import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layout";

Vue.use(VueRouter);

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/table",
    children: [
      {
        path: "table",
        component: () => import("@/views/table/index"),
        name: "table",
        meta: { title: "table", icon: "clipboard", affix: true },
      },
    ],
  },
  {
    path: "/icon",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index"),
        name: "Icons",
        meta: { title: "Icons", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/codemirror",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/codemirror/index"),
        name: "Icons",
        meta: { title: "codemirror", icon: "icon", noCache: true },
      },
    ],
  },
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

export default router;
