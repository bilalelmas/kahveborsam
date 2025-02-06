// store.ts

import { defineStore } from 'pinia';
import { ref, onUnmounted } from 'vue';
import {
  collection,
  query,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { firestore } from '~/boot/firebase';

// Arayüz tanımlamaları
interface Item {
  id: string;
  name: string;
}

interface StoreState {
  items: Item[];
}

// Ana store tanımlaması
export const useStore = defineStore('main', {
  state: (): StoreState => ({
    items: [],
  }),

  actions: {
    // Koleksiyon verilerini getir
    async fetchItems(collectionName: string) {
      try {
        const q = query(collection(firestore, collectionName));
        const querySnapshot = await getDocs(q);
        this.items = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Item;
          return { id: doc.id, name: data.name };
        });
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
        throw new Error('Veriler yüklenemedi');
      }
    },

    // Yeni öğe ekle
    async addItem(collectionName: string, name: string) {
      try {
        const newDocRef = await addDoc(collection(firestore, collectionName), {
          name,
        });
        this.items.push({ id: newDocRef.id, name });
      } catch (error) {
        console.error('Öğe eklenirken hata oluştu:', error);
        throw new Error('Öğe eklenemedi');
      }
    },

    // Öğe sil
    async deleteItem(collectionName: string, id: string) {
      try {
        await deleteDoc(doc(firestore, collectionName, id));
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        console.error('Öğe silinirken hata oluştu:', error);
        throw new Error('Öğe silinemedi');
      }
    },

    // Gerçek zamanlı dinleyici kur
    setupRealtimeListener(collectionName: string) {
      const q = query(collection(firestore, collectionName));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.items = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Item;
          return { id: doc.id, name: data.name };
        });
      });

      onUnmounted(unsubscribe);
    },
  },
});

