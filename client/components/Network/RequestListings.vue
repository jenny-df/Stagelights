<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SingleConnectedUser from "./SingleConnectedUser.vue";
import SingleRequest from "./SingleRequest.vue";
import SingleUnconnectedUser from "./SingleUnconnectedUser.vue";

const { currentID } = storeToRefs(useUserStore());

const loaded = ref(false);
let allUsers = ref<any[]>([]);
let network = ref<any[]>([]);
let requests = ref<any[]>([]);
let searchedName = ref("");
let canBeAdded = ref<any[]>([]);
let alreadyAdded = ref<any[]>([]);

async function getNetwork() {
  try {
    const connections = await fetchy(`/api/connections/${currentID.value}`, "GET");
    network.value = connections.map((user: any) => user._id.toString());
    searchUsers();
  } catch (_) {
    return;
  }
}

async function getRequests() {
  try {
    requests.value = await fetchy("/api/connections/requests", "GET");
  } catch (_) {
    return;
  }
}

async function getAllUsers() {
  try {
    const users: any[] = await fetchy("/api/users", "GET");
    allUsers.value = users.filter((user) => user._id.toString() !== currentID.value);
  } catch (_) {
    return;
  }
}

function searchUsers() {
  if (searchedName.value) {
    const matches = allUsers.value.filter((user) => user.name.toLowerCase().includes(searchedName.value.toLowerCase()));
    alreadyFriendSorter(matches);
  } else {
    canBeAdded.value = [];
    alreadyAdded.value = [];
  }
}

function alreadyFriendSorter(matches: any[]) {
  const friends: any[] = [];
  const strangers: any[] = [];
  for (const match of matches) {
    if (network.value.includes(match._id.toString())) {
      friends.push(match);
    } else {
      strangers.push(match);
    }
  }
  canBeAdded.value = strangers;
  alreadyAdded.value = friends;
}

onBeforeMount(async () => {
  await getAllUsers();
  await getNetwork();
  await getRequests();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded">
    <section>
      <h2>Connection Requests:</h2>
      <section class="userRequests" v-if="requests.length">
        <article v-for="req in requests" :key="req._id">
          <SingleRequest :request="req" @refreshNetwork="getNetwork()" @refreshRequests="getRequests()" />
        </article>
      </section>
      <p v-else>No Requests</p>
    </section>
    <div class="row">
      <h2>Search the Stagelights Userbase:</h2>
      <input v-model="searchedName" type="text" @input="searchUsers()" placeholder="Name" />
      <div v-if="searchedName.length">
        <div v-if="alreadyAdded.length || canBeAdded.length">
          <h2>Found the following users for {{ searchedName }}:</h2>
          <article v-for="user in alreadyAdded" :key="user._id">
            <SingleConnectedUser :connection="user" @refreshNetwork="getNetwork()" />
          </article>
          <article v-for="user in canBeAdded" :key="user._id">
            <SingleUnconnectedUser :user="user" />
          </article>
        </div>
        <p v-else>No users found for "{{ searchedName }}"</p>
      </div>
    </div>
  </div>
  <p v-else>loading...</p>
</template>

<style scoped>
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
</style>
