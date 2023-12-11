<script setup lang="ts">
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>
<template>
  <main>
    <div>
      <RegisterForm />
      <h1>Page Not Found</h1>
      <p>The page that you requested could not be found.</p>
      <RouterLink to="/" class="button"> Return to the home page </RouterLink>
    </div>
  </main>
</template>
<style scoped>
div {
  min-width: 100%;
  min-height: 100%;
  padding-top: 15%;
  text-align: center;
}
p {
  margin-bottom: 30px;
}
.button {
  color: #d77533;
  border-color: #d77533;
}
</style>
