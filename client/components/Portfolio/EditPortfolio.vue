<script setup lang="ts">
import { ref, Ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["portfolio"]);

const portfolio = ref(props.portfolio);
const user = ref(props.portfolio.user);
const emit = defineEmits(["editPortfolio", "refreshPortfolio"]);

const adding = ref(false);

const intro = ref(props.portfolio.intro);

// style
const backgroundColor = ref(props.portfolio.style.backgroundColor);
const backgroundImage = ref(props.portfolio.style.backgroundImage);
const backgroundImageUsed = ref("url(" + props.portfolio.style.backgroundImage + ")");
const font = ref(props.portfolio.style.font);
const fontSize = ref(props.portfolio.style.fontSize);
const textColor = ref(props.portfolio.style.textColor);

// info
const education: Ref<string[]> = ref(props.portfolio.info.education);
const skills: Ref<string[]> = ref(props.portfolio.info.skills);
const experience: Ref<string[]> = ref(props.portfolio.info.experience);
const languages: Ref<string[]> = ref(props.portfolio.info.languages);

const editPorfolio = async () => {
  try {
    await fetchy(`/api/portfolio`, "PATCH", {
      body: {
        update: {
          intro: intro.value,
          style: { backgroundImage: backgroundImage.value, backgroundColor: backgroundColor.value, font: font.value, fontSize: fontSize.value, textColor: textColor.value },
          info: { education: education.value, skills: skills.value, experience: experience.value, languages: languages.value },
        },
      },
    });
  } catch (e) {
    return;
  }
  emit("editPortfolio");
  emit("refreshPortfolio");
};

const deleteMedia = async (id: string) => {
  try {
    await fetchy(`/api/media/remove`, "PATCH", { body: { media: id } });
  } catch (e) {
    return;
  }
  emit("refreshPortfolio");
};
</script>

<template>
  <form @submit.prevent="editPorfolio()">
    <div class="portfolioBoarder" :style="{ color: textColor, fontSize: fontSize + 'px', backgroundColor: backgroundColor, backgroundImage: backgroundImageUsed, fontFamily: font }">
      <div class="personalInfo">
        <iframe :src="portfolio.headshot"></iframe>
        <h3>{{ user.name }}</h3>
        <p>Contact at {{ user.email }}</p>
        <p v-if="user.state">{{ user.city }}, {{ user.state }}, {{ user.country }}</p>
        <p v-else>{{ user.city }}, {{ user.country }}</p>
        <textarea v-model="intro" placeholder="Intro for your portfolio"></textarea>
      </div>
      <div class="professionalInfo">
        <div v-if="education">
          <b>Education</b>
          <ul>
            <li v-for="i of Array(education.length + 3).keys()" :key="i">
              <input v-model="education[i]" type="text" placeholder="Education {{ i }}" />
            </li>
          </ul>
        </div>
        <div v-if="experience">
          <b>Experience</b>
          <ul>
            <li v-for="i of Array(experience.length + 3).keys()" :key="i">
              <input v-model="experience[i]" type="text" placeholder="Experience {{ i }}" />
            </li>
          </ul>
        </div>
        <div v-if="skills">
          <b>Skills</b>
          <ul>
            <li v-for="i of Array(skills.length + 3).keys()" :key="i">
              <input v-model="skills[i]" type="text" placeholder="Skill {{ i }}" />
            </li>
          </ul>
        </div>
        <div v-if="languages">
          <b>Languages</b>
          <ul>
            <li v-for="i of Array(languages.length + 3).keys()" :key="i">
              <input v-model="languages[i]" type="text" placeholder="Language {{ i }}" />
            </li>
          </ul>
        </div>
      </div>
      <div class="style">
        <label for="textColor">Text Color</label>
        <input type="color" v-bind="textColor" id="textColor" required />
        <label for="backgroundColor">Background Color</label>
        <input type="color" v-bind="backgroundColor" id="backgroundColor" required />
        <label for="backgroundImage">Background Image</label>
        <input type="url" v-bind="backgroundImage" id="backgroundImage" />
        <label for="fontSize">Font Size</label>
        <input type="number" v-bind="fontSize" id="fontSize" required />
        <label for="font">Font</label>
        <input type="text" v-bind="font" id="font" required />
      </div>
      <div class="media">
        <AddMedia v-if="adding" @stopChange="() => (adding = false)" @refreshPortfolio="emit('refreshPortfolio')" />
        <button v-else @click="() => (adding = true)">Add Media</button>
        <div v-for="m in portfolio.media" :key="m._id">
          <iframe :src="m.url"></iframe>
          <button @click="deleteMedia(m._id)">x</button>
        </div>
      </div>
    </div>
    <div class="base">
      <menu>
        <li><button class="btn-small pure-button-primary pure-button" type="submit">Save</button></li>
        <li><button class="btn-small pure-button" @click="emit('editPortfolio')">Cancel</button></li>
      </menu>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: var(--base-bg);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  border-radius: 4px;
  resize: none;
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

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}
</style>
