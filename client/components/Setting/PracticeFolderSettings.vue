<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

let capacity = ref(0);
let loaded = ref(false);

const changeCapacity = async (capacity: number) => {
  try {
    await fetchy("/api/practicefolder/settings", "PATCH", {
      body: { capacityLimit: capacity },
    });
  } catch (_) {
    return;
  }
};

const getCapacity = async () => {
  try {
    capacity.value = await fetchy("/api/practicefolder/settings", "GET");
  } catch (_) {
    return;
  }
};

onBeforeMount(async () => {
  await getCapacity();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded" class="capacityChange">
    <h2>Change Capacity</h2>
    <form @submit.prevent="changeCapacity(capacity)" class="pure-form">
      <fieldset>
        <input type="number" placeholder="Capacity" v-model="capacity" min="10" required /><br />
        <button type="submit" class="pure-button pure-button-primary">Update</button>
      </fieldset>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>
