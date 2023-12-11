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
  <span class="vote_up_off" @click="vote" v-if="upvoteButton"> </span>
  <span class="vote_down_off" @click="vote" v-else style="margin-left: 5px"> </span>
  <p>{{ votes }}</p>
</template>

<style scoped>
.vote_up_off {
  display: inline-block;
  overflow: hidden;
  width: 40px;
  height: 25px;
  cursor: pointer;
  background: url(" https://i.stack.imgur.com/nxBdX.png");
  background-position: 0 -25px;
  margin-left: 5px;
}

.vote_up_on {
  background-position: 0 2px;
  display: inline-block;
  overflow: hidden;
  width: 40px;
  height: 25px;
  cursor: pointer;
  background: url("https://i.stack.imgur.com/nxBdX.png");
  margin-left: 5px;
}

.vote_down_off {
  display: inline-block;
  overflow: hidden;
  width: 40px;
  height: 25px;
  cursor: pointer;
  background: url("https://i.stack.imgur.com/vWw7n.png");
  background-position: 0 -1px;
  margin-top: 3px;
}

.vote_down_on {
  display: inline-block;
  overflow: hidden;
  width: 40px;
  height: 25px;
  cursor: pointer;
  background: url("https://i.stack.imgur.com/vWw7n.png");
  background-position: 0 -28px;
  margin-top: 3px;
}
</style>
