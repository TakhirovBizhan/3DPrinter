<script lang="ts" setup>
import { ref } from 'vue';
import AvilableFigures from './AvailableFigures.vue';
import PrintQueue from './PrintQueue.vue'

const dialogConfigVisible = ref(false);

defineProps({
  id: { type: String, required: true },
  articule: String,
});

</script>

<template>
  <el-button type="info" @click="dialogConfigVisible = true">
    queue
  </el-button>
  <el-dialog v-model="dialogConfigVisible" :title="articule" width="600px">
    <div class="dialog">
      <AvilableFigures :id="id" />
      <PrintQueue :id="id" />
    </div>
  </el-dialog>
</template>

<style>
.dialog {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.button {
  max-width: fit-content;
}
</style>
