<script setup lang="ts">
import router from "@/router/index";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, Ref } from "vue";
import { useRoute } from "vue-router";
import FolderComponent from "../components/Folder/FolderComponent.vue";
import { fetchy } from "../utils/fetchy";

const route = useRoute();
let folderId = ref(route.params.id);

const { currentID } = storeToRefs(useUserStore());

let folder: Ref<any> = ref("");
let practice = ref(false);
let type = ref("");
let loaded = ref(false);
let belongsToSession = ref(false);

const loadFolderInfo = async () => {
  const practiceFolder = await fetchy("/api/practicefolder", "GET");
  if (practiceFolder._id.toString() === folderId.value) {
    folder.value = practiceFolder;
    practice.value = true;
    type.value = "Practice";
    belongsToSession.value = true;
  } else {
    if (typeof folderId.value !== "string") {
      folderId.value = folderId.value.join();
    }
    try {
      const repertoire = await fetchy(`/api/repertoirefolders`, "GET", { query: { _id: folderId.value } });
      folder.value = repertoire;
      practice.value = false;
      type.value = "Repertoire";
      if (repertoire.user._id === currentID.value) {
        belongsToSession.value = true;
      } else {
        belongsToSession.value = false;
      }
    } catch {
      await router.push({ name: "notFound", params: { catchAll: "error" } });
    }
  }
};

onBeforeMount(async () => {
  await loadFolderInfo();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded">
    <FolderComponent :folder="folder" :practice="practice" :type="type" :belongsToSession="belongsToSession" @refreshFolder="loadFolderInfo()" />
  </div>
</template>

<style scoped></style>
