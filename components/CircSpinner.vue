<template>
	<div v-show="isLoading">
		<div v-if="size == 'large'" class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 m-4"></div>
		<div v-else class="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-6 w-6 m-4"></div>
    </div>
</template>
<script>
export default {
	props: {
        isLoading: {
            type: Boolean,
            default: false
        },
		size: {
			type: String,
			default: 'small'
		}
    },
    data() {
        return {
            // isLoading: true
        };
    },
}
</script>

<style scoped>
.loader {
	border-top-color: #b3c4cfc4;
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