<script setup lang="ts">
import {ref} from 'vue';

const count = ref(0);

const inc = () => count.value++;

</script>

<template>
  <el-button type="primary">Primary</el-button>
  <button @click="inc">{{ count }}</button>
</template>
