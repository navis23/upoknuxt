<template>
    <div>
        <div v-for="(poin, index) in test" :key="index">
            <h1>{{ poin.Nama_Provider }}</h1>
            <h1>{{ poin.No_Registrasi }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
const testingo = ref([
{
             No: "1",
             Nama_Provider: "Cartenz HRD",
             No_Registrasi: "17001",
             
         },
         {
             No: "2",
             Nama_Provider: "Rimba Petualang Indonesia / EOM",
             No_Registrasi: "17034",
             
         },
         {
             No: "3",
             Nama_Provider: "ENTER PROVIDER",
             No_Registrasi: "17074",
             
         },
])
const test = ref()

onMounted(async () => {
    await randData()
})

const percobaan = computed(() => testingo.value.sort(() => Math.random() - 0.5))

 async function randData() {
    test.value = percobaan.value 
 }

</script>

<style scoped>

</style>