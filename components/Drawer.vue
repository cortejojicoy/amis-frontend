<template>
  <nav
    class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0">
    </transition>
    <aside
      class="transform top-16 left-0 w-90 bg-white fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10 p-10"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <span @click="isOpen = false" class="justify-right items-right">
        <button
          class="p-2 justify-right items-right text-white bg-red-700 hover:bg-red-600 rounded-lg"
          @click="closeDrawer">
          Close
        </button>
      </span>
      <StudentInfo />
      <hr class="border-2 border-solid border-black mb-6" />
      <MentorAssignmentRequest />
    </aside>
  </nav>
</template>

<script>
import StudentInfo from "./StudentInfo.vue";
import MentorAssignmentRequest from "./MentorAssignmentRequest.vue";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {},
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    closeDrawer() {
      this.$emit("close");
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) {
            document.body.style.setProperty("overflow", "hidden");
          } else {
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
  components: { StudentInfo, MentorAssignmentRequest },
};
</script>
