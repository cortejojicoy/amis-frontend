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
      error: this.$route.query.error ? this.$route.query.error : null,
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
      return this.$router.push({ path: "/auth/login", query: { error: this.error } });
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
