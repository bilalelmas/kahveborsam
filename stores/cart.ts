import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '~/boot/firebase';

interface CartProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartProduct[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  });

  const isCartEmpty = computed(() => items.value.length === 0);

  const addToCart = async (product: CartProduct) => {
    if (!auth.currentUser) {
      error.value = 'Ürün eklemek için lütfen önce giriş yapın';
      throw new Error('Ürün eklemek için lütfen önce giriş yapın');
    }

    try {
      const existingProduct = items.value.find(item => item.id === product.id);
      
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        items.value.push({ ...product, quantity: 1 });
      }

      await saveCart(auth.currentUser.uid);
    } catch (err) {
      console.error('Sepete ekleme hatası:', err);
      error.value = 'Ürün sepete eklenirken bir hata oluştu';
      throw err;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      if (!auth.currentUser) throw new Error('Giriş yapmanız gerekiyor');
      
      isLoading.value = true;
      items.value = items.value.filter(item => item.id !== productId);
      await saveCart(auth.currentUser.uid);
    } catch (err) {
      console.error('Sepetten çıkarma hatası:', err);
      error.value = 'Ürün sepetten çıkarılırken bir hata oluştu';
    } finally {
      isLoading.value = false;
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      if (!auth.currentUser) throw new Error('Giriş yapmanız gerekiyor');
      if (newQuantity < 1) throw new Error('Geçersiz miktar');

      isLoading.value = true;
      const product = items.value.find(item => item.id === productId);
      
      if (product) {
        product.quantity = newQuantity;
        await saveCart(auth.currentUser.uid);
      }
    } catch (err) {
      console.error('Miktar güncelleme hatası:', err);
      error.value = 'Miktar güncellenirken bir hata oluştu';
    } finally {
      isLoading.value = false;
    }
  };

  const loadCart = async () => {
    try {
      if (!auth.currentUser) {
        items.value = [];
        return;
      }

      isLoading.value = true;
      const cartRef = doc(firestore, 'carts', auth.currentUser.uid);
      const cartDoc = await getDoc(cartRef);

      if (cartDoc.exists()) {
        const data = cartDoc.data();
        items.value = data.items || [];
      } else {
        items.value = [];
        await setDoc(cartRef, { items: [] });
      }
    } catch (err) {
      console.error('Sepet yükleme hatası:', err);
      error.value = 'Sepet yüklenirken bir hata oluştu';
    } finally {
      isLoading.value = false;
    }
  };

  const saveCart = async (userId: string) => {
    try {
      const cartRef = doc(firestore, 'carts', userId);
      await setDoc(cartRef, { items: items.value }, { merge: true });
    } catch (err) {
      console.error('Sepet kaydetme hatası:', err);
      throw new Error('Sepet kaydedilirken bir hata oluştu');
    }
  };

  const clearCart = () => {
    items.value = [];
    error.value = null;
  };

  const updateCart = async () => {
    try {
      if (!auth.currentUser) throw new Error('Giriş yapmanız gerekiyor');
      isLoading.value = true;
      await saveCart(auth.currentUser.uid);
    } catch (err) {
      console.error('Sepet güncelleme hatası:', err);
      error.value = 'Sepet güncellenirken bir hata oluştu';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    items,
    isLoading,
    error,
    cartTotal,
    isCartEmpty,
    addToCart,
    removeFromCart,
    updateQuantity,
    loadCart,
    clearCart,
    updateCart
  };
});