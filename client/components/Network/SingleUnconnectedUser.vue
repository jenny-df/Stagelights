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
  <div style="width: 50%; text-align: center; margin: auto">
    <div class="requestCard">
      <RouterLink :to="{ name: 'Profile', params: { id: props.user._id, name: props.user.name } }">
        <h3>{{ props.user.name }}</h3>
      </RouterLink>
      <menu>
        <li v-if="!props.sent"><button @click="sendRequest()">Send Connection Request</button></li>
        <li v-else><button @click="cancelRequest()">Cancel Connection Request</button></li>
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
