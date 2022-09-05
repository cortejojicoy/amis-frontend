<template>
  <div class="font-sans text-gray-900 antialiased">
    <div class="h-screen grid justify-items-center items-center">
      <div class="w-auto md:w-1/2 lg:w-1/3">
        <div class="py-4 px-8 bg-white shadow-lg rounded-lg mt-20 mb-4">
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
            <p v-if="this.$config.APP_MAINTENANCE != ''" class="mt-4 text-xl text-yellow-600 font-bold text-center">Our servers reached their limits during the pilot launch of AMIS Prerog. We are now reconfiguring and optimizing settings. Kindly check back at 5:00 PM. We will release another advisory by then. Thank you for your patience.</p>
          </div>
          <div class="flex justify-center mt-4">
            <button class="bg-red-700 text-white py-2 px-4" @click="login">
              Login with UPmail
            </button>
          </div>
          <div v-if="this.error" class="flex justify-center mt-4">
              <div class="items-center justify-center align-middle font-bold text-xl text-yellow-400">
                <div v-if="this.error == 'not_found'">
                  Please use your UP Mail
                </div>
                <div v-else-if="this.error == 'on_maintenance'">
                  Please wait for the maintenance to finish
                </div>
              </div>
          </div>
        </div>
        <div class="py-2 px-2 text-gray-500 text-center">
            For Mac Users, use Chrome Browser. Safari is not currently supported. If you are unable to login using your UP Mail, accomplish this AMIS suppport form to notify us: <a class="text-blue-400" href="https://forms.gle/fVtqH38XuqoghxoR6">https://forms.gle/fVtqH38XuqoghxoR6</a>
        </div>
      </div>
      <div>
        <div class="flex justify-center align-middle w-full">
          <a class="text-blue-500" target="_blank" href="https://youtu.be/ZhuOYY87Wls">Video Tutorial for COI Application and Approval |&nbsp;</a><br>
          <a class="text-blue-500" target="_blank" href="https://youtu.be/xCz9q9pzBrA">Video Tutorial for AMIS Prerog for Faculty</a><br>
        </div>
        <div class="flex justify-center align-middle w-full">
          <a class="text-blue-500" target="_blank" href="https://amis.uplb.edu.ph/pdf/Online-Preregistration-FS2022-2023.pdf">PRE-REGISTRATION GUIDELINES FOR 1ST SEMESTER 22-23 |&nbsp;</a><br>
          <a class="text-blue-500" target="_blank" href="https://amis.uplb.edu.ph/pdf/COI-via-DX-AMIS-Instructions-for-the-Faculty.pdf">COI via DX AMIS Instructions for the Faculty</a> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      error: this.$route.query.error ? this.$route.query.error : null,
    };
  },
  methods: {
    login(message) {
      window.location.href = `${process.env.apiBaseUrl}/auth/google`;
    },
  },
};
</script>
