<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const emit = defineEmits(["stopChange", "refreshPortfolio"]);

let url = ref("");

const changeHeadshot = async (url: string) => {
  try {
    await fetchy(`/api/portfolio`, "PATCH", { body: { update: { headshot: url } } });
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
  <form @submit.prevent="changeHeadshot(url)">
    <input type="url" v-model="url" required />
    <button type="submit" class="pure-button-primary pure-button">Add</button>
  </form>
  <button @click="() => emit('stopChange')" class="pure-button-primary pure-button">Cancel</button>
</template>

<style scoped></style>
