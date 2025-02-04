<template>
  <div class="page-container">
    <Account />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Account from '@/components/Account.vue';
import Footer from '@/components/Footer.vue';
</script>

<style scoped>
.page-container {
  padding: 40px 20px;
}

.page-title {
  text-align: center;
  color: #333;
  font-size: 2rem;
  margin-bottom: 30px;
  font-weight: 600;
}
</style>
  