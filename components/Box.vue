<template>
    <div class="container-fluid" style="max-width: 1536px; height: 291px;">
      <div class="row h-100">
        <!-- İlk Box -->
        <div class="col-6 d-flex justify-content-center align-items-center">
          <div class="box-img">
            <img src="/assets/extension3.jpg" alt="Box 1 Görseli" class="img-fluid" />
          </div>
        </div>
  
        <!-- İkinci Box -->
        <div class="col-6 d-flex justify-content-center align-items-center">
          <div class="box-img">
            <img src="/assets/extension2.jpg" alt="Box 2 Görseli" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "Box",
  };
  </script>
  
  <style scoped>
  .box-img {
    width: 690px;
    height: 291px;
    overflow: hidden; /* Taşan görüntüyü gizlemek için */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .box-img img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Görsellerin düzgün görünmesi için */
    transition: all 0.8s linear; /* Hover efektine geçiş için */
  }
  
  .box-img:hover img {
    transform: scale(1.04); /* Hover sırasında yaklaşma efekti */
  }
  </style>
  