<template>
    <v-btn @click="login">
              Login with UPmail
            </v-btn>
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    login (message) {
      window.location.href = `${process.env.API_BASE_URL}/auth/google`
    }
  }
}
</script>