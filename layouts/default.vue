<template>
  <div>
    <NavBar />
    <Nuxt />
  </div>
</template>

<script>
 export default {
    middleware: 'auth'
  }
</script>

