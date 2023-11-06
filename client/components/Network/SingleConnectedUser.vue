<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";

const props = defineProps(["connection"]);
const emit = defineEmits(["refreshNetwork"]);

async function removeConnection() {
  try {
    await fetchy(`/api/connections/${props.connection._id}`, "DELETE");
  } catch (_) {
    return;
  }
  emit("refreshNetwork");
}
</script>

<template>
  <div class="requestCard">
    <h3>{{ props.connection.name }}</h3>
    <p>Connections since {{ props.connection.dateCreated }}</p>
    <menu>
      <li><button @click="removeConnection()">Delete Connection</button></li>
    </menu>
  </div>
</template>

<style scoped></style>
