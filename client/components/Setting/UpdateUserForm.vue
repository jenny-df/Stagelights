<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

let email = ref("");
let password = ref("");

const { updateUser, updateSession } = useUserStore();

async function updateEmail() {
  await updateUser({ email: email.value });
  await updateSession();
  email.value = "";
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}
</script>

<template>
  <h2>Update user details</h2>
  <form @submit.prevent="updateEmail" class="pure-form">
    <fieldset>
      <legend>Change your email</legend>
      <input type="text" placeholder="New email" v-model="email" required />
      <button type="submit" class="pure-button pure-button-primary">Update email</button>
    </fieldset>
  </form>

  <form @submit.prevent="updatePassword" class="pure-form">
    <fieldset>
      <legend>Change your password</legend>
      <input type="password" placeholder="New password" v-model="password" required />
      <button type="submit" class="pure-button pure-button-primary">Update password</button>
    </fieldset>
  </form>
</template>
