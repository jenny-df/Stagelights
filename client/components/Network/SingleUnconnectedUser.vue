<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const props = defineProps(["sent", "user"]);

let sent = ref(props.sent);

async function sendRequest() {
  try {
    await fetchy(`/api/connections/requests`, "POST", { body: { receiverId: props.user._id } });
    sent.value = true;
  } catch (_) {
    return;
  }
}

async function cancelRequest() {
  try {
    await fetchy(`/api/connections/requests/${props.user._id}`, "DELETE");
    sent.value = false;
  } catch (_) {
    return;
  }
}
</script>

<template>
  <div class="requestCard">
    <h3>{{ props.user.name }}</h3>
    <menu>
      <li v-if="!props.sent"><button @click="sendRequest()">Send Connection Request</button></li>
      <li v-else><button @click="cancelRequest()">Cancel Connection Request</button></li>
    </menu>
  </div>
</template>

<style scoped></style>
