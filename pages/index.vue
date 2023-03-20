<template>
    <div class="text-gray-700 bg-[url('/img/background01.jpg')] bg-cover">
        <Loading v-if="loadingOverlay == true"/>
        <div class="flex flex-col justify-center items-center px-10 h-screen bg-white/70">
            <div class="text-center pb-6">
                <h1 class="text-2xl font-bold tracking-widest uppercase">
                    Selamat datang di 
                    <span class="text-yellow-500">
                        <Icon name="carbon:tool-kit" size="28" /> Permata Motor
                    </span>
                </h1>
                <h2 class="text-2xl font-bold tracking-widest italic py-2">Inventory System</h2>
            </div>
    
            <div class=" border-dashed rounded-lg p-8">
                <div class="flex flex-col items-center justify-center">
                    <h2 class="text-xl text-center tracking-wide">
                        Pilih Akses Menu dibawah ini
                    </h2>
                    <span class="w-20 mb-5 pb-4 border-b-4 border-yellow-500"></span>
                </div>
                <div class="flex gap-10 justify-center">
                    <nuxt-link to="stok">
                        <div class=" flex items-center gap-x-4 w-72 px-4 py-6 rounded-lg bg-teal-100 text-teal-700 cursor-pointer transition ease-in-out hover:bg-opacity-60 hover:outline-none hover:ring-4 hover:ring-teal-300 hover:ring-offset-4">
                            <p>
                                <Icon name="carbon:store" size="44" />
                            </p>         
                            <div>
                                <p class="text-base">
                                Menu Transaksi
                                </p>
                                <p class="text-lg font-semibold tracking-wide">
                                    Toko atau Gudang
                                </p>
                            </div>
                        </div>
                    </nuxt-link>

                    <nuxt-link :to="`transaksi/${uniqueSuffix}`">
                        <div class=" flex items-center gap-x-4 w-72 px-3 py-6 rounded-lg bg-indigo-200 bg-opacity-30 text-indigo-700 transition ease-in-out hover:bg-opacity-50 cursor-pointer hover:outline-none hover:ring-4 hover:ring-indigo-300 hover:ring-offset-4">
                            <p>
                                <Icon name="carbon:delivery" size="46" />
                            </p>         
                            <div>
                                <p class="text-base">
                                Menu Transaksi
                                </p>
                                <p class="text-lg font-semibold tracking-wide">
                                    Supplier
                                </p>
                            </div>
                        </div>
                    </nuxt-link>
                    
                    <nuxt-link to="dashboard">
                        <div class=" flex items-center gap-x-4 w-72 px-3 py-6 rounded-lg bg-amber-200 bg-opacity-30 text-amber-700 transition ease-in-out hover:bg-opacity-50 cursor-pointer hover:outline-none hover:ring-4 hover:ring-amber-300 hover:ring-offset-4">
                            <p>
                                <Icon name="carbon:cloud-monitoring" size="44" />
                            </p>         
                            <div>
                                <p class="text-base">
                                Menu Administrasi
                                </p>
                                <p class="text-lg font-semibold tracking-wide">
                                    Master Data
                                </p>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { v4 as uuidv4 } from 'uuid';
    
    definePageMeta({
    layout: "index-layout",
    });

    const uniqueSuffix = 'trx' + Date.now() + uuidv4()

    console.log(uniqueSuffix)

    const urlHostApi = 'http://localhost:8000/'

    // ref for setting page
    const loadingOverlay = ref(false)

    // mounted first data
    onMounted( async () => {
        loadingOverlay.value = true
        setTimeout(() => loadingOverlay.value = false, 500)
    })

</script>

<style lang="scss" scoped>

</style>