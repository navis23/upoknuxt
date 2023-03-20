<template>
    <div class="fixed w-full flex items-center justify-between px-10 bg-stone-100 border-b z-[999]">
        <div class="flex gap-x-2 items-center py-6 font-bold text-yellow-500 tracking-wide">
            <Icon name="carbon:tool-kit" size="24" />
            <h2 class="text-base">
                PERMATA MOTOR
            </h2>
        </div>

        <div class="text-center">
            <h2 class="text-base font-bold leading-wide text-gray-800 uppercase">
                Transaksi Produk dari Supplier
            </h2>
            <p class="text-xs font-medium text-gray-500 ">
                    Menu untuk melakukan update / tambah produk dari supplier
            </p>
        </div>
        
        <div>
            <nuxt-link to="/">
                <TButton class="darkness">
                    <Icon name="carbon:power" size="24" />
                    <span class="text-sm font-semibold tracking-wide ">
                        Menu Utama
                    </span>
                </TButton>
            </nuxt-link>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>