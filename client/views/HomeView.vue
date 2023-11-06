<script setup lang="ts">
import PostListComponent from "@/components/Post/PostListComponent.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";

const { isLoggedIn } = storeToRefs(useUserStore());
</script>

<template>
  <main>
    <section v-if="isLoggedIn">
      <PostListComponent />
    </section>
    <section v-else>
      <h1>Welcome to Stagelights!</h1>
      <p>Login or sign up to continue.</p>
      <br />
      <br />
      <RouterLink :to="{ name: 'Login' }"> <button>Login</button> </RouterLink>
      <br />
      <br />
      <RouterLink :to="{ name: 'Signup' }"> <button>Register</button> </RouterLink>
    </section>
  </main>
</template>

<style scoped>
main {
  text-align: center;
}
</style>
