<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["pic"]);
const emit = defineEmits(["stopChange", "refreshPortfolio"]);

let url = ref(props.pic);

const changeHeadshot = async (url: string) => {
  try {
    await fetchy(`/api/portfolio`, "PATCH", { body: { update: { headshot: url } } });
  } catch {
    return;
  }

  emit("refreshPortfolio");
  emit("stopChange");
};
</script>

<template>
  <form @submit.prevent="changeHeadshot(url)">
    <input type="url" v-model="url" required />
    <button type="submit" class="pure-button-primary pure-button">Change</button>
  </form>
  <button @click="() => emit('stopChange')" class="pure-button-primary pure-button">Cancel</button>
</template>

<style scoped></style>
