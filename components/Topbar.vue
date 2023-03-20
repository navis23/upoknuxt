<template>
    <div class="flex items-center justify-between py-7 px-10 md:ml-64" >
        <div>
            <h1 class="text-2xl font-semibold leading-relaxed text-gray-800 ">
                {{ headMenu?.name }}
            </h1>
            <p class="text-sm font-medium text-gray-500 ">
                {{ headMenu?.keterangan }}
            </p>
        </div>
        <!-- <button class=" inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-sky-600 rounded-xl ">
            <Icon name="carbon:add-alt" size="24" />
            <span class="text-sm font-semibold tracking-wide ">
                Tambah Produk
            </span>
        </button> -->
        <TButton v-if="headMenu?.name != 'Dashboard' || 'Histori'">
            <Icon name="carbon:add-alt" size="24" />
            <span class="text-sm font-semibold tracking-wide ">
                Tambah {{ headMenu?.name }}
            </span>
        </TButton>
    </div>
</template>

<script lang="ts" setup>
// import { useMenuStore } from "@/stores/menuStore";

const route = useRoute()
const storeMenu = useMenuStore()
const { menu } = storeToRefs(storeMenu)

const headMenu =  computed(() => { return menu.value.find(v => v.pathName == route.name)} )

</script>

<style lang="postcss" scoped>

</style>