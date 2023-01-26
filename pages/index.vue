<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-2xl leading-7 font-semibold">
          {{ greetings }}, {{ this.$auth.user.first_name }} {{ this.$auth.user.last_name }}!
        </h2>
        <p class="mt-3 text-gray-600">
          Welcome to the new Academic Management Information System of UPLB! To
          start, we would like to inform you first that this system is still
          under development. So if you encounter any problems, errors, or bugs
          please send us an email to alert us about its existence. You may send
          your email to dx.uplb@up.edu.ph. To help you navigate easily through
          our system, the following are the modules that are currently working:
          Consent of Instructor Application This system is currently being
          co-created with UPLB Students and other stakeholders in coordination
          with the UPLB University Student Council, units and colleges.
        </p>
      </div>
      <div v-if="this.isFaculty" class="mt-4 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        You may watch a tutorial for the prerog module via this link: <a class="text-blue-500" target="_blank" href="https://youtu.be/xCz9q9pzBrA">Video Tutorial for AMIS Prerog for Faculty</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  mounted() {
    history.replaceState(null, "", location.href.split("?")[0]);
  },
  computed: {
    isFaculty() {
      if(this.$auth.user.roles) {
        const roles = this.$auth.user.roles;
        return roles.find(el => el.name === "faculty") ? true : false;
      } else {
        return false
      }
    },
    greetings() {
      var today = new Date(new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
      }))

      var time = today.getHours()
      
      if(time < 12) {
          return "Good morning";
      } else if (time > 11 && time < 19) {
          return "Good afternoon";
      } else {
          return "Good evening";
      }
    }
  }
};
</script>
