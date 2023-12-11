<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import SingleConnectedUser from "./SingleConnectedUser.vue";

const { currentID } = storeToRefs(useUserStore());

const route = useRoute();
const id = ref(route.params.userId);
const curUsersNetwork = ref(currentID.value === id.value);
const name = ref(route.params.name);
const loaded = ref(false);
let network = ref<any[]>([]);
let matches = ref<any[]>([]);
let searchedName = ref("");

async function getNetwork() {
  try {
    network.value = await fetchy(`/api/connections/${id.value}`, "GET");
    matches.value = [...network.value];
  } catch (_) {
    return;
  }
}

function searchUsers() {
  matches.value = network.value.filter((user) => user.name.toLowerCase().includes(searchedName.value.toLowerCase()));
}

onBeforeMount(async () => {
  await getNetwork();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded && network.length">
    <div style="width: 50%; margin: auto">
      <div style="text-align: center">
        <h2 v-if="searchedName">Found the following users for {{ searchedName }}:</h2>
        <h2 v-else>Everyone in {{ name }}'s network</h2>
      </div>
    </div>
    <div style="width: 50%; margin: auto">
      <div style="text-align: center">
        <label style="margin-right: 10px">Search the network</label>
        <input v-model="searchedName" type="text" @input="searchUsers()" placeholder="Name" />
      </div>
    </div>
    <section class="userInNetwork">
      <div v-if="matches.length">
        <article v-for="user in matches" :key="user._id">
          <SingleConnectedUser :connection="user" @refreshNetwork="getNetwork" v-if="curUsersNetwork" />
          <div style="width: 50%; text-align: center; margin: auto" v-else>
            <div class="requestCard">
              <RouterLink :to="{ name: 'Profile', params: { id: user._id, name: user.name } }">
                <h3>{{ user.name }}</h3>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
      <p v-else>No matches found.</p>
    </section>
  </div>
  <h3 v-else-if="loaded && !network.length">No Connections yet! Search for users and send Connection requests.</h3>
  <p v-else>loading...</p>
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
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}
.row {
  content: "";
  display: table;
  clear: left;
  min-width: 100%;
}
.userInNetwork {
  text-align: center;
}

.column-left {
  float: left;
  width: 60%;
}
.column-right {
  float: left;
  margin-left: 5px;
  text-align: right;
  width: 40%;
}
</style>
