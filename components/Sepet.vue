<template>
  <div class="page-container">
    <div class="cart-container">
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ul>
          <li><a href="/">Ev</a></li>
          <li>></li>
          <li>Alışveriş Sepetiniz</li>
        </ul>
      </nav>

      <!-- Yükleniyor -->
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        <p>İşleminiz gerçekleştiriliyor...</p>
      </div>

      <!-- Boş Sepet -->
      <div v-else-if="isCartEmpty" class="empty-cart-content">
        <h2 class="empty-cart-title">Sepetiniz şu anda boş.</h2>
        <p class="continue-shopping">
          <a href="/urunler" class="continue-link">
            Alışverişe Devam Et
          </a>
        </p>
      </div>

      <!-- Dolu Sepet -->
      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="price">{{ item.price }}</p>
              <div class="quantity-controls">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)" 
                  :disabled="item.quantity <= 1 || isLoading"
                  class="quantity-btn"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  :disabled="isLoading"
                  class="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <button 
              @click="removeFromCart(item.id)" 
              :disabled="isLoading"
              class="remove-btn"
            >
              Kaldır
            </button>
          </div>
        </div>
        
        <div class="cart-summary">
          <h3>Sepet Toplamı</h3>
          <p class="total">Toplam: {{ cartTotal }}TL</p>
          <button class="checkout-btn" :disabled="isLoading">Ödemeye Geç</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';
import { auth } from '~/boot/firebase';
import { onMounted } from 'vue';

const cartStore = useCartStore();
const { cart, isCartEmpty, cartTotal, isLoading } = storeToRefs(cartStore);

// Sayfa yüklendiğinde sepeti yükle
onMounted(async () => {
  if (auth.currentUser) {
    try {
      await cartStore.loadCart();
    } catch (error) {
      console.error('Sepet yükleme hatası:', error);
    }
  }
});

const removeFromCart = async (productId: string) => {
  try {
    await cartStore.removeFromCart(productId);
  } catch (error) {
    console.error('Ürün kaldırma hatası:', error);
  }
};

const updateQuantity = async (productId: string, newQuantity: number) => {
  if (newQuantity < 1 || isLoading.value) return;
  
  try {
    const item = cart.value.find(i => i.id === productId);
    if (item && auth.currentUser) {
      item.quantity = newQuantity;
      await cartStore.saveCart(auth.currentUser.uid);
    }
  } catch (error) {
    console.error('Miktar güncelleme hatası:', error);
  }
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 120px; 
}

.cart-container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  background-color: #fff; /* Arka plan rengi ekledim */
}

.breadcrumb {
  margin-bottom: 2rem;
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.breadcrumb ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  align-items: center;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb a:hover {
  color: #007bff;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #666;
}

.empty-cart-content {
  text-align: center;
  padding: 4rem 0;
}

.empty-cart-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.continue-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.continue-link:hover {
  background-color: #0056b3;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  min-height: 400px;
}

.cart-items {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.price {
  font-weight: bold;
  color: #28a745;
  margin: 0.5rem 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
}

.quantity-controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background: #f8f9fa;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background: #c82333;
}

.cart-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.cart-summary h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.total {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #28a745;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background: #218838;
}

/* Yükleme animasyonu */
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Buton stilleri */
.quantity-btn:disabled,
.remove-btn:disabled,
.checkout-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>