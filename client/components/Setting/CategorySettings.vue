<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let categoryName = ref("");
let categoryDescription = ref("");
let existingCategories: Ref<any[]> = ref([]);
let loaded = ref(false);
const emit = defineEmits(["refreshPosts"]);

const addCategory = async (name: string, description: string) => {
  try {
    await fetchy("/api/categories", "POST", {
      body: { name, description },
    });
  } catch (_) {
    return;
  }
  loaded.value = false;
  emit("refreshPosts");
  emptyForm();
  await getCategories();
};

const deleteCategory = async (id: string) => {
  try {
    await fetchy("/api/categories", "DELETE", {
      query: { id },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  loaded.value = false;
  await getCategories();
};

const getCategories = async () => {
  try {
    existingCategories.value = await fetchy("/api/categories", "GET");
  } catch (_) {
    return;
  }
  loaded.value = true;
};

const emptyForm = () => {
  categoryName.value = "";
  categoryDescription.value = "";
};

onBeforeMount(async () => {
  await getCategories();
});
</script>

<template>
  <h2>Add a category</h2>
  <form @submit.prevent="addCategory(categoryName, categoryDescription)" class="pure-form">
    <fieldset>
      <input type="text" placeholder="Category Name" v-model="categoryName" required /><br />
      <input type="text" placeholder="Category Description" v-model="categoryDescription" required /><br />
      <button type="submit" class="pure-button pure-button-primary">Add</button>
    </fieldset>
  </form>
  <div v-if="loaded">
    <h2>Delete a category</h2>
    <ul>
      <li v-for="category in existingCategories" :key="category._id">
        {{ category.name }} ({{ category.description }})
        <button class="button-error btn-small pure-button" @click="deleteCategory(category._id)">Delete</button>
      </li>
    </ul>
  </div>
  <div v-else>Loading...</div>
</template>
