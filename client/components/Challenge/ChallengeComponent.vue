<script setup lang="ts">
import AcceptChallenge from "@/components/Challenge/AcceptChallenge.vue";
import ChallengeBody from "@/components/Challenge/ChallengeBody.vue";
import SuggestChallenge from "@/components/Challenge/SuggestChallenge.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, Ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const { currentID } = storeToRefs(useUserStore());

const emit = defineEmits(["refreshPosts"]);

let challenge: Ref<any> = ref();
const accept = ref(false);
let suggest = ref(false);
let loaded = ref(false);
let alreadyAccepted = ref(false);

const getChallenge = async () => {
  if (!challenge.value) {
    try {
      challenge.value = await fetchy("/api/challenge/today", "GET");
      const usersAccepted = await fetchy("/api/challenge/accepted", "GET");
      if (usersAccepted.includes(currentID.value)) {
        alreadyAccepted.value = true;
      }
    } catch {
      return;
    }
  }
};

onBeforeMount(async () => {
  await getChallenge();
  loaded.value = true;
});
</script>

<template>
  <div class="challenge" v-if="loaded && !alreadyAccepted">
    <ChallengeBody
      v-if="!accept && !suggest"
      @acceptChallenge="
        () => {
          accept = true;
          suggest = false;
        }
      "
      @suggestChallegne="
        () => {
          accept = false;
          suggest = true;
        }
      "
      :challenge="challenge"
    />
    <AcceptChallenge v-else-if="accept && !suggest" :challenge="challenge" @doneAccept="() => (accept = false)" @refreshChallenge="getChallenge()" @refreshPosts="emit('refreshPosts')" />
    <SuggestChallenge v-else-if="!accept && suggest" @doneSuggest="() => (suggest = false)" @refreshChallenge="getChallenge()" />
  </div>
  <div class="challenge" v-if="loaded && alreadyAccepted">
    <h2>Already accepted today's challenge</h2>
  </div>

  <p v-else-if="!loaded">loading...</p>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

section,
p,
.row {
  margin: 0 auto;
  max-width: 60em;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.posts {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
