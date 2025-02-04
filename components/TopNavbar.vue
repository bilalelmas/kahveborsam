<template>
  <div v-if="isVisible" class="top-navbar">
    <!-- WhatsApp ikonu ve yazısı -->
    <div class="whatsapp-container">
      <i class="bi bi-whatsapp whatsapp-icon"></i>
      <span class="whatsapp-text">
        WhatsApp : <span class="phone-number">0537 320 3107</span>
      </span>
    </div>

    <!-- İndirimli Ürünler Butonu Link -->
    <a href="/TheUrunlerPage" class="btn discount-button">İNDİRİMLİ ÜRÜNLER</a>

    <!-- Kapatma Butonu -->
    <button @click="closeNavbar" class="close-btn">
      <span>X</span>
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "TopNavbar",
  data() {
    return {
      isVisible: true, // Navbar görünürlüğünü kontrol eden state
    };
  },
  methods: {
    closeNavbar() {
      this.isVisible = false; // Kapatıldığında gizlenecek
      this.$emit("close-topnavbar"); // Parent bileşene TopNavbar'ın kapandığını bildir
    },
  },
};
</script>

<style scoped>
.top-navbar {
  width: 100%;
  height: 60px;
  background-color: #26254f;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Position'ı relative yapıyoruz */
  top: 0;
  left: 0;
  z-index: 1050;
}

.whatsapp-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.whatsapp-icon {
  font-size: 32px;
  color: #25d366;
  margin-right: 10px;
}

.whatsapp-text {
  font-size: 18px;
  display: inline-block;
  color: white;
}

.discount-button {
  font-size: 11px;
  font-weight: 600;
  padding: 5px 13px;
  color: #212529;
  background-color: #fff;
  border: none;
  margin-left: 10px;
  border-radius: 15px;
  text-decoration: none;
}

.discount-button:hover {
  background-color: #000;
  color: #fff;
}

.close-btn {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
}
</style>
