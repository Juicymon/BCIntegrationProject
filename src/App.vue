<template>
  <div class="app">
    <div class="uploadFileDiv">
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" @change="handleCSVUpload" />
    </div>

     <div class="extraInfo"> 
      <div class="pageHeader" v-if="isVisible">
        <h1>* {{ workOrderNum }}    -    {{ companyName }} *</h1>
        <div class="contactInfo" v-if="temp">
          <h2>Contact</h2>
          <ul>
            <li>Sales: {{ salesRep }}</li>
            <li>CDE: {{ customerDev }}</li>
            <li>Manager: {{ manager }}</li>
          </ul>
        </div>
      </div>
    </div>
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

const isVisible = ref(false);
const csvData = ref([])
const workOrderNum = ref();
const companyName = ref();
const salesRep = ref();
const customerDev = ref();
const manager = ref();

const handleCSVUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  isVisible.value = true;

  Papa.parse(file, {
    header: false,
    skipEmptyLines: true,
    complete: (results) => {
      const rawRows = results.data
      const pcnRows = rawRows.slice(15)
      const matchedPCNs = new Set();

      // salesRep.value = rawRows[0]?.[5] || '';
      // customerDev.value = rawRows[1]?.[5] || '';
      // manager.value = rawRows[7]?.[5] || '';
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
.extraInfo{
  border-top: black solid;
}
.uploadFileDiv{
  padding: 0 0 2em 0;
}
.pageHeader{
  display: flex;
  justify-content: center;
  align-items: center;
}
.pageHeader h1{
   text-decoration: underline black .1em;
}
.contactInfo{
  padding-left: 20px;
  margin: 20px;
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
</style> <!--end Style-->