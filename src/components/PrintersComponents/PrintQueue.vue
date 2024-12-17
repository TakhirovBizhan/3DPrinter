<script lang="ts" setup>
import { usePrinterStore } from '@/store/PrinterStore';
import { useFigureStore } from '@/store/FigureStore';
import { usePlasticStore } from '@/store/PlasticStore';
import { onMounted, computed } from 'vue';
import type { Figure } from '@/models/Figure';

const props = defineProps({
  id: { type: String, required: true },
});

const printerStore = usePrinterStore();
const figureStore = useFigureStore();
const plasticStore = usePlasticStore();

onMounted(async () => {
  await printerStore.fetchPrinters();
  await figureStore.fetchFigures();
  await plasticStore.fetchPlastics();
});

const handleRemove = async (printerId: string, figureId: string) => {
  await printerStore.removeFromPrintQueue(printerId, figureId);

  if (!printerStore.error) {
    await figureStore.updatePrintStatus(figureId, false);
  } else {
    console.error('Failed to remove figure from queue');
  }
};

const handleAddToPrintQueue = async (printerId: string, figure: Figure) => {
  if (!figure || !figure.perimetr) {
    console.error('Invalid figure data');
    return;
  }

  const requiredLength = figure.perimetr; // Длина нити, необходимая для печати

  await printerStore.updatePrintQueue(printerId, figure.id, requiredLength);

  if (printerStore.error) {
    console.error(printerStore.error);
  }
};

const tableData = computed(() => {
  const printer = printerStore.printers.find((p) => p.id === props.id);
  if (!printer) return [];

  return printer.printQueue
    .map((figureId) => figureStore.figures.find((figure) => figure.id === figureId))
    .filter((figure) => figure !== undefined);
});
</script>

<template>
  <h3>Figures in Print Queue</h3>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column prop="perimetr" label="Perimeter" width="120" />
    <el-table-column prop="date" label="Date" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="{ row }">
        <el-button type="danger" size="small" @click="handleRemove(props.id, row.id)">
          Remove
        </el-button>
        <el-button type="primary" size="small" :disabled="row.status === 'in process'"
          @click="handleAddToPrintQueue(props.id, row)">
          Add to Queue
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
