<script setup lang="ts">
import OpCard from "@/components/Opportunity/OpCard.vue";
import { fetchy } from "@/utils/fetchy";
import { onBeforeMount, ref } from "vue";
import AddOp from "./AddOp.vue";
import OpInformation from "./OpInformation.vue";

const loaded = ref(false);
let ops = ref<Array<any>>([]);
let active = ref<Array<any>>([]);
let inactive = ref<Array<any>>([]);
let adding = ref(false);
let selected = ref<any>(null);

async function getActiveOps() {
  try {
    adding.value = false;
    ops.value = await fetchy("/api/opportunities/id", "GET");

    active.value = ops.value.filter((op) => op.isActive);
    inactive.value = ops.value.filter((op) => !op.isActive);
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
  <OpInformation v-if="selected !== null" :op="selected" :owner="true" @back="() => (selected = null)" @refresh-ops="getActiveOps()" />
  <div v-else-if="!adding">
    <div style="text-align: right">
      <button @click="() => (adding = true)" class="pure-button" style="margin-top: 30px; margin-right: 80px">Add</button>
    </div>
    <section class="active" v-if="loaded && active.length !== 0">
      <h1 style="text-align: center; margin-top: 50px">Your active opportunities</h1>
      <article v-for="op in active" :key="op._id">
        <OpCard :op="op" @click="() => (selected = op)" />
      </article>
    </section>
    <h1 v-else-if="loaded" style="text-align: center; margin-top: 20vh">No active opportunities found</h1>
    <p v-else style="text-align: center; margin-top: 30vh">Loading...</p>
    <section class="inactive" v-if="loaded && inactive.length !== 0">
      <h1 style="text-align: center; margin-top: 50px">Your inactive opportunities</h1>
      <article v-for="op in inactive" :key="op._id">
        <OpCard :op="op" @click="() => (selected = op)" />
      </article>
    </section>
    <h1 v-else-if="loaded" style="text-align: center; margin-top: 20vh">No inactive opportunities found</h1>
    <p v-else style="text-align: center; margin-top: 30vh">Loading...</p>
  </div>
  <AddOp
    @refresh-ops="
      () => {
        getActiveOps();
      }
    "
    @cancel-add="() => (adding = false)"
    v-else
  />
</template>

<style scoped>
article:hover {
  cursor: pointer;
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

button {
  border-radius: 1px solid;
  background-color: #d77533;
  color: white;
  border-radius: 8px;
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
