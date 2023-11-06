<script setup lang="ts">
import CommentComponent from "@/components/Comment/CommentComponent.vue";
import CreateComment from "@/components/Comment/CreateComment.vue";
import EditCommentForm from "@/components/Comment/EditCommentForm.vue";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref, Ref } from "vue";

const { isLoggedIn } = storeToRefs(useUserStore());

const props = defineProps(["parent"]);
const loaded = ref(false);
let comments: Ref<any[]> = ref([]);
let editing = ref("");

const getComments = async () => {
  try {
    comments.value = await fetchy(`/api/comments/post/${props.parent}`, "GET");
  } catch (_) {
    return;
  }
};

function updateEditing(id: string) {
  editing.value = id;
}

onBeforeMount(async () => {
  await getComments();
  loaded.value = true;
});
</script>

<template>
  <section v-if="isLoggedIn">
    <h2>Create a comment:</h2>
    <CreateComment @refreshComments="getComments" :parent="props.parent" />
  </section>
  <section class="comments" v-if="loaded && comments.length">
    <article v-for="comment in comments" :key="comment._id">
      <CommentComponent v-if="editing !== comment._id" :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
      <EditCommentForm v-else :comment="comment" @refreshComments="getComments" @editComment="updateEditing" />
    </article>
  </section>
  <p v-else-if="loaded">No comments found</p>
  <p v-else>Loading...</p>
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

.comments {
  padding: 1em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60em;
}
</style>
