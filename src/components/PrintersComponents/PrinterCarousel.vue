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
    <el-carousel v-if="printerStore.totalPrinters > 0" class="carousel" indicator-position="none" :autoplay="false"
      trigger="click" arrows="always">
      <el-carousel-item class="content" v-for="printer in printerStore.printers" :key="printer.id">
        <PrinterCard :id='printer.id' :mark="printer.mark" :articule="printer.articule"
          :printing-speed="printer.printingSpeed" :is-print-started="printer.isPrintStarted" />
      </el-carousel-item>
    </el-carousel>
    <p v-else class="no_data">
      No data
    </p>
  </div>
</template>

<style scoped>
.carousel {
  width: 250px;
  min-height: 490px;
}

.content {
  min-width: 250px;
  min-height: 490px;
}
</style>