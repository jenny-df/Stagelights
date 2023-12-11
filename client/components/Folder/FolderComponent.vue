<script setup lang="ts">
import AddFolderContent from "@/components/Folder/AddFolderContent.vue";
import router from "@/router/index";
import { onBeforeMount, onUpdated, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["folder", "type", "practice", "belongsToSession"]);
const emit = defineEmits(["refreshFolder"]);

let folderLen = ref(props.folder.contents.length);
let adding = ref(false);
let capacity = ref(0);

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
onBeforeMount(async () => {
  capacity.value = await fetchy("/api/practicefolder/settings", "GET");
});
</script>

<template>
  <div>
    <div class="folderTitle">
      <h1>{{ props.folder.name }}</h1>
      <p style="font-style: italic">{{ props.type }} Folder by {{ props.folder.user.name }}</p>
      <p v-if="props.practice">Space used: {{ folderLen }} out of {{ capacity }}</p>
      <p v-else>Number of items in folder: {{ folderLen }}</p>
    </div>
    <div class="addToFolder" v-if="props.belongsToSession">
      <AddFolderContent :id="props.folder._id" v-if="adding" :practice="props.practice" @stopAdding="() => (adding = false)" @refreshContent="() => emit('refreshFolder')" />
      <button class="pure-button" id="folderAdder" v-else @click="() => (adding = true)">+</button>
    </div>
    <div class="folderContent">
      <div class="folderItem" v-for="item in props.folder.contents" :key="item">
        <div style="width: 95%; float: left">
          <a :href="item">{{ item }}</a>
        </div>
        <div style="width: 5%; float: left">
          <button v-if="props.belongsToSession && !props.practice" @click="deleteItem(item)" class="button-error btn-small pure-button">x</button>
          <button
            v-if="props.belongsToSession && props.practice"
            @click="deleteItem(item)"
            class="btn-small pure-button"
            style="border: 1px solid; border-color: #d77533; color: #d77533; border-radius: 3"
          >
            Done
          </button>
        </div>
      </div>
    </div>

    <div class="deleteFolder" v-if="!props.practice && props.belongsToSession">
      <button @click="deleteFolder()" class="pure-button button-error">Delete Folder</button>
    </div>
  </div>
</template>

<style scoped>
.folderTitle {
  margin-top: 60px;
  text-align: center;
}
#folderAdder {
  background: #d77533;
  border-color: #d77533;
}
.addToFolder {
  text-align: right;
  margin-right: 10%;
}

.deleteFolder {
  text-align: center;
  margin-top: 70px;
}

.folderItem {
  content: "";
  display: table;
  clear: both;
  min-width: 80%;
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  padding: 20px;
  background-color: lightgrey;
}
</style>
