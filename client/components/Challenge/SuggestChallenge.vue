<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["id", "practice"]);
const emit = defineEmits(["doneSuggest", "refreshChallenge"]);

let prompt = ref("");

const proposeChallenge = async (prompt: string) => {
  await fetchy("/api/challenge", "POST", { body: { prompt: prompt, folder: props.id } });
  emit("refreshChallenge");
  emit("doneSuggest");
};
</script>

<template>
  <h2>Suggest a Challenge</h2>
  <form @submit.prevent="proposeChallenge(prompt)">
    <input type="text" v-model="prompt" required />
    <menu>
      <button type="submit" class="pure-button-primary pure-button">Suggest</button>
      <button @click="() => emit('doneSuggest')" class="pure-button-primary pure-button">Cancel</button>
    </menu>
  </form>
</template>

<style scoped></style>
