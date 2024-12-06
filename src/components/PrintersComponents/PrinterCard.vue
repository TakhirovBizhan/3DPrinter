<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  mark: String,
  name: String,
  plasticCoil: String,
  isPrintStarted: Boolean,
  printingSpeed: Number,
  modelQueue: []
});


</script>



<template>
    <el-card class="card">
      <template #header>
        <h4>Printer: {{ name }}</h4>
        <el-button class="button__busy" v-if="isPrintStarted" type="danger" plain>Busy</el-button>
    <el-button class="button__not_busy" v-else type="success" plain>Not busy</el-button>
      </template>
      <img
        src=https://cdn2.iconfinder.com/data/icons/robotics-butterscotch-vol-1/512/3D_Print-512.png
        style="width: 100%"
      />
      <p class="text item">{{ mark }}</p>
      <p class="text item">plastic coil: {{ plasticCoil }}</p>
      <p class="text item">printing speed: {{ printingSpeed }}</p>
      <template #footer>
         <el-button type="primary">Use</el-button>
         <el-button type="info">Config</el-button>
      </template>
    </el-card>
  </template>
  
  <style lang="css" scoped>
  
  h4 {
    margin-bottom: 3px;
    margin-top: 3px;
  }

  .card {
    max-width: 350px
  }

  .button__busy:hover {
    color: var(--el-color-danger);
    background-color: var(--el-color-danger-light-9);
  }

  .button__not_busy:hover {
    color: var(--el-color-success);
    background-color: var(--el-color-success-light-9);
  }


  </style>