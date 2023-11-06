<script setup lang="ts">
import AddFolderContent from "@/components/Folder/AddFolderContent.vue";
import router from "@/router/index";
import { onUpdated, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["folder", "type", "practice", "belongsToSession"]);
const emit = defineEmits(["refreshFolder"]);

let folderLen = ref(props.folder.contents.length);
let adding = ref(false);

const deleteFolder = async () => {
  await fetchy("/api/repertoirefolders", "DELETE", { query: { _id: props.folder._id } });
  router.go(-1);
};

const deleteItem = async (item: string) => {
  if (props.practice) {
    await fetchy("/api/practicefolder/remove", "PATCH", { query: { content: item } });
  } else {
    await fetchy("/api/repertoirefolders/remove", "PATCH", { query: { content: item, folder: props.folder._id } });
  }

  emit("refreshFolder");
};

onUpdated(() => (folderLen.value = props.folder.contents.length));
</script>

<template>
  <div>
    <div class="folderTitle">
      <h1>{{ props.folder.name }}</h1>
      <p>{{ props.type }} Folder by {{ props.folder.user.name }}</p>
      <p v-if="props.practice">Space used: {{ folderLen }} out of {{ props.folder.numContents }}</p>
      <p v-else>Number of items in folder: {{ folderLen }}</p>
    </div>
    <div class="folderSettings" v-if="props.belongsToSession">
      <div class="addToFolder">
        <AddFolderContent :id="props.folder._id" v-if="adding" @stopAdding="() => (adding = false)" @refreshContent="() => emit('refreshFolder')" />
        <button v-else @click="() => (adding = true)">+</button>
      </div>
      <div class="deleteFolder" v-if="!props.practice">
        <button @click="deleteFolder()">Delete Folder</button>
      </div>
    </div>
    <div class="folderContent">
      <div class="folderItem" v-for="item in props.folder.contents" :key="item">
        <a :href="item">{{ item }}</a>
        <button v-if="props.belongsToSession" @click="deleteItem(item)" class="button-error btn-small pure-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
