<script setup lang="ts">
import { onMounted } from 'vue';
import FigureCard from './FigureCard.vue';
import { useFigureStore } from '@/store/FigureStore';

const figureStore = useFigureStore();

onMounted(async () => {
  await figureStore.fetchFigures();
});

</script>

<template>
  <div>
    <el-carousel class="carousel" v-if="figureStore.figures.length > 0" :autoplay="false" trigger="click"
      arrows="always" indicator-position="none">
      <el-carousel-item class="content" v-for="figure in figureStore.figures" :key="figure.id">
        <FigureCard :status="figure.status" :id="figure.id" :modelName="figure.modelName" :perimetr="figure.perimetr"
          :creating-date="figure.creatingDate" :color="figure.color" />
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