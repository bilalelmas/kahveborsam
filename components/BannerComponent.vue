<template>
  <div class="banner-container position-relative">
    <!-- Arka Plan Görseli -->
    <div class="banner-background" :style="{ backgroundImage: `url(${bannerBackground})` }"></div>

    <!-- Bilgi Alanı (Sol tarafta) -->
    <div class="info-box position-absolute">
      <h2 class="info-title">Neden Kahveborsam?</h2>
      <ul class="info-list">
        <li>Türkiye’nin kahve emtiası olan ilk e-ticaret sitesi.</li>
        <li>Fiyat eşitliği ve şeffaflık sağlayan anlayış.</li>
        <li>Dünya kahve borsasına göre dengeli ve uygun fiyat belirleme.</li>
        <li>Aracısız ilk elden kahve alabilme avantajı.</li>
        <li>7/24 ulaşılabilir WhatsApp destek hattı hizmeti.</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import nedenkb from '~/assets/nedenkb.webp';
const bannerBackground = nedenkb;
</script>

<style scoped>
/* Banner Container */
.banner-container {
  width: 100%;
  max-width: 1536px;
  height: 800px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* İçeriği sola hizala */
  overflow: hidden;
}

/* Arka Plan Görseli */
.banner-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* Bilgi Alanı */
.info-box {
  position: relative; /* Üstüne oturması için relative kullan */
  margin-left: 5%;
  z-index: 2;
  max-width: 1040px;
}

.info-title {
  font-size: 45px; /* Büyük font boyutu */
  font-weight: bold;
  margin-bottom: 40px; /* 1 satır boşluk bırak */
  color: #f3b926; /* Belirtilen başlık rengi */
}

.info-list {
  list-style-type: disc;
  font-size: 18px; /* Metin boyutu */
  color: #fff; /* Beyaz renk */
  margin: 0;
}
.info-list li {
  margin-bottom: 4px;
}
</style>