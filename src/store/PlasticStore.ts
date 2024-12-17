import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { plasticRep } from '@/repositories/PlasticRep';
import type { PlasticCoil } from '@/models/PlasticCoil';
import type { PlasticProps } from '@/models/dataProps';

export const usePlasticStore = defineStore('plasticStore', () => {
  const plastics = ref<PlasticCoil[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const totalPlastics = computed(() => plastics.value.length);

  const availablePlastics = computed(() =>
    plastics.value.filter((plastic) => !plastic.inUse)
  );

  async function fetchPlastics() {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await plasticRep.get();
    if (fetchError) {
      error.value = fetchError;
    } else if (data) {
      plastics.value = data;
    }

    loading.value = false;
  }

  async function addPlastic(plastic: PlasticProps) {
    loading.value = true;
    error.value = null;

    const { data, error: addError } = await plasticRep.post(plastic);
    if (addError) {
      error.value = addError;
    } else if (data) {
      plastics.value.push(data);
    }

    loading.value = false;
  }

  async function deletePlastic(id: string) {
    loading.value = true;
    error.value = null;

    const { error: deleteError } = await plasticRep.delete(id);
    if (deleteError) {
      error.value = deleteError;
    } else {
      plastics.value = plastics.value.filter((plastic) => plastic.id !== id);
    }

    loading.value = false;
  }

  async function setPlasticInUse(plasticId: string, inUse: boolean) {
    loading.value = true;
    error.value = null;

    const plasticIndex = plastics.value.findIndex((p) => p.id === plasticId);

    if (plasticIndex === -1) {
      error.value = 'Plastic not found';
      loading.value = false;
      return;
    }

    const plastic = plastics.value[plasticIndex];

    const updatedPlastic = {
      ...plastic,
      inUse,
    };

    const { error: updateError } = await plasticRep.update(plasticId, updatedPlastic);

    if (updateError) {
      error.value = updateError;
    } else {
      plastics.value.splice(plasticIndex, 1, updatedPlastic);
    }

    loading.value = false;
  }

  return {
    plastics,
    loading,
    error,
    totalPlastics,
    availablePlastics,

    fetchPlastics,
    addPlastic,
    deletePlastic,
    setPlasticInUse,
  };
});
