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
      <div id="startBackground">
        <div id="loginCard">
          <div id="loginCardContent">
            <h1>Welcome to Stagelights!</h1>
            <p>Login or sign up to continue.</p>
            <br />
            <br />
            <RouterLink :to="{ name: 'Login' }"> <button>Login</button> </RouterLink>
            <br />
            <br />
            <RouterLink :to="{ name: 'Signup' }"> <button>Register</button> </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  text-align: center;
}

body,
html {
  height: 100%;
  margin: 0;
}

#startBackground {
  background-image: url("../assets/images/stage.png");
  min-height: 100%;
  min-width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
}

#loginCard {
  background: #fbfbfb;
  border-radius: 8px;
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.65);
  height: 350px;
  margin: 6rem auto 8.1rem auto;
  width: 329px;
}

#loginCardContent {
  padding: 12px 44px;
}

button {
  cursor: pointer;
  outline: 0;
  color: #fff;
  background-color: #d77533;
  border-color: #d77533;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  border-radius: 0.25rem;
}
</style>
