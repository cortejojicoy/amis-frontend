<template>
    <div>
        <label :for="'toggleB' + this.pk" class="flex items-center cursor-pointer">
            <!-- toggle -->
            <div class="relative">
            <!-- input -->
            <input type="checkbox" v-model="open" :id="'toggleB' + this.pk" class="sr-only">
            <!-- line -->
            <div class="block bg-gray-600 w-10 h-6 rounded-full"></div>
            <!-- dot -->
            <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
            </div>
            <!-- label -->
            <div class="ml-3 text-gray-700 font-medium">
                <div v-if="this.open">
                    Class is open. (Students may apply for a prerog in this class.)
                </div>
                <div v-else>
                    Class closed.
                </div>
            </div>
        </label>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            open: this.value
        };
    },
	props: {
        pk: {
            type: Number
        },
        value: {
            type: Boolean
        }
    },
    components: {

    },
    computed: {
        
    },
    methods: {
       
    },
    watch: {
        open(newVal, oldVal) {
            this.$emit('onToggle', this.open, this.pk)
        }
    }
}
</script>

<style>
    
</style>