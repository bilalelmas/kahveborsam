<template>
    <div class="container-fluid" style="max-width: 1536px; height: 173.2px;">
      <div class="row h-100">
        <!-- Taze Kahve Kısmı -->
        <div class="col-4 d-flex justify-content-center align-items-center" style="height: 173.2px;">
          <div class="text-center no-select">
            <img src="/assets/tazekahve.png" alt="Taze Kahve İkonu" class="icon mb-2" />
            <h4>TAZE KAHVE</h4>
            <p>Size özel, istediğiniz şekilde kavurur.</p>
          </div>
        </div>
  
        <!-- Hızlı Teslimat Kısmı -->
        <div class="col-4 d-flex justify-content-center align-items-center" style="height: 173.2px;">
          <div class="text-center no-select">
            <img src="/assets/ht.webp" alt="Hızlı Teslimat İkonu" class="icon mb-2" />
            <h4>HIZLI TESLİMAT</h4>
            <p>Ürün devamlılığında sorun yaşatmaz.</p>
          </div>
        </div>
  
        <!-- Taksitli Satış Kısmı -->
        <div class="col-4 d-flex justify-content-center align-items-center" style="height: 173.2px;">
          <div class="text-center no-select">
            <img src="/assets/taksit.png" alt="Taksitli Satış İkonu" class="icon mb-2" />
            <h4>TAKSİTLİ SATIŞ</h4>
            <p>Taksitli ödeme kolaylığı sunar.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "ContainerComponent",
  };
  </script>
  
  <style scoped>

  .icon {
    width: 50px;
    height: 50px;
  }
  
  h4 {
    font-size: 18px;
    font-weight: 650;
    color: #26254f;
  }
  
  p {
    font-size: 14px;
    font-weight: 550;
  }
  
  /* Metin Seçimini Engelleme */
  .no-select {
    user-select: none;
  }
  </style>
  