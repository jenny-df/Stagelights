<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["id", "practice"]);
const emit = defineEmits(["stopAdding", "refreshContent"]);

let url = ref("");

const AddFolderContent = async (url: string) => {
  if (props.practice) {
    await fetchy("/api/practicefolder/add", "PATCH", { body: { content: url } });
  } else {
    await fetchy("/api/repertoirefolders/add", "PATCH", { body: { content: url, folder: props.id } });
  }
  emit("refreshContent");
  emit("stopAdding");
};
</script>

<template>
  <div style="text-align: right">
    <div class="row">
      <div class="column-left">
        <form @submit.prevent="AddFolderContent(url)">
          <input type="url" v-model="url" placeholder="URL" required />
          <button type="submit" class="pure-button-primary pure-button" style="margin-left: 5px">Add</button>
        </form>
      </div>
      <div class="column-right">
        <button @click="() => emit('stopAdding')" class="pure-button-primary pure-button">Cancel</button>
      </div>
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
  clear: left;
  min-width: 40%;
  padding-left: 75%;
}

.column-left {
  float: left;
  width: 90%;
}
.column-right {
  float: left;
  margin-left: 5px;
  width: 5%;
}
</style>
