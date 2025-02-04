<template>
    <div class="error-container">
      <div class="error-content">
        <!-- Hata Kodu -->
        <h1 class="error-code">404</h1>
        
        <!-- Ana Mesaj -->
        <h2 class="error-title">Oops! That page can’t be found.</h2>
        
        <!-- Açıklama -->
        <p class="error-description">
            THE PAGE YOU ARE LOOKING FOR DOES NOT EXITS
        </p>
        
        <!-- Ana Sayfa Bağlantısı -->
        <p class="home-text">
            Please return to 
          <NuxtLink to="/Anasayfapage" class="home-link">Home page</NuxtLink>
        </p>
  
        <!-- Arama Çubuğu -->
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search..."
            class="search-input"
          >
          <button class="search-button">
            <i class="bi bi-search"></i>
          </button>
        </div>
  
      </div>
    </div>
  </template>
  
  <style scoped>
  .error-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 60px 20px;
  }
  
  .error-code {
    font-size: 120px;
    color: black;
    margin: 0;
    line-height: 1;
  }
  
  .error-title {
    font-size: 32px;
    color: black;
    margin: 20px 0;
  }
  
  .error-description {
    color: #a8a8a8;
    font-size: 18px;
    margin-bottom: 40px;
  }
  
  .home-link {
    display: inline-block;
    background: white;
    color: #f3b926;
    text-decoration: none;
    margin-bottom: 10px;
  }
  

  .search-container {
    display: flex;
    gap: 10px;
    max-width: 500px;
    margin: 0 auto 30px;
  }
  
  .search-input {
    flex: 1;
    padding: 17px 17px;
    border: 2px solid #ddd;
    font-size: 12px;
  }
  
  .search-button {
    background: black;
    color: white;
    border: none;
    width: 50px;
    transition: all 0.3s;
  }
  
  .search-button:hover {
    background: #f3b926;
  }
  
  
  @media (max-width: 768px) {
    .error-code {
      font-size: 80px;
    }
    
    .error-title {
      font-size: 24px;
    }
  }
  </style>