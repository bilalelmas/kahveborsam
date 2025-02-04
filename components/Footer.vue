<template>
  <footer>
    <div class="container">
      <div class="footer-content">
        <!-- Logo ve Tanıtım -->
        <div class="footer-logo">
          <img src="/assets/logo.png" alt="Kahveborsam Logo" width="150" />
          <p class="footer-description"> <!-- Sınıf eklendi -->
            Türkiye’nin sadece <strong>kahve emtiası sağlayan</strong> ilk e-ticaret sitesi
          </p>
          <div class="input-group">
            <input type="email" class="form-control" placeholder="E-posta adresiniz..." />
            <button class="btn btn-dark narrow-button" type="button"> <!-- Sınıf eklendi -->
              <i class="bi bi-send"></i>
            </button>
          </div>
          <div class="social-icons">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
          </div>
        </div>

        <!-- Sayfalar -->
        <div class="footer-section">
          <h5>Sayfalar</h5>
          <ul>
            <li><a href="#">Ana Sayfa</a></li>
            <li><a href="#">Kahveler</a></li>
            <li><a href="#">Hikayemiz</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">S.S.S</a></li>
            <li><a href="#">İletişim</a></li>
          </ul>
        </div>

        <!-- Kategoriler -->
        <div class="footer-section">
          <h5>Kategoriler</h5>
          <ul>
            <li><a href="#">Çiğ Kahve Çekirdekleri</a></li>
            <li><a href="#">Türk Kahvesi</a></li>
            <li><a href="#">Espresso</a></li>
            <li><a href="#">Harman</a></li>
            <li><a href="#">Kavrulmuş Kahve Çekirdekleri</a></li>
            <li><a href="#">Single Origin</a></li>
          </ul>
        </div>

        <!-- Sözleşmeler -->
        <div class="footer-section">
          <h5>Sözleşmeler</h5>
          <ul>
            <li><a href="#">Ara</a></li>
            <li><a href="#">Gizlilik Politikası</a></li>
            <li><a href="#">İptal ve İade Koşulları</a></li>
            <li><a href="#">Mesafeli Satış Sözleşmesi</a></li>
            <li><a href="#">Hizmet Sözleşmesi</a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Alt Bölüm -->
    <div class="footer-bottom">
      <p>© Kahveborsam bir KENDİR DIŞ TİCARET markasıdır.</p>
      <img src="/assets/payment-methods.png" alt="Ödeme Yöntemleri" width="200" />
    </div>
  </footer>
</template>

<script lang="ts" setup>
// Footer için ek script işlemleri burada olabilir
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* İçerikleri sola yanaştır */
  background-color: #ece5dd;
  padding: 50px 15px;
  width: 100%;
  max-width: 1536px; /* Maksimum genişlik */
  height: 628px; /* Sabit yükseklik */
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1536px;
  padding-left: 0; /* Sol padding'i kaldır */
  margin-left: -50px; /* Sol margin'i kaldır */
}

.footer-logo {
  flex: 0 0 25%;
  margin-right: 10px; /* Sağdaki boşluğu daha da azalt */
  margin-left: 0; /* Sol margin'i kaldır */
}

.footer-description {
  font-size: 13px; /* Metin boyutu 13px */
  color: #071c1f; /* İsteğe bağlı: Metin rengi */
}

.footer-section {
  flex: 1;
  padding-left: 20px; /* Sol padding'i azalt */
  border-left: 1px solid #dddddd6e;
}

h5 {
  font-size: 16px;
  color: #071c1f;
  font-weight: bold;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 10px;
}

.footer-section ul li a {
  font-size: 13px;
  color: #071c1f;
  text-decoration: none;
}

.footer-section ul li a:hover {
  color: #f3b926;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid #dddddd6e;
  padding-top: 140px;
  padding-right: 50px;
  padding-left: 0; /* Alt bölümün sol padding'ini kaldır */
}

.social-icons a {
  color: #333;
  font-size: 15px;
  margin-right: 5px;
}

/* Butonu daraltmak için */
.narrow-button {
  padding: 5px 10px; /* Butonun iç padding'ini azalt */
  min-width: auto; /* Butonun minimum genişliğini otomatik yap */
}
</style>