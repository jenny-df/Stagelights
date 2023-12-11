<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["challenge"]);
const emit = defineEmits(["refreshChallenge", "doneAccept", "refreshPosts"]);

const content = ref("");
const mediaURLs = ref("");

const acceptChallenge = async (content: string, mediaURLs: string) => {
  try {
    await fetchy("/api/acceptChallenge", "POST", {
      body: { content, mediaURLs },
    });
  } catch (_) {
    return;
  }
  emit("refreshChallenge");
  emit("refreshPosts");
  emit("doneAccept");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
  mediaURLs.value = "";
};
</script>

<template>
  <h2>Challenge Accepted!</h2>
  <h4>{{ props.challenge.prompt }}</h4>
  <form @submit.prevent="acceptChallenge(content, mediaURLs)">
    <textarea id="content" v-model="content" placeholder="Write text content here!" rows="5" required> </textarea>
    <textarea id="mediaURLs" v-model="mediaURLs" placeholder="Media URLs seperated by comma and a space (must be publicly shared Google Drive files)" rows="3" required></textarea>
    <menu>
      <button type="submit" class="pure-button-primary pure-button">Create Post</button>
      <button @click="() => emit('doneAccept')" class="pure-button-primary pure-button">Cancel</button>
    </menu>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
button {
  margin: 8px;
  border-radius: 4px;
}
</style>
