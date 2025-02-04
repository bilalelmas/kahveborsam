<template>
  <div class="collection-container">
    <div class="filter-header">
      <div class="categories">
        <h3>KATEGORİLER</h3>
        <ul class="category-list">
          <li v-for="(category, index) in categories" :key="index">
            <a href="#" class="category-link">{{ category.name }}</a>
          </li>
        </ul>
      </div>
      <div class="filter-actions">
        <button class="filter-btn">
          <i class="bi bi-funnel"></i> Filtre
        </button>
        <button class="sort-btn">
          <i class="bi bi-grid"></i> Varsayılan sıralama
        </button>
      </div>
    </div>

    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image" :alt="product.name">
        </div>
        <div class="product-info">
          <h3 class="product-title">{{ product.name }}</h3>
          <div class="product-price">{{ product.price }}TL</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '~/boot/firebase';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const categories = ref([
  { name: 'Çiğ Kahve Çekirdekleri' },
  { name: 'Türk Kahvesi' },
  { name: 'Espresso' },
  { name: 'Harman' },
  { name: 'Kavrulmuş Kahve Çekirdekleri' },
  { name: 'Single Origin' }
]);

const products = ref<Product[]>([]);

const fetchProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, limit(12));
    const querySnapshot = await getDocs(q);
    
    products.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name || '',
      price: doc.data().price || '',
      image: doc.data().image || ''
    }));
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.collection-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
}

.categories h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.category-list {
  list-style: none;
  padding: 0;
}

.category-link {
  display: block;
  padding: 8px 0;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.category-link:hover {
  color: #f3b926;
}

.filter-actions {
  display: flex;
  gap: 15px;
}

.filter-btn, .sort-btn {
  padding: 8px 15px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
  text-align: center;
}

.product-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 500;
}

.product-price {
  color: #f3b926;
  font-weight: bold;
  font-size: 18px;
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
