<script lang="ts" setup>
import { usePrinterStore } from '@/store/PrinterStore';
import { useFigureStore } from '@/store/FigureStore';
import { onMounted, computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
});

const printerStore = usePrinterStore();
const figureStore = useFigureStore();

onMounted(async () => {
  await printerStore.fetchPrinters();
  await figureStore.fetchFigures();
});

const handleRemove = async (printerId: string, figureId: string) => {
  await printerStore.removeFromPrintQueue(printerId, figureId);

  if (!printerStore.error) {
    await figureStore.updatePrintStatus(figureId, false);
  } else {
    console.error('Failed to remove figure from queue');
  }
};

const tableData = computed(() => {
  const printer = printerStore.printers.find((p) => p.id === props.id);
  if (!printer) return [];

  return printer.printQueue
    .map((figureId) => figureStore.figures.find((figure) => figure.id === figureId))
    .filter((figure) => figure !== undefined)
    .map((figure) => ({
      id: figure.id,
      name: figure.modelName,
      perimetr: figure.perimetr,
      date: figure.creatingDate,
    }));
});
</script>

<template>
  <h3>Figures in Print Queue</h3>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column prop="perimetr" label="Perimetr" width="120" />
    <el-table-column prop="date" label="Date" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="{ row }">
        <el-button type="danger" size="small" :Loading="printerStore.loading" :disabled="printerStore.loading"
          @click="handleRemove(props.id, row.id)">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
