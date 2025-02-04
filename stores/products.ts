import { defineStore } from 'pinia';
import { collection, getDocs, query, where, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '~/boot/firebase';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category?: string;
  description?: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useProductStore = defineStore('products', {
  state: (): ProductState => ({
    products: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async fetchProducts(category?: string) {
      try {
        this.isLoading = true;
        this.error = null;
        
        let productsQuery = query(collection(firestore, 'products'));
        
        if (category) {
          productsQuery = query(
            collection(firestore, 'products'),
            where('category', '==', category)
          );
        }

        const querySnapshot = await getDocs(productsQuery);
        this.products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        this.error = 'Ürünler yüklenirken bir hata oluştu';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async addProduct(product: Omit<Product, 'id'>) {
      try {
        this.isLoading = true;
        this.error = null;
        const docRef = await addDoc(collection(firestore, 'products'), product);
        this.products.push({ ...product, id: docRef.id });
      } catch (error) {
        console.error('Ürün eklenirken hata:', error);
        this.error = 'Ürün eklenirken bir hata oluştu';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProduct(id: string) {
      try {
        this.isLoading = true;
        this.error = null;
        await deleteDoc(doc(firestore, 'products', id));
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error('Ürün silinirken hata:', error);
        this.error = 'Ürün silinirken bir hata oluştu';
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  },

  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(product => product.id === id);
    },
    
    getProductsByCategory: (state) => (category: string) => {
      return state.products.filter(product => product.category === category);
    }
  }
}); 