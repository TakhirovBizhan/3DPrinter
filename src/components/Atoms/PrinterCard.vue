<template>
    <el-card style="max-width: 360px">
      <template #header>
        <h4>Принтер: Михаил</h4>
        <el-button  type="success" plain >свободен</el-button>
      </template>
      <img
        src=https://cdn2.iconfinder.com/data/icons/robotics-butterscotch-vol-1/512/3D_Print-512.png
        style="width: 100%"
      />
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
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