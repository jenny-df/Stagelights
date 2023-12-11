<script setup lang="ts">
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="column">
    <div id="loginCard">
      <div id="loginCardContent">
        <h1>Register for Stagelights</h1>
        <RegisterForm />
        <RouterLink :to="{ name: 'Login' }"> <a>Already have an account?</a> </RouterLink>
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
  height: 550px;
  padding-left: 5%;
  padding-right: 5%;
  margin: 6rem auto 8.1rem auto;
  width: 600px;
}

a {
  margin-top: 5px;
  color: white;
}
</style>
