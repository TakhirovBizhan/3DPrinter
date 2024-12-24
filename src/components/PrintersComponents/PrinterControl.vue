<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { usePrinter } from '@/composable/usePrinter';
import { useFigureStore } from '@/store/FigureStore';
import { ElNotification } from 'element-plus';

const props = defineProps({
  id: { type: String, required: true },
});

const { printers, startPrinting, stopPrinting, printerStateMap } = usePrinter();
const figureStore = useFigureStore();

onMounted(() => {
  figureStore.fetchFigures();
});

// Запуск печати
function handleStartPrinting(printerId: string) {
  startPrinting(printerId);
}

// Остановка печати
function handleStopPrinting(printerId: string) {
  stopPrinting(printerId);
}

// Найти принтер по ID из пропсов
const printer = computed(() =>
  printers.value.find((p) => p.id === props.id)
);

if (printer.value && printerStateMap[printer.value.id]?.error) {
  ElNotification({
    message: `${printerStateMap[printer.value.id].error}`,
    type: 'error',
    customClass: 'message-error',
    duration: 2000,
    position: 'bottom-right',
    showClose: false,
  });
}
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
