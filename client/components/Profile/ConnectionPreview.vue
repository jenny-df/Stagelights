<script setup lang="ts">
import { onBeforeMount, ref, Ref, watch } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["user"]);
let id = ref(props.user);
let connections: Ref<any[]> = ref([]);
let loaded = ref(false);

onBeforeMount(async () => {
  // get connections before starting
  connections.value = await fetchy(`/api/connections/${id.value}`, "GET");
  if (connections.value.length > 10) {
    connections.value = connections.value.slice(0, 10);
  }
  loaded.value = true;
});
watch(
  () => props.user,
  async (newId, oldId) => {
    // Check if the newId is different from the oldId, then update data
    if (newId !== oldId) {
      loaded.value = false;
      id.value = newId;
      connections.value = await fetchy(`/api/connections/${id.value}`, "GET");
      if (connections.value.length > 10) {
        connections.value = connections.value.slice(0, 10);
      }
      loaded.value = true;
    }
  },
);
</script>

<template>
  <div v-if="loaded" id="connectionCard">
    <div v-if="connections.length">
      <h2>Connections:</h2>
      <article v-for="user in connections" :key="user._id">
        <iframe :src="user.profilePic" scrolling="no" style="pointer-events: none" allowfullscreen="false" width="100px" height="100px"></iframe>
        <RouterLink :to="{ name: 'Profile', params: { id: user._id, name: user.name } }">
          <h3>{{ user.name }}</h3>
        </RouterLink>
      </article>
    </div>
    <p v-else>No connections yet</p>
  </div>
  <p v-else>Loading...</p>
</template>
<style scoped>
#connectionCard {
  background: lightgray;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  padding-top: 20px;
  padding-bottom: 20px;

  width: 329px;
  text-align: center;
  overflow: scroll;
  overflow-wrap: break-word;
}
</style>
