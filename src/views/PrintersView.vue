<script setup lang="ts">

import PrinterList from '@/components/PrintersComponents/PrinterList.vue';
import PrinterForm from '@/components/PrintersComponents/PrinterForm.vue'

</script>

<template>
  <main>
    <div class="wrapper">
      <h2>Printers</h2>
      <div class="container">
        <PrinterList />
        <div class="container__form">
          <PrinterForm />
        </div>
      </div>
    </div>
  </main>
</template>
