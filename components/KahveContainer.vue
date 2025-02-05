<template>
  <div class="kahve-container">
    <div class="faq-section">
      <h1>Kahve En Çok Ticareti Yapılan İkinci Emtiadır</h1>
      <p class="description">
        Kahve herkesin sevdiği bir içecektir. Aynı zamanda petrolden sonra dünyanın en çok ticareti yapılan ikinci emtiasıdır. Kahvenin pek çok farklı türü ve tadı vardır ve pek çok farklı şekilde yapılabilir. Doğru ekipmana sahipseniz evde kendi kahvenizi yapabilirsiniz.
      </p>

      <div class="accordion">
        <!-- Her bir accordion item -->
        <div class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion('kahveCesitleri')">
            <span class="accordion-icon">{{ isOpen.kahveCesitleri ? '-' : '+' }}</span>
            <h2>Kahve çeşitleri nelerdir?</h2>
          </div>
          <div class="accordion-content" :class="{ 'active': isOpen.kahveCesitleri }">
            <p>Birçok farklı kahve türü vardır. Çekirdeğin türü ve dolayısıyla üzerinde yetiştiği ağacın türü, ne tür bir kahve elde edeceğinizi belirler. İki ana türü vardır: Arabica ve Robusta. Arabica daha pahalı ve daha kaliteli bir seçenektir, ancak her ikisi de sabah kahvenizi demlemek için kullanılabilir!</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion('kahveYapimi')">
            <span class="accordion-icon">{{ isOpen.kahveYapimi ? '-' : '+' }}</span>
            <h2>Kahve nasıl yapılır?</h2>
          </div>
          <div class="accordion-content" :class="{ 'active': isOpen.kahveYapimi }">
            <p>Kahvenin nasıl yapıldığını merak ediyor olabilirsiniz. Kahve, kahve bitkisinin kavrulmuş tohumlarının öğütülüp sıcak su ile demlenerek farklı bir tat ve aromaya sahip bir içecek haline getirilmesiyle elde edilir. Kahve, Avrupa ve Kuzey Amerika da dahil olmak üzere dünyanın birçok yerinde popüler bir içecektir. Evde yapılabilir veya kafelerde yapılanlar da tercih edilebilir. </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion('kahveDemleme')">
            <span class="accordion-icon">{{ isOpen.kahveDemleme ? '-' : '+' }}</span>
            <h2>Kahve nasıl demlenir?</h2>
          </div>
          <div class="accordion-content" :class="{ 'active': isOpen.kahveDemleme }">
            <p>Kahve, kahve bitkisinin kavrulmuş tohumlarından yapılır. Çekirdekler genellikle 200 santigrat derecede kavrulur ve ardından toz haline getirilir. Demleme işlemi çeşitli yöntemler kullanılarak yapılabilir: damlama, pres veya espresso gibi. Her yöntem, farklı seviyelerde asitlik ve gövde (içecekteki çözünmüş katı madde miktarı) ile farklı bir lezzet profili üretir. Örneğin espresso, diğer demleme yöntemlerine göre hacim başına daha fazla öğütülmüş kahve çekirdeği kullandığından damla kahveden daha fazla gövdeye sahiptir; bu aynı zamanda hazırlama sırasında daha az su eklendiğinden daha güçlü olmasını sağlar. </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion('iyiKahveler')">
            <span class="accordion-icon">{{ isOpen.iyiKahveler ? '-' : '+' }}</span>
            <h2>Hangi kahveler daha iyidir?</h2>
          </div>
          <div class="accordion-content" :class="{ 'active': isOpen.iyiKahveler }">
            <p>Kahve yapmanın ilk adımı biraz kahve çekirdeği edinmektir. Bunları çeşitli şekillerde satıldıkları bir marketten veya özel bir dükkandan alabilirsiniz: bütün çekirdekler (en yaygın olanı), öğütülmüş kahve veya hatta hazır kahve. Bütün çekirdekleri satın alır ve kendiniz öğütürseniz, lezzet önceden öğütülmüş kahve kullanmanızdan daha taze ve daha yoğun olacaktır. Farklı kahve türleri olduğunu duymuş olabilirsiniz; örneğin "light roast" veya "dark roast". Bu terimler arasındaki fark, demlemenizin gerçek renginden ziyade ne kadar süre kavrulduğu (ve dolayısıyla renginin ne kadar koyu olduğu) ile ilgilidir. Kavurma, bu tohum benzeri meyvede kimyasal değişikliklere neden olur; daha uzun süre kavurmak daha koyu kahverengi olmasını sağlar, ancak kavurma işlemi sırasında salınan yağların artması nedeniyle acılık seviyesini de artırır. </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-header" @click="toggleAccordion('kahveYetistirme')">
            <span class="accordion-icon">{{ isOpen.kahveYetistirme ? '-' : '+' }}</span>
            <h2>Kahve nerede yetişir?</h2>
          </div>
          <div class="accordion-content" :class="{ 'active': isOpen.kahveYetistirme }">
            <p>Tahmin edebileceğiniz gibi, kahve en iyi tropikal bölgelerde yetişir. Hawaii ve Florida gibi subtropikal bölgelerde de yetişebilir.Kahve bitkileri gelişmek için ılık sıcaklıklara ve bol yağmura ihtiyaç duyar, bu nedenle genellikle deniz seviyesinden 1.000 ila 6.500 fit yükseklikte yetiştirilirler. Kahve yetiştiricileri genellikle kahve ağaçlarını fazla güneşten korumak veya gün boyunca serin tutmak için yakınlarına başka ürünler ekerler. </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref({
  kahveCesitleri: false,
  kahveYapimi: false,
  kahveDemleme: false,
  iyiKahveler: false,
  kahveYetistirme: false
});

const toggleAccordion = (section: keyof typeof isOpen.value) => {
  isOpen.value[section] = !isOpen.value[section];
};
</script>

<style scoped>
.kahve-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
}

.faq-section {
  margin-bottom: 40px;
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
}

.description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.accordion {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #eee;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background: #fff;
  transition: background-color 0.3s;
}

.accordion-header:hover {
  background: #f9f9f9;
}

.accordion-icon {
  font-size: 24px;
  margin-right: 15px;
  color: black;
  width: 20px;
  text-align: center;
}

.accordion-header h2 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: #fff;
}

.accordion-content.active {
  max-height: 500px;
  padding: 20px;
}

.accordion-content p {
  margin: 0;
  color: black;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .kahve-container {
    padding: 20px;
  }

  h1 {
    font-size: 24px;
  }

  .accordion-header h2 {
    font-size: 16px;
  }
}
</style> 