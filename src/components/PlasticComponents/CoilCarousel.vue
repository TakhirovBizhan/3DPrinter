<script setup lang="ts">
import { onMounted } from 'vue';
import CoilCard from '../PlasticComponents/CoilCard.vue';
import { usePlasticStore } from '@/store/PlasticStore';

const plasticStore = usePlasticStore();


onMounted(async () => {
  await plasticStore.fetchPlastics();
});
</script>

<template>
  <div>
    <el-carousel class="carousel" :autoplay="false" trigger="click" arrows="always" indicator-position="none"
      v-if="plasticStore.totalPlastics > 0">
      <el-carousel-item class="content" v-for="coil in plasticStore.plastics" :key="coil.id">
        <CoilCard :id="coil.id" :material="coil.material" :color="coil.color" :thread-length="coil.threadLength" />
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
  min-height: 490px;
}
</style>