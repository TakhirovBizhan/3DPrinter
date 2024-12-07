<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PlasticCoil } from '@/models/PlasticCoil';
import { plasticRep } from '@/repositories/PlasticRep';
import CoilCard from '../PlasticComponents/CoilCard.vue';

// Инициализация с явным типом
const coils = ref<PlasticCoil[]>([]);

onMounted(async () => {
  const { data, error } = await plasticRep.get();
  if (!error && Array.isArray(data)) {
    coils.value = data;
  }
});
</script>

<template>
  <div>
    <el-carousel
      class="carousel"
      indicator-position=""
      :autoplay="false"
      trigger="click"
      arrows="always"
    >
      <el-carousel-item class="content" v-for="coil in coils" :key="coil.id">
        <CoilCard :material="coil.material" :color="coil.color" :thread-length="coil.threadLength" />
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