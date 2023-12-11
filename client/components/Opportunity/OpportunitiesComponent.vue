<script setup lang="ts">
import OpCard from "@/components/Opportunity/OpCard.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import OpInformation from "./OpInformation.vue";

const loaded = ref(false);
let ops = ref<Array<any>>([]);
let selected = ref<any>(null);

async function getActiveOps() {
  try {
    ops.value = (await fetchy("/api/opportunities/id", "GET")).filter((op) => op.isActive);
  } catch (_) {
    return;
  }
}

onBeforeMount(async () => {
  await getActiveOps();
  loaded.value = true;
});
</script>

<template>
  <OpInformation v-if="selected !== null" :op="selected" :owner="false" @back="() => (selected = null)" />

  <section class="opportunities" v-else-if="loaded && ops.length !== 0">
    <h1>Active Opportunities</h1>
    <article v-for="op in ops" :key="op._id">
      <OpCard :op="op" @click="() => (selected = op)" />
    </article>
  </section>
  <h1 v-else-if="loaded" style="text-align: center; margin-top: 30vh">No active opportunities found</h1>
  <p v-else style="text-align: center; margin-top: 30vh">Loading...</p>
</template>

<style scoped>
h1 {
  text-align: center;
}
article:hover {
  cursor: pointer;
}
.opportunities {
  margin-top: 50px;
}
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
