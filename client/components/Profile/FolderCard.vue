<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["folder", "practice"]);
let name = ref(props.folder.name);
let content = ref(props.folder.contents.length);
let practice = ref(props.practice);
</script>

<template>
  <div :id="name" @click="() => true">
    <h2>{{ name }}</h2>
    <p v-if="!practice">Repertoire Folder</p>
    <p>Contains {{ content }} items.</p>
  </div>
</template>
