<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import FigureCard from './FigureCard.vue';
import { useFigureStore } from '@/store/FigureStore';
import type { Figure } from '@/models/Figure';

const figureStore = useFigureStore();

const sortCriteria = ref<'modelName' | 'creatingDate'>('modelName');

const sortFigures = (figures: Figure[]) =>
  figures.sort((a, b) => (a[sortCriteria.value] > b[sortCriteria.value] ? 1 : -1));

const createdFigures = computed(() =>
  sortFigures(figureStore.figures.filter((figure) => figure.status === 'created'))
);

const printingFigures = computed(() =>
  sortFigures(figureStore.figures.filter((figure) => figure.status === 'in proccess'))
);

const readyFigures = computed(() =>
  sortFigures(figureStore.figures.filter((figure) => figure.status === 'ready'))
);

onMounted(async () => {
  await figureStore.fetchFigures();
});
</script>

<template>
  <div>
    <div class="sorting">
      <span>Sort by:</span>
      <el-button type="primary" plain @click="sortCriteria = 'modelName'">Name</el-button>
      <el-button class="sort__by__date_btn" type="primary" plain @click="sortCriteria = 'creatingDate'">Creation
        Date</el-button>
    </div>
    <div class="list__block">
      <div class="list__inner__block"
        v-for="(figures, status) in { Created: createdFigures, Printing: printingFigures, Ready: readyFigures }"
        :key="status">
        <h3>{{ status }} Models</h3>
        <ul class="list" v-if="figures.length > 0">
          <li v-for="figure in figures" :key="figure.id">
            <FigureCard :status="figure.status" :id="figure.id" :modelName="figure.modelName"
              :perimetr="figure.perimetr" :creatingDate="figure.creatingDate" :color="figure.color" />
          </li>
        </ul>
        <p v-else class="no_data">No data</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list__inner__block {
  min-width: 250px;
}

.sort__by__date_btn {
  margin: 0;
}

.sorting {
  display: flex;
  gap: 5px;
}

h3 {
  margin-bottom: 12px;
}

.list__block {
  margin-top: 16px;
  display: flex;
  gap: 40px;
}

.list {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
