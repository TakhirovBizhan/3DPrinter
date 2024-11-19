<script setup lang="ts">

import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

</script>

<template>
  <header>
      <nav>
        <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
  <RouterLink to="/"><el-menu-item index="0">Home</el-menu-item></RouterLink>
  <RouterLink to="/Models"><el-menu-item index="1">Models</el-menu-item></RouterLink>
  <RouterLink to="/Plastics"><el-menu-item index="2">Plastics</el-menu-item></RouterLink>
  <RouterLink to="/Printers"><el-menu-item index="3">Printers</el-menu-item></RouterLink>
  </el-menu>
      </nav>
  </header>

  <RouterView />
</template>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
a {
  text-decoration:none;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

</style>
