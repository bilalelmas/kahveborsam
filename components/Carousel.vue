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
}

.carousel-inner img {
  width: 100%;
  height: 100%;
  object-fit: contain;
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
</style>
