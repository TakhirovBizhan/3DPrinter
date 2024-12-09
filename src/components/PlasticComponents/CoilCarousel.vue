<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PlasticCoil } from '@/models/PlasticCoil';
import { plasticRep } from '@/repositories/PlasticRep';
import CoilCard from '../PlasticComponents/CoilCard.vue';

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
      :autoplay="false"
      trigger="click"
      arrows="always"
      indicator-position="none"
      v-if="coils.length > 0"   
    >
      <el-carousel-item class="content" v-for="coil in coils" :key="coil.id">
        <CoilCard :material="coil.material" :color="coil.color" :thread-length="coil.threadLength" />
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