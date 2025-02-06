<template>
  <div class="container-fluid mt-4">
    <!-- Products Table -->
    <div class="table-responsive">
      <table class="table align-middle">
        <thead class="table-light">
          <tr>
            <th scope="col">ÜRÜN ADI</th>
            <th scope="col">FİYAT</th>
            <th scope="col">MİKTAR</th>
            <th scope="col">TOPLAM</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <!-- Product Name & Image -->
            <td class="product-cell">
              <img 
                :src="item.image" 
                :alt="item.name"
                class="cart-image"
              >
              <div class="product-info">
                <h5 class="mb-1">{{ item.name }}</h5>
              </div>
            </td>

            <!-- Price -->
            <td>{{ formatPrice(item.price) }}</td>

            <!-- Quantity Input -->
            <td>
              <div class="quantity-controls">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  :disabled="item.quantity <= 1"
                  class="quantity-btn"
                >-</button>
                <span class="quantity-display">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="quantity-btn"
                >+</button>
              </div>
            </td>

            <!-- Total -->
            <td class="fw-semibold">{{ formatPrice(item.price, item.quantity) }}</td>

            <!-- Remove Button -->
            <td>
              <button 
                class="btn-remove"
                @click="removeFromCart(item.id)"
              >
                <i class="bi bi-x"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="cart-actions">
      <!-- Action Buttons -->
      <div class="action-buttons">
        <button
          class="btn-update"
          @click="updateCart"
          :disabled="cartStore.isLoading"
        >
          SEPETİ GÜNCELLE
        </button>
        <button
          class="btn-continue"
          @click="continueShopping"
          :disabled="cartStore.isLoading"
        >
          ALIŞVERİŞE DEVAM
        </button>
      </div>
    </div>

    <!-- Sepette Toplamlar Bölümü -->
    <div class="cart-summary">
      <h3 class="summary-title">SEPETTE TOPLAMLAR</h3>
      <div class="summary-content">
        <div class="summary-row">
          <span>Toplam</span>
          <span class="price">{{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
      <div class="summary-footer">
        <button class="checkout-btn" @click="goToCheckout">
          ÇIKIŞA DOĞRU DEVAM ET
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '~/stores/cart';
import { auth } from '~/boot/firebase';

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
  if (isNaN(numPrice)) return '0.00 TL';
  return `${(numPrice * quantity).toFixed(2)} TL`;
};

const updateQuantity = async (itemId: string, newQuantity: number) => {
  if (newQuantity < 1) return;
  
  try {
    await cartStore.updateQuantity(itemId, newQuantity);
  } catch (error) {
    console.error('Miktar güncellenirken hata:', error);
  }
};

const removeFromCart = async (id: string) => {
  try {
    await cartStore.removeFromCart(id);
  } catch (error) {
    console.error('Ürün sepetten çıkarılırken hata:', error);
  }
};

const continueShopping = () => {
  router.push('/TheUrunlerPage');
};

const updateCart = async () => {
  try {
    if (!auth.currentUser) return;
    await cartStore.updateCart();
  } catch (error) {
    console.error('Sepet güncellenirken hata:', error);
  }
};

const goToCheckout = () => {
  router.push('');
};
</script>

<style scoped>
.container-fluid {
  padding: 0 30px;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 15px;
}

.cart-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.product-info h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #f3b926;
  border-color: #f3b926;
}

.quantity-display {
  min-width: 30px;
  text-align: center;
}

.btn-remove {
  background: none;
  border: none;
  color: #000;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0;
  line-height: 1;
}

.btn-remove:hover {
  color: #f3b926;
}

.cart-actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-update, .btn-continue {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-update {
  background: #000;
  border: 2px solid #000;
  color: #fff;
  text-transform: uppercase;
  font-weight: 500;
}

.btn-continue {
  background: #fff;
  border: 2px solid #000;
  color: #000;
  text-transform: uppercase;
  font-weight: 500;
}

.btn-update:hover {
  background: #f3b926;
  border-color: #f3b926;
  color: #000;
}

.btn-continue:hover {
  background: #000;
  color: #fff;
}

.cart-summary {
  margin-top: 40px;
  border: 1px solid #eee;
  width: 100%;
  background: #fff;
}

.summary-title {
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  text-transform: uppercase;
}

.summary-content {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
}

.price {
  font-size: 1.1rem;
  font-weight: 600;
}

.summary-footer {
  padding: 20px;
  background-color: #fff;
}

.checkout-btn {
  width: 300px;
  padding: 15px;
  background-color: #f3b926;
  border: none;
  color: #000;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.checkout-btn:hover {
  background-color: #000;
  color: #fff;
}

.table th {
  text-transform: uppercase;
  font-weight: 500;
  color: #666;
  background-color: #f8f9fa;
  padding: 15px;
}

.table td {
  padding: 15px;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .container-fluid {
    padding: 0 15px;
  }
  
  .cart-actions {
    flex-direction: column;
    gap: 20px;
  }
  
  .action-buttons {
    width: 100%;
  }

  .checkout-btn {
    width: 100%;
  }
}
</style>