<template>
  <div 
    id="carouselExampleIndicators" 
    class="carousel slide" 
    data-bs-ride="carousel" 
  >
    <!-- Indicators -->
    <div class="carousel-indicators">
      <button 
        type="button" 
        data-bs-target="#carouselExampleIndicators" 
        data-bs-slide-to="0" 
        class="active" 
        aria-current="true" 
        aria-label="Slide 1"></button>
      <button 
        type="button" 
        data-bs-target="#carouselExampleIndicators" 
        data-bs-slide-to="1" 
        aria-label="Slide 2"></button>
    </div>

    <!-- Slides -->
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/assets/carousel/carousel1.jpg" class="d-block w-100" alt="Slide 1">
      </div>
      <div class="carousel-item">
        <img src="/assets/carousel/carousel2.jpg" class="d-block w-100" alt="Slide 2">
        <div class="carousel-caption">
          <p class="caption-text">İSTER TEK TORBA, İSTER TONLARCA</p>
          <h2 class="caption-title">Kahvede Avantaj<br>Kahveborsam'da</h2>
          <nuxt-link to="/TheUrunlerPage" class="btn-kahve">KAHVELERİ İNCELE</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props: Header'ın yüksekliği parent bileşenden alınır

</script>

<style scoped>
.carousel {
  width: 1536px;
  height: 720px;
  margin: 0 auto;
  position: relative;
}

.carousel-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #6c757d;
}

.carousel-indicators .active {
  background-color: #fff;
}

.carousel-caption {
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  text-align: left;
  width: 100%;
  max-width: 800px;
  padding-left: 50px;
}

.caption-text {
  font-size: 18px;
  color: white;
  letter-spacing: 2px;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: left;
}

.caption-title {
  font-size: 64px;
  color: white;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 1.2;
  text-align: left;
}

.btn-kahve {
  display: inline-block;
  padding: 15px 30px;
  background: transparent;
  color: white;
  border: 2px solid white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.btn-kahve:hover {
  background: white;
  color: black;
}

@media (max-width: 768px) {
  .carousel-caption {
    left: 30%;
    padding-left: 20px;
  }
  
  .caption-title {
    font-size: 36px;
  }
  
  .caption-text {
    font-size: 14px;
  }
  
  .btn-kahve {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
