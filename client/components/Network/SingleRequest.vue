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
    <menu>
      <li><button @click="accept()">Accept</button></li>
      <li><button @click="reject()">Reject</button></li>
    </menu>
  </div>
</template>

<style scoped></style>
