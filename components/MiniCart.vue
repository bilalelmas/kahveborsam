<template>
  <div v-if="isOpen" class="mini-cart-overlay" @click.self="$emit('close')"></div>
  
  <div class="mini-cart" :class="{ 'mini-cart-open': isOpen }">
    <div class="cart-header">
      <button class="btn-close" @click="$emit('close')">&times;</button>
      <h5>Alışveriş Sepeti</h5>
      <span v-if="cartItems.length > 0" class="cart-count">{{ cartItems.length }}</span>
    </div>

    <div v-if="cartStore.isLoading" class="loading">
      Yükleniyor...
    </div>

    <div v-else class="cart-content">
      <div class="cart-items-container">
        <ul v-if="cartItems.length > 0">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" alt="Ürün Görseli" class="cart-item-img" />
            <div class="cart-item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">Adet: {{ item.quantity }}</p>
              <p class="item-price">{{ formatPrice(item.price, item.quantity) }}</p>
            </div>
            <button 
              class="btn-remove" 
              @click="removeFromCart(item.id)"
              :disabled="cartStore.isLoading"
            >
              <i class="bi bi-trash"></i>
            </button>
          </li>
        </ul>
        
        <div v-else class="empty-cart">
          <p>Alışveriş çantanız boş</p>
          <button class="shop-btn" @click="goToShop">MAĞAZAYA GİT</button>
        </div>
      </div>
      
      <div v-if="cartItems.length > 0" class="cart-total">
        <p class="total-price">Toplam: {{ formatPrice(totalPrice) }}</p>
        <div class="cart-buttons">
          <button 
            class="cart-btn view-cart"
            @click="viewCart"
          >
            SEPETİ GÖR
          </button>
          <button 
            class="cart-btn checkout"
            @click="checkout"
          >
            ÇIKIŞ YAP
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from 'vue';
import { useCartStore } from '~/stores/cart';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(["close"]);
const router = useRouter();
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => 
    total + (parseFloat(item.price) || 0) * item.quantity, 0
  );
});

const formatPrice = (price: string | number, quantity: number = 1) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `${(numPrice * quantity).toFixed(2)} TL`;
};

const removeFromCart = async (id: string) => {
  try {
    await cartStore.removeFromCart(id);
  } catch (error) {
    console.error('Ürün sepetten çıkarılırken hata:', error);
  }
};

const goToShop = () => {
  router.push("/TheUrunlerPage");
  emit("close");
};

const viewCart = () => {
  router.push("/TheSepetPage");
  emit("close");
};

const checkout = () => {
  // Çıkış işlemleri buraya eklenecek
  router.push("/checkout");
  emit("close");
};
</script>

<style scoped>
.mini-cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.mini-cart {
  position: fixed;
  top: 0;
  right: -450px;
  width: 400px;
  height: 100%;
  background: #f7f7f7;
  box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: right 0.3s ease;
}

.mini-cart-open {
  right: 0;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.cart-header h5 {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}

.btn-close {
  position: absolute;
  left: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  color: #000;
  transition: color 0.2s ease;
}

.btn-close:hover {
  color: #f3b926;
}

.cart-count {
  position: absolute;
  right: 10px;
  color: black;
  padding: 5px 10px;
  font-size: 14px;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.cart-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.cart-items-container {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 140px;
}

.cart-content ul {
  display: flex;
  flex-direction: column-reverse;
  padding: 15px;
  margin: 0;
  list-style: none;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 10px;
  border-radius: 8px;
}

.cart-item-img {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 15px;
}

.cart-item-info {
  flex-grow: 1;
}

.item-name {
  font-weight: 600;
  margin-bottom: 5px;
}

.item-quantity {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.item-price {
  font-weight: 600;
  color: #000;
}

.btn-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  transition: all 0.2s;
  padding: 8px;
}

.btn-remove:hover {
  color: #f3b926;
  transform: scale(1.1);
}

.btn-remove:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.cart-total {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}

.total-price {
  font-weight: bold;
  text-align: right;
  margin-bottom: 15px;
}

.cart-buttons {
  display: flex;
  gap: 10px;
}

.cart-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-cart {
  background-color: #fff;
  color: #000;
  border: 2px solid #000;
}

.view-cart:hover {
  background-color: #000;
  color: #fff;
}

.checkout {
  background-color: #000;
  color: #fff;
}

.checkout:hover {
  background-color: #f3b926;
  color: #000;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
}

.empty-cart p {
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 20px;
}

.shop-btn {
  background: black;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  transition: 0.3s;
  cursor: pointer;
}

.shop-btn:hover {
  background: #f3b926;
}
</style>
