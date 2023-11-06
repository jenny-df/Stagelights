<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { Ref, onBeforeMount, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import addFolder from "../components/Profile/AddFolder.vue";
import ConnectionPreview from "../components/Profile/ConnectionPreview.vue";
import FolderCard from "../components/Profile/FolderCard.vue";
import UserInfo from "../components/Profile/UserInfo.vue";
import { fetchy } from "../utils/fetchy";

const userStore = useUserStore();
const { currentID } = storeToRefs(userStore);
const route = useRoute();
let id = ref(route.params.id);
let isSessionUser = ref(currentID.value === id.value);
let loaded = ref(false);
let practiceFolder: Ref<any[]> = ref([]);
let repertoireFolders: Ref<any[]> = ref([]);

const loadFolderInfo = async () => {
  if (isSessionUser.value) {
    const practice = await fetchy("/api/practicefolder", "GET");
    practiceFolder.value = [practice];
  }
  const repertoires = await fetchy(`/api/repertoirefolders/${id.value}`, "GET");
  repertoireFolders.value = repertoires;
};

onBeforeMount(async () => {
  await loadFolderInfo();
  loaded.value = true;
});
</script>

<template>
  <div>
    <UserInfo :user="id" />
    <ConnectionPreview :user="id" />
    <div class="folders" v-if="loaded">
      <h1>Folders</h1>
      <div id="addFolder" v-if="isSessionUser">
        <addFolder @refresh-folders="loadFolderInfo" />
      </div>
      <div v-for="folder in repertoireFolders" :key="folder._id">
        <RouterLink :to="{ name: 'Folder', params: { id: folder._id } }">
          <FolderCard :folder="folder" :practice="false" />
        </RouterLink>
      </div>
      <div v-for="folder in practiceFolder" :key="folder._id">
        <RouterLink :to="{ name: 'Folder', params: { id: folder._id, name: folder.name } }">
          <FolderCard :folder="folder" :practice="true" />
        </RouterLink>
      </div>
    </div>
    <p v-else>loading...</p>
  </div>
</template>
<style scoped>
a {
  font-size: large;
  color: black;
  text-decoration: none;
}
</style>
