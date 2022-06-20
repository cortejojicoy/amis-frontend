<template>
  <nav
    class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">
    <div class="flex items-center">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div class="m-auto md:mx-4">
        <img src="/logos/uplb-logo.png" class="h-12 w-auto" alt="UPLB Logo" />
      </div>
      <h1 class="font-semibold text-xl hidden md:flex items-center">
        UPLB AMIS
      </h1>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0">
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity">
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-0"
          tabindex="0"></div>
      </div>
    </transition>
    <aside
      class="transform top-16 left-0 w-64 bg-white fixed h-full shadow-md overflow-auto ease-in-out transition-all duration-300 z-10"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b">
        <div class="flex text-black">
          <div class="m-auto px-3">
            <img
              src="/logos/no-picture.png"
              class="h-12 w-auto"
              alt="User Picture" />
          </div>

          <div class="inline-block w-2/3">
            <p class="font-bold text-xl">{{ this.$auth.user.name }}</p>
            <p class="break-words text-sm">{{ this.$auth.user.email }}</p>
          </div>
        </div>
      </span>
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
        ><span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6">
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
        </span>
        <span>Dashboard</span></span
      >
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
        ><span class="mr-2">
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
              d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        </span>
        <span>Future Proofing</span>
        <ul id="dropdown-example" class="hidden py-2 space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Products</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Billing</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Invoice</a
            >
          </li>
        </ul>
      </span>
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
              clip-rule="evenodd" />
          </svg>
        </span>
        <span>Personal Information</span>
      </span>
      <span
        @click="isOpen = false"
        class="flex items-center p-4 hover:bg-gray-300 hover:text-red-700"
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
              clip-rule="evenodd" />
            <path
              d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
          </svg>
        </span>
        <span>Faculty Portal</span>
        <ul id="dropdown-example" class="hidden py-2 space-y-2">
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Mentor Assignment</a
            >
          </li>
          <li>
            <a
              href="#"
              class="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >Consent of Instructor</a
            >
          </li>
        </ul>
      </span>

      <span
        @click="isOpen = false"
        class="flex items-center p-4 px-8 py-2 pt-4">
        <button
          class="flex justify-center items-center text-white bg-red-700 hover:bg-red-600 w-full
           rounded-lg py-2"
          @click="logout">
           Logout
        </button>
      </span>
    </aside>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    async logout() {
      let res = await this.$auth.logout();
      await this.$router.push("/auth/login");
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
};
</script>
