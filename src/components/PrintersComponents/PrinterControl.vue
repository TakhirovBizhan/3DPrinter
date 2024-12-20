<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePrinterStore } from '@/store/PrinterStore';
import { useFigureStore } from '@/store/FigureStore';

const props = defineProps({
  id: { type: String, required: true },
});

const printerStore = usePrinterStore();
const figureStore = useFigureStore();

onMounted(() => {
  printerStore.fetchPrinters();
  figureStore.fetchFigures();
});



function handleStartPrinting(printerId: string) {
  printerStore.startPrinting(printerId);
}

function handleStopPrinting(printerId: string) {
  printerStore.stopPrinting(printerId);
}

const printer = computed(() =>
  printerStore.printers.find((p) => p.id === props.id)
);

// Найти текущую фигуру по ID
const currentFigure = computed(() => {
  const figureId = printer.value?.currentFigure;
  return figureStore.figures.find((f) => f.id === figureId)?.modelName || null;
});
</script>
<template>
  <div v-if="printerStore.error" class="error-data">Error!</div>
  <div>
    <el-progress v-if="printer?.isPrintStarted" :percentage="printer?.progress" :text-inside="true"
      :stroke-width="26" />

    <div v-if="printer?.isPrintStarted">
      <p>Printing: {{ currentFigure }}</p>
      <el-button type="danger" @click="handleStopPrinting(printer.id)" :disabled="printerStore.loading">
        Stop
      </el-button>
    </div>
    <div v-if="printer?.isPrintStarted === false">
      <el-button type="primary" @click="handleStartPrinting(printer.id)" :disabled="printerStore.loading">
        Start Printing
      </el-button>
    </div>
    <div v-else>
    </div>
  </div>
</template>
