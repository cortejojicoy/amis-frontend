<template>
  <div class="mb-6">
    <div class="text-2xl font-bold">
      {{ this.$auth.user.name }}
    </div>
    <div class="mt-4 flex">
      <div class="mr-36">
        <div>
          <span class="font-bold">Program:</span>
        </div>
        <div>
          <span class="font-bold">Status:</span>
        </div>
      </div>
      <div>
        <div>
          <span class="font-bold">UP Mail:</span>
        </div>
        <div>
          <span class="font-bold">Mobile Number:</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
