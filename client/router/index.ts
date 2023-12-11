import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import ApplicationsView from "../views/ApplicationsView.vue";
import ConnectionsView from "../views/ConnectionsView.vue";
import FolderView from "../views/FolderView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import ManageOpportunitiesView from "../views/ManageOpportunitiesView.vue";
import NetworkingView from "../views/NetworkingView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import OpportunitiesView from "../views/OpportunitiesView.vue";
import PortfolioView from "../views/PortfolioView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingView from "../views/SettingView.vue";
import SignupView from "../views/SignupView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/network",
    name: "Network",
    component: NetworkingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/connections/:userId/:name",
    name: "Connections",
    component: ConnectionsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/opportunities",
    name: "Opportunities",
    component: OpportunitiesView,
    meta: { requiresAuth: true, requiresActor: true },
  },
  {
    path: "/manageOpportunities",
    name: "ManageOpportunities",
    component: ManageOpportunitiesView,
    meta: { requiresAuth: true, isDirector: true },
  },
  {
    path: "/applications",
    name: "Applications",
    component: ApplicationsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id/:name",
    name: "Profile",
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/portfolio/:id/:name",
    name: "Portfolio",
    component: PortfolioView,
    meta: { requiresAuth: true },
  },
  {
    path: "/folder/:id/:name",
    name: "Folder",
    component: FolderView,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false },
    beforeEnter: (to: any, from: any) => {
      console.log(to, from);
      const { isLoggedIn } = storeToRefs(useUserStore());
      if (isLoggedIn.value) {
        return { name: "Home" };
      }
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
    meta: { requiresAuth: false },
    beforeEnter: (to: any, from: any) => {
      console.log(to, from);
      const { isLoggedIn } = storeToRefs(useUserStore());
      if (isLoggedIn.value) {
        return { name: "Home" };
      }
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: LoginView,
    meta: { requiresAuth: false },
    beforeEnter: async (to: any, from: any) => {
      console.log(to, from);
      const { isLoggedIn } = storeToRefs(useUserStore());
      if (isLoggedIn.value) {
        const { logoutUser } = useUserStore();
        await logoutUser();
      }
      return { name: "Home" };
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFoundView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn, isAdmin, isDirector, isActor } = storeToRefs(useUserStore());
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  } else if (to.meta.requiresAdmin && !isAdmin.value) {
    return { name: "notFound", params: { catchAll: "error" } };
  } else if (to.meta.requiresDirector && !isDirector.value) {
    return { name: "notFound", params: { catchAll: "error" } };
  } else if (to.meta.requiresActor && !isActor.value) {
    return { name: "notFound", params: { catchAll: "error" } };
  }
});

export default router;
