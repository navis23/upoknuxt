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
            <TButton v-if="headMenu?.name != 'Dashboard'" @click="openModalAdd()">
                <Icon name="carbon:add-alt" size="24" />
                <span class="text-sm font-semibold">
                    Tambah {{ headMenu?.name }}
                </span>
            </TButton>
        </div>
        
        <!-- filter and search -->
        <div class="flex gap-x-2 h-18 items-center rounded-lg bg-gray-800">
            <div class="w-52 flex justify-center items-center">
                <button @click="searchData(1, totalData, searchField)" class="flex gap-x-2 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                    <Icon name="carbon:search-locate" size="20" />
                    <span class="text-sm font-medium">Cari Kategori</span>
                    <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                </button>
            </div>
            <div class="w-full flex items-center">
                <FormKit
                type="search"
                placeholder="Cari berdasarkan nama kategori disini . . . "
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
            <table class="w-full">
                <thead>
                    <tr class="text-sm font-medium border-b border-gray-200">
                        <td class="py-5 font-semibold whitespace-nowrap">KODE KATEGORI</td>
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">NAMA KATEGORI</td>
                        
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">ACTION</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in categories" :key="index" class="border-b">
                        
                        <td class="py-4 whitespace-nowrap">
                            <span class="text-xs py-1 px-2 font-semibold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">
                                {{ item.kode_kategori }}
                            </span>
                            <!-- {{ Number(item.harga).toLocaleString() }} -->
                            <!-- {{ item.harga }} -->
                        </td>
                        
                        <td class="p-4 whitespace-nowrap">
                            {{ item.nama_kategori }}
                        </td>

                        <td class="p-4 whitespace-nowrap text-center">
                            <div class="flex gap-x-2 justify-center">
                                <button @click="openModalEdit(item)" class="py-2 px-2 font-semibold rounded-md bg-yellow-200 bg-opacity-30 text-yellow-700 hover:bg-opacity-60">
                                    <Icon name="carbon:edit" size="24" />
                                </button>
                                <!-- delete dimatikan karena berpengaruh ke key pada table product -->
                                <!-- <button @click="openModalDelete(item)" class="py-2 px-2 font-semibold rounded-md bg-red-200 bg-opacity-30 text-red-700 hover:bg-opacity-60">
                                    <Icon name="carbon:trash-can" size="24" />
                                </button> -->
                            </div>
                        </td>
                        
                    </tr>
                </tbody>  
            </table>
            <div v-if="categories.length == 0" colspan="5" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
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

        <!-- modal for insert & update -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenAdd == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-md px-12 py-8 rounded-lg bg-white text-gray-700">
                    <HeadlessDialogTitle class="pb-3">
                        <h3 v-if="!btnEdit" class="text-xl font-semibold text-sky-600 border-b-2 pb-4">
                            Tambah {{ headMenu?.name }} baru
                        </h3>
                        <h3 v-if="btnEdit" class="text-xl font-semibold text-yellow-600 border-b-2 pb-4">
                            Edit Data {{ headMenu?.name }}
                        </h3>
                    </HeadlessDialogTitle>
                        <div class="grid grid-cols-1 w-full">
                            <FormKit
                                type="text"
                                label="Nama Kategori"
                                placeholder=". . ."
                                validation="required|length:3"
                                v-model="nama_kategori"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"
                            />
                        </div>
                        

                        <div class="flex gap-x-4 justify-end border-t-2 pt-4 mt-3">
                            
                            <TButton class="gray" @click="cancelDataCategory()">
                                <Icon name="carbon:close-outline" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Batal
                                </span>
                            </TButton>

                            <TButton v-if="!btnEdit" @click="saveDataCategory()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Simpan
                                </span>
                            </TButton>

                            <TButton v-if="btnEdit" @click="saveEditCategory()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Edit
                                </span>
                            </TButton>
                            
                        </div>
                        
                    <!-- ... -->
                </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>
        </ClientOnly>

        <!-- modal for delete -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenDelete == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/80" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-md px-12 py-8 rounded-lg bg-stone-100 text-gray-700">
                    <HeadlessDialogTitle class="pb-3">
                        <h3 class="text-xl font-semibold text-red-600 border-b-2 pb-4">
                            Hapus Produk
                        </h3>
                    </HeadlessDialogTitle>
                        <h3 class="text-md font-semibold tracking- pb-3">
                            Apakah anda yakin akan menghapus data ini?
                        </h3>
                        <div class="flex items-center gap-x-4">
                            <div>
                                <div class="pb-2">
                                    <span class="text-xs py-1 px-2 font-semibold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">
                                        {{ kode_kategori }}
                                    </span>
                                </div>
                                <span class="text-base font-semibold tracking-wide">
                                    {{ nama_kategori }}
                                </span>
                            </div>
                        </div>

                        <div class="flex gap-x-2 justify-end border-t-2 pt-4 mt-6">
                            <TButton class="gray" @click="cancelDataCategory()">
                                <Icon name="carbon:close-outline" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Batal
                                </span>
                            </TButton>
                            <TButton class="danger" @click="saveDeleteCategory()">
                                <Icon name="carbon:trash-can" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Hapus
                                </span>
                            </TButton>
                        </div>
                </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>
        </ClientOnly>


    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { stringify } from "querystring";

    // ref data from pinia store in composabl
    const storeCategory = useCategoryStore()

    const {
        categories,
        id,
        kode_kategori,
        nama_kategori
    } = storeToRefs(storeCategory)

    
    // top bar setting
    const route = useRoute()
    const storeMenu = useMenuStore()
    const { menu } = storeToRefs(storeMenu)

    const headMenu =  computed(() => { return menu.value.find(v => v.pathName == route.name)} )

    // default API url set
    const urlHostApi = 'https://permata-api.enterbiner.com/'

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
    const isOpenCategory =ref(false);
    const isOpenDelete = ref(false);
    const errMsg = ref('');
    const btnEdit = ref(false);

    // mounted first data
    onMounted( async () => {
        loadingOverlay.value = true
        await fecthCategory()
    })

    // fetching data
    const fecthCategory = async () => {
        await axios.post( `${urlHostApi}bengkel-api/api/kategori/daftar`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            categories.value = res.data.data
            perPage.value = res.data.limit
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search

            setTimeout(() => loadingOverlay.value = false, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data.",
                msg : `error fetch categories process`
            })
        });
    }
    
    // trigger function to fetch data table paginate and search
    const clickPage = async (page : any, optionPages : any, search : any) => {
        await axios.post( `${urlHostApi}bengkel-api/api/kategori/daftar?page=${page}&limit=${optionPages}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            scrollTop()
            categories.value = res.data.data
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
        await axios.post( `${urlHostApi}bengkel-api/api/kategori/daftar?page=${page}&limit=${total}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            categories.value = res.data.data
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


    const cancelDataCategory = ( async () => {
        await fecthCategory()
        loadingOverlay.value = true
        errMsg.value = "focus"
        setTimeout( () => {
            isOpenAdd.value = false
            isOpenDelete.value = false
            btnEdit.value = false
            kode_kategori.value = ''
            nama_kategori.value = ''
            loadingOverlay.value = false
        }, 300)
    })


    // setting and trigger for CRUD data

    //insert
    const saveDataCategory = ( async () => {
        loadingOverlay.value = true
        await axios.post(`${urlHostApi}bengkel-api/api/kategori/simpan`, {
            nama_kategori : nama_kategori.value,
        }, {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async (res) => {
            await fecthCategory()
            setTimeout( () => {
                isOpenAdd.value = false
                kode_kategori.value = ''
                nama_kategori.value = ''
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
        id.value = item.id
        kode_kategori.value = item.kode_kategori
        nama_kategori.value = item.nama_kategori
        setTimeout(() => {loadingOverlay.value = false, isOpenAdd.value = true}, 300)
    })

    const saveEditCategory = ( async () => {
        loadingOverlay.value = true
        await axios.post(`${urlHostApi}bengkel-api/api/kategori/update`, {
            id : id.value,
            nama_kategori : nama_kategori.value,
        }, {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async (res) => {
            await fecthCategory()
            setTimeout( () => {
                isOpenAdd.value = false
                btnEdit.value = false
                kode_kategori.value = ''
                nama_kategori.value = ''
                loadingOverlay.value = false

            }, 300)
        })
        .catch( err => {
            console.log({error : err.message, msg : `error update process`})
            errMsg.value = "live"
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    })

    //delete
    const openModalDelete = ((item : any) => {
        loadingOverlay.value = true
        id.value = item.id
        kode_kategori.value = item.kode_kategori
        nama_kategori.value = item.nama_kategori
        setTimeout(() => {loadingOverlay.value = false, isOpenDelete.value = true}, 300)
    })

    const saveDeleteCategory = ( async () => {
        loadingOverlay.value = true
        await axios.post(`${urlHostApi}bengkel-api/api/kategori/hapus`, {
            id : id.value
        }, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( async (res) => {
            await fecthCategory()
            setTimeout( () => {
                isOpenDelete.value = false
                kode_kategori.value = ''
                nama_kategori.value = ''
                loadingOverlay.value = false
            }, 300)
        })
        .catch( err => {
            console.log({error : err.message, msg : `error delete process`})
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    })

    



</script>

<style scoped>
</style>