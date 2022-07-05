<template>
  <nav
    class="flex fixed w-full items-center justify-between px-6 bg-transparent text-gray-700 z-10">
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0">
    </transition>
    
 
    <aside
      class="transform top-16 right-0 w-full bg-gray-100 fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10 p-10"
      :class="isOpen ? '-translate-x-0' : 'translate-x-full'">
      <span
        @click="isOpen = false"
        class="justify-right items-right">
        <button
          class="px-4 p-2 mb-6 justify-right items-right text-white bg-red-400 hover:bg-red-600"
          @click="closeDrawer">
          Close
        </button>
      </span>
      <!-- MENTOR ASSIGNMENT REQUEST -->
      <div class="relative overflow-x-hidden items-top justify-center min-h-screen h-full bg-gray-100 pt-10">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
     <StudentInfo />
      <hr class="border-2 border-solid border-black mb-6" />
      <MentorAssignmentRequest />
    </div>
    </div>
    </aside>

  </nav>
</template>

<script>
import StudentInfo from './StudentInfo.vue';
import MentorAssignmentRequest from './MentorAssignmentRequest.vue';

export default {
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {

        }
    },
    methods: {
        drawer() {
            this.isOpen = !this.isOpen;
        },
        closeDrawer() {
            this.$emit("close");
        }
    },
    watch: {
        isOpen: {
            immediate: true,
            handler(isOpen) {
                if (process.client) {
                    if (isOpen) {
                        document.body.style.setProperty("overflow", "hidden");
                    }
                    else {
                        document.body.style.removeProperty("overflow");
                        this.$emit("close");
                    }
                }
            },
        },
    },
    mounted() {
        // document.addEventListener("keydown", (e) => {
        //   if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
        // });
    },
    components: { StudentInfo, MentorAssignmentRequest }
};
</script>
