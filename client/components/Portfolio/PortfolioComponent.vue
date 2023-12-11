<script setup lang="ts">
const props = defineProps(["portfolio"]);
</script>
<template>
  <div class="row">
    <div
      class="portfolioBoarder"
      :style="{
        color: props.portfolio.style.textColor,
        fontSize: props.portfolio.style.fontSize + 'px',
        backgroundColor: props.portfolio.style.backgroundColor,
        backgroundImage: props.portfolio.style.backgroundImage,
        fontFamily: props.portfolio.style.font,
      }"
    >
      <div class="column-left">
        <iframe :src="props.portfolio.headshot" scrolling="no" style="pointer-events: none" allowfullscreen="false" height="240" width="240" class="profilePic"></iframe>
        <div class="professionalInfo">
          <div v-if="props.portfolio.info.education.length">
            <b>Education: </b>
            <ul>
              <li v-for="edu in props.portfolio.info.education" :key="edu">{{ edu }}</li>
            </ul>
          </div>
          <p v-else><b>Education: </b>None</p>
          <div v-if="props.portfolio.info.experience.length">
            <b>Experience: </b>
            <ul>
              <li v-for="exp in props.portfolio.info.experience" :key="exp">{{ exp }}</li>
            </ul>
          </div>
          <p v-else><b>Experience: </b>None</p>
          <div v-if="props.portfolio.info.skills.length">
            <b>Skills: </b>
            <ul>
              <li v-for="skill in props.portfolio.info.skills" :key="skill">{{ skill }}</li>
            </ul>
          </div>
          <p v-else><b>Skills: </b>None</p>
          <div v-if="props.portfolio.info.languages.length">
            <b>Languages: </b>
            <ul>
              <li v-for="lang in props.portfolio.info.languages" :key="lang">{{ lang }}</li>
            </ul>
          </div>
          <p v-else><b>Languages: </b>None</p>
        </div>
      </div>
      <div class="column-right">
        <div class="personalInfo">
          <h1>{{ props.portfolio.user.name }}</h1>
          <p>Contact at {{ props.portfolio.user.email }}</p>
          <p v-if="props.portfolio.user.state">{{ props.portfolio.user.city }}, {{ props.portfolio.user.state }}, {{ props.portfolio.user.country }}</p>
          <p v-else>{{ props.portfolio.user.city }}, {{ props.portfolio.user.country }}</p>
          <p>{{ props.portfolio.intro }}</p>
        </div>
        <div class="media">
          <h2>Media:</h2>
          <iframe v-for="url in props.portfolio.media" :src="url" :key="url" width="100" height="100" style="float: left"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  min-width: 100%;
}

li {
  list-style-type: none;
}

.column-left {
  float: left;
  margin-left: 40px;
  margin-top: 40px;
  width: 30%;
}

.column-right {
  margin-top: 80px;
  float: left;
  width: 60%;
  background: lightgray;
  border-radius: 8px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.65);
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center;
  overflow: scroll;
  overflow-wrap: break-word;
}

.portfolioBoarder {
  content: "";
  display: table;
  clear: both;
  border: 3px solid;
  border-color: black;
  width: 80%;
  margin-left: 10%;
  margin-top: 40px;
  min-height: 600px;
}

.professionalInfo {
  background: lightgray;
  border-radius: 8px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.65);
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 20px;

  width: 80%;
  text-align: center;
  overflow: scroll;
  overflow-wrap: break-word;
}

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
