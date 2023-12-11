<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["op"]);
const startOn = ref(new Date(props.op.startOn).getFullYear() + "-" + (new Date(props.op.startOn).getMonth() + 1) + "-" + new Date(props.op.startOn).getDate());
const endsOn = ref(new Date(props.op.endsOn).getFullYear() + "-" + (new Date(props.op.endsOn).getMonth() + 1) + "-" + new Date(props.op.endsOn).getDate());
</script>

<template>
  <div style="text-align: center">
    <h2>{{ props.op.title }}</h2>
    <h3>Opportunity duration: {{ startOn }} - {{ endsOn }}</h3>
    <p>{{ props.op.description }}</p>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.row {
  margin-top: 50px;
  content: "";
  display: table;
  clear: both;
  min-width: 80%;
}

.column-left {
  float: left;
  width: 40%;
  padding: 50px;
  text-align: center;
}
.column-right {
  float: left;
  width: 60%;
  padding: 50px;
}
</style>
