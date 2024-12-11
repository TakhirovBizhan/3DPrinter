<script setup lang="ts">
import { useFigureStore } from '@/store/FigureStore';
import { Delete } from '@element-plus/icons-vue';

const figureStore = useFigureStore();

type FigureStatus = 'in proccess' | 'ready' | 'created';

async function deleteFigure(id: string) {
  await figureStore.deleteFigure(id);
}

defineProps({
  id: { type: String, required: true },
  status: { type: String as () => FigureStatus, required: true },
  modelName: { type: String, default: 'No name' },
  perimetr: { type: Number, required: true },
  creatingDate: { type: String, required: true },
  color: { type: String, required: true }
});
</script>

<template>
  <el-card style="max-width: 250px">
    <template #header>
      <h4>Figure: {{ modelName }}</h4>
    </template>

    <svg width="200" height="200" viewBox="0 0 443 616" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M147.5 154L275.239 500.5H19.7613L147.5 154Z" :fill="color || 'black'" />
      <path d="M295.5 462L423.239 115.5H167.761L295.5 462Z" :fill="color || 'black'" />
    </svg>
    <p class="status">Status: {{ status }}</p>
    <p class="text">Perimetr: {{ perimetr }}</p>
    <p class="text">Creating date: {{ creatingDate }}</p>
    <template #footer>
      <el-button type="primary">use</el-button>
      <el-button :loading="figureStore.loading" :disabled="status === 'in proccess'" @click="() => deleteFigure(id)"
        type="danger" :icon="Delete" circle />
    </template>
  </el-card>
</template>

<style scoped>
.status {
  font-size: 12px;
  color: rgb(151, 151, 151);
}

h4 {
  margin-bottom: 3px;
  margin-top: 3px;
}

.spool__img {
  width: 100%;
}
</style>