<template>
  <div class="account-container">
    <div v-if="authStore.user" class="account-content">
      <div class="user-info">
        <div class="email-section">
          <p class="email">{{ authStore.user.email }}</p>
          <p class="sign-out-text">
            ({{ authStore.user.email }} hesabından çıkış yapmak için 
            <button 
              @click="handleLogout" 
              class="sign-out-link"
              :disabled="authStore.isLoading"
            >
              tıklayın
            </button>)
          </p>
        </div>
        
        <div v-if="authStore.isLoading" class="loading">
          Yükleniyor...
        </div>

        <div v-else-if="authStore.error" class="error">
          {{ authStore.error }}
        </div>
        
        <div v-else>
          <div class="section">
            <h3>SON SİPARİŞLER</h3>
            <p class="no-orders">Henüz sipariş vermediniz.</p>
          </div>

          <div class="section">
            <h3>FATURA ADRESİ</h3>
            <p class="no-address">Henüz fatura adresi eklenmemiş.</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="not-logged-in">
      <p>Lütfen giriş yapın.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await authStore.logout();
    router.push('/');
  } catch (error) {
    console.error('Çıkış yapılırken hata:', error);
  }
};
</script>

<style scoped>
.account-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center; /* Tüm içeriği ortala */
}

.account-content {
  background-color: white;
  padding: 20px;
}

.user-info {
  margin-bottom: 30px;
}

.email-section {
  margin-bottom: 30px;
}

.email {
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 5px;
}

.sign-out-text {
  color: #666;
  font-size: 0.9rem;
}

.sign-out-link {
  background: none;
  border: none;
  color: #000; /* Siyah renk */
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  text-decoration: none; /* Alt çizgi kaldırıldı */
  transition: color 0.2s ease;
}

.sign-out-link:hover {
  color: #f3b926; /* Hover rengi */
  text-decoration: none; /* Hover'da alt çizgi yok */
}

.section {
  margin-bottom: 30px;
}

h3 {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.no-orders, .no-address {
  color: #666;
}

.not-logged-in {
  text-align: center;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 12px;
  color: #666;
}

/* Başlık ve metinlerin tam ortalanması için ek stil */
.user-info > div,
.section > * {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #dc3545;
  background-color: #f8d7da;
  border-radius: 4px;
  margin: 10px 0;
}
</style>