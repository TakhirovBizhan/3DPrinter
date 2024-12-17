<script setup lang="ts">

import { usePrinterStore } from '@/store/PrinterStore';
import { Delete, Edit } from '@element-plus/icons-vue';
import PrintConfig from './PrintConfig.vue';
import PlasticSelect from './PlasticSelect.vue'
import { usePlasticStore } from '@/store/PlasticStore';

const printerStore = usePrinterStore();
const plasticStore = usePlasticStore();


const props = defineProps({
  id: { type: String, required: true },
  articule: String,
  mark: String,
  isPrintStarted: Boolean,
  printingSpeed: Number,
  modelQueue: []
});
const printer = printerStore.printers.find((p) => p.id === props.id);

const deletePrinter = async (id: string) => {
  printerStore.deletePrinter(id);
  if (printer?.plasticId) {
    await plasticStore.setPlasticInUse(printer?.plasticId, false)
  }
}


</script>

<template>
  <el-card class="card">
    <template #header>
      <div class="card__header">
        <h4>Printer: {{ articule }}</h4>
        <el-button class="button__busy" v-if="isPrintStarted" type="danger" plain>Busy</el-button>
        <el-button class="button__not_busy" v-else type="success" plain>Not busy</el-button>
      </div>
    </template>
    <img src=https://cdn2.iconfinder.com/data/icons/robotics-butterscotch-vol-1/512/3D_Print-512.png
      style="width: 100%" />
    <p class="article">article: {{ mark }}</p>
    <PlasticSelect :id />
    <p class="text">printing speed: {{ printingSpeed }}</p>
    <template #footer>
      <div class="footer__card">
        <PrintConfig :id="id" :articule="articule" />
        <div v-if="!isPrintStarted">
          <el-button :loading="printerStore.loading" :disabled="isPrintStarted" @click="() => deletePrinter(id)"
            type="danger" :icon="Delete" circle />
          <el-button type="primary" :icon="Edit" circle />
        </div>
        <div v-else>
          <el-popover placement="top-start" title="Warning!" :width="200" trigger="hover"
            content="If you want to delete this printer you have to wait or cancel printing">
            <template #reference>
              <el-button disabled type="danger" :icon="Delete" circle />
            </template>
          </el-popover>
          <el-popover placement="top-start" title="Warning!" :width="200" trigger="hover"
            content="If you want to edit this printer you have to wait or cancel printing">
            <template #reference>
              <el-button type="primary" disabled :icon="Edit" circle />
            </template>
          </el-popover>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style lang="css" scoped>
.card__header {
  display: flex;
  justify-content: space-between;
}

.footer__card {
  display: flex;
  gap: 12px;
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
