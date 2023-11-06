<script setup lang="ts">
import NavComponent from "@/components/Nav/NavComponent.vue";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { RouterView } from "vue-router";

const userStore = useUserStore();
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});

const doScroll = () => {
  const content = document.getElementById("content");
  const navbar = document.getElementById("navbar");
  const navHeight = navbar?.clientHeight;
  if (content && navHeight !== undefined) {
    const strHeight = navHeight.toString() + "px";
    content.style.setProperty("padding-top", strHeight);
  }
};

onMounted(() => {
  doScroll();
  window.addEventListener("resize", doScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", doScroll);
});
</script>

<template>
  <div class="sticky" id="navbar">
    <header>
      <NavComponent />

      <article v-if="toast !== null" class="toast" :class="toast.style">
        <p>{{ toast.message }}</p>
      </article>
    </header>
  </div>
  <div id="content">
    <RouterView />
  </div>
</template>

<style scoped>
@import "./assets/toast.css";

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
