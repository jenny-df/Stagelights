<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";

const props = defineProps(["request"]);
const emit = defineEmits(["refreshNetwork", "refreshRequests"]);

async function accept() {
  try {
    await fetchy(`/api/connections/accept/${props.request.from._id}`, "PATCH");
  } catch (_) {
    return;
  }
  emit("refreshNetwork");
  emit("refreshRequests");
}

async function reject() {
  try {
    await fetchy(`/api/connections/reject/${props.request.from._id}`, "PATCH");
  } catch (_) {
    return;
  }
  emit("refreshRequests");
}
</script>

<template>
  <div class="requestCard">
    <h3>{{ props.request.from.name }}</h3>
    <p>Sent on {{ props.request.dateCreated }}</p>

    <div style="width: 15%; margin: auto">
      <menu style="margin-top: 10px">
        <li><button @click="accept()" class="button-success pure-button">Accept</button></li>
        <li><button @click="reject()" class="button-error pure-button">Reject</button></li>
      </menu>
    </div>
  </div>
</template>

<style scoped>
.requestCard {
  padding: 15px;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.button-success {
  background: rgb(28, 184, 65);
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  /* this is a green */
}
.button-error {
  background: rgb(202, 60, 60);
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  /* this is a green */
}
</style>
