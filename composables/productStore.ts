export const useProductStore = defineStore('productStore', {
    state : () => ({
        products: [] as any[],
        id: '',
        kode_produk: '',
        nama_produk: '',
        kategori_produk: '',
        harga_baru: '',
        harga_lama: '',
        stok_baru: '',
        stok_lama: '',
        foto: '',
        createdAt: '',
        updatedAt: ''
    }),
    getters : {

    },
    actions : {

    }
})

// interface productInfo {
//     kode_produk: string,
//     nama_produk: string,
//     kategori_produk: string,
//     harga: number,
//     stok: number,
//     foto: string
// }