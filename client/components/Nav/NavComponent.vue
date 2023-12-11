<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

const userStore = useUserStore();
const { isLoggedIn, currentID, currentName, isActor, isAdmin, isDirector } = storeToRefs(userStore);
const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
</script>

<template>
  <nav v-if="isLoggedIn">
    <div class="title">
      <img src="@/assets/images/logo.png" width="60" height="70" />
      <RouterLink :to="{ name: 'Home' }">
        <h1>Stagelights</h1>
      </RouterLink>
    </div>
    <ul>
      <li>
        <RouterLink :to="{ name: 'Home' }" :class="{ underline: currentRouteName == 'Home' }"> Feed </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Network' }" :class="{ underline: currentRouteName == 'Network' }"> Network </RouterLink>
      </li>
      <li v-if="isDirector">
        <RouterLink :to="{ name: 'ManageOpportunities' }" :class="{ underline: currentRouteName == 'ManageOpportunities' }"> Manage Opportunities </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Opportunities' }" :class="{ underline: currentRouteName == 'Opportunities' }"> Opportunities </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Applications' }" :class="{ underline: currentRouteName == 'Applications' }"> Applications </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Profile', params: { id: currentID, name: currentName } }" :class="{ underline: currentRouteName == 'Profile' }"> Profile </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Portfolio', params: { id: currentID, name: currentName } }" :class="{ underline: currentRouteName == 'Portfolio' }"> Portfolio </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Settings' }" :class="{ underline: currentRouteName == 'Settings' }"> Settings </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'Logout' }"> Logout </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  padding: 1em 2em;
  background-color: #d77533;
  display: flex;
  align-items: center;
}

h1 {
  font-size: 2em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

img {
  height: 2em;
}

ul {
  list-style-type: none;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 1em;
}

.underline {
  text-decoration: underline;
}
a {
  font-size: large;
  color: white;
  text-decoration: none;
}
</style>
