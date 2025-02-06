<template>
  <div>
    <div class="collection-container">
      <div class="content-wrapper">
        <!-- Sol Sidebar -->
        <div class="sidebar">
          <h3>KATEGORİLER</h3>
          <ul class="category-list">
            <li v-for="(category, index) in categories" :key="index">
              <a href="#" class="category-link">{{ category.name }}</a>
            </li>
          </ul>
        </div>

        <!-- Sağ İçerik -->
        <div class="main-content">
          <div class="filter-actions">
            <button class="filter-btn">
              <i class="bi bi-funnel"></i> Filtre
            </button>
            <div class="sort-wrapper">
              <button class="sort-btn">
                <i class="bi bi-grid"></i>
                <span>Varsayılan sıralama</span>
              </button>
            </div>
          </div>

          <div class="products-grid">
            <div v-for="product in products" :key="product.id" class="product-card">
              <div class="product-image">
                <img :src="product.image" :alt="product.name">
                <div class="product-buttons">
                  <button 
                    @click="handleAddToCart(product)" 
                    class="btn btn-option"
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
              <div class="product-info">
                <h3 class="product-title">{{ product.name }}</h3>
                <div class="product-price">{{ product.price }} TL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alt Banner - Tıklanabilir -->
    <div class="bottom-banner" @click="navigateToProducts" role="button" tabindex="0">
      <img src="https://kahveborsam.com/cdn/shop/files/2.jpg?v=1703765817" alt="Kahve Banner" class="banner-image">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { useCartStore } from '~/stores/cart';
import { useRouter } from 'vue-router';
import { getAuth } from 'firebase/auth';
import { firestore } from '~/boot/firebase';

const auth = getAuth();
const router = useRouter();
const cartStore = useCartStore();
const authModal = ref();

interface Product {
  id: number | string;
  name: string;
  price: string;
  image: string;
  category?: string;
  description?: string;
  quantity?: number;
}

interface FirestoreProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity?: number;
  category?: string;
  description?: string;
}

const categories = ref([
  { name: 'Çiğ Kahve Çekirdekleri' },
  { name: 'Türk Kahvesi' },
  { name: 'Espresso' },
  { name: 'Harman' },
  { name: 'Kavrulmuş Kahve Çekirdekleri' },
  { name: 'Single Origin' }
]);

const defaultProducts = [
  {
    id: 1,
    name: 'Brazilya Rio Minas Elek. 17/18 NY2/3 Arabica ORTA Kavrulmuş Kahve',
    price: '600.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 2,
    name: 'Colombia Supremo EP Arabica ORTA Kavrulmuş Kahve',
    price: '700.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 3,
    name: 'Ethiopia Yirgacheffe G2 Arabica ORTA Kavrulmuş Kahve',
    price: '800.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 4,
    name: 'Guatemala SHB EP Arabica ORTA Kavrulmuş Kahve',
    price: '750.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 5,
    name: 'Kenya AA Plus Arabica ORTA Kavrulmuş Kahve',
    price: '900.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 6,
    name: 'Costa Rica Tarrazu Arabica ORTA Kavrulmuş Kahve',
    price: '850.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 7,
    name: 'Panama Boquete Arabica ORTA Kavrulmuş Kahve',
    price: '950.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 8,
    name: 'Honduras SHG EP Arabica ORTA Kavrulmuş Kahve',
    price: '650.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 9,
    name: 'Peru HB MCM EP Arabica ORTA Kavrulmuş Kahve',
    price: '700.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 10,
    name: 'El Salvador SHG EP Arabica ORTA Kavrulmuş Kahve',
    price: '800.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 11,
    name: 'Nicaragua SHG EP Arabica ORTA Kavrulmuş Kahve',
    price: '750.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  },
  {
    id: 12,
    name: 'Mexico Altura Arabica ORTA Kavrulmuş Kahve',
    price: '680.00',
    image: 'https://kahveborsam.com/cdn/shop/files/KB-17.jpg?v=1685610662',
    quantity: 1
  }
];

const products = ref<Product[]>(defaultProducts);

const fetchProducts = async () => {
  try {
    const productsRef = collection(firestore, 'Products');
    const querySnapshot = await getDocs(productsRef);
    
    console.log('Firestore bağlantısı:', firestore);
    console.log('Collection referansı:', productsRef);
    console.log('Query snapshot:', querySnapshot);
    console.log('Döküman sayısı:', querySnapshot.size);

    const fetchedProducts: Product[] = [];
    querySnapshot.docs.forEach(doc => {
      const data = doc.data() as FirestoreProduct;
      fetchedProducts.push({
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        quantity: data.quantity,
        category: data.category,
        description: data.description
      });
    });

    // ID'ye göre sırala (string veya number olabilir)
    fetchedProducts.sort((a, b) => {
      const idA = typeof a.id === 'string' ? parseInt(a.id) : a.id;
      const idB = typeof b.id === 'string' ? parseInt(b.id) : b.id;
      return idA - idB;
    });

    // Sıralanmış verileri mevcut ürünlerle birleştir
    fetchedProducts.forEach((product, index) => {
      if (index < products.value.length) {
        products.value[index] = {
          ...products.value[index],
          ...product
        };
      }
    });

    console.log('Güncellenmiş ürünler:', products.value);

  } catch (error: unknown) {
    console.error('Ürünler yüklenirken hata:', error);
    if (error instanceof Error) {
      console.error('Hata detayı:', error.message);
    }
  }
};

const handleAddToCart = async (product: Product) => {
  try {
    await cartStore.addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  } catch (error) {
    // Eğer giriş yapılmamışsa
    if (error instanceof Error && error.message === 'Ürün eklemek için lütfen önce giriş yapın') {
      alert('Ürün eklemek için lütfen önce giriş yapın'); // Alert göster
      authModal.value?.openModal(); // Modal'ı aç
    } else {
      console.error('Sepete ekleme hatası:', error);
    }
  }
};

const navigateToProducts = async () => {
  await router.push('/TheUrunlerPage');
  // Sayfa yüklendikten sonra en üste kaydır
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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

.content-wrapper {
  display: flex;
  gap: 30px;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
}

.sidebar h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-transform: uppercase;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-link {
  display: block;
  padding: 10px 0;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 16px;
  border-bottom: 1px solid #eee;
}

.category-link:hover {
  color: #f3b926;
}

.main-content {
  flex: 1;
}

.filter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #000;
  background: transparent;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn i {
  font-size: 16px;
}

.filter-btn:hover {
  background: #f5f5f5;
}

.sort-wrapper {
  position: relative;
}

.sort-btn {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.sort-btn i {
  font-size: 18px;
  color: #000;
}

.sort-btn span {
  color: #666;
}

.sort-btn:hover {
  background: #f5f5f5;
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
}

.product-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-buttons {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
}

.product-card:hover .product-buttons {
  opacity: 1;
}

.btn-option {
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-option:hover {
  background-color: #f3b926;
  color: white;
}

.btn-option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #eee;
}

.product-info {
  padding: 15px;
  text-align: center;
  background: white;
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

@media (max-width: 992px) {
  .content-wrapper {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    margin-bottom: 30px;
  }

  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .category-link {
    padding: 8px 15px;
    border: 1px solid #eee;
    border-radius: 4px;
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

.bottom-banner {
  margin-top: 40px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  overflow: hidden;
  cursor: pointer;
}

.banner-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}
</style>
