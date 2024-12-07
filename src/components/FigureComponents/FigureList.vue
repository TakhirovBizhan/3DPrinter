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
    <el-carousel class="carousel" indicator-position="" :autoplay="false" trigger="click" arrows="always">
      <el-carousel-item
        class="content"
        v-for="figure in figures"
        :key="figure.id"
      >
        <FigureCard
          :modelName="figure.modelName"
          :perimetr="figure.perimetr"
          :creatingTime="figure.creatingTime"
          :color="figure.color"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.carousel {
  width: 350px;
  min-height: 615px;
}
.content {
  min-width: 350px;
  min-height: 615px;
}
</style>