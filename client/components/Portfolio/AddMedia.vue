<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["stopChange", "refreshPortfolio"]);

let url = ref("");

const addMedia = async (url: string) => {
  try {
    await fetchy(`/api/portfolio/media/add`, "PATCH", { body: { media: url } });
  } catch {
    return;
  }
  emptyForm();
  emit("refreshPortfolio");
  emit("stopChange");
};

const emptyForm = () => {
  url.value = "";
};
</script>

<template>
  <form @submit.prevent="addMedia(url)">
    <input type="url" v-model="url" placeholder="Google Drive file URL (public)" required style="width: 300px" />
    <button type="submit" class="pure-button-primary pure-button" style="margin-left: 5px">Add</button>
    <button @click="() => emit('stopChange')" class="pure-button-primary pure-button" style="margin-left: 5px">Cancel</button>
  </form>
</template>

<style scoped>
button {
  border-radius: 4px;
}
</style>
