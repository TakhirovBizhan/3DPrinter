<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { printerRep } from '@/repositories/PrinterRep'; // Ваш репозиторий принтеров
import PrinterCard from '../PrintersComponents/PrinterCard.vue';
import type { Printer } from '@/models/Printer'; // Модель данных принтера

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
    <el-carousel class="carousel" indicator-position="" :autoplay="false" trigger="click" arrows="always">
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
  </div>
</template>

<style scoped>
.carousel {
  width: 350px;
  min-height: 615px;
}
.content {
  min-width: 350px;
  min-height: 615px;
}
</style>