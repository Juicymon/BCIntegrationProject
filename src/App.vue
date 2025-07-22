<template>
   <nav class="navigationBar">
         <div class="commonLinks">
            <ul>
                <li> <a href="https://bluecrestinc.sharepoint.com/sites/DanburyManufacturingOperations/Final%20Work%20Orders/Forms/Descending.aspx?CT=1736953193989&OR=OWA%2DNT%2DMail&CID=f816cac7%2D8e95%2Dce42%2D9d19%2D69bae41c15a8&clickParams=eyJYLUFwcE5hbWUiOiJNaWNyb3NvZnQgT3V0bG9vayBXZWIgQXBwIiwiWC1BcHBWZXJzaW9uIjoiMjAyNTAxMDMwMDIuMTUiLCJPUyI6IldpbmRvd3MgMTEifQ%3D%3D" target='_blank'>
                    Work Orders</a></li>
                <li> <a href="https://bluecrestinc.sharepoint.com/sites/DanburyManufacturingOperations/SOW%20Archive/Forms/AllItems.aspx?xsdata=MDV8MDJ8am9leS5zdGVpZ2VyQGJsdWVjcmVzdGluYy5jb218MWRlYTc5MWVlM2ZlNGE2NjFiOTUwOGRkMzU3NTBlY2J8ODMxMGYwMzZmZThkNDcwMmExZTAxNzdlOTMyMDIyN2N8MHwwfDYzODcyNTQ5OTA3MTA5MzAzMXxVbmtub3dufFRXRnBiR1pzYjNkOGV5SkZiWEIwZVUxaGNHa2lPblJ5ZFdVc0lsWWlPaUl3TGpBdU1EQXdNQ0lzSWxBaU9pSlhhVzR6TWlJc0lrRk9Jam9pVFdGcGJDSXNJbGRVSWpveWZRPT18MHx8fA%3D%3D&sdata=WERTK0Fra0d4T21rcERkdUQrWjFZSFZlRkpRQTQrRkFNOTNRdnlCZm5xOD0%3D&CT=1736953241255&OR=OWA-NT-Mail&CID=3d60e83d-0099-2542-d86e-677fff3d1a95&clickParams=eyJYLUFwcE5hbWUiOiJNaWNyb3NvZnQgT3V0bG9vayBXZWIgQXBwIiwiWC1BcHBWZXJzaW9uIjoiMjAyNTAxMDMwMDIuMTUiLCJPUyI6IldpbmRvd3MgMTEifQ%3D%3D" target="_blank">
                    Statements of Work</a></li>
                <li><a href="https://bluecrestinc.sharepoint.com/sites/DanburyManufacturingOperations/Tech%20Certification%20Documents/Forms/AllItems.aspx?viewpath=%2Fsites%2FDanburyManufacturingOperations%2FTech%20Certification%20Documents%2FForms%2FAllItems%2Easpx" target="_blank">
                    Tech Certs</a></li>
                <li><a href="https://bluecrestinc.sharepoint.com/sites/ProductSupportContent/SitePages/Home.aspx" target="_blank">
                    Global Product Support</a></li>
                <li>
                  <input class="otherUpload" type="file" accept=".csv" @change="handleCSVUpload" />
                </li>
            </ul>  
        </div>
    </nav>
  <div class="app">
    <div v-if="!fileFound" class="uploadFileDiv">
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" @change="handleCSVUpload" />
    </div>

    <div v-if="fileFound" class="pageHeader"><h1>{{ workOrderNum }}    -    {{ companyName }}</h1></div>
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
import {ref, triggerRef} from 'vue'
import Papa from 'papaparse'
import ProductCard from './components/ProductCard.vue'
import commonIntegrHelp from './components/commonIntegrHelp.vue'
import { productData } from './assets/productData.js'

const isVisible = ref(false);
const csvData = ref([])
const workOrderNum = ref();
const companyName = ref();
const fileFound = ref(false);

const handleCSVUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  fileFound.value = true;  

  Papa.parse(file, {
    header: false,
    skipEmptyLines: true,
    complete: (results) => {
      const rawRows = results.data
      const pcnRows = rawRows.slice(15)
      const matchedPCNs = new Set();
      
      //salesRep.value = rawRows[0]?.[5] || '';
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
  justify-content: center;
  text-decoration: underline;
  display: flex;
}
.app {
  max-width: 80%;
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
.navigationBar ul{
  list-style-type: none;
  margin:0;
  padding: 0;
  background: gray;
  overflow: hidden;
}
.navigationBar li{
  float: left;
}
.navigationBar li a{
  color: white;
  display: block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.navigationBar li a:hover{
  background: blue;
}
.otherUpload{
  color: transparent;
  padding: 1em;
}

</style> <!--end Style-->