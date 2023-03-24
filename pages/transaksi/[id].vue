<template>
    <div>
        <!-- navbar -->
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
                    <TButton @click="cancelTrx()" class="darkness">
                        <Icon name="carbon:power" size="24" />
                        <span class="text-sm font-semibold tracking-wide ">
                            Menu Utama
                        </span>
                    </TButton>
            </div>
        </div>

        <!-- main section -->
        <div class="pt-14 px-10 text-gray-700">
            <Loading v-if="loadingOverlay == true"/>
    
            <!-- top bar -->
            <div class="flex items-center justify-between pt-7" >
                <div>
                    
                    <p class="text-sm font-medium text-gray-500 ">
                        TRX_REF_KEY : 
                        <span class="text-xs bg-gray-700 text-white py-1 px-2 rounded-md">{{ kode_key_temp }}</span>
                    </p>
                </div>
            </div>
    
            <!-- main part -->
    
            <div class="grid grid-cols-2 gap-x-2 py-3">
                <div class="relative p-4 border-2 rounded-lg" :class="msgValidateInput ? 'border-red-500' : ''">
                    <div v-if="formOverlay" class="absolute top-0 left-0 rounded-lg w-full h-full bg-black/20"></div>
                    <div class="flex justify-between items-center pb-6">
                        <h2 class="text-xl font-bold tracking-wide">Transaksi Form</h2>
                    </div>
    
                    <div class="grid grid-cols-3 gap-x-4 items-center border rounded-lg px-3 py-2 h-18 mb-6 w-full">
                        <button @click="fecthSupplier()" class=" flex gap-x-1 justify-center pl-1 pr-2 py-2 bg-teal-600 text-white items-center rounded-lg hover:bg-teal-700 transition ease-in-out" :class="formOverlay ? 'hidden' : ''">
                            <Icon name="carbon:add-alt" size="24" />
                            <span class="text-sm">Pilih Supplier</span>
                        </button>
                        <div class="flex gap-x-3 col-span-2 col-start-2 px-3 border-l-2 h-full items-center">
                            <span class="text-xs py-1 px-3 font-semibold rounded-md" :class="kode_key_temp == '' ? 'bg-white' : 'bg-teal-200 bg-opacity-30 text-teal-700'" >
                                {{ kode_supplier }}
                            </span>
                            <h3 class="font-semibold tracking-wide text-sm uppercase">
                                {{ nama_supplier }}
                            </h3>
                        </div>
                    </div>
    
                    <div class="pb-3">
                        <div class="flex justify-between items-end border-b-2 pb-3">
                            <h3 class="font-semibold tracking-wide">
                                List Produk
                            </h3>
                            <TButton @click="fecthProduct()" class="ijo" :class="formOverlay ? 'hidden' : ''">
                                <Icon name="carbon:add-alt" size="24" />
                                <span class="text-sm">Masukkan Produk</span>
                            </TButton>
                        </div>
                        <div class=" overflow-auto py-3">
                            <table class="w-full bg-gray-100">
                                <thead>
                                    <tr class="text-sm font-medium border-b-4 border-gray-50 bg-gray-200">
                                        <td class="py-3 px-2 text-xs font-semibold whitespace-nowrap">KETERANGAN PRODUK</td>
                                        <td class="py-3 px-2 text-xs font-semibold text-center whitespace-nowrap">HARGA</td>
                                        <td class="py-3 px-2 text-xs font-semibold text-center whitespace-nowrap">JUMLAH</td>
                                        <td class="py-3 px-2 text-xs font-semibold text-center whitespace-nowrap">SUBTOTAL</td>
                                        <td class="py-3 px-2 text-xs font-semibold text-center whitespace-nowrap">ACTION</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in detail_transaksi_temp" :key="index" class="border-b-4 border-stone-50">
                                        <td class="py-1 px-2 whitespace-nowrap">
                                                <p class="text-[0.7rem] text-sky-600">
                                                    {{ item.produk.kode_produk }}
                                                </p>
                                                <p class="text-xs font-semibold tracking-wide">
                                                {{ item.produk.nama_produk }}
                                                </p>
                                                
                                        </td>
                                        
                                        <td class="py-1 px-4 whitespace-nowrap text-center">
                                            <p class="text-xs">
                                                <ClientOnly>
                                                    {{new Intl.NumberFormat().format(item.harga_tmp)}}
                                                </ClientOnly>
                                            </p>
                                        </td>
                                        
                                        <td class="py-1 px-4 whitespace-nowrap text-center ">
                                            <span class="text-xs py-1 px-2 font-semibold rounded-md bg-teal-200 bg-opacity-30 text-teal-700"  >
                                                {{ item.jumlah_tmp }}
                                            </span>
                                        </td>
    
                                        <td class="py-1 px-4 whitespace-nowrap text-center">
                                            <p class="text-xs">
                                                <ClientOnly>
                                                    {{new Intl.NumberFormat().format(item.subtotal_tmp)}}
                                                </ClientOnly>
                                            </p>
                                        </td>
    
                                        <td class="py-1 px-4 whitespace-nowrap text-center">
                                            <div class="flex flex-col gap-2 items-center justify-center">
                                                <button :class="formOverlay ? 'hidden' : ''" @click="deleteTempProduct(item)" class=" flex items-center py-1 px-1 font-semibold rounded-md bg-red-200 bg-opacity-30 text-red-700 hover:bg-opacity-60">
                                                    <Icon name="carbon:trash-can" size="20" />
                                                </button>
                                                
                                            </div>
                                        </td>
                                        
                                    </tr>
                                </tbody>  
                            </table>
                            <div v-if="detail_transaksi_temp.length == 0" colspan="5" class="w-full px-2 py-3 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
                                <span class="font-medium text-sm"><Icon name="carbon:warning-hex-filled" size="24" /></span>
                                <span class="font-medium text-sm">Belum ada produk yang dipilih </span>
                            </div>  
                        </div>
                        <div class="flex justify-end items-end border-t-2 py-3">
                            <h3 class="font-semibold tracking-wide">
                                Grand Total :
                                <span class="font-bold">Rp. {{new Intl.NumberFormat().format(totalTemp)}};-</span> 
                            </h3>
                        </div>
    
                        <div class="py-3">
                            <FormKit v-if="!formOverlay"
                                type="text"
                                label="Catatan Transaksi"
                                placeholder=". . ."
                                v-model="catatan"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border-2 focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                             />
                            <FormKit v-if="formOverlay"
                                type="text"
                                label="Catatan Transaksi"
                                placeholder=". . ."
                                v-model="catatan"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border-2 focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                             disabled />
                        </div>
    
                        <div class="flex gap-x-4 justify-end border-t-2 pt-4" :class="formOverlay ? 'hidden' : ''">
                            <p v-if="msgValidateInput" class="flex items-center gap-x-1 text-sm font-semibold tracking-wide text-red-500 pr-6">
                                <p>
                                    <Icon name="carbon:warning-hex" size="24" />
                                </p>
                                <p>
                                    Isikan semua data terlebih dahulu !!!
                                </p>
                            </p>
                            <TButton @click="cancelTrx()" class="gray" >
                                <Icon name="carbon:close-outline" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Batal
                                </span>
                            </TButton>
                            <TButton  @click="saveTransaction()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Simpan
                                </span>
                            </TButton>
                        </div>
                    </div>
    
                </div>
    
                <!-- data view produk -->
                <div v-if="isOpenAddProduct" class="bg-stone-100 p-4 border-2 rounded-lg">
                    <div class="flex justify-between items-center pb-4">
                        <div class="flex gap-x-2 items-center">
                            <h2 class="text-lg font-bold tracking-wide">Pilih Product</h2>
                            <TButton v-if="!nextStepProduct" @click="backToTrxForm()" class="gray">
                                    <Icon name="carbon:reply" size="24" />
                                    <span class="text-sm font-semibold tracking-wide ">
                                        Kembali
                                    </span>
                            </TButton>
                        </div>
                        <div v-if="!nextStepProduct" class="flex gap-x-2 items-center">
                            <p class="text-sm">
                                Produk baru dari supplier?
                            </p>
                            <TButton  @click="openModalAdd()">
                                <Icon name="carbon:add-alt" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Produk Baru
                                </span>
                            </TButton>
                        </div>
                    </div>
    
                    <!-- nulti step mark -->
                    <div class="inline-flex items-center justify-center w-full pb-4 relative">
                        <hr class="w-96 h-1 my-8 border-0 rounded bg-gray-500">
                        <div class="absolute flex gap-x-12 pt-3 justify-evenly">
                            <div class="flex w-32 flex-col justify-center items-center">
                                <p v-if="!nextStepProduct" class="flex items-center justify-center p-1 h-7 w-7 text-gray-100 rounded-full bg-yellow-600">
                                    1
                                </p>
                                <p v-if="nextStepProduct" class="flex items-center justify-center p-1 h-7 w-7 font-semibold text-gray-100 rounded-full bg-sky-600">
                                    <Icon name="carbon:checkmark" size="18" />
                                </p>
                                <p class="text-xs" :class=" !nextStepProduct ? '' : 'text-sky-600' ">
                                    Pilih Produk
                                </p>
                            </div>
                            <div class="flex w-32 flex-col justify-center items-center">
                                <p class="flex items-center justify-center p-1 h-7 w-7 text-gray-100 rounded-full bg-yellow-600">
                                    2
                                </p>
                                <p class="text-xs">
                                    Jumlah dan harga
                                </p>
                            </div>
                        </div>
                    </div>
    
                    <!-- filter and search -->
                    <div v-if="!nextStepProduct" class="flex gap-x-2 h-18 items-center rounded-lg bg-gray-800">
                        <div class="w-30 flex justify-center items-center">
                            <button @click="searchDataProduct(1, totalDataProduct, searchFieldProduct)" class="flex gap-x-2 items-center py-5 px-6 text-gray-200 border-r-4 border-stone-50 hover:text-sky-600 relative group">
                                <Icon name="carbon:search-locate" size="20" />
                                <span class="text-sm font-medium">Cari</span>
                                <span class="absolute w-full h-0.5 bg-sky-600 rounded bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
                            </button>
                        </div>
                        <div class="w-full flex items-center">
                            <FormKit
                            type="search"
                            placeholder="Cari berdasarkan nama produk disini . . . "
                            v-model="searchFieldProduct" 
                            @keydown.enter="searchDataProduct(1, totalDataProduct, searchFieldProduct)" 
                            @keydown.tab="searchDataProduct(1, totalDataProduct, searchFieldProduct)"
                            @blur="searchDataProduct(1, totalDataProduct, searchFieldProduct)"
                            :classes = "{
                                inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center w-full focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded',
                                outer :'$reset w-full pr-6 pl-3 formkit-outer formkit-disabled:opacity-50',
                                input : '$reset formkit-input appearance-none bg-transparent focus:outline-none focus:ring-0 focus:shadow-none w-full px-3 py-2 border-none text-base text-gray-100 placeholder-gray-400'
                            }"
                        />
                        </div>
                        
                    </div>
    
                    <!-- table product-->
                    <div v-if="!nextStepProduct" class=" overflow-auto py-3">
                        <table class="w-full">
                            <thead>
                                <tr class="text-xs font-medium border-b border-gray-200">
                                    <td class="py-5 font-semibold whitespace-nowrap">KODE PRODUK</td>
                                    <td class="py-5 px-4 font-semibold whitespace-nowrap">NAMA PRODUK</td>
                                    
                                    <td class="py-5 px-4 font-semibold text-center whitespace-nowrap">ACTION</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in products" :key="index" class="border-b">
                                    
                                    <td class="py-2 whitespace-nowrap">
                                        <span class="text-xs py-1 px-2 font-semibold bg-teal-200 bg-opacity-30 text-teal-600 rounded-md">
                                            {{ item.kode_produk }}
                                        </span>
                                        <!-- {{ Number(item.harga).toLocaleString() }} -->
                                        <!-- {{ item.harga }} -->
                                    </td>
                                    
                                    <td class="p-2 whitespace-nowrap">
                                        <p class="text-xs font-semibold">
                                            {{ item.nama_produk }}
                                        </p>
                                    </td>
                                    
    
                                    <td class="p-2 whitespace-nowrap text-center">
                                        <div class="flex gap-x-2 justify-center">
                                            <button @click="chooseProduct(item)" class="flex items-center gap-x-1 py-2 pl-2 pr-3 font-semibold rounded-md bg-sky-200 bg-opacity-30 text-sky-700 hover:bg-opacity-60">
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
                        <div v-if="products.length == 0" colspan="3" class="w-full px-2 py-5 bg-opacity-30 text-yellow-700 flex justify-center items-center gap-x-2">
                            <span class="font-medium"><Icon name="carbon:warning-hex-filled" size="24" /></span>
                            <span class="font-medium">Data tidak ditemukan </span>
                        </div>  
    
                        <div class="flex justify-between items-start pt-4 pb-2">
                            <div class="flex items-center">
                                <p class="text-xs">
                                    <span class="font-semibold text-sky-600  ">{{ currentPageProduct }}</span> / {{ pagesProduct }} pages <span class="text-white bg-gray-800 rounded-lg text-xs font-semibold px-2 py-1 "> {{ totalDataProduct }} data </span>
                                </p>
                            </div>
                            <FormKit
                                v-model="optionPagesProduct"
                                @change="clickPageProduct(1, optionPagesProduct, searchFieldProduct)"
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
                            <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600"  @click="clickPageProduct(1, optionPagesProduct, searchFieldProduct)">
                                <Icon name="carbon:chevron-left" size="28" />
                            </button>
                            <button v-for="page in displayPagesProduct" class="flex items-center justify-center w-8 h-8 font-medium rounded-full" :class="page == currentPageProduct ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-sky-600'" @click="clickPageProduct(page, optionPagesProduct, searchFieldProduct)">
                                {{ page }}
                            </button>
                            <button class="flex items-center justify-center font-semibold w-8 h-8 hover:text-sky-600" @click="clickPageProduct(pagesProduct, optionPagesProduct, searchFieldProduct)">
                                <Icon name="carbon:chevron-right" size="28" />
                            </button>
                        </div>
                    </div>
    
                    <!-- form input harga & jumlah -->
                    <div v-if="nextStepProduct">
                        <div class="pb-4">
                            <h3 class="text-sm font-semibold">
                                Masukkan Harga dan Jumlah
                            </h3>
                        </div>
                        <div class="bg-white rounded-lg w-full p-6">
                            <div class="flex gap-x-3 pb-3 mb-3 h-full items-center border-b-2">
                                <span class="text-xs py-1 px-3 font-semibold rounded-md bg-teal-200 bg-opacity-30 text-teal-700" >
                                    {{ kode_produk }}
                                </span>
                                <h3 class="font-semibold tracking-wide text-sm uppercase">
                                    {{ nama_produk }}
                                </h3>
                            </div>
                            <div class=" grid grid-cols-2 gap-x-4 pt-2">
                                <FormKit
                                    type="number"
                                    label="Harga Produk"
                                    placeholder=". . ."
                                    validation="*required|*number|length:3"
                                    v-model="harga_tmp"
                                    :classes="{
                                        label : 'font-semibold text-sm tracking-wide pb-2',
                                        inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border-2 focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                    }"
                                    :validation-visibility="errMsg"
                                />
                                <FormKit
                                    type="number"
                                    label="Jumlah Produk"
                                    placeholder=". . ."
                                    validation="required|number"
                                    v-model="jumlah_tmp"
                                    :classes="{
                                        label : 'font-semibold text-sm tracking-wide pb-2',
                                        inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border-2 focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                    }"
                                    :validation-visibility="errMsg"
                                />
                            </div>
                            <div class="flex gap-x-4 justify-end border-t-2 pt-4 mt-3">
                                <TButton @click="backToProduct()" class="gray">
                                    <Icon name="carbon:reply" size="24" />
                                    <span class="text-sm font-semibold tracking-wide ">
                                        Kembali
                                    </span>
                                </TButton>
                                <TButton class="ijo"  @click="saveTempProduct()">
                                    <Icon name="carbon:shopping-cart-arrow-down" size="24" />
                                    <span class="text-sm font-semibold tracking-wide ">
                                        Tambahkan
                                    </span>
                                </TButton>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- data view supplier -->
                <div v-if="isOpenAddSupplier" class="bg-stone-100 p-4 border-2 rounded-lg">
                    <div class="flex justify-between items-center pb-6">
                        <div class="flex gap-x-2 items-center">
                            <h2 class="text-lg font-bold tracking-wide">Pilih Product</h2>
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
    
            </div>
            <div>
                
            </div>
    
    
        </div>

        <!-- modal for insert & update -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenAdd == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-2xl px-12 py-8 rounded-lg bg-white text-gray-700">
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
                                label="Nama Produk"
                                placeholder=". . ."
                                validation="required|length:3"
                                v-model="nama_produk"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"
                            />
                        </div>

                        <div v-if="!btnEdit" class="grid grid-cols-2 gap-x-4 pt-1 w-full">
                            <FormKit
                                type="number"
                                label="Harga Produk"
                                placeholder=". . ."
                                validation="*required|*number|length:3"
                                v-model="harga_baru"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"
                            />
                            <FormKit
                                type="number"
                                label="Stok Produk"
                                placeholder=". . ."
                                validation="required|number"
                                v-model="stok_baru"
                                :classes="{
                                    label : 'font-semibold text-sm tracking-wide pb-2',
                                    inner : '$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-full border focus-within:ring-sky-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded-lg mb-1',
                                }"
                                :validation-visibility="errMsg"

                            />
                        </div>
                        
                        <div class="pb-3 pt-1">
                            <h3 class="font-semibold text-sm tracking-wide pb-3">
                                Kategori Produk
                            </h3>
                            <div class="grid grid-cols-3 gap-x-5 items-center border rounded-lg p-4 w-full">
                                <TButton @click="openModalCategory()">
                                    <Icon name="carbon:add-alt" size="24" />
                                    <span class="text-sm font-semibold tracking-wide ">
                                        Pilih Kategori
                                    </span>
                                </TButton>
                                <div class="flex gap-x-3 col-span-2 col-start-2 px-5 border-l-2 h-full items-center">
                                    <span class="text-xs py-1 px-3 font-semibold rounded-md" :class="kode_kategori == '' ? 'bg-white' : 'bg-teal-200 bg-opacity-30 text-teal-700'" >
                                        {{ kode_kategori }}
                                    </span>
                                    <h3 class="font-semibold tracking-wide text-sm uppercase">
                                        {{ nama_kategori }}
                                    </h3>
                                </div>
                            </div>
                            <span v-if="kategori_produk == ''" class="text-xs pt-1 text-red-500">
                                kategori produk is required
                            </span>
                        </div>

                        <div class="grid grid-cols-1 w-full py-3"> 
                            <label class="font-semibold text-sm tracking-wide pb-2" for="file1">Foto Produk</label>
                            <div v-if="imgEdit" class="flex items-start gap-x-4">
                                <nuxt-img :src="foto != '' ? urlHostApi + foto : '/img/placeholder.jpg'" alt="" class="w-20 aspect-[2/3] rounded-lg object-cover object-center " loading="lazy"/>
                                <TButton @click="(() => {imgEdit = false})">
                                    <Icon name="carbon:reset" size="24" />
                                    <span class="text-sm font-semibold tracking-wide ">
                                        Ganti Gambar
                                    </span>
                                </TButton>
                            </div>
                            
                            <input v-if="!imgEdit" type="file" 
                                @change = "selectFoto"
                                ref="file1"
                                name="file1"
                                id="file1"
                                class="flex justify-center items-center rounded-lg border cursor-pointer p-4 file:bg-sky-200 file:text-sky-600 file:mr-6 file:text-sm file:cursor-pointer file:rounded-lg file:px-6 file:py-3 file:bg-opacity-30 file:border-none file:font-semibold"
                            >
                            <span v-if="!imgEdit" class="text-xs pt-1 text-gray-500">
                                Gambar tidak harus diisi, bisa diupdate nanti
                            </span>
                            
                        </div>
                        <div class="flex gap-x-4 justify-end border-t-2 pt-4 mt-3">
                            
                            <TButton class="gray" @click="cancelDataProduct()">
                                <Icon name="carbon:close-outline" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Batal
                                </span>
                            </TButton>

                            <TButton v-if="!btnEdit" @click="saveDataProduct()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Simpan
                                </span>
                            </TButton>
                        </div>
                        
                    <!-- ... -->
                </HeadlessDialogPanel>
                </div>
            </HeadlessDialog>
        </ClientOnly>

        <!-- modal for choose category -->
        <ClientOnly>  
            <HeadlessDialog :open="isOpenCategory == true" class="relative z-50">
                <!-- The backdrop, rendered as a fixed sibling to the panel container -->
                <div class="fixed inset-0 bg-black/80" aria-hidden="true" />

                <!-- Full-screen container to center the panel -->
                <div class="fixed inset-0 flex items-center justify-center p-4">
                <!-- The actual dialog panel -->
                <HeadlessDialogPanel class="w-full max-w-2xl px-12 py-8 rounded-lg bg-stone-100 text-gray-700">
                    <HeadlessDialogTitle class="pb-6">
                        <h3 class="text-xl font-semibold text-sky-600 border-b-2 pb-4">
                            Pilih Satu Kategori Produk
                        </h3>
                    </HeadlessDialogTitle>
                    
                        <HeadlessRadioGroup v-model="kategori_produk">
                            <div class=" grid grid-cols-2 gap-5">
                                <HeadlessRadioGroupOption
                                    as="template"
                                    v-for="item in categories"
                                    :key="item.id"
                                    :value="item.id"
                                    v-slot="{ active, checked }"
                                    @click = "chooseCategory(item)"
                                >
                                    <div
                                    :class="[
                                        
                                        checked ? 'bg-sky-900 bg-opacity-75 text-white ' : 'bg-white ',
                                    ]"
                                    class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                                    >
                                        <div class="flex w-full items-center justify-between">
                                            <div class="flex items-center">
                                                <div class="text-sm">
                                                    <HeadlessRadioGroupDescription
                                                    as="span"
                                                    :class="checked ? 'text-sky-100' : 'text-gray-500'"
                                                    class="inline text-xs"
                                                    >
                                                        <span> {{ item.kode_kategori }}</span>
                                                    </HeadlessRadioGroupDescription>

                                                    <HeadlessRadioGroupLabel
                                                    as="p"
                                                    :class="checked ? 'text-white' : 'text-gray-900'"
                                                    class="font-medium text-sm"
                                                    >
                                                        {{ item.nama_kategori }}
                                                    </HeadlessRadioGroupLabel>

                                                </div>
                                            </div>
                                            <div v-show="checked" class="shrink-0 text-white">
                                                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                                                    <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="12"
                                                    fill="#fff"
                                                    fill-opacity="0.2"
                                                    />
                                                    <path
                                                    d="M7 13l3 3 7-7"
                                                    stroke="#fff"
                                                    stroke-width="1.5"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </HeadlessRadioGroupOption>
                            </div>
                        </HeadlessRadioGroup>

                        <div class="flex gap-x-2 justify-end border-t-2 pt-4 mt-6">
                            
                            <TButton @click="saveCategory()">
                                <Icon name="carbon:save" size="24" />
                                <span class="text-sm font-semibold tracking-wide ">
                                    Simpan
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

    definePageMeta({
    layout: "trx-sup-layout",
    });

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

    // store products
    const storeProduct = useProductStore()

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

    // store category
    const storeCategory = useCategoryStore()

    const {
        categories,
        kode_kategori,
        nama_kategori
    } = storeToRefs(storeCategory)
    
    // top bar setting
    const route = useRoute()
    const storeMenu = useMenuStore()
    const { menu } = storeToRefs(storeMenu)
    // When accessing /posts/1, route.params.id will be 1

    const headMenu =  computed(() => { return menu.value.find(v => v.pathName == route.name)} )
    const paramsId = route.params.id
    kode_key_temp.value = paramsId.toString()

    // default API url set
    const urlHostApi = 'http://localhost:8000/'

    // ref for setting page
    const loadingOverlay = ref(false)
    const formOverlay = ref(false)
    const searchFieldSupplier = ref('');
    const perPageSupplier = ref(0);
    const currentPageSupplier = ref(0);
    const pagesSupplier = ref(0);
    const totalDataSupplier = ref(0);
    const optionPagesSupplier = ref(10);
    const searchFieldProduct = ref('');
    const perPageProduct = ref(0);
    const currentPageProduct = ref(0);
    const pagesProduct = ref(0);
    const totalDataProduct = ref(0);
    const optionPagesProduct = ref(10);
    const numShown = ref(5)
    const isOpenAdd = ref(false);
    const isOpenAddProduct = ref(false);
    const isOpenAddSupplier = ref(false);
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
    const totalTemp = ref()
    const nextStepProduct = ref(false)
    const msgValidateInput = ref(false)

    // mounted first data
    onMounted( async () => {
        loadingOverlay.value = true
        await fecthTrxTemp()
        setTimeout(() => loadingOverlay.value = false, 500)
    })

    // fetching data

    // fetch for transaction detail temporary
    const fecthTrxTemp = async () => {
        loadingOverlay.value = true
        await axios.post( `${urlHostApi}bengkel-api/api/detailtrxtemp/daftar`, {
            kode_key_temp : kode_key_temp.value
        }, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            detail_transaksi_temp.value = res.data.data

            let deftotalTemp: number[] = []
            for (let i = 0; i < detail_transaksi_temp.value.length; i++) {
        
                deftotalTemp.push(detail_transaksi_temp.value[i].subtotal_tmp);
            }

            let sum_temp = deftotalTemp.reduce((a : any, b : any) => a + b, 0)

            totalTemp.value = sum_temp

            total_trx.value = totalTemp.value

            console.log(totalTemp.value)

            setTimeout(() => loadingOverlay.value = false, 500)
            
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving supplier data.",
                msg : `error fetch suppliers process`
            })
        });
    }

    const saveTransaction = async () => {
        loadingOverlay.value = true
        console.log({
            detail_temp : detail_transaksi_temp.value.length
        })
        if(id_supplier.value === '' || detail_transaksi_temp.value.length === 0) {
            msgValidateInput.value = true
            setTimeout( async () => {
                    loadingOverlay.value = false
                    setTimeout( async () => {
                        msgValidateInput.value = false
                    }, 3000)
            }, 300)
        } else {
            
            await axios.post(`${urlHostApi}bengkel-api/api/detailtrx/simpan`, {
                kode_key_temp : kode_key_temp.value
            }, {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
            }
            })
            .then(async (res) => {
                // await navigateTo('/')
                await axios.post(`${urlHostApi}bengkel-api/api/transaksi/simpan`, {
                    detail : res.data.result.id,
                    supplier : id_supplier.value,
                    total : res.data.result.total_trx,
                    catatan : catatan.value
                }, {
                headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": "*"
                }
                })
                .then(async (res) => {
                    
                    detail_transaksi_temp.value = []
                    catatan.value = ''
                    total_trx.value = ''
                    kode_key_temp.value = ''
                    harga_tmp.value = ''
                    jumlah_tmp
                    products.value = []
                    id.value = ''
                    kode_produk.value = ''
                    nama_produk.value = ''
                    suppliers.value = []
                    id_supplier.value = ''
                    kode_supplier.value = ''
                    nama_supplier.value = ''
                    totalTemp.value = ''
                    await navigateTo('/')
                    setTimeout( async () => {
                        loadingOverlay.value = false
                    }, 500)
                })
                .catch( err => {
                    console.log({error : err.message, msg : `error save process`})
                    setTimeout( () => {
                        loadingOverlay.value = false
                    }, 300)
                })
                
                setTimeout( async () => {
                    loadingOverlay.value = false
                }, 300)
            })
            .catch( err => {
                console.log({error : err.message, msg : `error save process`})
                setTimeout( () => {
                    loadingOverlay.value = false
                }, 300)
            })
        }
        
    }

    const cancelTrx = async () => {
        await axios.post(`${urlHostApi}bengkel-api/api/detailtrxtemp/hapusall`, {
            kode_key_temp : kode_key_temp.value
        }, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then(async (res) => {
            detail_transaksi_temp.value = []
            catatan.value = ''
            total_trx.value = ''
            kode_key_temp.value = ''
            harga_tmp.value = ''
            jumlah_tmp
            products.value = []
            id.value = ''
            totalTemp.value = ''
            kode_produk.value = ''
            nama_produk.value = ''
            suppliers.value = []
            id_supplier.value = ''
            kode_supplier.value = ''
            nama_supplier.value = ''
            console.log(res)
            await navigateTo('/')
            setTimeout( async () => {
                loadingOverlay.value = false
            }, 300)
        })
        .catch( err => {
            console.log({error : err.message, msg : `error delete process`})
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    }

    // ======================================

    // fetch for product

    const fecthProduct = async () => {
        loadingOverlay.value = true
        await axios.post( `${urlHostApi}bengkel-api/api/produk/daftar`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            formOverlay.value = true
            products.value = res.data.data
            perPageProduct.value = res.data.limit
            currentPageProduct.value = parseInt(res.data.page)
            pagesProduct.value = Math.ceil(res.data.total_data/perPageProduct.value)
            totalDataProduct.value = parseInt(res.data.total_data)
            searchFieldProduct.value = res.data.search

            setTimeout(() => {
                isOpenAddProduct.value = true
                loadingOverlay.value = false
            }, 500)
            
            // console.log('first load data',{
            //     'per' : perPageProduct.value,
            //     'page' : currentPageProduct.value,
            //     'pages' : pages.value,
            //     'total' : totalDataProduct.value,
            //     'search' : searchFieldProduct.value,
            // })
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data.",
                msg : `error fetch products process`
            })
        });
    }

    const chooseProduct = (item : any) => {
        loadingOverlay.value = true
        id.value = item.id
        kode_produk.value = item.kode_produk
        nama_produk.value = item.nama_produk
        setTimeout(() => {
                nextStepProduct.value = true
                loadingOverlay.value = false
        }, 500)
    }

    const backToTrxForm = async () => {
        loadingOverlay.value = true
        
        setTimeout(() => {
                isOpenAddProduct.value = false
                isOpenAddSupplier.value = false
                formOverlay.value = false
                loadingOverlay.value = false
        }, 500)
    }

    const backToProduct = async () => {
        loadingOverlay.value = true
        id.value = ''
        kode_produk.value = ''
        nama_produk.value = ''
        await fecthProduct()
        setTimeout(() => {
                nextStepProduct.value = false
                loadingOverlay.value = false
        }, 500)
    }

    const saveTempProduct = async () => {
        loadingOverlay.value = true
        await axios.post(`${urlHostApi}bengkel-api/api/detailtrxtemp/simpan`, {
            produk : id.value,
            kode_key_temp : kode_key_temp.value,
            harga_tmp : harga_tmp.value,
            jumlah_tmp : jumlah_tmp.value
        }, {
            headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*"
            }
        })
        .then( async (res) => {
            await fecthTrxTemp()
            setTimeout( () => {
                isOpenAddProduct.value = false
                nextStepProduct.value = false
                id.value = ''
                kode_produk.value = ''
                nama_produk.value = ''
                harga_tmp.value = ''
                jumlah_tmp.value = ''
                formOverlay.value = false
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
    }

    const deleteTempProduct = async (item : any) => {
        loadingOverlay.value = true
        await axios.post(`${urlHostApi}bengkel-api/api/detailtrxtemp/hapus`, {
            id : item.id
        }, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( async (res) => {
            await fecthTrxTemp()
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
        .catch( err => {
            console.log({error : err.message, msg : `error delete process`})
            setTimeout( () => {
                loadingOverlay.value = false
            }, 300)
        })
    }

    // trigger function to fetch data table paginate and search

    //trigger for supplier

    const clickPageProduct = async (page : any, optionPagesProduct : any, search : any) => {
        await axios.post( `${urlHostApi}bengkel-api/api/produk/daftar?page=${page}&limit=${optionPagesProduct}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            scrollTop()
            products.value = res.data.data
            perPageProduct.value = res.data.limit
            currentPageProduct.value = parseInt(res.data.page)
            pagesProduct.value = Math.ceil(res.data.total_data/perPageProduct.value)
            totalDataProduct.value = parseInt(res.data.total_data)
            searchFieldProduct.value = res.data.search
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data."
            })
        });
    }

    const searchDataProduct = async  ( page = 1, total : any, search : any) => {
        if(search == '') page = 1, total = 10, optionPagesProduct.value = 10
        await axios.post( `${urlHostApi}bengkel-api/api/produk/daftar?page=${page}&limit=${total}&search=${search}`, {}, {
        headers: {
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin": "*"
        }
        })
        .then( res => {
            products.value = res.data.data
            perPageProduct.value = parseInt(res.data.limit)
            currentPageProduct.value = parseInt(res.data.page)
            pagesProduct.value = Math.ceil(res.data.total_data/perPageProduct.value)
            totalDataProduct.value = parseInt(res.data.total_data)
            searchFieldProduct.value = res.data.search
            optionPagesProduct.value = 10
        })
        .catch( err => {
            console.log({
                message : err.message || "some error while retreiving category data."
            })
        });
    }

    const displayPagesProduct = computed (() => {
        const showNumber = Math.min(numShown.value, pagesProduct.value);
        let first = currentPageProduct.value - Math.floor(showNumber / 2);
        first = Math.max(first, 1);
        first = Math.min(first, pagesProduct.value - showNumber + 1);
        return [...Array(showNumber)].map((k,i) => i + first);
    })

    // fetch category
    
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
    

    // ======================================

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
            formOverlay.value = true
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
        setTimeout(() => {
                isOpenAddSupplier.value = false
                formOverlay.value = false
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

    // setting for paginate function for
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

    // for create new product from supplier

    function openModalAdd() {
        loadingOverlay.value = true
        setTimeout(() => {loadingOverlay.value = false, isOpenAdd.value = true}, 300)
    }

    const openModalCategory = ( async () => {
        loadingOverlay.value = true
        await fecthCategory()
        setTimeout( () => {
            loadingOverlay.value = false
            isOpenCategory.value = true
        }, 300)
    })

    const chooseCategory = ((item : any) => {
        nama_kategori.value = item.nama_kategori
        kode_kategori.value = item.kode_kategori
    })

    const saveCategory = (() => {
        loadingOverlay.value = true
        setTimeout( () => {
            loadingOverlay.value = false
            isOpenCategory.value = false
        }, 300)
    })

    const selectFoto = ((e : any) => {
        const imageChoose = file1.value.files.item(0)
        if (imageChoose == null){
            foto.value = ''
        } else {
            foto.value = imageChoose
        }
        
    })

    const cancelDataProduct = ( async () => {
        await fecthProduct()
        loadingOverlay.value = true
        errMsg.value = "focus"
        setTimeout( () => {
            isOpenAdd.value = false
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
        }, 300)
    })

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





</script>

<style scoped>
</style>