<template>
    <button class="inline-flex gap-x-1 items-center py-2.5 pl-5 pr-6 text-white bg-sky-600 rounded-xl transition ease-in-out hover:bg-sky-700 hover:outline-none hover:ring-2 hover:ring-sky-500 hover:ring-offset-1">
        <slot> button </slot>
    </button>
</template>

<script setup lang="ts">

</script>

<style lang="postcss" scoped>
.danger {
    @apply text-white bg-red-600 rounded-xl hover:bg-red-700 hover:outline-none hover:ring-2 hover:ring-red-500 hover:ring-offset-1
}
.ijo {
    @apply text-white bg-teal-600 rounded-xl hover:bg-teal-700 hover:outline-none hover:ring-2 hover:ring-teal-500 hover:ring-offset-1
}

.gray {
    @apply text-white bg-gray-400 rounded-xl hover:bg-gray-500 hover:outline-none hover:ring-2 hover:ring-gray-600 hover:ring-offset-1
}

.darkness {
    @apply text-white bg-gray-700 rounded-xl hover:bg-gray-800 hover:outline-none hover:ring-2 hover:ring-gray-700 hover:ring-offset-1
}

</style>