<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { Ref, onBeforeMount, ref, watch } from "vue";
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

watch(
  () => route.params.id,
  async (newId, oldId) => {
    // Check if the newId is different from the oldId, then update data
    if (newId !== oldId) {
      loaded.value = false;
      id.value = newId;
      await loadFolderInfo();
      isSessionUser.value = id.value === currentID.value;
      loaded.value = true;
    }
  },
);
</script>

<template>
  <div>
    <UserInfo :user="id" />

    <div class="outer-row">
      <div class="outer-column-left">
        <ConnectionPreview :user="id" />
      </div>
      <div class="outer-column-right">
        <div class="folders" v-if="loaded">
          <h1 style="text-align: center">Folders</h1>
          <div id="addFolder" v-if="isSessionUser" style="text-align: right">
            <addFolder @refresh-folders="loadFolderInfo" />
          </div>
          <div v-for="folder in repertoireFolders" :key="folder._id" style="background-color: #d77533; opacity: 90%; padding: 30px; margin-top: 30px; text-align: center">
            <RouterLink :to="{ name: 'Folder', params: { id: folder._id } }">
              <FolderCard :folder="folder" :practice="false" />
            </RouterLink>
          </div>
          <div v-for="folder in practiceFolder" :key="folder._id" style="background-color: #d77533; back;opacity: 90%; padding: 30px; margin-top: 30px; text-align: center;">
            <RouterLink :to="{ name: 'Folder', params: { id: folder._id, name: folder.name } }">
              <FolderCard :folder="folder" :practice="true" />
            </RouterLink>
          </div>
        </div>
        <p v-else>loading...</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.outer-row {
  margin-top: 20px;
  content: "";
  display: table;
  clear: both;
  min-width: 100%;
}

.outer-column-left {
  float: left;
  width: 27%;
  padding: 50px;
  text-align: center;
}
.outer-column-right {
  float: left;
  width: 73%;
  padding: 50px;
}
a {
  font-size: large;
  color: black;
  text-decoration: none;
}
</style>
