<template>
  <div class="app">
    <div class="uploadFileDiv">
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" @change="handleCSVUpload" />
    </div>

    <div class="pageHeader"><h1>* {{ workOrderNum }}    -    {{ companyName }} *</h1></div>
    <div class="card-container" v-if="csvData.length">
      <commonIntegrHelp :csv-data="csvData" />
      <ProductCard
        v-for="(item, index) in csvData"
        :key="item.PCN + index"
        :product="item"
      />
    </div> 
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Papa from 'papaparse'
import ProductCard from './components/ProductCard.vue'
import commonIntegrHelp from './components/commonIntegrHelp.vue'
import { productData } from './assets/productData.js'

const csvData = ref([])
const workOrderNum = ref();
const companyName = ref();
const handleCSVUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  Papa.parse(file, {
    header: false,
    skipEmptyLines: true,
    complete: (results) => {
      const rawRows = results.data
      const pcnRows = rawRows.slice(15)
      const matchedPCNs = new Set();
      workOrderNum.value = rawRows[0]?.[0] || '';
      companyName.value = rawRows[0]?.[3] || '';

      csvData.value = pcnRows
        .map(row => row[2]) 
        .filter(pcn => !!pcn) 
        .map(pcn => {
          const matchKey = Object.keys(productData).find(key => pcn.includes(key))
          if (!matchKey || matchedPCNs.has(matchKey)) return null
          matchedPCNs.add(matchKey)

          return {
            PCN: matchKey,
            productName: productData[matchKey].productName,
            productDesc: productData[matchKey].productDesc
          }
        })
        .filter(Boolean)
        
      },
      error: (err) => {
        console.error('CSV parse error:', err)
      }
  })
}
</script> <!--end script-->

<style scoped>
.uploadFileDiv{
  padding: 0 0 2em 0;
}
.pageHeader{
  align-content: center;
  justify-content: center;
  display: flex;
  border-top: black solid;
  text-decoration: underline;
}
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
  margin-top: 1em;
}

.raw-json {
  margin-top: 2rem;
  background-color: #f3f3f3;
  padding: 1rem;
  border-radius: 6px;
  white-space: pre-wrap;
}
</style> <!--end Style-->