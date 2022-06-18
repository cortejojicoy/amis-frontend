<template>
  <Tutorial/>
</template>

<script>
export default {
  name: 'IndexPage',

  mounted () {
    history.replaceState(null, '', location.href.split('?')[0])
  }
}
</script>
