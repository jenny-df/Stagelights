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
    <div class="row">
      <div class="column-left seperation-right">
        <h1>Folder Capacity</h1>
      </div>
      <div class="column-right">
        <form @submit.prevent="changeCapacity(capacity)" class="pure-form">
          <fieldset>
            <input type="number" placeholder="Capacity" v-model="capacity" min="10" style="width: 30%" required /><br />
            <button type="submit" class="pure-button">Update</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.row {
  margin-top: 50px;
  content: "";
  display: table;
  clear: both;
  min-width: 100%;
  background-color: lightgrey;
}

.column-left {
  float: left;
  width: 40%;
  padding: 50px;
  text-align: center;
}
.column-right {
  float: left;
  width: 60%;
  padding: 50px;
}
.seperation-left {
  border-left: 5px solid grey;
}
.seperation-right {
  border-right: 5px solid grey;
}
</style>
