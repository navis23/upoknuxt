<template>
    <div class="pt-16 px-10 text-gray-700">
        <!-- loading overlay -->
        <Loading v-if="loadingOverlay == true"/>

        <!-- top bar -->
        <div class="flex items-center justify-between py-7" >
            <div>
                <h1 class="text-2xl font-semibold leading-relaxed text-gray-800 ">
                    Transaksi Produk di Toko / Gudang
                </h1>
                <p class="text-sm font-medium text-gray-500 ">
                    Menu untuk melakukan update cepat pada stok & harga produk
                </p>
            </div>
        </div>
        
        <!-- filter and search -->
        <div class="flex gap-x-2 h-18 items-center rounded-lg bg-gray-800">
            <div class="w-52 flex justify-center items-center">
                <button @click="searchData(1, totalData, searchField)" class="flex gap-x-2 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                    <Icon name="carbon:search-locate" size="20" />
                    <span class="text-sm font-medium">Cari Produk</span>
                    <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                </button>
            </div>
            <div class="w-full flex items-center">
                <FormKit
                type="search"
                placeholder="Cari berdasarkan nama produk disini . . . "
                v-model="searchField" 
                @keydown.enter="searchData(1, totalData, searchField)" 
                @keydown.tab="searchData(1, totalData, searchField)"
                @blur="searchData(1, totalData, searchField)"
                :classes = "{
                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center w-full focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded',
                    outer :'$reset w-full pr-6 pl-3 formkit-outer formkit-disabled:opacity-50',
                    input : '$reset formkit-input appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-none text-base text-gray-100 placeholder-gray-400'
                }"
            />
            </div>
            
        </div>

        <!-- table -->
        <div class="overflow-auto py-6">
            <table class="w-full bg-gray-100">
                <thead>
                    <tr class="text-sm font-medium border-b-4 border-gray-50 bg-gray-200">
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">KETERANGAN PRODUK</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">HARGA</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">SISA STOK</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">LAST UPDATE</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">ACTION</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in products" :key="index" class="border-b-4 border-stone-50">
                        <td class="min-w-64 flex gap-x-4 items-center py-2 px-4 whitespace-nowrap">
                            <nuxt-img :src="item.foto != '' ? urlHostApi + item.foto : '/img/placeholder.jpg'" alt="" class="w-14 aspect-[2/3] rounded-lg object-cover object-center " loading="lazy"/>
                            <div>
                                <div class="pb-2">
                                    <span class="text-xs py-1 px-2 font-semibold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">
                                        {{ item.kode_produk }}
                                    </span>
                                </div>
                                <span class="text-base font-semibold tracking-wide">
                                {{ item.nama_produk }}
                                </span>
                                
                            </div>
                        </td>
                        
                        <td class="py-2 px-4 whitespace-nowrap text-center">
                            <p class="text-lg">
                                <ClientOnly>
                                    {{new Intl.NumberFormat().format(item.harga_baru)}}
                                </ClientOnly>
                            </p>
                            <p class="text-xs border-t-2 text-gray-500 pt-1 mt-3">
                                Harga lama :
                                <ClientOnly>
                                    {{new Intl.NumberFormat().format(item.harga_lama)}}
                                </ClientOnly>
                            </p>
                        </td>
                        
                        <td class="py-2 px-4 whitespace-nowrap text-center">
                            <span class="text-xl py-1 px-3 font-semibold rounded-md" :class="item.stok_baru < 10 ? 'bg-red-200 bg-opacity-30 text-red-700' : 'bg-teal-200 bg-opacity-30 text-teal-700'" >
                                {{ item.stok_baru }}
                            </span>
                            <p class="text-xs border-t-2 text-gray-500 pt-1 mt-3">
                                Stok lama : {{ item.stok_lama }}
                            </p>
                        </td>

                        <td class="py-2 px-4 whitespace-nowrap text-center">
                            <span class="text-xs py-1 px-3 font-semibold rounded-md bg-gray-800 text-white" >
                                <ClientOnly>
                                    {{ new Date(item.updatedAt).toLocaleString('id-ID') }}
                                </ClientOnly>
                            </span>
                        </td>

                        <td class="py-2 px-4 whitespace-nowrap text-center">
                            <div class="flex flex-col gap-2 items-center justify-center">
                                <button @click="openModalEdit(item)" class="w-36 flex gap-x-1 py-2 pl-3 pr-4 text-sm font-semibold rounded-md bg-yellow-200 bg-opacity-30 text-yellow-700 hover:bg-opacity-60">
                                    <Icon name="carbon:update-now" size="20" />
                                    <span>Update Stok</span>
                                </button>
                                <button @click="openModalEditPrice(item)" class="w-36 flex gap-x-1 py-2 pl-3 pr-4 text-sm font-semibold rounded-md bg-sky-200 bg-opacity-30 text-sky-700 hover:bg-opacity-60">
                                    <Icon name="carbon:update-now" size="20" />
                                    <span>Update Harga</span>
                                </button>
                                
                            </div>
                        </td>
                        
                    </tr>
                </tbody>  
            </table>
            <div v-if="products.length == 0" colspan="5" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
                <span class="font-medium"><Icon name="carbon:warning-hex-filled" size="24" /></span>
                <span class="font-medium">Data tidak ditemukan </span>
            </div>  

            <div class="flex justify-between items-start pt-4 pb-2">
                <div class="flex items-center">
                    <p class="text-sm">
                        <span class="font-semibold text-sky-600  ">{{ currentPage }}</span> / {{ pages }} pages <span class="text-white bg-gray-800 rounded-lg text-xs font-semibold px-2 py-1 "> {{ totalData }} data </span>
                    </p>
                </div>
                <FormKit
                    v-model="optionPages"
                    @change="clickPage(1, optionPages, searchField)"
                    type="select"
                    :classes="{
                        inner : '$reset formkit-inner border formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex  items-center rounded-lg'
                    }"
                    :options="[
                        { label: '10', value: 10, },
                        { label: '25', value: 25, },
                        { label: '50', value: 50, },    
                        { label: '75', value: 75 },
                        { label: '100', value: 100, }
                    ]"
                />
            </div>

            <div class="flex gap-x-3 justify-center">
                <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600"  @click="clickPage(1, optionPages, searchField)">
                    <Icon name="carbon:chevron-left" size="28" />
                </button>
                <button v-for="page in displayPages" class="flex items-center justify-center w-8 h-8 font-medium rounded-full" :class="page == currentPage ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-sky-600'" @click="clickPage(page, optionPages, searchField)">
                    {{ page }}
                </button>
                <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600" @click="clickPage(pages, optionPages, searchField)">
                    <Icon name="carbon:chevron-right" size="28" />
                </button>
            </div>

            
        </div>

        <!-- collection of modals -->

        <!-- update stok -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenAdd == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-lg px-12 py-8 rounded-lg bg-white text-gray-700" :class="minusSum ? 'border-2 border-red-500' : ''">
                    <HeadlessDialogTitle class="pb-3">
                        <h3 class="text-xl font-semibold text-yellow-600 border-b-2 pb-4">
                            Edit Data Stok Produk
                        </h3>
                    </HeadlessDialogTitle>
                        <div class="grid grid-cols-1 w-full">
                            <div class="py-3">
                                <div class="flex gap-x-3 col-span-2 col-start-2 border-2 p-2 rounded-lg bg-stone-100 items-center mb-3">
                                    <span class="text-xs py-1 px-3 font-semibold rounded-md bg-gray-700 text-white" >
                                        {{ kode_produk }}
                                    </span>
                                    <h3 class="font-semibold tracking-wide text-xs uppercase">
                                        {{ nama_produk }}
                                    </h3>
                                </div>
                                <div class="flex gap-x-3 col-span-2 col-start-2 border-2 p-2 rounded-lg bg-stone-100 items-center mb-3">
                                    Stok tersedia saat ini : 
                                    <span class="text-lg py-1 px-3 font-semibold rounded-md" :class="parseInt(stok_baru) < 10 ? 'bg-red-200 bg-opacity-30 text-red-700' : 'bg-teal-200 bg-opacity-30 text-teal-700'" >
                                        {{ stok_baru }}
                                    </span>
                                </div>
                            </div>
                            <FormKit
                                v-if="!returSum"
                                type="number"
                                label="Jumlah Stok Diambil"
                                placeholder=". . ."
                                validation="required|number"
                                v-model="stokPlanUpdate"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"

                            />
                            <FormKit
                                v-if="returSum"
                                type="number"
                                label="Jumlah Stok Dikembalikan / Retur"
                                placeholder=". . ."
                                validation="required|number"
                                v-model="stokPlanRetur"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"

                            />
                            <div class="pb-3">
                                <p v-if="minusSum" class="flex items-center gap-x-1 text-xs font-semibold text-red-500 pr-6">
                                    <p>
                                        <Icon name="carbon:warning-hex" size="20" />
                                    </p>
                                    <p>
                                        Stok diambil tidah boleh lebih dari stok tersedia
                                    </p>
                                </p>
                                <div v-if="!returSum" class="flex gap-x-2 items-center justify-start border-t-2 pt-4 mt-3">
                                    <p class="text-xs font-semibold">
                                        Ada barang retur?
                                    </p>
                                    <button  class="flex gap-x-1 py-2 pl-3 pr-4 text-sm font-semibold rounded-md bg-yellow-200 bg-opacity-30 text-yellow-700 hover:bg-opacity-60" @click="openRetur()">
                                        <Icon name="carbon:rotate-360" size="18" />
                                        <span class="text-xs font-semibold tracking-wide ">
                                            Kembalikan Stok
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex gap-x-4 justify-end border-t-2 pt-4 mt-3">
                            <TButton class="gray" @click="cancelDataProduct()">
                                <Icon name="carbon:close-outline" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Batal
                                </span>
                            </TButton>

                            <TButton class="darkness" v-if="stokPlanRetur == '' && stokPlanUpdate == ''" disabled>
                                <Icon name="carbon:warning" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Input data dahulu
                                </span>
                            </TButton>
                            <TButton v-if="stokPlanRetur != '' || stokPlanUpdate != ''" @click="saveEditProduct()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Simpan Update
                                </span>
                            </TButton>
                            
                        </div>
                        
                    <!-- ... -->
                </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>
        </ClientOnly>

        <!-- update harga -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenAddPrice == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-lg px-12 py-8 rounded-lg bg-white text-gray-700">
                    <HeadlessDialogTitle class="pb-3">
                        <h3 class="text-xl font-semibold text-yellow-600 border-b-2 pb-4">
                            Edit Harga Produk
                        </h3>
                    </HeadlessDialogTitle>
                        <div class="py-3">
                            <div class="flex gap-x-3 col-span-2 col-start-2 border-2 p-2 rounded-lg bg-stone-100 items-center mb-3">
                                <span class="text-xs py-1 px-3 font-semibold rounded-md bg-gray-700 text-white" >
                                    {{ kode_produk }}
                                </span>
                                <h3 class="font-semibold tracking-wide text-xs uppercase">
                                    {{ nama_produk }}
                                </h3>
                            </div>
                            <div class="flex gap-x-3 col-span-2 col-start-2 border-2 p-2 rounded-lg bg-stone-100 items-center mb-3">
                                Harga saat ini : 
                                <span class="text-base py-1 px-3 font-semibold rounded-md"  >
                                    Rp. {{new Intl.NumberFormat().format(parseInt(harga_baru))}};-
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 w-full">
                            <FormKit
                                type="number"
                                label="Harga Baru Produk"
                                placeholder=". . ."
                                validation="required|number"
                                v-model="hargaPlanUpdate"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"

                            />
                        </div>
                        
                        <div class="flex gap-x-4 justify-end border-t-2 pt-4 mt-3">
                            <TButton class="gray" @click="cancelDataProduct()">
                                <Icon name="carbon:close-outline" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Batal
                                </span>
                            </TButton>

                            <TButton class="darkness" v-if="hargaPlanUpdate == ''" disabled>
                                <Icon name="carbon:warning" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Input data dahulu
                                </span>
                            </TButton>

                            <TButton v-if="hargaPlanUpdate != ''" @click="saveEditProduct()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Simpan Update
                                </span>
                            </TButton>
                            
                        </div>
                        
                    <!-- ... -->
                </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>
        </ClientOnly>

    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
import { e } from 'ofetch/dist/error-04138797';
    import { stringify } from "querystring";

    definePageMeta({
    layout: "transaction-layout",
    });

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

    
    // top bar setting
    const route = useRoute()
    const storeMenu = useMenuStore()
    const { menu } = storeToRefs(storeMenu)

    const headMenu =  computed(() => { return menu.value.find(v => v.pathName == route.name)} )

    // default API url set
    const urlHostApi = 'http://167.99.28.7:8000/'

    // ref for setting page
    const loadingOverlay = ref(false)
    const searchField = ref('');
    const perPage = ref(0);
    const currentPage = ref(0);
    const pages = ref(0);
    const totalData = ref(0);
    const optionPages = ref(10);
    const numShown = ref(5)
    const isOpenAdd = ref(false);
    const isOpenAddPrice = ref(false);
    const isOpenCategory =ref(false);
    const isOpenDelete = ref(false);
    const isOpenDetail = ref(false);
    const file1 = ref();
    const errMsg = ref('');
    const btnEdit = ref(false);
    const imgEdit = ref(false);
    const convertCreatedDate = ref()
    const convertUpdatedDate = ref()
    const priceGap = ref()
    const stokGap = ref()
    const stokPlanUpdate = ref('')
    const hargaPlanUpdate = ref('')
    const stokPlanRetur = ref('')
    const stokUpdated = ref('')
    const hargaUpdated = ref('')
    const minusSum = ref(false)
    const returSum = ref(false)
    const disabledBtn = ref(false)

    // mounted first data
    onMounted( async () => {
        loadingOverlay.value = true
        await fecthProduct()
        await fecthCategory()
    })

    // fetching data
    const fecthProduct = async () => {
        await axios.post( `${urlHostApi}bengkel-api/api/produk/daftar`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            products.value = res.data.data
            perPage.value = res.data.limit
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search

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
    
    
    // trigger function to fetch data table paginate and search
    const clickPage = async (page : any, optionPages : any, search : any) => {
        await axios.post( `${urlHostApi}bengkel-api/api/produk/daftar?page=${page}&limit=${optionPages}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            scrollTop()
            products.value = res.data.data
            perPage.value = res.data.limit
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data."
            })
        });
    }

    const searchData = async  ( page = 1, total : any, search : any) => {
        if(search == '') page = 1, total = 10, optionPages.value = 10
        await axios.post( `${urlHostApi}bengkel-api/api/produk/daftar?page=${page}&limit=${total}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            products.value = res.data.data
            perPage.value = parseInt(res.data.limit)
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search
            optionPages.value = 10
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data."
            })
        });
    }

    // setting for paginate function
    const scrollTop = () => {
        let currentScroll = document.documentElement.scrollTop
        let int = setInterval(frame, 6)

        function frame() {
            if(0 > currentScroll)
                clearInterval(int)
            else {
                currentScroll = currentScroll - 12
                document.documentElement.scrollTop = currentScroll
            }
        }
    }

    const displayPages = computed (() => {
        const showNumber = Math.min(numShown.value, pages.value);
        let first = currentPage.value - Math.floor(showNumber / 2);
        first = Math.max(first, 1);
        first = Math.min(first, pages.value - showNumber + 1);
        return [...Array(showNumber)].map((k,i) => i + first);
    })

    // setting for modal function
    function openModalAdd() {
        loadingOverlay.value = true
        setTimeout(() => {loadingOverlay.value = false, isOpenAdd.value = true}, 300)
    }

    const cancelDataProduct = ( async () => {
        await fecthProduct()
        loadingOverlay.value = true
        errMsg.value = "focus"
        setTimeout( () => {
            isOpenAdd.value = false
            isOpenAddPrice.value = false
            isOpenDelete.value = false
            isOpenDetail.value = false
            btnEdit.value = false
            imgEdit.value = false
            nama_produk.value = ''
            harga_baru.value = ''
            harga_lama.value = ''
            stok_baru.value = ''
            stok_lama.value = ''
            kategori_produk.value = ''
            foto.value = ''
            kode_kategori.value = ''
            nama_kategori.value = ''
            createdAt.value = ''
            updatedAt.value = ''
            convertCreatedDate.value = ''
            convertUpdatedDate.value = ''
            loadingOverlay.value = false
            stokPlanUpdate.value = ''
            hargaPlanUpdate.value = ''
            stokPlanRetur.value = ''
            stokUpdated.value = ''
            hargaUpdated.value = ''
            minusSum.value = false
            returSum.value = false
        }, 300)
    })

    // setting and trigger for CRUD data

    //insert
    const saveDataProduct = ( async () => {
        loadingOverlay.value = true
        await axios.post(`${urlHostApi}bengkel-api/api/produk/simpan`, {
            nama_produk : nama_produk.value,
            harga_baru : harga_baru.value,
            harga_lama : 0,
            stok_baru : stok_baru.value,
            stok_lama : 0,
            kategori_produk : kategori_produk.value,
            foto : foto.value
        }, {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async (res) => {
            await fecthProduct()
            setTimeout( () => {
                isOpenAdd.value = false
                nama_produk.value = ''
                harga_baru.value = ''
                harga_lama.value = ''
                stok_baru.value = ''
                stok_lama.value = ''
                kategori_produk.value = ''
                foto.value = ''
                kode_kategori.value = ''
                nama_kategori.value = ''
                createdAt.value = ''
                updatedAt.value = ''
                convertCreatedDate.value = ''
                convertUpdatedDate.value = ''
                loadingOverlay.value = false
            }, 300)
        })
        .catch( err => {
            console.log({error : err.message, msg : `error insert process`})
            errMsg.value = "live"
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    })

    //update 
    const openModalEdit = ((item : any) => {
        loadingOverlay.value = true
        btnEdit.value = true
        imgEdit.value = true
        id.value = item.id
        kode_produk.value = item.kode_produk 
        nama_produk.value = item.nama_produk 
        harga_baru.value = item.harga_baru
        harga_lama.value = item.harga_lama
        stok_baru.value = item.stok_baru
        stok_lama.value = item.stok_lama
        kategori_produk.value = item.kategori_produk != null ? item.kategori_produk._id : ''
        foto.value = item.foto
        kode_kategori.value =  item.kategori_produk != null ? item.kategori_produk.kode_kategori : ''
        nama_kategori.value =  item.kategori_produk != null ? item.kategori_produk.nama_kategori : ''
        setTimeout(() => {loadingOverlay.value = false, isOpenAdd.value = true}, 300)
    })

    const openModalEditPrice = ((item : any) => {
        loadingOverlay.value = true
        btnEdit.value = true
        imgEdit.value = true
        id.value = item.id
        kode_produk.value = item.kode_produk 
        nama_produk.value = item.nama_produk 
        harga_baru.value = item.harga_baru
        harga_lama.value = item.harga_lama
        stok_baru.value = item.stok_baru
        stok_lama.value = item.stok_lama
        kategori_produk.value = item.kategori_produk != null ? item.kategori_produk._id : ''
        foto.value = item.foto
        kode_kategori.value =  item.kategori_produk != null ? item.kategori_produk.kode_kategori : ''
        nama_kategori.value =  item.kategori_produk != null ? item.kategori_produk.nama_kategori : ''
        setTimeout(() => {loadingOverlay.value = false, isOpenAddPrice.value = true}, 300)
    })

    const saveEditProduct = ( async () => {
        loadingOverlay.value = true

        await axios.post(`${urlHostApi}bengkel-api/api/produk/detail`, {
            id : id.value,
        }, {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async (r) => {
            const baseCount = 0
            if(stokPlanUpdate.value === '') stokPlanUpdate.value = baseCount.toString()
            if(hargaPlanUpdate.value === '') hargaPlanUpdate.value = baseCount.toString()

            if(hargaPlanUpdate.value === '0' || 0) {
                hargaUpdated.value = r.data.harga_baru
            } else {
                hargaUpdated.value = hargaPlanUpdate.value.toString()
            }
            

            if(parseInt(stokPlanUpdate.value) > parseInt(stok_baru.value)) {
                minusSum.value = true
                
                setTimeout( async () => {
                    loadingOverlay.value = false
                    setTimeout( async () => {
                        minusSum.value = false
                    }, 3000)
                }, 500)
            } else {
                if(returSum.value == true) {
                    if(stokPlanRetur.value === '') stokPlanRetur.value = baseCount.toString()
                    stokUpdated.value = (parseInt(stok_baru.value) + parseInt(stokPlanRetur.value)).toString()
                } else {
                    stokUpdated.value = (parseInt(stok_baru.value) - parseInt(stokPlanUpdate.value)).toString()
                }
                if(hargaUpdated.value != r.data.harga_baru) harga_lama.value = r.data.harga_baru
                    // console.log({
                    //     new : harga_baru.value,
                    //     old : harga_lama.value
                    // })
                if(stokUpdated.value != r.data.stok_baru) stok_lama.value = r.data.stok_baru
                    // console.log({
                    //     new : parseInt(stokUpdated.value),
                    //     old : stok_lama.value
                    // })
                
                await axios.post(`${urlHostApi}bengkel-api/api/produk/update`, {
                    id : id.value,
                    nama_produk : nama_produk.value,
                    kategori_produk : kategori_produk.value,
                    harga_baru : parseInt(hargaUpdated.value),
                    harga_lama : harga_lama.value,
                    stok_baru : parseInt(stokUpdated.value),
                    stok_lama : stok_lama.value,
                    foto : foto.value
                }, {
                    headers: {
                            "Content-Type": "multipart/form-data",
                            "Access-Control-Allow-Origin": "*"
                    }
                })
                .then( async (res) => {
                    // console.log({system : res.data.message, pesan : 'data terupdate'})
                    await fecthProduct()
    
                    setTimeout( () => {
                        isOpenAdd.value = false
                        isOpenAddPrice.value = false
                        btnEdit.value = false
                        imgEdit.value = false
                        stokUpdated.value = ''
                        hargaUpdated.value = ''
                        stokPlanUpdate.value = ''
                        hargaPlanUpdate.value = ''
                        stokPlanRetur.value = ''
                        nama_produk.value = ''
                        harga_baru.value = ''
                        harga_lama.value = ''
                        stok_baru.value = ''
                        stok_lama.value = ''
                        kategori_produk.value = ''
                        foto.value = ''
                        kode_kategori.value = ''
                        nama_kategori.value = ''
                        createdAt.value = ''
                        updatedAt.value = ''
                        convertCreatedDate.value = ''
                        convertUpdatedDate.value = ''
                        loadingOverlay.value = false
                        minusSum.value = false
                        returSum.value = false
                    }, 300)
                })
                .catch( err => {
                    console.log({error : err.message, msg : `error update process`})
                    errMsg.value = "live"
                    setTimeout( () => {
                        loadingOverlay.value = false
                    }, 300)
                })
            }
            
        })
        .catch( err => {
            console.log({error : err.message, msg : `error update process`})
            errMsg.value = "live"
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    })

    const openRetur = async () => {
        loadingOverlay.value = true
        returSum.value = true
        stokPlanUpdate.value = ''
        setTimeout(() => {loadingOverlay.value = false}, 300)
    }


</script>

<style scoped>
</style>