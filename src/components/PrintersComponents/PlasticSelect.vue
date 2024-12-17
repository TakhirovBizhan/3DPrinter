<script lang="ts" setup>
import { usePrinterStore } from '@/store/PrinterStore';
import { usePlasticStore } from '@/store/PlasticStore';
import { onMounted, computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
});

const printerStore = usePrinterStore();
const plasticStore = usePlasticStore();

const selectedPlastic = computed({
  get: () => {
    const printer = printerStore.printers.find((p) => p.id === props.id);
    return printer?.plasticId || null;
  },
  set: async (newPlasticId: string) => {
    const oldPlasticId = selectedPlastic.value;
    if (oldPlasticId && oldPlasticId !== newPlasticId) {
      await plasticStore.setPlasticInUse(oldPlasticId, false);
    }

    await printerStore.updatePrinterPlastic(props.id, newPlasticId);

    await plasticStore.setPlasticInUse(newPlasticId, true);
  },
});

const availablePlastics = computed(() =>
  plasticStore.plastics.filter(
    (plastic) => !plastic.inUse || plastic.id === selectedPlastic.value
  )
);

onMounted(async () => {
  await printerStore.fetchPrinters();
  await plasticStore.fetchPlastics();
});
</script>

<template>
  <el-select class="select" v-model="selectedPlastic" placeholder="Select Plastic" style="width: 175px"
    :disabled="printerStore.printers.find((p) => p.id === props.id)?.isPrintStarted">
    <el-option v-for="plastic in availablePlastics" :key="plastic.id"
      :label="`${plastic.material} (${plastic.color}) - ${plastic.threadLength}mm`" :value="plastic.id" />
  </el-select>
</template>

<style scoped>
.select {
  margin-bottom: 10px;
}
</style>
