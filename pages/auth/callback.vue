<template>
  <div class="grid place-items-center h-screen">
      <div class="">
              	<div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>

  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  layout: "auth",
  auth: "guest",
  data() {
    return {
      token: this.$route.query.token ? this.$route.query.token : null,
    };
  },
  mounted() {
    if (this.token) {
      this.$auth
        .loginWith("local", {
          data: {
            token: this.token,
          },
        })
        .catch((e) => {
          this.$auth.logout();
          return this.$router.push("/auth/login");
        });
    } else {
      this.addError(
        "Your UP Mail is not in the system. The current iteration is intended for UPLB Faculty Promotions, Email Mr. Li Bolanos at: lgbolanos@up.edu.ph if you are a UPLB Faculty applying for promotion. State  the following information in your email: Your First Name, Middle Name, Last Name, Civil Status, Sex, Date of Birth,  Home Unit and College, Designation and Rank (ex. Assitant Professor 1), Salary Grade and Step.  Kinldy attach an image of your UPLB ID for verification purposes.If you cannot open your UPmail please contact ITC.uplb.edu.ph."
      );
      return this.$router.push("/auth/login?message=not_in_system");
    }
  },
  methods: {
    ...mapActions({
      addError: "alert/error",
    }),
  },
};
</script>
<style >
.loader {
	border-top-color: #3498db;
	-webkit-animation: spinner 1.5s linear infinite;
	animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
	0% {
		-webkit-transform: rotate(0deg);
	}
	100% {
		-webkit-transform: rotate(360deg);
	}
}

@keyframes spinner {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
