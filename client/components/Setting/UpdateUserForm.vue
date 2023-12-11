<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";
import { countries, states } from "../../utils/data";
import { fetchy } from "../../utils/fetchy";

const { updateUser, updateSession, currentEmail, currentName, isActor, isAdmin, isDirector } = useUserStore();

let email = ref(currentEmail);
let password = ref("");
let name = ref(currentName);
let curCity = ref("");
let curCountry = ref("");
let curState = ref("");
let curProfilePic = ref("");
let loaded = ref(false);
let actor = ref(isActor);
let director = ref(isDirector);
let admin = ref(isAdmin);
let noAdmin = ref(false);

async function updateEmail() {
  if (email.value !== currentEmail) {
    await updateUser({ email: email.value });
    await updateSession();
  }
}

async function updatePassword() {
  await updateUser({ password: password.value });
  await updateSession();
  password.value = "";
}

async function updateInfo() {
  await updateUser({ name: name.value, city: curCity.value, state: curState.value, country: curCountry.value });
  await updateSession();
  noAdmin.value = await fetchy("/api/anyAdmins", "GET");
}

async function updateProfilePic() {
  await updateUser({}, curProfilePic.value);
}

async function getInfo() {
  const { city, state, country, profilePic } = await fetchy("/api/session", "GET");
  curCity.value = city;
  curCountry.value = country;
  curState.value = state;
  curProfilePic.value = profilePic;
}

async function updateTypes() {
  const types = [];
  if (admin.value) {
    types.push("admin");
  }
  if (director.value) {
    types.push("casting director");
  }
  if (actor.value) {
    types.push("actor");
  }
  if (types.length) {
    await fetchy("/api/restrictions", "PATCH", { body: { accountTypes: types } });
    await updateSession();
  }
}

onBeforeMount(async () => {
  await getInfo();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <div class="column-left">
      <h1>Security</h1>
    </div>
    <div class="column-right">
      <form @submit.prevent="updateEmail" class="pure-form">
        <fieldset>
          <legend>Change your email</legend>
          <input type="text" placeholder="New email" v-model="email" required />
          <button type="submit" class="pure-button">Update email</button>
        </fieldset>
      </form>

      <form @submit.prevent="updatePassword" class="pure-form">
        <fieldset>
          <legend>Change your password</legend>
          <input type="password" placeholder="New password" v-model="password" required />
          <button type="submit" class="pure-button">Update password</button>
        </fieldset>
      </form>
    </div>
  </div>

  <div class="row">
    <div class="column-left">
      <h1>Profile</h1>
    </div>
    <div class="column-right">
      <form @submit.prevent="updateProfilePic" class="pure-form">
        <fieldset>
          <legend>Profile Picture</legend>
          <input type="url" placeholder="New profile picture" v-model="curProfilePic" style="width: 70%" required />
          <button type="submit" class="pure-button">Update</button>
        </fieldset>
      </form>
    </div>
  </div>

  <div class="row">
    <div class="column-left">
      <h1>General Account</h1>
    </div>
    <div class="column-right">
      <form @submit.prevent="updateInfo" class="pure-form" v-if="loaded">
        <fieldset>
          <legend>Name</legend>
          <input type="text" placeholder="New name" v-model="name" required /><br /><br />

          <legend>City</legend>
          <input type="text" placeholder="New city" v-model="curCity" required /><br /><br />

          <legend>Country</legend>
          <select name="country" v-model="curCountry" style="width: 32%" required>
            <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
          </select>
          <br /><br />
          <legend>State</legend>
          <select name="state" v-model="curState">
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
          <br /><br />

          <button type="submit" class="pure-button">Update</button>
        </fieldset>
      </form>
      <p v-else>Loading...</p>
    </div>
  </div>

  <div class="row">
    <div class="column-left">
      <h1>Account Types</h1>
    </div>
    <div class="column-right">
      <form @submit.prevent="updateTypes" class="pure-form">
        <fieldset>
          <input v-model.trim="actor" type="checkbox" id="actor" value="actor" name="userType" :checked="actor" />
          <label for="actor">Actor</label>
          <br />
          <input v-model.trim="director" type="checkbox" id="casting" value="casting director" name="userType" :checked="director" />
          <label for="casting">Casting Director</label>
          <br />
          <input v-model.trim="admin" type="checkbox" id="admin" value="admin" name="userType" :checked="admin" v-if="admin || noAdmin" />
          <label for="admin" v-if="admin || noAdmin">Admin</label>
          <br />
          <br />
          <button type="submit" class="pure-button">Update</button>
        </fieldset>
      </form>
    </div>
  </div>
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
  border-left: 5px solid grey;
}
</style>
