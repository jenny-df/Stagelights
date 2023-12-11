<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["portfolio"]);
const portfolio = ref(props.portfolio);
const user = ref(props.portfolio.user);
const emit = defineEmits(["editPortfolio", "refreshPortfolio"]);

const intro = ref(props.portfolio.intro);

const adding = ref(false);
// style
const backgroundColor = ref(props.portfolio.style.backgroundColor);
const backgroundImage = ref(props.portfolio.style.backgroundImage);
const backgroundImageUsed = ref("url(" + props.portfolio.style.backgroundImage + ")");
const font = ref(props.portfolio.style.font);
const fontSize = ref(props.portfolio.style.fontSize);
const textColor = ref(props.portfolio.style.textColor);

// info
const education = ref(props.portfolio.info.education.join(", "));
const skills = ref(props.portfolio.info.skills.join(", "));
const experience = ref(props.portfolio.info.experience.join(", "));
const languages = ref(props.portfolio.info.languages.join(", "));

const editPorfolio = async (
  intro: string,
  backgroundColor: string,
  backgroundImage: string,
  font: string,
  fontSize: number,
  textColor: string,
  education: string,
  skills: string,
  experience: string,
  languages: string,
) => {
  try {
    await fetchy(`/api/portfolio`, "PATCH", {
      body: {
        update: {
          intro: intro,
          style: { backgroundImage: backgroundImage, backgroundColor: backgroundColor, font: font, fontSize: fontSize, textColor: textColor },
          info: { education: education.split(", "), skills: skills.split(", "), experience: experience.split(", "), languages: languages.split(", ") },
        },
      },
    });
  } catch (e) {
    return;
  }
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
  <form @submit.prevent="editPorfolio(intro, backgroundColor, backgroundImage, font, fontSize, textColor, education, skills, experience, languages)">
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
        <b>Education</b>
        <input type="text" v-model="education" placeholder="Education (seperate by ', ')" />

        <b>Experience</b>
        <input type="text" v-model="experience" placeholder="Experience (seperate by ', ')" />

        <b>Skills</b>
        <input type="text" v-model="skills" placeholder="Skill (seperate by ', ')" />

        <b>Languages</b>
        <input type="text" v-model="languages" placeholder="Language (seperate by ', ')" />
      </div>
      <div class="style">
        <label for="textColor">Text Color</label>
        <input type="color" v-model="textColor" id="textColor" required />
        <label for="backgroundColor">Background Color</label>
        <input type="color" v-model="backgroundColor" id="backgroundColor" required />
        <label for="backgroundImage">Background Image</label>
        <input type="url" v-model="backgroundImage" id="backgroundImage" />
        <label for="fontSize">Font Size</label>
        <input type="number" v-model="fontSize" id="fontSize" required />
        <label for="font">Font</label>
        <input type="text" v-model="font" id="font" required />
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
