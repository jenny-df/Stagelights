<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const mediaURLs = ref("");
const category = ref("");
const categories: Ref<any[]> = ref([]);
const loaded = ref(false);
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

const getCategories = async () => {
  try {
    categories.value = await fetchy("/api/categories", "GET");
  } catch (_) {
    return;
  }
};

const emptyForm = () => {
  content.value = "";
  category.value = "";
  mediaURLs.value = "";
};

onBeforeMount(async () => {
  await getCategories();
  loaded.value = true;
});
</script>

<template>
  <form @submit.prevent="createPost(content, mediaURLs, category)" v-if="loaded && categories.length">
    <label for="content">Post Contents:</label>
    <textarea id="content" v-model="content" placeholder="Create a post!" required> </textarea>
    <select name="category" id="category" v-model="category">
      <option :value="c._id" v-for="c in categories" :key="c._id">{{ c.name }}</option>
    </select>
    <input id="mediaURLs" v-model="mediaURLs" type="text" placeholder="Media URLs seperated by comma" required />
    <button type="submit" class="pure-button-primary pure-button">Create Post</button>
  </form>
  <section v-else-if="!loaded">
    <h1>Loading...</h1>
  </section>
  <section v-else>
    <h1>Currently can't create posts due to lack of categories. Contact Admin for change.</h1>
  </section>
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
