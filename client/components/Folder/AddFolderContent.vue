<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["id", "practice"]);
const emit = defineEmits(["stopAdding", "refreshContent"]);

let url = ref("");

const AddFolderContent = async (url: string) => {
  if (props.practice) {
    await fetchy("/api/practicefolder/add", "PATCH", { body: { content: url } });
  } else {
    await fetchy("/api/repertoirefolders/add", "PATCH", { body: { content: url, folder: props.id } });
  }
  emit("refreshContent");
  emit("stopAdding");
};
</script>

<template>
  <form @submit.prevent="AddFolderContent(url)">
    <input type="url" v-model="url" required />
    <button type="submit" class="pure-button-primary pure-button">Add</button>
  </form>
  <button @click="() => emit('stopAdding')" class="pure-button-primary pure-button">Cancel</button>
</template>

<style scoped></style>
