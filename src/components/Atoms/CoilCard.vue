<script setup lang="ts">
import { defineProps } from 'vue';
import threadSpool from '../../assets/threadSpool.svg';

defineProps({
  material: String,
  color: String,
  threadLength: Number
});


</script>

<template>
    <el-card style="max-width: 360px">
      <template #header>
        <h4>Material: {{ material }}</h4>
      </template>
      <img :src="threadSpool" style="width: 100%"/>
      <p class="text item">thread length: {{ threadLength }}</p>
      <template #footer>
         <el-button type="primary">Использовать</el-button>
      </template>
    </el-card>
  </template>
  
  <style lang="css" scoped>
  
  h4 {
    margin-bottom: 3px;
    margin-top: 3px;
  }

  .spool__img{
    width: 100%;
  }

  </style>