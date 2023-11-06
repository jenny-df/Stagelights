<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { countries, states } from "../../utils/data";
import { fetchy } from "../../utils/fetchy";

const adminExists = ref(true);
const email = ref("");
const password = ref("");
const name = ref("");
const profilePic = ref("");
const birthday = ref(new Date());
const city = ref("");
const state = ref("");
const country = ref("");
const userType = ref<string[]>(["actor"]);
const loaded = ref(false);
const { createUser, loginUser, updateSession } = useUserStore();
const { isLoggedIn } = storeToRefs(useUserStore());

async function anyAdmin() {
  adminExists.value = await fetchy("/api/anyAdmins", "GET");
  loaded.value = true;
}

async function register() {
  await createUser(email.value, password.value, name.value, profilePic.value, birthday.value, city.value, state.value, country.value, userType.value);
  await loginUser(email.value, password.value);
  void updateSession();
  if (isLoggedIn) {
    void router.push({ name: "Home" });
  }
}

onBeforeMount(async () => await anyAdmin());
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
        <select name="state" v-model.trim="state" id="aligned-state">
          <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
        </select>
      </div>
      <div class="pure-control-group">
        <label for="aligned-country">Country</label>
        <select name="country" v-model.trim="country" id="aligned-country" required>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
      <div class="pure-control-group" v-if="loaded">
        <label for="aligned-types">User Type</label>
        <div id="aligned-types">
          <div class="adminSelector" v-if="!adminExists">
            <label for="admin">Admin</label>
            <input v-model="userType" type="checkbox" id="admin" name="userType" v-bind:value="'admin'" /><br />
          </div>
          <label for="actor">Actor</label>
          <input v-model="userType" type="checkbox" id="actor" name="userType" v-bind:value="'actor'" /><br />
          <label for="casting">Casting Director</label>
          <input v-model="userType" type="checkbox" id="casting" name="userType" v-bind:value="'casting director'" />
        </div>
      </div>
      <p v-else>Loading user types...</p>
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
