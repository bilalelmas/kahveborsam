<template>
    <section class="categories-container">
      <div class="container">
        <h1 class="page-title">Ürünler</h1>
        
        <div class="categories-grid">
          <div 
            v-for="(category, index) in categories"
            :key="index"
            class="category-card"
          >
            <nuxt-link to="#" class="category-link">
              <span class="category-label">{{ category }}</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  const categories = ref([
    'Espresso',
    'Harman',
    'Kavrulmuş Kahve',
    'Single Origin',
    'Türk Kahvesi',
    'Çiğ Kahve Çekirdekleri'
  ]);
  </script>
  
  <style scoped>
  .categories-container {
    min-height: 200px;
    padding-top: 10px;
    background:
      url('//kahveborsam.com/cdn/shop/files/WhatsApp-Image-2023-12-26-at-23.13.18_36b194d8-ee29-4279-a16a-8e5a5f166667.png?v=1703763297')
      center/cover;
    position: relative;
  }
  
  .page-title {
    color: white;
    text-align: center;
    font-size: 50px;
    margin-bottom: 2.5rem;
    position: relative;
    font-weight: 600;
    letter-spacing: 2px;
  }
  
  .categories-grid {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    gap: 1.5rem;
    max-width: 1440px;
    margin: 0 auto;
    overflow-x: auto;
    padding-bottom: 10px;
  }
  
  .category-card {
    min-width: 180px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .category-link {
    text-decoration: none;
    position: relative;
    display: block;
  }
  
  .category-label {
    color: white;
    font-size: 1.2rem;
    font-weight: 600;
    position: relative;
    padding-bottom: 10px;
    transition: opacity 0.3s ease, color 0.3s ease;
  }
  
  .category-label::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background: white;
    transition: width 0.3s ease;
    transform: translateX(-50%);
  }
  
  .category-card:hover .category-label {
    color: #f3b926;
  }
  
  .category-card:hover .category-label::after {
    width: 100%;
  }
  
  .category-card:hover {
    transform: translateY(-5px);
  }
  
  
  @media (max-width: 768px) {
    .categories-container {
      max-height: none;
      padding: 3rem 0;
    }
  
    .page-title {
      font-size: 2rem;
    }
  
    .categories-grid {
      gap: 1rem;
    }
  
    .category-card {
      min-width: 140px;
    }
  
    .category-label {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: 480px) {
    .categories-grid {
      flex-wrap: wrap;
    }
  
    .category-card {
      width: 100%;
      max-width: 300px;
    }
  }
  </style>
