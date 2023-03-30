<template>
    <div class="md:ml-64 px-10 text-gray-700">
        <!-- loading overlay -->
        <Loading v-if="loadingOverlay == true"/>

        <!-- top bar -->
        <div class="flex items-center justify-between py-7" >
            <div>
                <h1 class="text-2xl font-semibold leading-relaxed text-gray-800 ">
                    {{ headMenu?.name }} Transaksi
                </h1>
                <p class="text-sm font-medium text-gray-500 ">
                    {{ headMenu?.keterangan }}
                </p>
            </div>
        </div>
        
        <!-- filter and search -->
        <!-- for supplier -->
        <!-- <div class="flex gap-x-2 h-18 items-center rounded-lg bg-gray-800">
            <div class="w-64 flex justify-center items-center">
                <button v-if="!btnFilter" @click="trxFiltered()" class="flex gap-x-2 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                    <Icon name="carbon:filter" size="20" />
                    <span class="text-sm font-medium">Filter By Supplier</span>
                    <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                </button>

                <button v-if="btnFilter" @click="backToTrxForm()" class="flex gap-x-2 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                    <Icon name="carbon:filter-remove" size="20" />
                    <span class="text-sm font-medium">Hapus Filter</span>
                    <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                </button>
            </div>
            <div class="flex gap-x-3 px-3 w-full h-full items-center">
                <span class="text-xs py-1 px-3 font-semibold rounded-md bg-stone-50" >
                    {{ kode_supplier }}
                </span>
                <h3 class="font-semibold text-white tracking-wide text-sm uppercase">
                    {{ nama_supplier }}
                </h3>
            </div>
            
        </div> -->

        <div class="flex justify-between items-center border-y-2 mt-4 ">
            <div class="flex gap-x-2 h-18 items-center rounded-lg py-2">
                <div class="w-96 flex justify-center items-center">
                    <button v-if="!btnFilter" class="flex gap-x-2 items-center py-5 px-6 text-gray-700 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                        <Icon name="carbon:filter" size="20" />
                        <span class="text-sm font-medium">Filter By Tanggal</span>
                        <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                    </button>
    
                    <button v-if="btnFilter" @click="deleteFilter()" class="flex gap-x-2 items-center py-5 px-6 text-gray-700 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                        <Icon name="carbon:filter-remove" size="20" />
                        <span class="text-sm font-medium">Hapus Filter</span>
                        <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                    </button>
                </div>
                <div class="w-full flex items-center">
                    <FormKit
                        type="date"
                        v-model="dateFilter" 
                        @keydown.enter="trxFilteredByDate()" 
                        @keydown.tab="trxFilteredByDate()"
                        :classes = "{
                            inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center w-72 focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded',
                            outer :'$reset w-72 pr-6 pl-3 formkit-outer formkit-disabled:opacity-50',
                            input : '$reset formkit-input appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-2 rounded-lg text-base text-gray-700 placeholder-gray-600'
                        }"
                    />
                </div>
            </div>
            <div>
                <TButton @click="trxFilteredToday()">
                    <Icon name="carbon:calendar-heat-map" size="24" />
                    <span class="text-sm font-semibold tracking-wide ">
                        Transaksi Hari ini
                    </span>
                </TButton>
            </div>
        </div>

        <!-- table -->
        <div class="overflow-auto py-6">
            <table class="w-full">
                <thead>
                    <tr class="text-sm font-medium border-b border-gray-200">
                        <td class="py-5 font-semibold whitespace-nowrap">KODE</td>
                        <td class="py-5 px-4 font-semibold whitespace-nowrap">SUPPLIER</td>
                        <td class="py-5 px-4 font-semibold text-right whitespace-nowrap">TRANSAKSI</td>
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">TANGGAL</td>
                        
                        <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">ACTION</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in transaksi" :key="index" class="border-b">
                        
                        <td class="py-4 whitespace-nowrap">
                            <span class="text-xs py-1 px-2 font-semibold bg-sky-200 bg-opacity-30 text-sky-600 rounded-md">
                                {{ item.kode_transaksi }}
                            </span>
                            <!-- {{ Number(item.harga).toLocaleString() }} -->
                            <!-- {{ item.harga }} -->
                        </td>
                        
                        <td class="p-4 text-sm whitespace-nowrap">
                            {{ item.supplier.nama_supplier }}
                        </td>

                        <td class="p-4 text-base text-right whitespace-nowrap">
                            <div class="pb-1 font-semibold">
                                {{ item.detail.trx_produk.length }} Produk
                            </div>
                            <div>
                                Total : 
                                <span class="text-xs py-1 px-3 font-semibold rounded-md bg-gray-800 text-white" >   
                                <ClientOnly>
                                    Rp. {{new Intl.NumberFormat().format(item.total)}};-
                                </ClientOnly>
                            </span>
                            </div>
                        </td>
                        

                        <td class="p-4 text-sm whitespace-nowrap text-center">
                            <span class="text-xs py-1 px-3 font-semibold" >
                                <ClientOnly>
                                    {{ new Date(item.createdAt).toLocaleString('id-ID') }}
                                </ClientOnly>
                            </span>
                        </td>

                        <td class="p-4 whitespace-nowrap text-center">
                            <div class="flex gap-x-2 justify-center">
                                <button @click="detailTransaction(item)" class="flex items-center gap-x-1 py-2 pl-3 pr-4 font-semibold text-sm rounded-md bg-teal-200 bg-opacity-30 text-teal-700 hover:bg-opacity-60">
                                    <Icon name="carbon:cube-view" size="20" />
                                    <span>
                                        Detail Transaksi
                                    </span>
                                </button>
                            </div>
                        </td>
                        
                    </tr>
                </tbody>  
            </table>
            <div v-if="transaksi.length == 0" colspan="5" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
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
                    v-if="!btnFilter"
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

            <div v-if="!btnFilter" class="flex gap-x-3 justify-center">
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

        <!-- modal for choose supplier -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenAddSupplier == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/80" aria-hidden="true" />

                <div class="fixed inset-0 overflow-y-auto">
                    <!-- Full-screen container to center the panel -->
                    <div class="flex min-w-screen items-center justify-center p-4">
                        <!-- The actual dialog panel -->
                        <HeadlessDialogPanel class="w-full max-w-3xl px-12 py-8 rounded-lg bg-stone-100 text-gray-700">
                            <!-- data view suppier -->
                            <div v-if="isOpenAddSupplier" class="bg-stone-100 p-4 border-2 rounded-lg">
                                <div class="flex justify-between items-center pb-6">
                                    <div class="flex gap-x-2 items-center">
                                        <h2 class="text-lg font-bold tracking-wide">Pilih Supplier</h2>
                                        <TButton @click="backToTrxForm()" class="gray">
                                                <Icon name="carbon:reply" size="24" />
                                                <span class="text-sm font-semibold tracking-wide ">
                                                    Kembali
                                                </span>
                                        </TButton>
                                    </div>
                                </div>
                
                                <!-- filter and search -->
                                <div class="flex gap-x-2 h-18 items-center rounded-lg bg-gray-800">
                                    <div class="w-30 flex justify-center items-center">
                                        <button @click="searchDataSupplier(1, totalDataSupplier, searchFieldSupplier)" class="flex gap-x-2 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                                            <Icon name="carbon:search-locate" size="20" />
                                            <span class="text-sm font-medium">Cari</span>
                                            <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                                        </button>
                                    </div>
                                    <div class="w-full flex items-center">
                                        <FormKit
                                        type="search"
                                        placeholder="Cari berdasarkan nama supplier disini . . . "
                                        v-model="searchFieldSupplier" 
                                        @keydown.enter="searchDataSupplier(1, totalDataSupplier, searchFieldSupplier)" 
                                        @keydown.tab="searchDataSupplier(1, totalDataSupplier, searchFieldSupplier)"
                                        @blur="searchDataSupplier(1, totalDataSupplier, searchFieldSupplier)"
                                        :classes = "{
                                            inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center w-full focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded',
                                            outer :'$reset w-full pr-6 pl-3 formkit-outer formkit-disabled:opacity-50',
                                            input : '$reset formkit-input appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-none text-base text-gray-100 placeholder-gray-400'
                                        }"
                                    />
                                    </div>
                                    
                                </div>
                
                                <!-- table -->
                                <div class=" overflow-auto py-3">
                                    <table class="w-full">
                                        <thead>
                                            <tr class="text-xs font-medium border-b border-gray-200">
                                                <td class="py-5 font-semibold whitespace-nowrap">KODE</td>
                                                <td class="py-5 px-4 font-semibold whitespace-nowrap">NAMA SUPPLIER</td>
                                                <td class="py-5 px-4 font-semibold whitespace-nowrap">ALAMAT</td>
                                                <td class="py-5 px-4 font-semibold whitespace-nowrap">NOMOR</td>
                                                
                                                <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">ACTION</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in suppliers" :key="index" class="border-b">
                                                
                                                <td class="py-2 whitespace-nowrap">
                                                    <span class="text-xs py-1 px-2 font-semibold bg-teal-200 bg-opacity-30 text-teal-600 rounded-md">
                                                        {{ item.kode_supplier }}
                                                    </span>
                                                    <!-- {{ Number(item.harga).toLocaleString() }} -->
                                                    <!-- {{ item.harga }} -->
                                                </td>
                                                
                                                <td class="p-2 whitespace-nowrap">
                                                    <p class="text-xs font-semibold">
                                                        {{ item.nama_supplier }}
                                                    </p>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <p class="text-xs">
                                                        {{ item.alamat_supplier }}
                                                    </p>
                                                </td>
                                                <td class="p-2 whitespace-nowrap">
                                                    <p class="text-xs">
                                                        {{ item.nomor_supplier }}
                                                    </p>
                                                </td>
                
                                                <td class="p-2 whitespace-nowrap text-center">
                                                    <div class="flex gap-x-2 justify-center">
                                                        <button @click="chooseSupplier(item)" class="flex items-center gap-x-1 py-2 pl-2 pr-3 font-semibold rounded-md bg-sky-200 bg-opacity-30 text-sky-700 hover:bg-opacity-60">
                                                            <Icon name="carbon:checkmark-filled" size="18" />
                                                            <p class="text-xs">
                                                                Pilih
                                                            </p>
                                                        </button>
                                                    </div>
                                                </td>
                                                
                                            </tr>
                                        </tbody>  
                                    </table>
                                    <div v-if="suppliers.length == 0" colspan="5" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
                                        <span class="font-medium"><Icon name="carbon:warning-hex-filled" size="24" /></span>
                                        <span class="font-medium">Data tidak ditemukan </span>
                                    </div>  
                
                                    <div class="flex justify-between items-start pt-4 pb-2">
                                        <div class="flex items-center">
                                            <p class="text-xs">
                                                <span class="font-semibold text-sky-600  ">{{ currentPageSupplier }}</span> / {{ pagesSupplier }} pages <span class="text-white bg-gray-800 rounded-lg text-xs font-semibold px-2 py-1 "> {{ totalDataSupplier }} data </span>
                                            </p>
                                        </div>
                                        <FormKit
                                            v-model="optionPagesSupplier"
                                            @change="clickPageSupplier(1, optionPagesSupplier, searchFieldSupplier)"
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
                                        <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600"  @click="clickPageSupplier(1, optionPagesSupplier, searchFieldSupplier)">
                                            <Icon name="carbon:chevron-left" size="28" />
                                        </button>
                                        <button v-for="page in displayPagesSupplier" class="flex items-center justify-center w-8 h-8 font-medium rounded-full" :class="page == currentPageSupplier ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-sky-600'" @click="clickPageSupplier(page, optionPagesSupplier, searchFieldSupplier)">
                                            {{ page }}
                                        </button>
                                        <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600" @click="clickPageSupplier(pagesSupplier, optionPagesSupplier, searchFieldSupplier)">
                                            <Icon name="carbon:chevron-right" size="28" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </HeadlessDialogPanel>
                    </div>
                </div>
            </HeadlessDialog>
        </ClientOnly>
        <!-- modal for choose supplier -->

        <ClientOnly>  
            <HeadlessDialog :open="isOpenDetail == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/80" aria-hidden="true" />

                <div class="fixed inset-0 overflow-y-auto">
                    <!-- Full-screen container to center the panel -->
                    <div class="flex min-w-screen items-center justify-center p-4">
                        <!-- The actual dialog panel -->
                        <HeadlessDialogPanel class="w-full max-w-3xl px-12 py-8 rounded-lg bg-stone-100 text-gray-700">
                            <!-- data view suppier -->
                            <HeadlessDialogTitle class="pb-3 flex justify-between items-center border-b-2">
                                <h3 class="text-xl font-semibold text-sky-600">
                                    Detail Transaksi
                                </h3>
                                <h3 class="text-lg py-1 px-2 font-semibold bg-yellow-200 bg-opacity-30 text-yellow-600 rounded-md">
                                    {{ kode_transaksi }}
                                </h3>
                            </HeadlessDialogTitle>

                            
                            <div class="pt-5 pb-3">
                                Tanggal Transaksi : 
                                <ClientOnly>
                                    <span class="font-semibold">
                                        {{ new Date(createdAtTrx).toLocaleString('id-ID') }}
                                    </span>
                                </ClientOnly>
                            </div>

                            <div class="pb-5">
                                Nama Supplier : 
                                <span class="font-semibold">
                                    {{ nama_supplier }}
                                </span>
                            </div>


                            <div class="pb-3">
                                <div class="flex justify-between items-end border-b-2 pb-2">
                                    <h3 class="font-semibold tracking-wide">
                                        List Produk
                                    </h3>
                                </div>
                                <div class=" overflow-auto py-3">
                                    <table class="w-full bg-gray-100">
                                        <thead>
                                            <tr class="text-sm font-medium border-b-4 border-gray-50 bg-gray-200">
                                                <td class="py-3 px-2 text-xs font-semibold whitespace-nowrap">KETERANGAN PRODUK</td>
                                                <td class="py-3 px-2 text-xs font-semibold text-center whitespace-nowrap">HARGA</td>
                                                <td class="py-3 px-2 text-xs font-semibold text-center whitespace-nowrap">JUMLAH</td>
                                                <td class="py-3 px-2 text-xs font-semibold text-right whitespace-nowrap">SUBTOTAL</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in trx_produk" :key="index" class="border-b-4 border-stone-50">
                                                <td class="py-1 px-2 whitespace-nowrap">
                                                        <p class="text-[0.7rem] text-sky-600">
                                                            {{ item.trx_kode }}
                                                        </p>
                                                        <p class="text-xs font-semibold tracking-wide">
                                                        {{ item.trx_nama }}
                                                        </p>
                                                        
                                                </td>
                                                
                                                <td class="py-1 px-4 whitespace-nowrap text-center">
                                                    <p class="text-xs">
                                                        <ClientOnly>
                                                            {{new Intl.NumberFormat().format(item.trx_harga)}}
                                                        </ClientOnly>
                                                    </p>
                                                </td>
                                                
                                                <td class="py-1 px-4 whitespace-nowrap text-center ">
                                                    <span class="text-xs py-1 px-2 font-semibold rounded-md bg-teal-200 bg-opacity-30 text-teal-700"  >
                                                        {{ item.trx_jumlah }}
                                                    </span>
                                                </td>
            
                                                <td class="py-1 px-4 whitespace-nowrap text-right">
                                                    <p class="text-xs">
                                                        <ClientOnly>
                                                            {{new Intl.NumberFormat().format(item.trx_subtotal)}}
                                                        </ClientOnly>
                                                    </p>
                                                </td>
                                                
                                            </tr>
                                        </tbody>  
                                    </table>
                                    
                                </div>
                                <div class="flex justify-end items-end border-t-2 py-3">
                                    <h3 class="font-semibold tracking-wide">
                                        Grand Total :
                                        <span class="font-bold">Rp. {{ new Intl.NumberFormat().format(parseInt(total)) }};-</span> 
                                    </h3>
                                </div>
                                <div class="pt-3 pb-6">
                                    <h3>
                                        Catatan :
                                    </h3>
                                    <p>{{ catatan }}</p>
                                </div>
                                <div class="flex gap-x-4 justify-end border-t-2 pt-4">
                                    
                                    <TButton @click="backToTrxForm()" class="ijo" >
                                        <Icon name="carbon:logout" size="24" />
                                        <span class="text-sm font-semibold tracking-wide ">
                                            Keluar
                                        </span>
                                    </TButton>
                                </div>
                            </div>
                        </HeadlessDialogPanel>
                    </div>
                </div>
            </HeadlessDialog>
        </ClientOnly>
            


    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { stringify } from "querystring";

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

    // store supplier
    const storeSupplier = useSupplierStore()

    const {
        suppliers,
        id_supplier,
        kode_supplier,
        nama_supplier,
        nomor_supplier,
        alamat_supplier
    } = storeToRefs(storeSupplier)

    
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
    const searchFieldSupplier = ref('');
    const perPageSupplier = ref(0);
    const currentPageSupplier = ref(0);
    const pagesSupplier = ref(0);
    const totalDataSupplier = ref(0);
    const optionPagesSupplier = ref(10);
    const isOpenAddSupplier = ref(false);
    const numShown = ref(5)
    const isOpenAdd = ref(false);
    const isOpenCategory =ref(false);
    const isOpenDelete = ref(false);
    const isOpenDetail = ref(false);
    const errMsg = ref('');
    const btnEdit = ref(false);
    const btnFilter = ref(false);
    const dateFilter = ref('');

    

    // mounted first data
    onMounted( async () => {
        loadingOverlay.value = true
        await fecthTransaction()
    })

    // fetching data
    const fecthTransaction = async () => {
        await axios.post( `${urlHostApi}bengkel-api/api/transaksi/daftar`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            transaksi.value = res.data.data
            perPage.value = res.data.limit
            currentPage.value = parseInt(res.data.page)
            pages.value = Math.ceil(res.data.total_data/perPage.value)
            totalData.value = parseInt(res.data.total_data)
            searchField.value = res.data.search
            optionPages.value = 10

            setTimeout(() => loadingOverlay.value = false, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data.",
                msg : `error fetch transaksi process`
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
            totalData.value = parseInt(res.data.total_data)
            setTimeout(() => loadingOverlay.value = false, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data.",
                msg : `error fetch transaksi process`
            })
        });
    }

    const trxFiltered = async() => {
        isOpenAddSupplier.value = true
        loadingOverlay.value = true
        btnFilter.value = true
        fecthSupplier()
        
        setTimeout(() => {
            loadingOverlay.value = false
        }, 500)
    }

    const detailTransaction = async (item : any) => {
        isOpenDetail.value = true
        loadingOverlay.value = true
        kode_transaksi.value = item.kode_transaksi
        nama_supplier.value = item.supplier.nama_supplier
        createdAtTrx.value = item.createdAt
        trx_produk.value = item.detail.trx_produk
        total.value = item.total
        catatan.value = item.catatan
        

        setTimeout(() => {
            loadingOverlay.value = false
        }, 500)
    }

    const trxFilteredByDate = async () => {
        loadingOverlay.value = true
        
        btnFilter.value = true

        const today = new Date(dateFilter.value);
        const yyyy = today.getFullYear();
        let mm = '' + (today.getMonth() + 1) // Months start at 0!
        let dd = '' + today.getDate();

        if (mm.length < 2) 
            mm = '0' + mm;
        if (dd.length < 2) 
            dd = '0' + dd;
            
        const convert = yyyy + "-" + mm + "-" + dd 
        dateFilter.value = convert

        console.log(dateFilter.value)

        await fecthAllTransaction()

        const filteredDataByDate =  transaksi.value.filter(f => f.createdAt.match(dateFilter.value))
        
        setTimeout(() => {
                transaksi.value = filteredDataByDate
                perPage.value = 100
                currentPage.value = 1
                pages.value = Math.ceil(totalData.value/perPage.value)
                totalData.value = filteredDataByDate.length
                optionPages.value = 100
                loadingOverlay.value = false
        }, 500)
    }

    const trxFilteredToday = async () => {
        loadingOverlay.value = true
        await fecthAllTransaction()
        btnFilter.value = true

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = '' + (today.getMonth() + 1) // Months start at 0!
        let dd = '' + today.getDate();

        if (mm.length < 2) 
            mm = '0' + mm;
        if (dd.length < 2) 
            dd = '0' + dd;
            
        const convert = yyyy + "-" + mm + "-" + dd 

        console.log(convert)
        dateFilter.value = convert

        const filteredDataByDate =  transaksi.value.filter(f => f.createdAt.match(dateFilter.value))
        
        setTimeout(() => {
                transaksi.value = filteredDataByDate
                perPage.value = 100
                currentPage.value = 1
                pages.value = Math.ceil(totalData.value/perPage.value)
                totalData.value = filteredDataByDate.length
                optionPages.value = 100
                loadingOverlay.value = false
        }, 500)
    }

    const backToTrxForm = async () => {
        loadingOverlay.value = true
        kode_supplier.value =''
        nama_supplier.value =''
        kode_transaksi.value = ''
        nama_supplier.value = ''
        createdAtTrx.value = ''
        trx_produk.value = []
        total.value = ''
        catatan.value = ''
        setTimeout( async () => {
                isOpenAddSupplier.value = false
                isOpenDetail.value = false
                loadingOverlay.value = false
        }, 500)
    }

    const deleteFilter = async () => {
        loadingOverlay.value = true
        btnFilter.value = false
        dateFilter.value = ''
        kode_supplier.value =''
        nama_supplier.value =''
        kode_transaksi.value = ''
        nama_supplier.value = ''
        createdAtTrx.value = ''
        trx_produk.value = []
        total.value = ''
        catatan.value = ''
        setTimeout( async () => {
                 await fecthTransaction()
                isOpenAddSupplier.value = false
                isOpenDetail.value = false
                loadingOverlay.value = false
        }, 500)
    }
    
    // trigger function to fetch data table paginate and search
    const clickPage = async (page : any, optionPages : any, search : any) => {
        await axios.post( `${urlHostApi}bengkel-api/api/transaksi/daftar?page=${page}&limit=${optionPages}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            scrollTop()
            transaksi.value = res.data.data
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
        await axios.post( `${urlHostApi}bengkel-api/api/transaksi/daftar?page=${page}&limit=${total}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            transaksi.value = res.data.data
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

     // fetch for supplier
    const fecthSupplier = async () => {
        loadingOverlay.value = true
        await axios.post( `${urlHostApi}bengkel-api/api/supplier/daftar`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            suppliers.value = res.data.data
            perPageSupplier.value = res.data.limit
            currentPageSupplier.value = parseInt(res.data.page)
            pagesSupplier.value = Math.ceil(res.data.total_data/perPageSupplier.value)
            totalDataSupplier.value = parseInt(res.data.total_data)
            searchFieldSupplier.value = res.data.search

            setTimeout(() => {
                isOpenAddSupplier.value = true
                loadingOverlay.value = false
            }, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving supplier data.",
                msg : `error fetch suppliers process`
            })
        });
    }

    const chooseSupplier = (item : any) => {
        loadingOverlay.value = true
        id_supplier.value = item.id
        kode_supplier.value = item.kode_supplier
        nama_supplier.value = item.nama_supplier
        const filteredDataBySupplier =  transaksi.value.filter(f => f.supplier.nama_supplier == nama_supplier.value)
        setTimeout(() => {
                isOpenAddSupplier.value = false
                transaksi.value = filteredDataBySupplier
                perPage.value = 100
                currentPage.value = 1
                pages.value = Math.ceil(totalData.value/perPage.value)
                totalData.value = filteredDataBySupplier.length
                optionPages.value = 100
                loadingOverlay.value = false
        }, 500)
    }
        
    // trigger function to fetch data table paginate and search

    //trigger for supplier
    const clickPageSupplier = async (page : any, optionPagesSupplier : any, search : any) => {
        await axios.post( `${urlHostApi}bengkel-api/api/supplier/daftar?page=${page}&limit=${optionPagesSupplier}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            scrollTop()
            suppliers.value = res.data.data
            perPageSupplier.value = res.data.limit
            currentPageSupplier.value = parseInt(res.data.page)
            pagesSupplier.value = Math.ceil(res.data.total_data/perPageSupplier.value)
            totalDataSupplier.value = parseInt(res.data.total_data)
            searchFieldSupplier.value = res.data.search

        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving supplier data."
            })
        });
    }

    const searchDataSupplier = async  ( page = 1, total : any, search : any) => {
        if(search == '') page = 1, total = 10, optionPagesSupplier.value = 10
        await axios.post( `${urlHostApi}bengkel-api/api/supplier/daftar?page=${page}&limit=${total}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            suppliers.value = res.data.data
            perPageSupplier.value = parseInt(res.data.limit)
            currentPageSupplier.value = parseInt(res.data.page)
            pagesSupplier.value = Math.ceil(res.data.total_data/perPageSupplier.value)
            totalDataSupplier.value = parseInt(res.data.total_data)
            searchFieldSupplier.value = res.data.search
            optionPagesSupplier.value = 10
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving supplier data."
            })
        });
    }

    const displayPagesSupplier = computed (() => {
        const showNumber = Math.min(numShown.value, pagesSupplier.value);
        let first = currentPageSupplier.value - Math.floor(showNumber / 2);
        first = Math.max(first, 1);
        first = Math.min(first, pagesSupplier.value - showNumber + 1);
        return [...Array(showNumber)].map((k,i) => i + first);
    })

    



</script>

<style scoped>
</style>