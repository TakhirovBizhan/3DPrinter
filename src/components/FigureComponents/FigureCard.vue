<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  modelName: { type: String, default: 'No name'},
  perimetr: {type: Number, default: 0},
  creatingTime: {type: Number, default: 0},
  color: String
})
</script>

<template>
  <el-card style="max-width: 350px">
    <template #header>
      <h4>Figure: {{ modelName }}</h4>
    </template>

    <svg
      width="300"
      height="300"
      viewBox="0 0 443 616"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M147.5 154L275.239 500.5H19.7613L147.5 154Z" :fill="color ? color : 'black'" />
      <path d="M295.5 462L423.239 115.5H167.761L295.5 462Z" :fill="color ? color : 'black'" />
    </svg>

    <p class="text item">Perimetr: {{ perimetr }}</p>
    <p class="text item">Creating time: {{ creatingTime }}</p>
    <template #footer>
      <el-button type="primary">use</el-button>
    </template>
  </el-card>
</template>

<style lang="css" scoped>
h4 {
  margin-bottom: 3px;
  margin-top: 3px;
}

.spool__img {
  width: 100%;
}
</style>
