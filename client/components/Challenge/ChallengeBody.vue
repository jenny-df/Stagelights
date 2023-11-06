<script setup lang="ts">
const props = defineProps(["challenge"]);
const emit = defineEmits(["acceptChallenge", "suggestChallegne"]);
</script>

<template>
  <div class="challenge">
    <div class="challengeIntro" v-if="props.challenge">
      <h1 class="title">Today's Challenge</h1>
      <h3>{{ props.challenge.prompt }}</h3>
    </div>
    <div class="noChallenge" v-else>
      <h3>There aren't any propsed challenges to post today.</h3>
    </div>
    <div class="base">
      <menu v-if="props.challenge">
        <li><button class="btn-small pure-button" @click="emit('acceptChallenge')">Accept</button></li>
      </menu>
      <menu>
        <li><button class="btn-small pure-button" @click="emit('suggestChallegne')">Suggest</button></li>
      </menu>
    </div>
  </div>
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
