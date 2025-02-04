<template>
  <div>
    <!-- Top Navbar -->
    <TopNavbar 
      v-if="isTopNavbarVisible" 
      @close-topnavbar="hideTopNavbar" 
      class="top-navbar" 
    />

    <!-- Header -->
    <Header />

    <!-- Carousel -->
    <Carousel />

    <!-- Sayfa içeriği -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopNavbar from '~/components/TopNavbar.vue';
import Header from '~/components/Header.vue';
import Carousel from '~/components/Carousel.vue';

// TopNavbar görünürlüğü
const isTopNavbarVisible = ref(true);
const hideTopNavbar = () => {
  isTopNavbarVisible.value = false;
};
</script>

<style scoped>
/* Top Navbar için varsayılan pozisyon */
.top-navbar {
  position: relative;
  z-index: 10;
  width: 100%;
}

</style>
