<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["pic"]);
const emit = defineEmits(["stopChange", "refreshPortfolio"]);

let url = ref(props.pic);

const changeHeadshot = async (url: string) => {
  try {
    await fetchy(`/api/portfolio/headshot`, "PATCH", { body: { headshot: url } });
  } catch {
    return;
  }

  emit("refreshPortfolio");
  emit("stopChange");
};
</script>

<template>
  <div style="min-width: 100%">
    <form @submit.prevent="changeHeadshot(url)">
      <input type="url" v-model="url" required style="float: left; width: 400px; margin-bottom: 10px" />
      <button type="submit" class="pure-button-primary pure-button" style="margin-left: 5px; float: left; width: 30%">Change</button>
      <button @click="() => emit('stopChange')" class="pure-button-primary pure-button" style="margin-left: 5px; float: left; width: 30%">Cancel</button>
    </form>
  </div>
</template>

<style scoped></style>
