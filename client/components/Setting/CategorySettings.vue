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
  <div class="row">
    <div class="column-left">
      <h1>Add a category</h1>
    </div>
    <div class="column-right seperation-left">
      <form @submit.prevent="addCategory(categoryName, categoryDescription)" class="pure-form">
        <fieldset>
          <input type="text" placeholder="Category Name" v-model="categoryName" required /><br />
          <input type="text" placeholder="Category Description" v-model="categoryDescription" required /><br />
          <br />
          <button type="submit" class="pure-button">Add</button>
        </fieldset>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="column-left">
      <h1>Delete a category</h1>
    </div>
    <div class="column-right seperation-left">
      <div v-if="loaded">
        <ul>
          <li v-for="category in existingCategories" :key="category._id">
            {{ category.name }} ({{ category.description }})
            <button class="button-error btn-small pure-button" @click="deleteCategory(category._id)">Delete</button>
          </li>
        </ul>
      </div>
      <div v-else>Loading...</div>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.row {
  margin-top: 50px;
  content: "";
  display: table;
  clear: both;
  min-width: 100%;
  background-color: lightgrey;
}

.column-left {
  float: left;
  width: 40%;
  padding: 50px;
  text-align: center;
}
.column-right {
  float: left;
  width: 60%;
  padding: 50px;
}
.seperation-left {
  border-left: 5px solid grey;
}
.seperation-right {
  border-right: 5px solid grey;
}
</style>
