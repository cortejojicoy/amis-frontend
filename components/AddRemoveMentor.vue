<template>
  <div class="my-6">
    <div class="flex justify-between mb-6">
      <div>
        <button class="p-2 bg-gray-300" @click="addRemoveMentor">
          Add/Remove a Mentor
        </button>
      </div>
    </div>
    <div class="bg-white overflow-auto shadow-xl sm:rounded-lg mb-4">
      <div class="div" v-show="nominatedMentors">
      
      
      <table class="table-auto w-full items-center text-center">

        <thead>
          <tr class="font-bold">
            <td class="px-2 py-3">Action</td>
            <td class="px-2 py-3">Mentor</td>
            <td class="px-2 py-3">Role</td>
            <td class="px-2 py-3">Field Represented</td>
            <td class="px-2 py-3">Effectivity Start</td>
            <td class="px-2 py-3">Effectivity End</td>
            <td class="px-2 py-3"></td>
          </tr>
        </thead>
        <tbody>
      <tr
        v-for="(record, recordIndex) in nominatedMentors"
        :key="recordIndex"
      >
      <td>
        <!-- {{record.actions}} -->
        <select v-model="record.actions" v-on:input="onChangeAddRemove($event, record.id)">
          <!-- <option value="Add"></option> -->
          <option v-for="action in actionSelected" :value="action">{{ action }}</option>
        </select>
      </td>
      <td v-if="record.actions == 'Add'">
        <!-- {{record.mentor_name}} -->
        <select name="" id="">
          <option value="">This is Add</option>
        </select>
      </td>
      <td v-else-if="record.actions == 'Remove'">
        <!-- {{record.mentor_name}} -->
        <select name="" id="">
          <option value="">This is Remove</option>
        </select>
      </td>
      <td>{{record.mentor_role}}</td>
      <td>{{record.field_represented}}</td>
      <td>{{record.effectivity_start}}</td>
      <td>{{record.effectivity_end}}</td>
             <td class="px-2 py-3">
              <button @click="deleteRecords(record.id)">
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
    </div>
      <div>
        <button class="p-2 bg-gray-200 mr-2">Save</button>
      </div>
      <div>
          <button class="p-2 bg-gray-200">Submit</button>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      actionSelected: ['Add', 'Remove']
    }
  },
  computed: {
    ...mapState({
      nominatedMentors: state => state.student.mentorAssignment.nominatedMentor.data.save_mentors,
    })
  },
  async fetch () {
    this.getNominatedMentors(this.$auth.user.saisid)
  },
  methods: {
    ...mapActions({
      getNominatedMentors: 'student/mentorAssignment/nominatedMentor/getData',
    }),
    ...mapMutations({
      addRow: 'student/mentorAssignment/nominatedMentor/ADD_ROW',
      updateActions: 'student/mentorAssignment/nominatedMentor/CHANGE_ACTION_STATE'
    }),
    deleteRecords(mentor_id){
      console.log(mentor_id)
    },
    addRemoveMentor(){
      this.addRow()
    },
    onChangeAddRemove(event, id) {
      // console.log(event.target.value, id)
      this.updateActions(event.target.value, id)
    },
  }
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
