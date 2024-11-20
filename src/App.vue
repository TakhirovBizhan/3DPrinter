<script setup lang="ts">

import { ref } from 'vue'

const activeIndex = ref()
const handleSelect = (key: string) => {
  activeIndex.value = key;
}

</script>

<template>
  <header class="header">
      <nav>
        <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
  <RouterLink to="/" @click="handleSelect('0')"><el-menu-item index="0">Home</el-menu-item></RouterLink>
  <RouterLink to="/Models"><el-menu-item  @click="handleSelect('1')" index="1">Models</el-menu-item></RouterLink>
  <RouterLink to="/Plastics"><el-menu-item  @click="handleSelect('2')" index="2">Plastics</el-menu-item></RouterLink>
  <RouterLink to="/Printers"><el-menu-item  @click="handleSelect('3')" index="3">Printers</el-menu-item></RouterLink>
  </el-menu>
      </nav>
  </header>

  <RouterView />
</template>

<style>

.el-menu-demo {
  display: flex;
  justify-content: center;
  gap: 20px;
}
a {
  text-decoration:none;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}


main {
  max-width: 1440px;
  margin: auto;
  margin-top: 30px;
}

.header {
  position: sticky;
  top: 0;
}

* {
  box-sizing: border-box;
}

</style>
