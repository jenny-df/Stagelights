<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { Ref, onUpdated, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post", "upvote", "votes"]);
const emit = defineEmits(["refreshVotes"]);
let votes = ref(props.votes);
let upvoteButton: Ref<boolean> = ref(props.upvote);
const { updateApplauseVal } = useUserStore();

const vote = async () => {
  try {
    await fetchy("/api/vote", "POST", {
      body: { post: props.post._id, upvote: upvoteButton.value },
    });
  } catch {
    return;
  }
  await updateApplauseVal();
  emit("refreshVotes");
};

onUpdated(() => {
  votes.value = props.votes;
});
</script>

<template>
  <button class="btn-small pure-button" @click="vote" v-if="upvoteButton">Upvote</button>
  <button class="btn-small pure-button" @click="vote" v-else>Downvote</button>
  <p>{{ votes }}</p>
</template>

<style scoped></style>
