export const useTransactionStore = defineStore('TransactionStore', {
    state : () => ({
        transaksi : [] as any[],
        detail_transaksi : [] as any[],
        detail_transaksi_temp : [] as any[],
        id_transaksi: '',
        kode_transaksi: '',
        detail: '',
        supplier: '',
        total: '',
        catatan: '',
        kode_detail_trx: '',
        trx_produk: '',
        trx_kode : '',
        trx_nama : '',
        trx_harga : '',
        trx_jumlah : '',
        trx_subtotal : '',
        total_trx: '',
        kode_key_temp: '',
        kode_detail_temp: '',
        produk: '',
        harga_tmp: '',
        jumlah_tmp: '',
        subtotal_tmp: '',
        createdAtTrx: '',
        updatedAtTrx: ''
    }),
    getters : {

    },
    actions : {

    }
})