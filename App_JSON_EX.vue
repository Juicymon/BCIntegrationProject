<template>
  <div class="app">
    <h1>Upload JSON File</h1>
    <input type="file" @change="handleFileUpload" accept="application/json" />

    <div v-if="Array.isArray(jsonData)" class="card-container">
      <ProductCard v-for="(item, index) in jsonData" :key="item.PCN + index" :product="item"></ProductCard>
    </div>

    <div v-else-if="jsonData" class="raw-json">
      <pre>{{ formattedJson(jsonData) }}</pre>
    </div>
  </div> 
</template> <!--end template-->

<script setup>
  import {ref} from 'vue';
  import { parse } from 'vue/compiler-sfc';
  import ProductCard from './components/ProductCard.vue';

  const jsonData = ref(null);

  const handleFileUpload = (event) =>{
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {
    try {
      const text = reader.result;
      const parsed = JSON.parse(text);
      jsonData.value = parsed;
    } catch (err) {
      console.error('Failed to parse JSON:', err.message);
      jsonData.value = null;
    }
  }
    reader.readAsText(file);
}

const formatJSON = (data) =>
  JSON.stringify(data, null, 2);

</script> <!--end script-->

<style scoped>
.app {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  font-family: sans-serif;
}

.card-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.raw-json {
  margin-top: 2rem;
  background-color: #f3f3f3;
  padding: 1rem;
  border-radius: 6px;
  white-space: pre-wrap;
}
</style> <!--end Style-->