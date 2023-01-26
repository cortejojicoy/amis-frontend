<template>
    <nav class="flex fixed w-full items-center justify-between px-6 bg-transparent text-gray-700 z-10">
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0">
      </transition>
      
        <aside
            class="transform top-16 right-0 w-full bg-gray-100 fixed shadow-md ease-in-out h-full transition-all duration-300 z-10 p-10"
            :class="drawerOpen ? '-translate-x-0' : 'translate-x-full'">
            <span
                class="justify-right items-right">
                <button
                    class="px-4 p-2 mb-6 justify-right items-right text-white bg-red-400 hover:bg-red-600 rounded"
                    @click="drawer">
                    Close
                </button>
            </span>
            <div class="overflow-x-hidden items-top justify-center h-5/6 bg-gray-100">
                <div class="bg-white px-4 sm:p-6">
                    <slot name="content">

                    </slot>
                </div>
            </div>
        </aside>
    </nav>
</template>
  
<script>
  
export default {
    props: {
        isOpen: {
            type: Boolean,
        },
        passedData: {
            type: Object
        }
    },
    data() {
        return {
            drawerOpen: this.isOpen
        }
    },
    methods: {
        drawer() {
            this.drawerOpen = !this.drawerOpen;
        },
    },
    watch: {
        drawerOpen(newVal, oldVal) {
            if(newVal == false) {
                document.body.style.removeProperty("overflow");
                this.$emit('closeDrawer')
            }
        },
        isOpen(newVal, oldVal) {
            if(newVal == true) {
                this.drawerOpen = true
                document.body.style.setProperty("overflow", "hidden");
            }
        }
    },
};
</script>
  