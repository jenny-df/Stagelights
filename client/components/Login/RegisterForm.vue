<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const name = ref("");
const profilePic = ref("");
const birthday = ref(new Date());
const city = ref("");
const state = ref("");
const country = ref("");
const userType = ref("");
const { createUser, loginUser, updateSession } = useUserStore();

async function register() {
  await createUser(email.value, password.value, name.value, profilePic.value, birthday.value, city.value, state.value, country.value, userType.value);
  await loginUser(email.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register User</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-email">Email</label>
        <input v-model.trim="email" type="email" id="aligned-email" placeholder="Email" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-name">Name</label>
        <input v-model.trim="name" type="text" id="aligned-name" placeholder="Name" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-birthday">Birthday</label>
        <input v-model.trim="birthday" type="date" id="aligned-birthday" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-pic">Profile Picture</label>
        <input v-model.trim="profilePic" type="url" id="aligned-pic" placeholder="http://www.drive.google.com/..." required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-city">City</label>
        <input v-model.trim="city" type="text" id="aligned-city" placeholder="City" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-state">State</label>
        <input v-model.trim="state" type="text" id="aligned-state" placeholder="State" />
      </div>
      <div class="pure-control-group">
        <label for="aligned-country">Country</label>
        <input v-model.trim="country" type="text" id="aligned-country" placeholder="Country" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-types">User Type</label>
        <div id="aligned-types">
          <label for="admin">Admin</label>
          <input v-model.trim="userType" type="radio" id="admin" name="userType" value="admin" /><br />
          <label for="actor">Actor</label>
          <input v-model.trim="userType" type="radio" id="actor" name="userType" value="actor" checked /><br />
          <label for="casting">Casting Director</label>
          <input v-model.trim="userType" type="radio" id="casting" name="userType" value="casting director" />
        </div>
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">Password</label>
        <input type="password" v-model.trim="password" id="aligned-password" placeholder="Password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="pure-button pure-button-primary">Register</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
