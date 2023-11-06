<script setup lang="ts">
import { ref } from "vue";
const props = defineProps(["portfolio"]);
const style = ref(props.portfolio.style);
const portfolio = ref(props.portfolio);
const user = ref(props.portfolio.user);
</script>
<template>
  <div
    class="portfolioBoarder"
    :style="{ color: style.textColor, fontSize: style.fontSize + 'px', backgroundColor: style.backgroundColor, backgroundImage: style.backgroundImage, fontFamily: style.font }"
  >
    <div class="personalInfo">
      <iframe :src="portfolio.headshot"></iframe>
      <h3>{{ user.name }}</h3>
      <p>Contact at {{ user.email }}</p>
      <p v-if="user.state">{{ user.city }}, {{ user.state }}, {{ user.country }}</p>
      <p v-else>{{ user.city }}, {{ user.country }}</p>
      <p>{{ portfolio.intro }}</p>
    </div>
    <div class="professionalInfo">
      <div v-if="portfolio.info.education">
        <b>Education</b>
        <ul>
          <li v-for="edu in portfolio.info.education" :key="edu">{{ edu }}</li>
        </ul>
      </div>
      <div v-if="portfolio.info.experience">
        <b>Experience</b>
        <ul>
          <li v-for="exp in portfolio.info.experience" :key="exp">{{ exp }}</li>
        </ul>
      </div>
      <div v-if="portfolio.info.skills">
        <b>Skills</b>
        <ul>
          <li v-for="skill in portfolio.info.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
      <div v-if="portfolio.info.languages">
        <b>Languages</b>
        <ul>
          <li v-for="lang in portfolio.info.languages" :key="lang">{{ lang }}</li>
        </ul>
      </div>
    </div>
    <div class="media">
      <iframe v-for="url in portfolio.media" :src="url" :key="url"></iframe>
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
