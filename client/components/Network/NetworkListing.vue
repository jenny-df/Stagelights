<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import SingleConnectedUser from "./SingleConnectedUser.vue";

const { currentID } = storeToRefs(useUserStore());

const loaded = ref(false);
let network = ref<any[]>([]);
let matches = ref<any[]>([]);
let searchedName = ref("");

async function getNetwork() {
  try {
    network.value = await fetchy("/api/connections", "GET", { query: { id: currentID.value } });
    matches.value = [...network.value];
  } catch (_) {
    return;
  }
}

function searchUsers() {
  matches.value = network.value.filter((user) => user.name.includes(searchedName.value));
}

onBeforeMount(async () => {
  await getNetwork();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded && network.length">
    <div class="row">
      <input v-model="searchedName" type="text" @input="searchUsers()" placeholder="Name" />
      <h2 v-if="searchedName">Found the following users for {{ searchedName }}:</h2>
    </div>
    <section class="userInNetwork">
      <h2 v-if="!searchedName">Your Network:</h2>
      <h2 v-else>Network Matches:</h2>
      <div v-if="matches.length">
        <article v-for="user in matches" :key="user._id">
          <SingleConnectedUser :connection="user" @refreshNetwork="getNetwork()" />
        </article>
      </div>
      <p v-else>No matches found.</p>
    </section>
  </div>
  <h3 v-else-if="loaded && !network.length">No Connections yet! Search for users and send Connection requests.</h3>
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
