import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentName = ref("");
    const currentEmail = ref("");

    const isLoggedIn = computed(() => currentName.value && currentEmail.value);

    const resetStore = () => {
      currentName.value = "";
      currentEmail.value = "";
    };

    const createUser = async (email: string, password: string, name: string, profilePic: string, birthday: Date, city: string, state: string, country: string, userType: string) => {
      await fetchy("/api/users", "POST", {
        body: { email, password, name, profilePic, birthday, city, state, country, userType },
      });
    };

    const loginUser = async (email: string, password: string) => {
      await fetchy("/api/login", "POST", {
        body: { email, password },
      });
    };

    const updateSession = async () => {
      try {
        const { name, email } = await fetchy("/api/session", "GET", { alert: false });
        currentName.value = name;
        currentEmail.value = email;
      } catch {
        currentName.value = "";
        currentEmail.value = "";
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUser = async (patch: BodyT, profilePic?: string) => {
      await fetchy("/api/users", "PATCH", { body: { update: patch, profilePic } });
    };

    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentName,
      currentEmail,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      logoutUser,
      updateUser,
      deleteUser,
    };
  },
  { persist: true },
);
