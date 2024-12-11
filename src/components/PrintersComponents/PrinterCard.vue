<script setup lang="ts">

import { usePrinterStore } from '@/store/PrinterStore';
import { Delete } from '@element-plus/icons-vue';

const printerStore = usePrinterStore();

const deletePrinter = async (id: string) => {
  printerStore.deletePrinter(id);
}


defineProps({
  id: { type: String, required: true },
  mark: String,
  articule: String,
  plasticCoil: { type: String, default: 'No coil' },
  isPrintStarted: Boolean,
  printingSpeed: Number,
  modelQueue: []
});

</script>

<template>
  <el-card class="card">
    <template #header>
      <div class="card__header">
        <h4>Printer: {{ mark }}</h4>
        <el-button class="button__busy" v-if="isPrintStarted" type="danger" plain>Busy</el-button>
        <el-button class="button__not_busy" v-else type="success" plain>Not busy</el-button>
      </div>
    </template>
    <img src=https://cdn2.iconfinder.com/data/icons/robotics-butterscotch-vol-1/512/3D_Print-512.png
      style="width: 100%" />
    <p class="article">article: {{ articule }}</p>
    <p class="text">plastic coil: {{ plasticCoil }}</p>
    <p class="text">printing speed: {{ printingSpeed }}</p>
    <template #footer>
      <el-button type="primary">Use</el-button>
      <el-button :loading="printerStore.loading" :disabled="isPrintStarted" @click="() => deletePrinter(id)"
        type="danger" :icon="Delete" circle />

    </template>
  </el-card>
</template>

<style lang="css" scoped>
.card__header {
  display: flex;
  justify-content: space-between;
}


.article {
  color: rgb(151, 151, 151);
  font-size: 12px;
}

h4 {
  margin-bottom: 3px;
  margin-top: 3px;
}

.card {
  max-width: 250px
}

.button__busy:hover {
  color: var(--el-color-danger);
  background-color: var(--el-color-danger-light-9);
}

.button__not_busy:hover {
  color: var(--el-color-success);
  background-color: var(--el-color-success-light-9);
}
</style>