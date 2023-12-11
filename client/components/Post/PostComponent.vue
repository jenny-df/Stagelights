<script setup lang="ts">
import VoteButton from "@/components/Post/VoteButton.vue";
import { useUserStore } from "@/stores/user";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["post"]);
const emit = defineEmits(["editPost", "refreshPosts"]);

const { currentName } = storeToRefs(useUserStore());

let upvotes = ref(0);
let downvotes = ref(0);
let loaded = ref(false);

const getVotes = async () => {
  try {
    const allVotes = await fetchy("/api/vote", "GET", {
      query: { post: props.post._id },
    });
    upvotes.value = allVotes.up;
    downvotes.value = allVotes.down;
  } catch {
    return;
  }
};

const deletePost = async () => {
  try {
    await fetchy("/api/focusedPosts", "DELETE", {
      query: { id: props.post._id },
    });
  } catch {
    return;
  }
  emit("refreshPosts");
};

onBeforeMount(async () => {
  await getVotes();
  loaded.value = true;
});
</script>

<template>
  <div v-if="loaded">
    <p class="author">{{ props.post.author }}</p>
    <menu v-if="props.post.author == currentName" style="float: right; margin-top: 20px; margin-right: 30px">
      <li><button class="btn-small pure-button" @click="emit('editPost', props.post._id)">Edit</button></li>
      <li><button class="button-error btn-small pure-button" @click="deletePost">Delete</button></li>
    </menu>

    <div class="row">
      <p class="content">{{ props.post.content }}</p>
      <p class="content"><b>Category: </b>{{ props.post.category }}</p>
    </div>
    <div class="row">
      <iframe v-for="url in props.post.media" :src="url" :key="url" height="300px" width="300px"></iframe>
    </div>
    <div class="base">
      <menu>
        <li><VoteButton :post="props.post" :upvote="true" :votes="upvotes" @refreshVotes="getVotes" /></li>
        <li><VoteButton :post="props.post" :upvote="false" :votes="downvotes" @refreshVotes="getVotes" /></li>
      </menu>
      <article class="timestamp">
        <p v-if="props.post.dateCreated !== props.post.dateUpdated">Edited on: {{ formatDate(props.post.dateUpdated) }}</p>
        <p v-else>Created on: {{ formatDate(props.post.dateCreated) }}</p>
      </article>
    </div>
  </div>
  <p v-else>loading...</p>
</template>

<style scoped>
.row {
  content: "";
  display: table;
  clear: both;
  min-width: 100%;
}
p {
  padding: 0;
}
.content {
  margin-bottom: 30px;
}
.author {
  font-weight: bold;
  font-size: 1.2em;
  float: left;
  margin-left: 30px;
  margin-top: 20px;
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
