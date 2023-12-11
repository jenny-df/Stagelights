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
  <div style="width: 50%; text-align: center; margin: auto">
    <div class="requestCard">
      <RouterLink :to="{ name: 'Profile', params: { id: props.connection._id, name: props.connection.name } }">
        <h3>{{ props.connection.name }}</h3>
      </RouterLink>
      <p>Connections since {{ props.connection.dateCreated }}</p>
      <menu>
        <li><button @click="removeConnection()">Delete Connection</button></li>
      </menu>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  content: "";
  display: table;
  clear: both;
  min-width: 70%;
  border-radius: 8px;
  margin-top: 30px;
  margin-left: 10%;
  margin-right: 10%;
  padding: 20px;
  background-color: lightgrey;
}
</style>
