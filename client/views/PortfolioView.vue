<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { Ref, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import ChangeHeadshot from "../components/Portfolio/ChangeHeadshot.vue";
import EditPortfolio from "../components/Portfolio/EditPortfolio.vue";
import PortfolioComponent from "../components/Portfolio/PortfolioComponent.vue";

const { currentID } = storeToRefs(useUserStore());

const route = useRoute();

let userId = ref(route.params.id);
let hasPortfolio = ref(false);
let belongsToSession = ref(userId.value === currentID.value);
let portfolio: Ref<any> = ref({});
let loaded = ref(false);
let editing = ref(false);
let changing = ref(false);

const getPortfolio = async () => {
  try {
    editing.value = false;
    portfolio.value = await fetchy(`/api/portfolio/${userId.value}`, "GET");
    hasPortfolio.value = true;
  } catch {
    hasPortfolio.value = false;
    return;
  }
};

onBeforeMount(async () => {
  await getPortfolio();
  loaded.value = true;
});
</script>
<template>
  <div v-if="loaded" class="portfolioContainer">
    <div v-if="hasPortfolio" class="hasPortfolio">
      <div class="base">
        <menu v-if="belongsToSession">
          <li><button class="pure-button" @click="() => (editing = true)" v-if="!editing">Edit</button></li>
          <li>
            <ChangeHeadshot v-if="changing" :pic="portfolio.headshot" @stopChange="() => (changing = false)" @refreshPortfolio="getPortfolio" />
            <button v-else class="pure-button" @click="() => (changing = true)">Change headshot</button>
          </li>
        </menu>
      </div>
      <div class="portfolio">
        <EditPortfolio v-if="editing" :portfolio="portfolio" @cancel-edit="() => (editing = false)" @refresh-portfolio="getPortfolio()" />
        <PortfolioComponent v-else :portfolio="portfolio" />
      </div>
    </div>
    <div v-else class="noPortfolio">
      <p v-if="belongsToSession">This user doesn't have a portfolio!</p>
    </div>
  </div>
  <p v-else>loading...</p>
  <br />
  <br />
</template>

<style scoped>
p {
  margin: 0em;
}

.author {
  font-weight: bold;
  font-size: 1.2em;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
  margin-left: 45%;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

button {
  background-color: #d77533;
  color: white;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  width: 80%;
}

.base article:only-child {
  margin-left: auto;
}
</style>
