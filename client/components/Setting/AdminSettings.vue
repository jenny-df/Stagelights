<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let categoryName = ref("");
let categoryDescription = ref("");
const emit = defineEmits(["refreshPosts"]);

const addCategory = async (name: string, description: string) => {
  try {
    await fetchy("/api/categories", "POST", {
      body: { name, description },
    });
  } catch (_) {
    return;
  }
  emit("refreshPosts");
  emptyForm();
};

const emptyForm = () => {
  categoryName.value = "";
  categoryDescription.value = "";
};
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
</template>
