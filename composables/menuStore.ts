export const useMenuStore = defineStore('menuStore', {
    state: () => ({
        menu: [
                { name : 'Dashboard', icon : 'carbon:dashboard', link : 'dashboard', pathName : 'dashboard', keterangan : 'Menu Overview Informasi Terupdate' },
                { name : 'Produk', icon : 'carbon:product', link : 'produk', pathName : 'produk', keterangan : 'Menu List dan Detail Semua Produk' },
                { name : 'Kategori', icon : 'carbon:category', link : 'kategori', pathName : 'kategori', keterangan : 'Menu List dan Detail Semua Kategori Produk' },
                { name : 'Supplier', icon : 'carbon:delivery-add', link : 'supplier', pathName : 'supplier', keterangan : 'Menu List dan Detail Semua Supplier' },
                // { name : 'Transaksi', icon : 'carbon:calculation', link : 'transaksi', pathName : 'transaksi', keterangan : 'Menu Transaksi Produk' },
                { name : 'Histori', icon : 'carbon:catalog', link : 'histori', pathName : 'histori', keterangan : 'Menu Histori Transaksi' },
        ],

        menuSetting: [
                {name : 'Setting', icon : 'carbon:settings', link : 'setting', pathName : 'setting'},
                {name : 'Logout', icon : 'carbon:logout', link : '', pathName : ''},
        ]

    }),
    getters: {

    },
    actions: {
        
    }
})
