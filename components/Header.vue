<template>
  <header class="header sticky-header top-0 start-0 w-100 bg-white shadow-sm">
    <div class="container header-container d-flex justify-content-between align-items-center">
      <!-- Logo -->
      <div class="header-logo">
        <nuxt-link to="/">
          <img src="/assets/logo.png" alt="Site Logo" />
        </nuxt-link>
      </div>

      <!-- Navigation -->
      <nav class="header-nav">
        <ul class="nav-list d-flex list-unstyled mb-0">
          <li class="nav-item px-3" v-for="(item, index) in navItems" :key="index">
            <nuxt-link :to="item.link" class="nav-link">{{ item.label }}</nuxt-link>
          </li>
        </ul>
      </nav>

      <!-- Right Side Actions -->
      <div class="header-actions d-flex align-items-center gap-3">
        <button class="btn p-0 action-item" @click="toggleSearchBar">
          <i class="bi bi-search"></i>
        </button>

        <button class="user-icon" @click="handlePersonalClick">
          <i class="bi bi-person"></i>
        </button>

        <nuxt-link to="/TheWishlistPage" class="action-item">
          <i class="bi bi-heart"></i>
        </nuxt-link>

        <button class="action-item" @click="toggleCart">
          <i class="bi bi-cart"></i>
        </button>
      </div>
    </div>

    <MiniCart :isOpen="isCartOpen" @close="closeCart" />
    <AuthModal ref="authModal" />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/auth';
import MiniCart from './MiniCart.vue';
import AuthModal from './AuthModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const authModal = ref();
const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false;
};

const handlePersonalClick = () => {
  if (authStore.user) {
    router.push('/TheAccountPage');
  } else {
    authModal.value?.openModal();
  }
};

const navItems = [
  { label: "Ana Sayfa", link: "/Anasayfapage" },
  { label: "Kahveler", link: "/TheUrunlerPage" },
  { label: "Hikayemiz" },
  { label: "Blog" },
  { label: "S.S.S" },
  { label: "İletişim" },
];

const isSearchBarOpen = ref(false);
const toggleSearchBar = () => {
  isSearchBarOpen.value = !isSearchBarOpen.value;
};
</script>

<style scoped>
/* Header Ana Alan */
.header {
  height: 140px; /* Orijinal siteye benzer yükseklik */

  background-color: white;

}

/* Header Container */
.header-container {
  max-width: 1440px;
  height: 100%;
  padding: 0 15px; /* İç kenar boşlukları */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.header-logo img {
  max-height: 95px; /* Orijinal logo boyutuna uygun */
  width: auto;
  display: block;
}

/* Navigation Menü */
.nav-list .nav-item .nav-link {
  font-size: 16px;
  font-weight: bold; /* Yazıları kalın yap */
  color:#26254f;
  text-decoration: none;
  position: relative;
  padding: 10px 15px; /* Menü öğeleri arasındaki boşluk */
  transition: color 0.3s ease; /* Renk geçiş efekti */
}

.nav-list .nav-item .nav-link:hover {
  color: #f3b926;
}

.nav-list .nav-item .nav-link:hover::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: #f3b926;
  bottom: -2px;
  left: 0;
  transition: background-color 0.3s ease; /* Çizgi geçiş efekti */
}

/* Sağdaki Aksiyonlar */
.header-actions {
  display: flex;
  align-items: center;
}

.header-actions .action-item {
  font-size: 23px;
  font-weight: bold;
  color: #26254f;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}

.header-actions .action-item:hover {
  color: #f3b926;
}

.user-icon {
  font-size: 23px;
  background: none !important;
  border: none;
  color: #26254f;
  padding: 4px;
  cursor: pointer;
}

.user-icon:hover {
  color: #f3b926;
}

</style>