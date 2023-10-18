<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const mediaURLs = ref("");
const category = ref("652f4d65a3ea4fd3eaab0000");
const emit = defineEmits(["refreshPosts"]);

const createPost = async (content: string, mediaURLs: string, category: string) => {
  try {
    await fetchy("/api/focusedPosts", "POST", {
      body: { content, mediaURLs, category },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createPost(content, mediaURLs, category)">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <!-- <input id="category" v-model="category" type="text" placeholder="Category Id" required /> -->
    <input id="mediaURLs" v-model="mediaURLs" type="text" placeholder="Media URLs seperated by comma" required />
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
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
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
</style>
