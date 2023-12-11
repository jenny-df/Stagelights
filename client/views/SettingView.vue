<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import CategorySettings from "../components/Setting/CategorySettings.vue";
import PracticeFolderSettings from "../components/Setting/PracticeFolderSettings.vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentName, isAdmin } = storeToRefs(useUserStore());
const { deleteUser } = useUserStore();

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1 style="padding-top: 70px">Settings for {{ currentName }}</h1>
    <UpdateUserForm />

    <div class="row">
      <div class="column-left seperation-right">
        <h1>Permanent Changes</h1>
      </div>
      <div class="column-right" style="text-align: center">
        <button class="button-error pure-button" @click="delete_" style="padding: 20px">Delete User</button>
      </div>
    </div>
    <br /><br />
    <div v-if="isAdmin">
      <h1 style="padding-top: 30px">Admin Settings for Stagelights</h1>
      <CategorySettings />
      <PracticeFolderSettings />
      <br />
      <br />
    </div>
  </main>
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
  min-width: 80%;
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
