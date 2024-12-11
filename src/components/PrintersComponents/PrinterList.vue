<script setup lang="ts">
import { onMounted } from 'vue';
import PrinterCard from '../PrintersComponents/PrinterCard.vue';
import { usePrinterStore } from '@/store/PrinterStore';

const printerStore = usePrinterStore();


onMounted(async () => {
    await printerStore.fetchPrinters();
});


</script>

<template>
    <div>
        <ul class="list" v-if="printerStore.totalPrinters > 0">
            <li v-for="printer in printerStore.printers" :key="printer.id">
                <PrinterCard :id='printer.id' :mark="printer.mark" :articule="printer.articule"
                    :printing-speed="printer.printingSpeed" :is-print-started="printer.isPrintStarted" />
            </li>
        </ul>
        <p v-else class="no_data">
            No data
        </p>
    </div>
</template>
