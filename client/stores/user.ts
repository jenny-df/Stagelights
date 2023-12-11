import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

import { BodyT, fetchy } from "@/utils/fetchy";

export const useUserStore = defineStore(
  "user",
  () => {
    const currentID = ref("");
    const currentName = ref("");
    const currentEmail = ref("");
    const currentTypes: Ref<string[]> = ref([]);
    const userApplause = ref(0);

    const isLoggedIn = computed(() => currentID.value);
    const isActor = computed(() => currentTypes.value.indexOf("actor") !== -1);
    const isDirector = computed(() => currentTypes.value.indexOf("casting director") !== -1);
    const isAdmin = computed(() => currentTypes.value.indexOf("admin") !== -1);

    const resetStore = () => {
      currentName.value = "";
      currentEmail.value = "";
      currentID.value = "";
      userApplause.value = 0;
      currentTypes.value = [];
    };

    const createUser = async (email: string, password: string, name: string, profilePic: string, birthday: Date, city: string, state: string, country: string, userType: string[]) => {
      await fetchy("/api/users", "POST", {
        body: { email, password, name, profilePic, birthday, city, state, country, userType },
      });
      await updateSession();
    };

    const loginUser = async (email: string, password: string) => {
      try {
        await fetchy("/api/login", "POST", {
          body: { email, password },
        });
        await updateSession();
      } catch {
        return;
      }
    };

    const updateSession = async () => {
      try {
        const { _id, name, email } = await fetchy("/api/session", "GET", { alert: false });
        currentID.value = _id;
        currentName.value = name;
        currentEmail.value = email;
      } catch {
        currentID.value = "";
        currentName.value = "";
        currentEmail.value = "";
        currentTypes.value = [];
        userApplause.value = 0;
      }

      try {
        currentTypes.value = await fetchy("/api/restrictions", "GET", { alert: false });
        userApplause.value = await fetchy("/api/applause", "GET", { alert: false });
      } catch {
        return;
      }
    };

    const logoutUser = async () => {
      await fetchy("/api/logout", "POST");
      resetStore();
    };

    const updateUser = async (patch: BodyT, profilePic?: string) => {
      await fetchy("/api/users", "PATCH", { body: { update: patch, profilePic } });
    };

    const updateApplauseVal = async () => {
      userApplause.value = await fetchy("/api/applause", "GET");
    };
    const deleteUser = async () => {
      await fetchy("/api/users", "DELETE");
      resetStore();
    };

    return {
      currentID,
      currentName,
      currentEmail,
      currentTypes,
      userApplause,
      isLoggedIn,
      createUser,
      loginUser,
      updateSession,
      updateApplauseVal,
      logoutUser,
      updateUser,
      deleteUser,
      isActor,
      isDirector,
      isAdmin,
    };
  },
  { persist: true },
);
