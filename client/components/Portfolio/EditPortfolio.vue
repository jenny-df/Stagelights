<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import AddMedia from "./AddMedia.vue";

const props = defineProps(["portfolio"]);
const portfolio = ref(props.portfolio);
const user = ref(props.portfolio.user);
const emit = defineEmits(["refresh-portfolio", "cancel-edit"]);

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
  emit("refresh-portfolio");
};

const deleteMedia = async (id: string) => {
  try {
    await fetchy(`/api/portfolio/media/remove`, "PATCH", { body: { media: id } });
  } catch (e) {
    return;
  }
  emit("refresh-portfolio");
};
</script>

<template>
  <form @submit.prevent="editPorfolio(intro, backgroundColor, backgroundImage, font, fontSize, textColor, education, skills, experience, languages)">
    <div class="row">
      <div
        class="portfolioBoarder"
        :style="{
          color: props.portfolio.style.textColor,
          fontSize: props.portfolio.style.fontSize + 'px',
          backgroundColor: props.portfolio.style.backgroundColor,
          backgroundImage: backgroundImageUsed,
          fontFamily: props.portfolio.style.font,
        }"
      >
        <div class="column-left">
          <iframe :src="props.portfolio.headshot" scrolling="no" style="pointer-events: none" allowfullscreen="false" height="240" width="240" class="profilePic"></iframe>
          <div class="professionalInfo">
            <div class="textarea-input">
              <b style="margin-right: 5px">Education</b>
              <textarea v-model="education" placeholder="Education (seperate by ', ')" style="margin-top: 10px" height="2"></textarea>
            </div>
            <br />
            <div class="textarea-input">
              <b style="margin-right: 5px">Experience</b>
              <textarea v-model="experience" placeholder="Experience (seperate by ', ')" style="margin-top: 10px"></textarea>
            </div>
            <br />
            <div class="textarea-input">
              <b style="margin-right: 5px">Skills</b>
              <textarea v-model="skills" placeholder="Skill (seperate by ', ')" style="margin-top: 10px"></textarea>
            </div>
            <br />
            <div class="textarea-input">
              <b style="margin-right: 5px">Languages</b>
              <textarea v-model="languages" placeholder="Language (seperate by ', ')" style="margin-top: 10px"></textarea>
            </div>
          </div>
        </div>
        <div class="column-right">
          <div class="personalInfo">
            <h1>{{ user.name }}</h1>
            <p>Contact at {{ user.email }}</p>
            <p v-if="props.portfolio.user.state">{{ user.city }}, {{ user.state }}, {{ user.country }}</p>
            <p v-else>{{ user.city }}, {{ user.country }}</p>
            <textarea v-model="intro" placeholder="Intro for your portfolio" style="height: 60px; width: 400px"></textarea>
          </div>
          <div class="style">
            <label for="textColor" style="margin-right: 5px">Text Color</label>
            <input type="color" v-model="textColor" id="textColor" style="margin-top: 10px" required />
            <br />
            <label for="backgroundColor" style="margin-right: 5px">Background Color</label>
            <input type="color" v-model="backgroundColor" id="backgroundColor" style="margin-top: 10px" required />
            <br />
            <label for="backgroundImage" style="margin-right: 5px">Background Image</label>
            <input type="url" v-model="backgroundImage" id="backgroundImage" style="margin-top: 10px" />
            <br />
            <label for="fontSize" style="margin-right: 5px">Font Size</label>
            <input type="number" v-model="fontSize" id="fontSize" style="margin-top: 10px" required />
            <br />
            <label for="font" style="margin-right: 5px">Font</label>
            <input type="text" v-model="font" id="font" style="margin-top: 10px" required />
            <br />
          </div>
          <div class="media" style="margin-top: 10px">
            <AddMedia v-if="adding" @stopChange="() => (adding = false)" @refreshPortfolio="emit('refresh-portfolio')" />
            <button v-else @click="() => (adding = true)" class="pure-button" style="margin-bottom: 20px">Add Media</button>
            <div v-for="m in portfolio.media" :key="m._id">
              <button @click="deleteMedia(m._id)">x</button><br />
              <iframe :src="m.url"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 50%; margin: auto">
      <div class="base" style="margin-bottom: 40px; margin-top: 40px; margin-left: 40%">
        <menu>
          <li><button class="pure-button-primary pure-button" type="submit">Save</button></li>
          <li>
            <button class="pure-button" @click="emit('cancel-edit')">Cancel</button>
          </li>
        </menu>
      </div>
    </div>
  </form>
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

textarea {
  font-family: inherit;
  font-size: inherit;
  border-radius: 4px;
  resize: none;
}

button {
  background-color: #d77533;
  color: white;
}
</style>
