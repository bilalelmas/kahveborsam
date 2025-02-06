<template>
  <div>
    <Carousel />
    <ContainerComponent />
    <Box />
    <Product />
    <BannerComponent />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import ContainerComponent from '~/components/ContainerComponent.vue';
import Box from '~/components/Box.vue';
import Product from '~/components/Product.vue';
import BannerComponent from '~/components/BannerComponent.vue';
import Footer from '~/components/Footer.vue';
import Carousel from '~/components/Carousel.vue';

// Sayfa meta verisi (default layout kullanılıyor)
definePageMeta({
  layout: 'default'
});
</script>
