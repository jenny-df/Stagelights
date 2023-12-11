<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
import { useToastStore } from "../../stores/toast";
import { fetchy } from "../../utils/fetchy";

const content = ref("");
const mediaURLs = ref("");
const category = ref("");
const categories: Ref<any[]> = ref([]);
const loaded = ref(false);
const emit = defineEmits(["refreshPosts"]);

const createPost = async (content: string, mediaURLs: string, category: string) => {
  if (category === "") {
    useToastStore().showToast({
      message: "Must select a category for the focused post!",
      style: "error",
    });
    return;
  }
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
    <label for="content" style="font-weight: bold">Focused Post</label>
    <textarea id="content" v-model="content" placeholder="Start a focused post" required> </textarea>
    <div style="min-width: 100%">
      <div class="row">
        <p style="font-weight: bold" class="categoryOption">Category of post:</p>
        <div v-for="c in categories" :key="c._id" class="categoryOption"><input type="radio" v-model="category" :value="c._id" /> {{ c.name }}</div>
      </div>
    </div>
    <textarea
      id="mediaURLs"
      v-model="mediaURLs"
      placeholder="Media for post (must be Google Drive files publicly shared via URLs. Seperate them by a comma and space)"
      style="height: 3em"
      required
    ></textarea>
    <button type="submit" class="pure-button">Share</button>
  </form>
  <section v-else-if="!loaded">
    <h1>Loading...</h1>
  </section>
  <section v-else>
    <h1>Currently can't create posts due to lack of categories. Contact Admin for change.</h1>
  </section>
</template>

<style scoped>
.categoryOption {
  float: left;
  width: 20%;
  padding: 0;
  margin: 10px;
}
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
.row {
  text-align: center;
}

button {
  background: #d77533;
  color: white;
  border-color: #d77533;
}
</style>
