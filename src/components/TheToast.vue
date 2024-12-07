<template>
    <div class="toast" :class="type">
      <p>{{ message }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  
  export default defineComponent({
    name: 'TheToast',
    props: {
      message: {
        type: String,
        required: true,
      },
      type: {
        type: String as PropType<'success' | 'error'>,
        required: true,
      },
    },
  });
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 8px;
    right: 8px;
    padding: 8px;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 99999;
  }
  .toast.success {
    background-color: green;
  }
  .toast.error {
    background-color: red;
  }
  </style>