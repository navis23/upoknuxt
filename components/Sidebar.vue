<template>
    <aside class="fixed h-full min-h-screen py-6 px-8 hidden md:block w-60 border-r bg-stone-50">
        <div class="fixed top-0 left-0 right-0 pl-8 w-60 flex gap-x-2 items-center py-8 font-bold text-yellow-500 tracking-wide">
            <Icon name="carbon:tool-kit" size="24" />
            <h2 class="text-base">
                PERMATA MOTOR
            </h2>
        </div>
        <ul class="flex flex-col gap-y-6 mt-20">
            <li v-for="(item, index) in menu" :key="index">
                <nuxt-link :to="item.link" class="flex gap-x-2 items-center py-2 text-gray-500 hover:text-sky-600 group">
                    <span class="absolute w-1.5 h-8 bg-sky-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out" />
                    <span><Icon :name="item.icon" size="24" /></span>
                    <span>{{ item.name  }}</span>
                </nuxt-link>
            </li>
        </ul>
        <ul class="fixed flex flex-col gap-y-5 bottom-0 left-0 px-8 right-0 w-60 py-5 text-gray-500">
            <!-- <li class="flex gap-x-2 items-center py-2 text-yellow-500">
                <span><Icon name="carbon:user-online" size="24" /></span>
                <span>Mr. Upokss</span>
            </li> -->
            <li class="py-6">
                <nuxt-link to="/">
                    <TButton class="darkness">
                        <Icon name="carbon:power" size="24" />
                        <span class="text-sm font-semibold tracking-wide ">
                            Menu Utama
                        </span>
                    </TButton>
                </nuxt-link>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
// import { useMenuStore } from "@/stores/menuStore";

const storeMenu = useMenuStore()
const { menu } = storeToRefs(storeMenu)

</script>

<style scoped>

</style>