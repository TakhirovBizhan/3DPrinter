<script setup lang="ts">

import PrinterList from '@/components/PrintersComponents/PrinterList.vue';
import PrinterForm from '@/components/PrintersComponents/PrinterForm.vue'

</script>

<template>
  <main>
    <h2>Printers</h2>
    <div class="container">
      <PrinterList />
    <div class="container__form">
      <PrinterForm />
    </div>
    </div>
  </main>
</template>

<style lang="css" scoped>

.container {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.container__form {
  padding: 20px;
  border: 1px solid rgb(0, 0, 0);
  border-radius: 20px;
  height: fit-content;
}

</style>