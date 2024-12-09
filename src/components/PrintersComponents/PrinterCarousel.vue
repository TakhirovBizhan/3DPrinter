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
    <el-carousel v-if="printers.length > 0" class="carousel" indicator-position="none" :autoplay="false" trigger="click" arrows="always">
      <el-carousel-item
        class="content"
        v-for="printer in printers"
        :key="printer.id"
      >
        <PrinterCard
          :mark="printer.mark"
          :articule="printer.articule"
          :printing-speed="printer.printingSpeed"
          :is-print-started="printer.isPrintStarted"
        />
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