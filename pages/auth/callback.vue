<template></template>

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
          return this.$router.push("/login?error=2");
        });
    } else {
      this.addError(
        "Your UP Mail is not in the system. The current iteration is intended for UPLB Faculty Promotions, Email Mr. Li Bolanos at: lgbolanos@up.edu.ph if you are a UPLB Faculty applying for promotion. State  the following information in your email: Your First Name, Middle Name, Last Name, Civil Status, Sex, Date of Birth,  Home Unit and College, Designation and Rank (ex. Assitant Professor 1), Salary Grade and Step.  Kinldy attach an image of your UPLB ID for verification purposes.If you cannot open your UPmail please contact ITC.uplb.edu.ph."
      );
      return this.$router.push("/login?error=1");
    }
  },
  methods: {
    ...mapActions({
      addError: "alert/error",
    }),
  },
};
</script>
