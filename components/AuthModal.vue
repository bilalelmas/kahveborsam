<template>
    <Teleport to="body">
      <div v-if="isOpen" class="overlay">
        <div class="modal-container">
          <button @click="closeModal" class="close-button">&times;</button>
          <div class="text-center">
            <img src="/assets/logo.png" alt="kahveborsam.com" class="logo">
            <h2 class="title">{{ isLogin ? "Tekrar görmek ne güzel!" : "Hemen üye olun!" }}</h2>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <form @submit.prevent="handleAuth" class="form">
            <input 
              v-model="email" 
              type="email" 
              placeholder="E-posta adresi" 
              class="form-control" 
              required
              :disabled="authStore.isLoading"
            >
            <input 
              v-model="password" 
              type="password" 
              placeholder="Şifre" 
              class="form-control" 
              required
              :disabled="authStore.isLoading"
            >
            
            <div v-if="authStore.error" class="error">
              {{ authStore.error }}
            </div>

            <p class="forgot-password">Parolanızı mı unuttunuz?</p>
            
            <button 
              type="submit" 
              class="btn btn-dark"
              :disabled="authStore.isLoading"
            > 
              {{ authStore.isLoading ? 'İŞLEM YAPILIYOR...' : (isLogin ? "GİRİŞ YAP" : "KAYIT OL") }}
            </button>
          </form>
          <div class="switch-mode">
            <span>{{ isLogin ? "Hesabınız yok mu?" : "Zaten üye misiniz?" }}</span>
            <button 
              class="btn-link" 
              @click="switchMode"
              :disabled="authStore.isLoading"
            >
              {{ isLogin ? "Şimdi üye ol" : "Giriş yap" }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '~/stores/auth';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const isOpen = ref(false);
  const email = ref('');
  const password = ref('');
  const isLogin = ref(true);
  const successMessage = ref('');
  const errorMessage = ref('');
  
  const openModal = () => { 
    isOpen.value = true;
    resetForm();
  };
  
  const closeModal = () => { 
    if (!authStore.isLoading) {
      isOpen.value = false;
      resetForm();
    }
  };
  
  const resetForm = () => {
    email.value = '';
    password.value = '';
    authStore.error = null;
  };
  
  const switchMode = () => {
    if (!authStore.isLoading) {
      isLogin.value = !isLogin.value;
      resetForm();
    }
  };
  
  interface FirebaseError {
    code: string;
    message: string;
  }

  const handleAuth = async () => {
    try {
      if (isLogin.value) {
        await authStore.login(email.value, password.value);
        successMessage.value = 'Giriş başarılı! Yönlendiriliyorsunuz...';
        errorMessage.value = '';
      } else {
        await authStore.register(email.value, password.value);
        successMessage.value = 'Kayıt başarılı! Yönlendiriliyorsunuz...';
        errorMessage.value = '';
      }
      
      setTimeout(() => {
        closeModal();
        router.push('/TheAccountPage');
      }, 2000);

    } catch (error: unknown) {
      console.error('Kimlik doğrulama hatası:', error);
      successMessage.value = '';
      
      if (error && typeof error === 'object' && 'code' in error) {
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
          errorMessage.value = 'Kullanıcı bulunamadı veya şifre hatalı';
        } else {
          errorMessage.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        }
      } else {
        errorMessage.value = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      }
    }
  };
  
  // Header componentinden çağırmak için expose ediyoruz
  defineExpose({ openModal });
  </script>
  
  <style scoped>
  /* 🔹 Tam ekran overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  /* 🔹 Modal kutusu */
  .modal-container {
    background: white;
    padding: 24px;
    width: 500px;
    height: 600px;
    max-width: 90%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    position: relative;
  }
  
  /* 🔹 Kapatma butonu */
  .close-button {
    position: absolute;
    top: -50px;
    right: 0px;
    font-size: 40px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  
  /* 🔹 Logo */
  .logo {
    width: 100px;
    margin-bottom: 16px;
  }
  
  /* 🔹 Başlık */
  .title {
    font-size: 18px;
    margin-bottom: 20px;
  }
  
  /* 🔹 Form */
  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  /* 🔹 Input */
  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  /* 🔹 Hata mesajı */
  .error {
    color: #dc3545;
    background-color: #f8d7da;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    font-size: 14px;
  }
  
  /* 🔹 Şifremi unuttum */
  .forgot-password {
    font-size: 12px;
    color: gray;
    cursor: pointer;
  }
  
  /* 🔹 Giriş/Kayıt Değiştirme */
  .switch-mode {
    background: gray;
    margin-top: 16px;
    font-size: 14px;
  }
  
  .btn-link {
    background: none;
    border: none;
    color: gray;
    cursor: pointer;
    font-size: 14px;
  }
  .btn-link:hover {
    background: none;
    border: none;
    color: #f3b926;
    cursor: pointer;
    font-size: 14px;
  }

  .form-control:disabled,
  .btn:disabled,
  .btn-link:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-dark:disabled {
    background-color: #6c757d;
    border-color: #6c757d;
  }

  .success-message {
    background-color: #d4edda;
    color: #155724;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    text-align: center;
  }

  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0;
    text-align: center;
  }
  </style>
  