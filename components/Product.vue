<template>
  <div class="product-container d-flex justify-content-between align-items-center">
    <!-- Left Box -->
    <div class="left-box position-relative">
      <img src="/assets/products/1.webp" alt="Kahve Görseli" class="left-box-img" />
      <button class="btn btn-custom">KAHVELERİ İNCELE</button>
    </div>

    <!-- Right Box -->
    <div class="right-box d-flex flex-wrap">
      <div v-for="item in products" :key="item.id" class="product-item position-relative d-flex flex-column">
        <div class="product-image-container position-relative">
          <img :src="item.image" alt="Ürün Görseli" class="product-img" />

          <!-- Hover Butonları -->
          <div class="product-buttons position-absolute">
            <button 
              class="btn btn-option" 
              @click="addToCart(item)"
              @mouseover="hoverButton" 
              @mouseleave="resetButton"
            >
              <i class="bi bi-cart"></i>
            </button>
            <button class="btn btn-option">
              <i class="bi bi-search"></i>
            </button>
            <button class="btn btn-option">
              <i class="bi bi-heart"></i>
            </button>
          </div>
        </div>

        <!-- Ürün Bilgisi -->
        <div class="product-info">
          <p class="product-name">{{ item.name }}</p>
          <p class="product-price">{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useCartStore } from '~/stores/cart';
import { auth } from '~/boot/firebase';
import { useRouter } from 'vue-router';

// Görselleri assets klasöründen import edin
import product1 from '~/assets/products/eb.webp';
import product2 from '~/assets/products/r.webp';
import product3 from '~/assets/products/e.webp';
import product4 from '~/assets/products/k.webp';

const cartStore = useCartStore();
const router = useRouter();

const products = ref([
  {
    id: 1,
    name: 'Espresso Blend (Yumuşak İçim)',
    price: '500.00TL',
    image: product1,
    quantity: 1,
  },
  {
    id: 2,
    name: 'RUANDA / NATURAL ANAEROBİC',
    price: '1150.00TL',
    image: product2,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Etiyopya Bench Maji',
    price: '600.00TL',
    image: product3,
    quantity: 1,
  },
  {
    id: 4,
    name: 'Colombia Cauca',
    price: '700.00TL',
    image: product4,
    quantity: 1,
  },
]);

const addToCart = (product: any) => {
  cartStore.addToCart(product);
  alert('Ürün başarıyla sepete eklendi!');
};

const hoverButton = (event: MouseEvent) => {
  (event.target as HTMLElement).style.backgroundColor = '#f3b926';
};

const resetButton = (event: MouseEvent) => {
  (event.target as HTMLElement).style.backgroundColor = 'rgba(0,0,0,0.8)';
};
</script>

<style scoped>
/* Product Container */
.product-container {
  width: 1536px;
  height: 866.4px;
  padding-top: 10px;
  margin: 70px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Left Box */
.left-box {
  width: 690px;
  height: 690px;
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}
.left-box-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.btn-custom {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 50px;
  background-color: #000;
  color: #fff;
  border: none;
  transition: background-color 0.3s;
  font-weight: 600;
}
.btn-custom:hover {
  background-color: #f3b926;
}

/* Right Box */
.right-box {
  width: 720px;
  height: 866.4px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

/* Product Item */
.product-item {
  width: 330px;
  height: 432px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.product-img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  border-radius: 4px;
}

/* Product Buttons */
.product-buttons {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}
.product-item:hover .product-buttons {
  opacity: 1;
}
.btn-option {
  background: white;
  color: black;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-option:hover {
  background-color: #f3b926 ;
  color: #fff ;
}
.btn-option i {
  font-size: 18px;
}

.bi-cart {
  font-size: 18px;
  transition: inherit; /* Ana geçişi miras al */
}

/* Ürün Bilgisi */
.product-info {
  text-align: center;
  padding: 5px 0;
}
.product-name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 12px 0 4px;
  transition: color 0.3s;
}
.product-name:hover {
  color: #f3b926 !important;
}
.product-price {
  font-size: 16px;
  color: #f3b926;
  font-weight: 700;
}
</style>