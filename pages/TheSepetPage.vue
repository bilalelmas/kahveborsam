<template>
    <div>
      <ShopTable />
      <Footer />

    </div>
  </template>
  
  <script setup lang="ts">
  
  import  Footer  from '~/components/Footer.vue';
  import  ShopTable from '~/components/ShopTable.vue';
  definePageMeta({
  layout: 'default'
});

  </script>
  