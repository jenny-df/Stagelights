<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const props = defineProps(["parent"]);
const emit = defineEmits(["refreshComments"]);

const createComment = async (content: string, post: string) => {
  try {
    await fetchy("/api/comments", "POST", {
      body: { content, post },
    });
  } catch (_) {
    return;
  }
  emit("refreshComments");
  emptyForm();
};

const emptyForm = () => {
  content.value = "";
};
</script>

<template>
  <form @submit.prevent="createComment(content, props.parent.id)">
    <input id="content" type="text" v-model="content" placeholder="Comment" required />
    <button type="submit" class="pure-button-primary pure-button">Comment</button>
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
