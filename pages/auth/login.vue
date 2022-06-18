<template>
    <button 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="login"
    >
              Login with UPmail
    </button>
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