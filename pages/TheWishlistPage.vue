<template>
    <div>
      <Whislist/>

      <Footer />

    </div>
  </template>
  
  <script setup lang="ts">
  import Whislist from '~/components/Whislist.vue';
  import  Footer  from '~/components/Footer.vue';

  definePageMeta({
  layout: 'defaultv2'
});

  </script>
  