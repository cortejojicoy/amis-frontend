<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div>
        <button class="p-2 bg-gray-300" v-on:click="addMentor" @click="saveSubmit=true">
          Add/Remove a Mentor
        </button>
      </div>
    </div>
    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
      <table class="table-auto w-full items-center text-center">
        <thead>
          <th>
            <tr class="font-bold">
              <td class="px-2 py-3">Action</td>
              <td class="px-2 py-3">Mentor</td>
              <td class="px-2 py-3">Role</td>
              <td class="px-2 py-3">Effectivity Start</td>
              <td class="px-2 py-3">Effectivity End</td>
              <td class="px-2 py-3"></td>
            </tr>
          </th>
        </thead>
          <!-- {{ mentorForms }} -->
        <tbody v-for="(mentorForm, index) in mentorForms">
          <tr>  
            <td class="px-2 py-3">
              <select name="" id="" v-model="mentorForm.selectedActions">
                <option v-for="action in actions" :value="action">
                  {{ action }}
                </option>
              </select>
            </td>
            <td class="px-2 py-3" v-if="mentorForm.selectedActions == 'Add'">
              <select name="" id="">
                <option value="">This is add</option>
              </select>
            </td>
            <td class="px-2 py-3" v-else-if="mentorForm.selectedActions == 'Remove'">
              <select name="" id="">
                <option value="">This is remove</option>
              </select>
            </td>
            <td class="px-2 py-3">
              <input class="w-38 py-3 px-4 mb-3 leading-tight focus:bg-white" v-model="mentorForm.mentor" type="text"> 
            </td>
            <td class="px-2 py-3"></td>
            <td class="px-2 py-3"></td>
            <td class="px-2 py-3">
              <button v-on:click="deleteMentor(index)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-end" v-if="saveSubmit">
        <div>
          <button class="p-2 bg-gray-200 mr-2">Save</button>
        </div>
        <div>
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <ConfirmAddRemoveMentorVue />
            </div>
            <button @click="showModal=false" class="p-2 bg-gray-200">Close</button>
          </div>
          <button  @click="showModal=true" class="p-2 bg-gray-200">Submit</button>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import ConfirmAddRemoveMentorVue from './ConfirmAddRemoveMentor.vue';

export default {
  name: "AddRemoveMentor",
  components: {
    ConfirmAddRemoveMentorVue
  },
  data() {
    return {
      mentorForm: {
        mentor: '',
        selectedActions: '',
      },
      actions: ['Add', 'Remove'],
      mentorForms: [],
      showModal: false,
      saveSubmit: null,
    }
  },
  
  methods: {
    addMentor() {
      this.mentorForms.push(Vue.util.extend({}, this.mentorForm, this.actions))
    },
    deleteMentor(index) {
      Vue.delete(this.mentorForms, index);
    }
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  background-color: gray;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}
</style>
