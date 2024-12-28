<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useFigureStore } from '@/store/FigureStore';
import { usePrinterStore } from '@/store/PrinterStore';

const props = defineProps({
  id: { type: String, required: true },
});

const figureStore = useFigureStore();
const printerStore = usePrinterStore();

onMounted(() => {
  figureStore.fetchFigures();
});

// Запуск печати
function handleStartPrinting(printerId: string) {
  printerStore.startPrinting(printerId);
  figureStore.fetchFigures();
}

// Остановка печати
function handleStopPrinting(printerId: string) {
  printerStore.stopPrinting(printerId);
  figureStore.fetchFigures();
}

// Найти принтер по ID из пропсов
const printer = computed(() =>
  printerStore.printers.find((p) => p.id === props.id)
);

</script>

<template>
  <div v-if="printer">
    <el-progress v-if="printer.isPrintStarted" :percentage="printer.progress" :text-inside="true" :stroke-width="26" />

    <div v-if="printer.isPrintStarted">
      <p>Printing: {{ printer.currentFigure }}</p>
      <el-button type="danger" @click="handleStopPrinting(printer.id)" :disabled="printer.loading">
        Stop
      </el-button>
    </div>
    <div v-else>
      <el-button type="primary" @click="handleStartPrinting(printer.id)" :disabled="printer.loading">
        Start Printing
      </el-button>
    </div>
  </div>
</template>
