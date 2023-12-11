<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { formatDate } from "../../utils/formatDate";

const props = defineProps(["post"]);
const content = ref(props.post.content);
const category = ref(props.post.category);
const mediaURLs = ref(props.post.media);
const loaded = ref(false);
const categories: Ref<any[]> = ref([]);
const emit = defineEmits(["editPost", "refreshPosts"]);

const editPost = async (content: string) => {
  try {
    await fetchy(`/api/focusedPosts/${props.post._id}`, "PATCH", { body: { _id: props.post._id, update: { content: content } } });
  } catch (e) {
    return;
  }
  emit("editPost");
  emit("refreshPosts");
};

const getCategories = async () => {
  try {
    categories.value = await fetchy("/api/categories", "GET");
  } catch (_) {
    return;
  }
};

onBeforeMount(async () => {
  await getCategories();
  loaded.value = true;
});
</script>

<template>
  <form @submit.prevent="editPost(content)" v-if="loaded && categories.length">
    <p class="author">{{ props.post.author }}</p>
    <textarea id="content" v-model="content" placeholder="New content" required> </textarea>
    <div style="min-width: 100%">
      <div class="row">
        <p style="font-weight: bold" class="categoryOption">Category of post:</p>
        <div v-for="c in categories" :key="c._id" class="categoryOption"><input type="radio" v-model="category" :value="c._id" :checked="category._id === c._id.toString()" /> {{ c.name }}</div>
      </div>
    </div>
    <textarea id="urls" v-model="mediaURLs" placeholder="New media" required readonly> </textarea>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editPost')">Cancel</button></li>
      </menu>
      <p v-if="props.post.dateCreated !== props.post.dateUpdated" class="timestamp">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
      <p v-else class="timestamp">Created on: {{ formatDate(props.post.dateCreated) }}</p>
    </div>
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
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
.categoryOption {
  float: left;
  width: 15%;
  padding: 0;
  margin: 10px;
}
textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
}

p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
