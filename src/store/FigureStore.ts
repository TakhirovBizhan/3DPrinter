import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { figureRep } from '@/repositories/FigureRep';
import type { Figure } from '@/models/Figure';
import type { FigureProps } from '@/models/dataProps';

export const useFigureStore = defineStore('figureStore', () => {
  const figures = ref<Figure[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Computed property
  const totalFigures = computed(() => figures.value.length);

  // Actions
  async function fetchFigures() {
    loading.value = true;
    error.value = null;

    const { data, error: fetchError } = await figureRep.get();
    if (fetchError) {
      error.value = fetchError;
    } else if (data) {
      figures.value = data;
    }

    loading.value = false;
  }

  async function addFigure(figure: FigureProps) {
    loading.value = true;
    error.value = null;

    const { data, error: addError } = await figureRep.post(figure);
    if (addError) {
      error.value = addError;
    } else if (data) {
      figures.value.push(data);
    }

    loading.value = false;
  }

  async function deleteFigure(id: string) {
    loading.value = true;
    error.value = null;

    const { error: deleteError } = await figureRep.delete(id);
    if (deleteError) {
      error.value = deleteError;
    } else {
      figures.value = figures.value.filter((figure) => figure.id !== id);
    }

    loading.value = false;
  }

  return {
    // Expose state
    figures,
    loading,
    error,
    totalFigures,

    // Expose actions
    fetchFigures,
    addFigure,
    deleteFigure,
  };
});