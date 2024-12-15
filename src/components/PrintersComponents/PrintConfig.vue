<script lang="ts" setup>
import { ref } from 'vue';

const dialogConfigVisible = ref(false);

</script>

<template>
  <el-button type="primary" @click="dialogConfigVisible = true">
    Print
  </el-button>
  <el-dialog v-model="dialogConfigVisible" title="Printer Queue" width="600px">
    <div class="dialog">
    </div>
  </el-dialog>
</template>

<style>
.dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.button {
  max-width: fit-content;
}
</style>
