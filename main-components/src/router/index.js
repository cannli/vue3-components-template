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
        meta: { title: "Icons", icon: "chart", noCache: true },
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
        meta: { title: "codemirror", icon: "form", noCache: true },
      },
    ],
  },
  {
    path: "/tinymce",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/tinymce/tinymce"),
        name: "Icons",
        meta: { title: "tinymce", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/pdf",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/pdf/index"),
        name: "Icons",
        meta: { title: "pdf", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/wangeditor",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/wangeditor/text-editor"),
        name: "wangeditor",
        meta: { title: "wangeditor", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/gridTable",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/gridTable/index"),
        name: "gridTable",
        meta: { title: "gridTable", icon: "icon", noCache: true },
      },
    ],
  },
];

const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

export default router;
