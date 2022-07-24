<template>
  <vue-final-modal
        v-slot="{close}"
        v-bind="$attrs"
        classes="flex justify-center items-center"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
        v-on="$listeners"
    >
    <div class="bg-white font-bold p-4 sm:px-6 sm:py-4 border-b border-gray-150">
      <slot name="title">

      </slot>
    </div>

    <div class="bg-white px-4 sm:p-6">
      <slot name="content">

      </slot>
    </div>
  
    <div class="bg-white px-4 pb-5 sm:px-4 flex justify-center">
      <slot name="buttons">
        
      </slot>
      <button class="bg-blue-500 text-white p-2 rounded mr-2" @click="close">Close</button>
    </div>
  </vue-final-modal>
</template>

<script>
    export default {
        name: 'VTailwindModal',
        inheritAttrs: false
    }
</script>