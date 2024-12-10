<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { figureRep } from '@/repositories/FigureRep';
import FigureCard from './FigureCard.vue';
import type { Figure } from '@/models/Figure';

const figures = ref<Figure[]>([]);

onMounted(async () => {
  const { data, error } = await figureRep.get();
  if (!error && Array.isArray(data)) {
    figures.value = data;
  }
});
</script>

<template>
  <div>
    <el-carousel class="carousel" v-if="figures.length > 0" :autoplay="false" trigger="click" arrows="always"
      indicator-position="none">
      <el-carousel-item class="content" v-for="figure in figures" :key="figure.id">
        <FigureCard :modelName="figure.modelName" :perimetr="figure.perimetr" :creating-date="figure.creatingDate"
          :color="figure.color" />
      </el-carousel-item>
    </el-carousel>

    <p v-else class="no_data">
      No data
    </p>
  </div>
</template>

<style scoped>
.carousel {
  width: 250px;
  min-height: 490px;
}

.content {
  min-width: 250px;
  min-height: 475px;
}
</style>