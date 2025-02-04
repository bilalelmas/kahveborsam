<template>
    <div class="layout-container">
   
      <main class="main-content">
        <slot /> <!-- Buraya sayfa içeriği gelecek -->
      </main>

      <Whislist />
    </div>
  </template>
  
  <script setup>
  import Whislist from '~/components/Whislist.vue';
  </script>
  
  <style scoped>
  .layout-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .main-content {
    flex: 1;
    padding: 40px 20px;
  }
  </style>