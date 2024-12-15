<script lang="ts" setup>
import { useFigureStore } from '@/store/FigureStore';
import { usePrinterStore } from '@/store/PrinterStore';
import { onMounted } from 'vue';

defineProps({
  id: { type: String, required: true },
});

const figureStore = useFigureStore();
const printerStore = usePrinterStore();

onMounted(async () => {
  await figureStore.fetchFigures();
});

const handleClick = async (printerId: string, figureId: string) => {
  const figure = figureStore.figures.find((f) => f.id === figureId);
  if (!figure) {
    console.error('Figure not found');
    return;
  }
  if (figure.inPrintQueue) {
    console.error('Figure already in print queue');
    return;
  }
  await printerStore.updatePrintQueue(printerId, figure);
  await figureStore.updatePrintStatus(figureId, true);
};

const tableData = figureStore.figures
  .filter((figure) => figure.status === 'created' && !figure.inPrintQueue)
  .map((figure) => ({
    id: figure.id,
    name: figure.modelName,
    perimetr: figure.perimetr,
    date: figure.creatingDate,
  }));
</script>

<template>
  <h3>Available figures</h3>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column prop="perimetr" label="Perimetr" width="100" />
    <el-table-column prop="date" label="Date" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="handleClick(id, row.id)">
          Add +
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
