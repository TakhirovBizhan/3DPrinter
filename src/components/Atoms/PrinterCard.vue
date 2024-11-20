<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  mark: String,
  name: String,
  plasticCoil: String,
  isPrintStarted: Boolean,
  printingSpeed: Number
});


</script>



<template>
    <el-card style="max-width: 360px">
      <template #header>
        <h4>Принтер: {{ name }}</h4>
        <el-button v-if="isPrintStarted" type="danger" plain>Busy</el-button>
    <el-button v-else type="success" plain>Not busy</el-button>
      </template>
      <img
        src=https://cdn2.iconfinder.com/data/icons/robotics-butterscotch-vol-1/512/3D_Print-512.png
        style="width: 100%"
      />
      <p class="text item">{{ mark }}</p>
      <p class="text item">plastic coil: {{ plasticCoil }}</p>
      <p class="text item">printing speed: {{ printingSpeed }}</p>
      <template #footer>
         <el-button type="primary">Использовать</el-button>
         <el-button type="info">Настройки</el-button>
      </template>
    </el-card>
  </template>
  
  <style lang="css" scoped>
  
  h4 {
    margin-bottom: 3px;
    margin-top: 3px;
  }

  </style>