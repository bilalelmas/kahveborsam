<template>
    <div class="login-page">
        <div class="background-image"></div>
        <div class="container">
            <div class="login-card">
                <div class="card-header">
                    <h1>Üye Girişi</h1>
                </div>
                <form @submit.prevent="login">
                    <div class="form-group">
                        <input v-model="email" type="email" placeholder="E-posta" class="form-control" />
                    </div>
                    <div class="form-group">
                        <input v-model="password" type="password" placeholder="Şifre" class="form-control" />
                    </div>

                    <!-- "I'm not a robot" Görseli -->
                    <div class="robot-checkbox">
                        <input type="checkbox" id="robot-checkbox" />
                        <label for="robot-checkbox">I'm not a robot</label>
                    </div>

                    <button type="submit" class="btn btn-primary">Giriş Yap</button>
                </form>
                <div class="actions">
                    <nuxt-link to="/forgot-password" class="forgot-password">
                        Parolanızı mı Unuttunuz?
                    </nuxt-link>
                    <p>Hesabınız yok mu?
                        <nuxt-link to="#" @click="redirectToRegister" class="register-link">Kayıt ol</nuxt-link>
                    </p>
                </div>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '~/boot/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default defineComponent({
    name: 'Giris',
    setup() {
        const email = ref('');
        const password = ref('');
        const remember = ref(false);
        const router = useRouter();
        const errorMessage = ref('');
        const successMessage = ref('');

        const login = async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
                console.log('Giriş başarılı:', userCredential.user);
                successMessage.value = 'Giriş başarılı! Yönlendiriliyorsunuz...';
                errorMessage.value = '';
                setTimeout(() => {
                    router.push('/Anasayfapage');
                }, 2000); // 2 saniye bekleyip yönlendirme yapar
            } catch (error) {
                console.error('Giriş hatası:', error);
                successMessage.value = '';
                errorMessage.value = 'Giriş başarısız. Kullanıcı adı veya şifre hatalı';
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    errorMessage.value = 'Kullanıcı bulunamadı veya şifre hatalı';
                }
            }
        };

        const redirectToRegister = () => {
            router.push('/register');
        };

        return {
            email,
            password,
            remember,
            login,
            redirectToRegister,
            errorMessage,
            successMessage,
        };
    },
});
</script>

<style scoped>
.login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/assets/images/banner-bean-desktop.jpg');
    background-size: cover;
    filter: contrast(150%);
    opacity: 0.6;
    z-index: -1;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    height: 500px;
}

.login-card {
    width: 100%;
}

.card-header h1 {
    text-align: left;
    font-size: 24px;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.robot-checkbox {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 16px;
    font-weight: 500;
    margin-top: 15px;
    width: 100%;
    max-width: 280px;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    margin-top: 15px;
}

.robot-checkbox input {
    margin-right: 10px;
    width: 24px;
    height: 24px;
}

.robot-checkbox label {
    color: #555;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: -4px;
}

.btn {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    background-color: #005e5c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
}

.btn:hover {
    background-color: #004c4a;
}

.actions {
    text-align: center;
    margin-top: 20px;
}

.forgot-password,
.register-link {
    color: #3596b5;
    text-decoration: none;
}

.forgot-password:hover,
.register-link:hover {
    text-decoration: underline;
}

.error-message {
    color: red;
    text-align: center;
    margin-top: 10px;
}

.success-message {
    color: green;
    text-align: center;
    margin-top: 10px;
}
</style>