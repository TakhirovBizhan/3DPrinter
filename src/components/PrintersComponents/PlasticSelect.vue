<script lang="ts" setup>
import { usePrinterStore } from '@/store/PrinterStore';
import { usePlasticStore } from '@/store/PlasticStore';
import { onMounted, computed, ref } from 'vue';
import { ElNotification } from 'element-plus';

const props = defineProps({
  id: { type: String, required: true },
});

const printerStore = usePrinterStore();
const plasticStore = usePlasticStore();

onMounted(async () => {
  await printerStore.fetchPrinters();
  await plasticStore.fetchPlastics();
});

const printer = computed(() =>
  printerStore.printers.find((p) => p.id === props.id)
);

const selectedPlastic = ref(printer.value?.plasticId || '');

const updateSelectedPlastic = async (newPlasticId: string) => {
  if (printer.value?.printQueue.length === 0) {
    const oldPlasticId = selectedPlastic.value;

    if (oldPlasticId && oldPlasticId !== newPlasticId) {
      await plasticStore.setPlasticInUse(oldPlasticId, false);
    }

    await printerStore.updatePrinterPlastic(props.id, newPlasticId);

    if (newPlasticId) {
      await plasticStore.setPlasticInUse(newPlasticId, true);
    }

    selectedPlastic.value = newPlasticId;
  } else {
    ElNotification({
      message: `Print queue is not empty!`,
      type: 'error',
      customClass: 'message-error',
      duration: 2000,
      position: 'bottom-right',
      showClose: false,
    });
  }
};

const availablePlastics = computed(() =>
  plasticStore.plastics.filter(
    (plastic) => !plastic.inUse || plastic.id === selectedPlastic.value
  )
);
</script>

<template>
  <el-select class="select" :model-value="selectedPlastic" @change="updateSelectedPlastic" placeholder="Select Plastic"
    style="width: 175px" :disabled="printer?.isPrintStarted">
    <el-option :key="'clear'" :label="'No plastic'" :value="''" />
    <el-option v-for="plastic in availablePlastics" :key="plastic.id"
      :label="`${plastic.material} (${plastic.color}) - ${plastic.threadLength}mm`" :value="plastic.id" />
  </el-select>
</template>
