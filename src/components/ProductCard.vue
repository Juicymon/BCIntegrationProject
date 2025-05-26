<template>
  <div class="product-card" ref="cardRef">
    <div class="card-header" @click="toggleExpanded">
      <h2>
        {{ product.PCN }} - {{ product.productName }} 
      </h2>
      <span class="toggle-icon">{{ isExpanded ? '−' : '+' }}</span>
    </div>

    <div v-if="isExpanded" class="card-body">
      <p v-html="product.productDesc"></p>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const cardRef = ref(null);
defineProps({
  product: Object
})

const isExpanded = ref(false)
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value

  if(isExpanded.value){
    nextTick(() =>{
      cardRef.value?.scrollIntoView({
        behavior: 'smooth', 
        block: 'center'
      });
    });
  };
}
</script> <!--end script-->


<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.toggle-icon {
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
}
</style> <!--end Style-->