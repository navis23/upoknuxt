export const useProductStore = defineStore('productStore', {
    state : () => ({
        products : [
            {
                id : 'BRG001',
                nama_barang : 'Ban endurism 185/17',
                kategori : 'Ban Motor',
                supplier : 'CV Gaskeun',
                harga : 250000,
                stok : 24,
                gambar : '/img/ban01.png'
            },
            {
                id : 'BRG002',
                nama_barang : 'Karbu PE 24',
                kategori : 'Mesin Part Motor',
                supplier : 'CV Gaskeun',
                harga : 375000,
                stok : 6,
                gambar : '/img/karbu01.png'
            },
            {
                id : 'BRG003',
                nama_barang : 'Oli Yamaha XXX',
                kategori : 'Oli Motor',
                supplier : 'CV SParePare',
                harga : 70000,
                stok : 11,
                gambar : '/img/oli01.png'
            },
            {
                id : 'BRG004',
                nama_barang : 'Ban swallow 200/18',
                kategori : 'Ban Motor',
                supplier : 'CV Motor oke',
                harga : 436000,
                stok : 30,
                gambar : '/img/ban02.png'
            },
            {
                id : 'BRG005',
                nama_barang : 'Reflektor Lampu Vario',
                kategori : 'Body Part Motor',
                supplier : 'CV Motor oke',
                harga : 673000,
                stok : 9,
                gambar : '/img/reflektor01.png'
            },
            {
                id : 'BRG006',
                nama_barang : 'Velg Tanaka Jari-Jari',
                kategori : 'Velg Motor',
                supplier : 'CV Modif Gass',
                harga : 436000,
                stok : 10,
                gambar : '/img/velg01.png'
            },
            {
                id : 'BRG007',
                nama_barang : 'Ban katana 150/14',
                kategori : 'Ban Motor',
                supplier : 'CV Gaskeun',
                harga : 185000,
                stok : 2,
                gambar : '/img/ban03.png'
            },
            {
                id : 'BRG008',
                nama_barang : 'Karburator PE 30',
                kategori : 'Mesin Part Motor',
                supplier : 'CV Mili Jaya',
                harga : 185000,
                stok : 8,
                gambar : '/img/karbu02.png'
            },
            {
                id : 'BRG009',
                nama_barang : 'Oli Motul 500ml',
                kategori : 'Oli Motor',
                supplier : 'CV Gaskeun',
                harga : 85000,
                stok : 14,
                gambar : '/img/oli02.png'
            },
            {
                id : 'BRG010',
                nama_barang : 'Ban Ninja 210/20',
                kategori : 'Ban Motor',
                supplier : 'CV Mili Terus',
                harga : 680000,
                stok : 11,
                gambar : '/img/ban04.png'
            },
        ]
    }),
    getters : {

    },
    actions : {

    }
})