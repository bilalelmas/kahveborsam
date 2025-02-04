import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '~/boot/firebase';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  variant?: string;
}

interface CartState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isLoading: false,
    error: null,
  }),
  actions: {
    addToCart(product: Product) {
      const existingProduct = this.items.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    async loadCart() {
      const user = auth.currentUser;
      if (!user) {
        this.items = [];
        return;
      }

      try {
        this.isLoading = true;
        const cartRef = doc(db, 'carts', user.uid);
        const cartDoc = await getDoc(cartRef);
        
        if (cartDoc.exists()) {
          const data = cartDoc.data();
          this.items = Array.isArray(data.items) ? data.items.map(item => ({
            id: item.id.toString(),
            name: item.name || '',
            image: item.image || '',
            price: item.price?.toString() || '0 TL',
            quantity: parseInt(item.quantity) || 1
          })) : [];
        } else {
          this.items = [];
          await setDoc(cartRef, { items: [] });
        }
      } catch (error) {
        console.error('Sepet yükleme hatası:', error);
        throw new Error('Sepet yüklenirken bir hata oluştu');
      } finally {
        this.isLoading = false;
      }
    },
    async removeFromCart(productId: string) {
      if (!auth.currentUser) {
        throw new Error('Bu işlem için giriş yapmalısınız');
      }

      try {
        this.isLoading = true;
        this.items = this.items.filter(item => item.id !== productId);
        await this.saveCart(auth.currentUser.uid);
      } finally {
        this.isLoading = false;
      }
    },
    async saveCart(userId: string) {
      if (!userId) {
        throw new Error('Kullanıcı ID\'si geçersiz');
      }

      try {
        const cartRef = doc(db, 'carts', userId);
        const cartData = {
          items: this.items.map(item => ({
            id: item.id.toString(),
            name: item.name || '',
            image: item.image || '',
            price: item.price?.toString() || '0 TL',
            quantity: parseInt(item.quantity?.toString() || '1')
          }))
        };

        await setDoc(cartRef, cartData, { merge: true });
      } catch (error) {
        console.error('Sepet kaydetme hatası:', error);
        throw new Error('Sepet kaydedilirken bir hata oluştu');
      }
    },
    async updateQuantity(itemId: string, newQuantity: number) {
      if (!auth.currentUser) {
        throw new Error('Bu işlem için giriş yapmalısınız');
      }

      try {
        this.isLoading = true;
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex !== -1) {
          this.items[itemIndex].quantity = newQuantity;
          await this.saveCart(auth.currentUser.uid);
        }
      } catch (error) {
        console.error('Miktar güncellenirken hata:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async updateCart() {
      if (!auth.currentUser) {
        throw new Error('Bu işlem için giriş yapmalısınız');
      }

      try {
        this.isLoading = true;
        await this.saveCart(auth.currentUser.uid);
      } catch (error) {
        console.error('Sepet güncellenirken hata:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  },
  getters: {
    isCartEmpty: (state) => state.items.length === 0,
    cartTotal: (state) => {
      return state.items.reduce((total, item) => {
        try {
          const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
          return total + price * item.quantity;
        } catch (error) {
          console.error('Fiyat hesaplama hatası:', error);
          return total;
        }
      }, 0).toFixed(2);
    },
  },
});