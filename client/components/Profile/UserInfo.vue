<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { fetchy } from "../../utils/fetchy";

const { currentID, userApplause } = useUserStore();

const props = defineProps(["user"]);
let id = ref(props.user);
let curEmail = ref("");
let curName = ref("");
let curCity = ref("");
let curCountry = ref("");
let curState = ref("");
let applause = ref(userApplause);
let curProfilePic = ref("");
let loaded = ref(false);
let types = ref("");

async function getInfo() {
  const { email, name, city, state, country, profilePic } = await fetchy(`/api/user/${id.value}`, "GET");
  curEmail.value = email;
  curName.value = name;
  curCity.value = city;
  curCountry.value = country;
  curState.value = state;
  curProfilePic.value = profilePic;

  const userTypes = await fetchy(`/api/restrictions/${id.value}`, "GET");
  const newTypes: string[] = [];
  if (userTypes.includes("admin")) {
    newTypes.push("Admin");
  }
  if (userTypes.includes("casting director")) {
    newTypes.push("Casting Director");
  }
  if (userTypes.includes("actor")) {
    newTypes.push("Actor");
  }
  types.value = newTypes.join(", ");
}

onBeforeMount(async () => {
  await getInfo();
  loaded.value = true;
});
</script>

<template>
  <div class="row">
    <div class="column-left">
      <iframe :src="curProfilePic" scrolling="no" style="pointer-events: none" allowfullscreen="false" height="300"></iframe>
    </div>
    <div class="column-right">
      <div v-if="loaded">
        <h1>{{ curName }}</h1>
        <h3>{{ types }}</h3>
        <p>Email: {{ curEmail }}</p>
        <p v-if="curState !== ''">Location: {{ curCity }}, {{ curState }}, {{ curCountry }}</p>
        <p v-else>Location: {{ curCity }}, {{ curCountry }}</p>
        <p v-if="currentID === id && types.includes('Actor')">Applause: {{ applause }} (only visible to you)</p>
        <RouterLink :to="{ name: 'Portfolio', params: { id: id, name: curName } }"> <a> Portfolio </a> </RouterLink>
      </div>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.row {
  content: "";
  display: table;
  clear: both;
  min-width: 100%;
}

.column-left {
  float: left;
  width: 26%;
  padding: 50px;
  text-align: center;
}
.column-right {
  float: left;
  width: 40%;
  padding: 70px;
  text-align: left;
}
.seperation-left {
  border-left: 5px solid grey;
}
.seperation-right {
  border-right: 5px solid grey;
}
</style>
