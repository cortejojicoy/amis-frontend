<template>
  <div class="font-sans text-gray-900 antialiased">
    <div class="h-screen grid justify-items-center items-center">
      <div
        class="w-auto md:w-1/2 lg:w-1/3 py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div class="flex justify-center -mt-16">
          <img src="/logos/uplb-logo.png" class="object-center" />
        </div>
        <div class="mt-5">
          <h2 class="text-gray-800 text-3xl font-semibold text-center">
            Welcome to the UPLB Academic Management Information System
          </h2>
          <p class="mt-5 text-gray-600 text-center">
            This app is currently in alpha phase.
          </p>
        </div>
        <div class="flex justify-center mt-4">
          <button class="bg-red-700 text-white py-2 px-4" @click="login">
            Login with UPmail
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  methods: {
    login(message) {
      window.location.href = `${process.env.API_BASE_URL}/auth/google`;
    },
  },
};
</script>
