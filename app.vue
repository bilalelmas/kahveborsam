<template>
  <div>
    <!-- Top Navbar -->
    <TopNavbar 
      v-if="isTopNavbarVisible" 
      @close-topnavbar="hideTopNavbar" 
      class="top-navbar" 
    />

    <!-- Header component -->
    <Header 
      :hasTopNavbar="isTopNavbarVisible" 
      class="sticky-header" 
    />

    <!-- Main content -->
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TopNavbar from '~/components/TopNavbar.vue';
import Header from '~/components/Header.vue';

// TopNavbar görünürlüğü
const isTopNavbarVisible = ref(true);

// TopNavbar kapandığında görünürlüğü false yap
const hideTopNavbar = () => {
  isTopNavbarVisible.value = false;
};
</script>

<style scoped>
/* TopNavbar için varsayılan pozisyon */
.top-navbar {
  position: relative;
  z-index: 10;
  width: 100%;
}

/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: white; /* İstediğiniz arka plan rengi */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Hafif bir gölge efekti */
}

/* Sayfa aşağı kayarken TopNavbar'ın sabit olmaması */
.nuxt-page {
  margin-top: 0; /* İsteğe bağlı */
}
</style>
