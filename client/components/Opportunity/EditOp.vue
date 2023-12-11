<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["op"]);
const emit = defineEmits(["updated", "cancel-edit", "ripple-cancel-edit"]);

const title = ref(props.op.title);
const description = ref(props.op.description);
const startsOn = ref(new Date(props.op.startOn).toJSON().slice(0, 10));
console.log(startsOn);
const endsOn = ref(new Date(props.op.endsOn).toJSON().slice(0, 10));

const physicalReq = ref(props.op.requirements.physical.join(", "));
const skillReq = ref(props.op.requirements.skill.join(", "));
const locationReq = ref(props.op.requirements.location);

const editOp = async (description: string, startOn: string, endsOn: string, physicalReq: string, skillReq: string, locationReq: string) => {
  const sepPhysicalReqs = physicalReq.split(", ");
  const sepSkillReqs = skillReq.split(", ");
  try {
    await fetchy("/api/opportunities", "PATCH", {
      body: {
        id: props.op._id,
        update: { description, startOn: new Date(startOn), endsOn: new Date(endsOn), requirements: { physical: sepPhysicalReqs, skill: sepSkillReqs, location: locationReq } },
      },
    });
  } catch (_) {
    return;
  }
  emit("updated");
  emit("ripple-cancel-edit");
};
</script>

<template>
  <div style="margin-left: 15%; margin-top: 50px">
    <h1 style="text-align: center; margin-right: 15%">Editting:</h1>
    <form @submit.prevent="editOp(description, startsOn, endsOn, physicalReq, skillReq, locationReq)">
      <label for="title" style="font-weight: bold">Create a new opportunity</label>
      <input type="text" id="title" v-model="title" placeholder="Title" readonly disabled required />
      <textarea id="description" v-model="description" placeholder="Description" required> </textarea>
      <label for="startsOn" style="font-weight: bold">Opportunity starts on:</label>
      <input type="date" id="startsOn" v-model="startsOn" required />
      <label for="endsOn" style="font-weight: bold">Opportunity ends on:</label>
      <input type="date" id="endsOn" v-model="endsOn" required />
      <label for="physicalReq" style="font-weight: bold">Physical Requirements</label>
      <input type="text" id="physicalReq" v-model="physicalReq" placeholder="Physical Requirements (seperate with ', ')" required />
      <label for="skillReq" style="font-weight: bold">Skill Requirements</label>
      <input type="text" id="skillReq" v-model="skillReq" placeholder="Skill Requirements (seperate with ', ')" required />
      <label for="locationReq" style="font-weight: bold">Location Requirement</label>
      <input type="text" id="locationReq" v-model="locationReq" placeholder="Location Requirement" required />
      <div class="row" style="margin-left: 24%; margin-top: 30px">
        <button type="submit" class="pure-button button-submit">Submit</button>
        <button
          @click="
            () => {
              emit('cancel-edit');
            }
          "
          class="pure-button"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
  <br />
  <br />
</template>

<style scoped>
.categoryOption {
  float: left;
  width: 20%;
  padding: 0;
  margin: 10px;
}
form {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 2em;
  width: 80%;
}

textarea {
  font-family: inherit;
  font-size: inherit;
  height: 6em;
  padding: 0.5em;
  border-radius: 4px;
  resize: none;
}
.row {
  text-align: center;
}

.button-submit {
  background: #d77533;
  color: white;
  border-color: #d77533;
}
button {
  width: 30%;
  float: left;
  margin-right: 10px;
}
</style>
