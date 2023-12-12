<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import EditOp from "./EditOp.vue";

const props = defineProps(["op", "owner"]);
const emit = defineEmits(["back", "refresh-ops"]);
const startOn = ref(new Date(props.op.startOn).getFullYear() + "-" + (new Date(props.op.startOn).getMonth() + 1) + "-" + new Date(props.op.startOn).getDate());
const endsOn = ref(new Date(props.op.endsOn).getFullYear() + "-" + (new Date(props.op.endsOn).getMonth() + 1) + "-" + new Date(props.op.endsOn).getDate());
const editting = ref(false);
const deleteOp = async () => {
  try {
    await fetchy(`/api/opportunities/${props.op._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refresh-ops");
  emit("back");
};
</script>

<template>
  <div v-if="!editting">
    <div style="text-align: center">
      <button @click="emit('back')" class="pure-button back">Back</button>
    </div>
    <div class="row" style="text-align: center">
      <h1>{{ props.op.title }}</h1>
      <p><b>Posted by:</b> {{ props.op.user.name }}</p>
      <p><b>Opportunity duration:</b> {{ startOn }} - {{ endsOn }}</p>
      <p><b>Location: </b> {{ props.op.requirements.location }}</p>
      <p><b>Description:</b> {{ props.op.description }}</p>

      <div v-if="props.op.requirements.physical.length">
        <p><b>Physical Requirements: </b></p>
        <ul>
          <li v-for="item in props.op.requirements.physical" :key="item">{{ item }}</li>
        </ul>
      </div>
      <p v-else><b>Physical Requirements: </b> None</p>

      <div v-if="props.op.requirements.skill.length">
        <p><b>Skill Requirements: </b></p>
        <ul>
          <li v-for="item in props.op.requirements.skill" :key="item">{{ item }}</li>
        </ul>
      </div>
      <p v-else><b>Skill Requirements: </b> None</p>
    </div>
    <div v-if="props.owner">
      <menu>
        <li><button class="pure-button" @click="() => (editting = true)">Edit</button></li>
        <li><button class="pure-button button-error" @click="deleteOp()">Delete</button></li>
      </menu>
    </div>
  </div>
  <EditOp @cancel-edit="() => (editting = false)" @updated="emit('refresh-ops')" @ripple-cancel-edit="emit('back')" :op="props.op" v-else />
</template>

<style scoped>
menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: auto;
  float: right;
  width: 55%;
}
.back {
  border-radius: 1px solid;
  background-color: #d77533;
  color: white;
  border-radius: 8px;
}

button {
  margin-top: 50px;
}
* {
  box-sizing: border-box;
}
.row {
  margin-top: 50px;
  content: "";
  display: table;
  clear: both;
  min-width: 80%;
  margin-left: 10%;
  background-color: var(--base-bg);
  border-radius: 1em;
  gap: 0.5em;
  padding: 1em;
}
li {
  list-style-type: none;
}

.column-full {
  float: left;
  width: 100%;
  padding: 50px;
  text-align: center;
}
</style>
