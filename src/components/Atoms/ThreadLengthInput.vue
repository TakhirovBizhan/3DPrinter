<template>
    <el-input-number v-model="num" :min="1" :precision="2" :step="0.1" />
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const num = ref(1)
  </script>