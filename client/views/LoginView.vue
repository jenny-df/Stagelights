<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="column">
    <div id="loginCard">
      <div id="loginCardContent">
        <h1>Stagelights Login</h1>
        <LoginForm />
        <RouterLink :to="{ name: 'Signup' }"> <a>Don't have an account?</a> </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  text-align: center;
}

#loginCard {
  background: #d77533;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: 400px;
  margin: 6rem auto 8.1rem auto;
  width: 329px;
}

#loginCardContent {
  padding: 12px 44px;
}

a {
  margin-top: 5px;
  color: white;
}
</style>
