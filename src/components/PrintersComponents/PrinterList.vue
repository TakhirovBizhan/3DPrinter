<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { printerRep } from '@/repositories/PrinterRep';
import PrinterCard from '../PrintersComponents/PrinterCard.vue';
import type { Printer } from '@/models/Printer';

const printers = ref<Printer[]>([]);

onMounted(async () => {
    const { data, error } = await printerRep.get();
    if (!error && Array.isArray(data)) {
        printers.value = data;
    }
});
</script>

<template>
    <div>
        <ul class="list" v-if="printers.length > 0">
            <li v-for="printer in printers" :key="printer.id">
                <PrinterCard :mark="printer.mark" :articule="printer.articule" :printing-speed="printer.printingSpeed"
                    :is-print-started="printer.isPrintStarted" />
            </li>
        </ul>
        <p v-else class="no_data">
            No data
        </p>
    </div>
</template>
