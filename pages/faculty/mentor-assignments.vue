<template>
  <div
    class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
    <!-- <div class="bg-gray-200 absolute overflow-y-scroll w-full h-full p-8 slider z-10">
        <div>
            <button @click="openStudentView = false" class="p-2 bg-red-400 text-white">
                Close
            </button>
        </div>
        
        <div>
            //Student-view (student_data, submitted_mentors, transaction_history)
        </div>
    </div> -->
    <div class="py-12">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div>
          <div class="mb-4 flex items-center">
            <div class="text-2xl">Mentor Assignment (Faculty)</div>
          </div>
        </div>
        <div class="relative mb-4">
          <input
            type="text"
            id="filter-search"
            class="bg-gray-50 border text-gray-900 text-small p-1"
            placeholder="Search keyword..." />
          <button
            type="submit"
            class="p-1 ml-2 text-small font-small text-white bg-blue-700 border border-blue-700">
            Search
          </button>
          <button
            type="submit"
            class="p-1 ml-2 text-small font-small text-white bg-green-500 border border-green-500">
            View All
          </button>
        </div>
        <div class="mb-4">
          <div class="flex lg:nowrap flex-wrap w-full justify-between">
            <div>
              <label
                for="filter-name"
                class="block text-xs text-gray-900 dark:text-gray-400"
                >filter by name</label
              >
              <select
                id="filter-name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                <option selected>Name</option>
              </select>
            </div>
            <div>
              <label
                for="filter-program"
                class="block text-xs text-gray-900 dark:text-gray-400"
                >filter by program</label
              >
              <select
                id="filter-program"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                <option selected>Program</option>
              </select>
            </div>
            <div>
              <label
                for="filter-ss"
                class="block text-xs text-gray-900 dark:text-gray-400"
                >filter by student status</label
              >
              <select
                id="filter-ss"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                <option selected>Student Status</option>
              </select>
            </div>
            <div>
              <label
                for="filter-mentor"
                class="block text-xs text-gray-900 dark:text-gray-400"
                >filter by mentor</label
              >
              <select
                id="filter-mentor"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                <option selected>Mentor</option>
              </select>
            </div>
            <div>
              <label
                for="filter-role"
                class="block text-xs text-gray-900 dark:text-gray-400"
                >filter by role</label
              >
              <select
                id="filter-role"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                <option selected>Role</option>
              </select>
            </div>
            <div>
              <label
                for="filter-ms"
                class="block text-xs text-gray-900 dark:text-gray-400"
                >filter by mentor status</label
              >
              <select
                id="filter-ms"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-small p-1">
                <option selected>Mentor Status</option>
              </select>
            </div>
            <div class="flex items-end">
              <button class="text-white text-small p-1 bg-blue-500">
                Apply Filter
              </button>
            </div>
          </div>
        </div>
        <div class="relative overflow-x-auto">
          <table
            class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr class="font-bold">
                <td class="p-4">Name</td>
                <td class="p-4">Program</td>
                <td class="p-4">Student Status</td>
                <td class="p-4">Mentor</td>
                <td class="p-4">Role</td>
                <td class="p-4">Mentor Status</td>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-4 py-3" @click="openStudentView = true">
                  Sample
                </td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
                <td class="px-4 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Drawer :isOpen="openStudentView" @close="openStudentView = false" />
  </div>
</template>

<script>
import Drawer from "../../components/Drawer.vue";
export default {
  components: { Drawer },
  data() {
    return {
      openStudentView: false,
    };
  },
};
</script>
