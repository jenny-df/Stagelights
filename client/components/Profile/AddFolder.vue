<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

let name = ref("");
const emit = defineEmits(["refreshFolders"]);

const createFolder = async (name: string) => {
  try {
    await fetchy("/api/repertoirefolders", "POST", {
      body: { name: name },
    });
  } catch (_) {
    return;
  }
  emit("refreshFolders");
  emptyForm();
};

const emptyForm = () => {
  name.value = "";
};
</script>

<template>
  <div>
    <form @submit.prevent="createFolder(name)">
      <input type="text" name="name" v-model="name" placeholder="Folder Name" required />
      <button type="submit" class="pure-button-primary pure-button">+ Repertoire Folder</button>
    </form>
  </div>
</template>
