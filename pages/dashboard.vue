<template>
    <div class="md:ml-64 px-10 text-gray-700">
        <!-- loading overlay -->
        <Loading v-if="loadingOverlay == true"/>

        <!-- top bar -->
        <div class="flex items-center justify-between py-7" >
            <div>
                <h1 class="text-2xl font-semibold leading-relaxed text-gray-800 ">
                    {{ headMenu?.name }}
                </h1>
                <p class="text-sm font-medium text-gray-500 ">
                    {{ headMenu?.keterangan }}
                </p>
            </div>
        </div>

        <!-- general information -->

        <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8 justify-between pb-5">

            <div class="flex flex-col justify-between h-40 px-4 py-3 border-2 rounded-lg transition ease-in-out hover:border-red-500">
                <div class="flex items-start justify-between">
                    <p class="text-sm font-semibold text-red-500">
                        <Icon name="carbon:shopping-cart-minus" size="28" />
                    </p>
                
                    <p class="text-xs text-gray-500">
                        <span class="text-xs py-1 pl-2 pr-3 font-semibold rounded-md bg-red-200 bg-opacity-30 text-red-700"  >
                            Stok &lt; 10 Pcs
                        </span>
                    </p>
                </div>
                <div>
                    <h3 class="text-4xl font-semibold pb-2 text-red-500">
                        {{ minStok }}
                    </h3>
                    <p class="text-base tracking-wide text-gray-500">
                        Produk stok minimum
                    </p>
                </div>
            </div>

            <div class="flex flex-col justify-between h-40 px-4 py-3 border-2 rounded-lg transition ease-in-out hover:border-teal-500">
                <div class="flex items-start justify-between">
                    <p class="text-sm font-semibold text-teal-500">
                        <Icon name="carbon:shopping-cart-plus" size="24" />
                    </p>
                
                    <p class="text-xs text-gray-500">
                        <span class="text-xs py-1 pl-2 pr-3 font-semibold rounded-md bg-teal-200 bg-opacity-30 text-teal-700"  >
                            Stok &gt;= 10 Pcs
                        </span>
                    </p>
                </div>
                <div>
                    <h3 class="text-4xl font-semibold pb-2 text-teal-500">
                        {{ safeStok }}
                    </h3>
                    <p class="text-base tracking-wide text-gray-500">
                        Produk stok aman
                    </p>
                </div>
            </div>
            <div class="flex flex-col justify-between h-40 px-4 py-3 border-2 rounded-lg transition ease-in-out hover:border-indigo-500">
                <div class="flex items-start justify-between">
                    <p class="text-sm font-semibold text-indigo-500">
                        <Icon name="carbon:data-center" size="28" />
                    </p>
                
                    <p class="text-xs text-gray-500">
                        <span class="text-xs py-1 pl-2 pr-3 font-semibold rounded-md bg-indigo-200 bg-opacity-30 text-indigo-700"  >
                            All Produk
                        </span>
                    </p>
                </div>
                <div>
                    <h3 class="text-4xl font-semibold pb-2 text-indigo-600">
                        {{ totalData }}
                    </h3>
                    <p class="text-base tracking-wide text-gray-500">
                        Total Produk tersedia
                    </p>
                </div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
            <!-- table -->
            <div class="col-span-2 col-start-1 overflow-auto">
                <div  class="flex flex-col">
                    <h3 class="text-base font-semibold tracking-wide">
                        5 Produk ter-update
                    </h3>
                    <span class="w-10 pb-1 mb-2 border-b-2 border-yellow-500"></span>
                </div>
                <table class="w-full bg-gray-100">
                    <thead>
                        <tr class="text-xs font-medium border-b-4 border-gray-50 bg-gray-200">
                            <td class="py-5 px-4 font-semibold whitespace-nowrap">KETERANGAN PRODUK</td>
                            <td class="w-40 py-5  px-4 font-semibold text-center whitespace-nowrap">HARGA (Rp.)</td>
                            <td class="w-40 py-5  px-4 font-semibold text-center whitespace-nowrap">STOK</td>
                            <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">LAST UPDATE</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in products.slice(0, 5)" :key="index" class="border-b-4 border-stone-50">
                            <td class="flex gap-x-4 items-center px-4 py-2 whitespace-nowrap">
                                <nuxt-img :src="item.foto != '' ? urlHostApi + item.foto : '/img/placeholder.jpg'" alt="" class="w-8 aspect-[2/3] rounded-lg object-cover object-center " loading="lazy"/>
                                <div>
                                    <div>
                                        <span class="text-xs py-0.5 px-2 font-semibold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">
                                            {{ item.kode_produk }}
                                        </span>
                                    </div>
                                    <span class="text-sm font-semibold">
                                    {{ item.nama_produk }}
                                    </span>
    
                                </div>
                            </td>
                            <td class="text-sm px-4 py-2 whitespace-nowrap text-center">
                                <ClientOnly>
                                    {{new Intl.NumberFormat().format(item.harga_baru)}}
                                </ClientOnly>
                                <!-- {{ Number(item.harga).toLocaleString() }} -->
                                <!-- {{ item.harga }} -->
                            </td>
                            <td class="px-4 py-2 whitespace-nowrap text-center">
                                <span class="text-sm py-1 px-3 font-semibold rounded-md" :class="item.stok_baru < 10 ? 'bg-red-200 bg-opacity-30 text-red-700' : 'bg-teal-200 bg-opacity-30 text-teal-700'" >
                                    {{ item.stok_baru }}
                                </span>
                            </td>
                            <td class="px-4 py-2 whitespace-nowrap text-center">
                                <span class="text-xs py-1 px-3 font-semibold rounded-md bg-gray-800 text-white" >
                                    <ClientOnly>
                                        {{ new Date(item.updatedAt).toLocaleString('id-ID') }}
                                    </ClientOnly>
                                </span>
                            </td>
                            
                        </tr>
                    </tbody>  
                </table>
                <div v-if="products.length == 0" colspan="5" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
                    <span class="font-medium"><Icon name="carbon:warning-hex-filled" size="24" /></span>
                    <span class="font-medium">Data tidak ditemukan </span>
                </div>  
    
            </div>

            <div class="">
                <div  class="flex flex-col">
                    <h3 class="text-base font-semibold tracking-wide">
                        5 Transaksi supplier terakhir
                    </h3>
                    <span class="w-10 pb-1 mb-2 border-b-2 border-yellow-500"></span>
                    <div class="flex flex-col gap-y-1">
                        <div v-for="(item, index) in transaksi.slice(0, 5)" :key="index" class="flex flex-col justify-between h-30 px-3 py-3 border-2 rounded-lg transition ease-in-out hover:border-teal-500">
                            <div class="flex items-center justify-between">
                                <p class="text-xs font-semibold">
                                    {{ item.supplier.nama_supplier }}
                                    
                                </p>
                                <p class="text-xs text-gray-500">
                                    <span class="text-xs py-1 pl-2 pr-3 font-semibold rounded-md bg-teal-200 bg-opacity-30 text-teal-700"  >
                                        {{ item.kode_transaksi }}
                                    </span>
                                </p>
                            </div>
                            
                            <div class="flex gap-x-4 pt-3">
                                <p class="text-sm font-semibold pr-4 border-r-2">
                                    {{ item.detail.trx_produk.length }} Produk
                                </p>
                                <p class="text-sm" >
                                    Total :
                                        <span class="font-semibold">
                                            <ClientOnly>
                                                Rp. {{new Intl.NumberFormat().format(item.total)}};-
                                            </ClientOnly>
                                        </span>
                                </p>
                            </div>
                            <div class="pt-3">
                                <span class="text-xs py-1 px-2 font-semibold rounded-md bg-gray-800 text-white" >
                                    <ClientOnly>
                                        {{ new Date(item.createdAt).toLocaleString('id-ID') }}
                                    </ClientOnly>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- collection of modals -->


    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';

    // ref data from pinia store in composable
    const storeProduct = useProductStore()
    const storeCategory = useCategoryStore()

    const { 
        products,
        id,
        kode_produk,
        nama_produk,
        kategori_produk,
        harga_baru,
        harga_lama,
        stok_baru,
        stok_lama,
        foto,
        createdAt,
        updatedAt
    } = storeToRefs(storeProduct)

    const {
        categories,
        kode_kategori,
        nama_kategori
    } = storeToRefs(storeCategory)

    // store transaction
   const storeTransaction = useTransactionStore()

    const { 
        transaksi,
        detail_transaksi,
        detail_transaksi_temp,
        id_transaksi,
        kode_transaksi,
        detail,
        supplier,
        total,
        catatan,
        kode_detail_trx,
        trx_produk,
        trx_kode,
        trx_nama,
        trx_harga,
        trx_jumlah,
        trx_subtotal,
        total_trx,
        kode_key_temp,
        kode_detail_temp,
        produk,
        harga_tmp,
        jumlah_tmp,
        subtotal_tmp,
        createdAtTrx,
        updatedAtTrx,
    } = storeToRefs(storeTransaction)

    
    // top bar setting
    const route = useRoute()
    const storeMenu = useMenuStore()
    const { menu } = storeToRefs(storeMenu)

    const headMenu =  computed(() => { return menu.value.find(v => v.pathName == route.name)} )

    // default API url set
    const urlHostApi = 'http://167.99.28.7:8000/'

    // ref for setting page
    const loadingOverlay = ref(false)

    const totalData = ref(0);
    const totalDataTrx = ref(0);
    const minStok = ref(0);
    const safeStok = ref(0);
    

    // mounted first data
    onMounted( async () => {
        loadingOverlay.value = true
        await fecthProduct()
        await fecthCategory()
        await fecthAllTransaction()
    })

    // fetching data
    const fecthProduct = async () => {
        await axios.post( `${urlHostApi}bengkel-api/api/produk/dashboard`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            products.value = res.data.data
            totalData.value = parseInt(res.data.total_data)

            const watchMinStok =  products.value.filter(f => parseInt(f.stok_baru) < 10)
            const watchSafeStok =  products.value.filter(f => parseInt(f.stok_baru) >= 10)
            minStok.value = watchMinStok.length
            safeStok.value = watchSafeStok.length

            setTimeout(() => loadingOverlay.value = false, 500)
            
            // console.log('first load data',{
            //     'per' : perPage.value,
            //     'page' : currentPage.value,
            //     'pages' : pages.value,
            //     'total' : totalData.value,
            //     'search' : searchField.value,
            // })
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data.",
                msg : `error fetch products process`
            })
        });
    }

    const fecthCategory = async () => {
        await axios.post( `${urlHostApi}bengkel-api/api/kategori/daftar`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            categories.value = res.data.data

            setTimeout(() => loadingOverlay.value = false, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data category.",
                msg : `error fetch categories process`
            })
        });
    }

    // fetching data
    const fecthAllTransaction = async () => {
        await axios.post( `${urlHostApi}bengkel-api/api/transaksi/all`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            transaksi.value = res.data.data
            totalDataTrx.value = parseInt(res.data.total_data)
            setTimeout(() => loadingOverlay.value = false, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data.",
                msg : `error fetch transaksi process`
            })
        });
    }

    
    
</script>

<style scoped>
</style>