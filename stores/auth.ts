import { defineStore } from 'pinia';
import type { User } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref } from 'vue';
import { auth } from '~/boot/firebase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(auth.currentUser);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Giriş yap
  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const result = await signInWithEmailAndPassword(auth, email, password);
      user.value = result.user;
    } catch (e) {
      error.value = 'Giriş yapılırken bir hata oluştu';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // Kayıt ol
  const register = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      error.value = null;
      const result = await createUserWithEmailAndPassword(auth, email, password);
      user.value = result.user;
    } catch (e) {
      error.value = 'Kayıt olurken bir hata oluştu';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  // Çıkış yap
  const logout = async () => {
    try {
      isLoading.value = true;
      error.value = null;
      await signOut(auth);
      user.value = null;
    } catch (e) {
      error.value = 'Çıkış yapılırken bir hata oluştu';
      throw e;
    } finally {
      isLoading.value = false;
    }
  };

  return { 
    user,
    isLoading,
    error,
    login,
    register,
    logout
  };
});
