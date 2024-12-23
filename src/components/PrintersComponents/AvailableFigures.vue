<script lang="ts" setup>
import { useFigureStore } from '@/store/FigureStore';
import { usePrinterStore } from '@/store/PrinterStore';
import { ElNotification } from 'element-plus';
import { onMounted, computed } from 'vue';

defineProps({
  id: { type: String, required: true },
});

const figureStore = useFigureStore();
const printerStore = usePrinterStore();

onMounted(async () => {
  await figureStore.fetchFigures();
});

const handleAdd = async (printerId: string, figureId: string, perimetr: number) => {
  await printerStore.updatePrintQueue(printerId, figureId, perimetr);
  if (!printerStore.error) {
    await figureStore.updatePrintStatus(figureId, true);
  } else {
    ElNotification({
      message: `'Failed to add figure to queue'`,
      type: 'error',
      customClass: 'message-error',
      duration: 2000,
      position: 'bottom-right',
      showClose: false,
    });
  }
};

const tableData = computed(() => {
  return figureStore.figures
    .filter((figure) => figure.status === 'created' && !figure.inPrintQueue)
    .map((figure) => ({
      id: figure.id,
      name: figure.modelName,
      perimetr: figure.perimetr,
      date: figure.creatingDate,
    }));
});
</script>

<template>
  <h3>Available Figures</h3>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="120" />
    <el-table-column prop="perimetr" label="Perimetr" width="100" />
    <el-table-column prop="date" label="Date" width="150" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="handleAdd(id, row.id, row.perimetr)">
          Add +
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
