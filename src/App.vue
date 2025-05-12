<template>
  <div class="app">
    <h1>Upload CSV File</h1>
    <input type="file" accept=".csv" @change="handleCSVUpload" />

    <div class="card-container" v-if="csvData.length">
      <commonIntegrHelp>
      </commonIntegrHelp>
      <ProductCard
        v-for="(item, index) in csvData"
        :key="item.PCN + index"
        :product="item"
      />
    </div>

    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'
import ProductCard from './components/ProductCard.vue'
import commonIntegrHelp from './components/commonIntegrHelp.vue'

// Holds parsed PCNs from CSV
const csvData = ref([])

// Local product metadata JSON
const productData = ref([])

// Load product data JSON once on mount
onMounted(async () => {
  const res = await fetch('/productData.json') // Make sure this file is in /public
  productData.value = await res.json()
})

/**
 * Triggered when the user uploads a CSV file
 * Parses the CSV, extracts PCNs from column C starting at row 16,
 * filters out PCNs not in productData, and replaces them with enriched info
 */
const handleCSVUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  Papa.parse(file, {
    header: false,
    skipEmptyLines: true,
    complete: (results) => {
      const rawRows = results.data

      // Get rows from row 16 onward
      const pcnRows = rawRows.slice(15)

      // Extract column C (index 2), filter by known PCNs, map with extra info
      /**
         const seen = new Set();
         csvData.value = pcnRows
        .map(row => row[2]) // get column C
        .filter(pcn => !!pcn) // remove empty
        .filter(pcn => {
          if (seen.has(pcn)) return false
          seen.add(pcn) 
          return true
        })
        .map(pcn => {
          // Try to find matching PCN in our metadata
          const match = productData.value.find(item => pcn.includes(item.PCN))
          return match || null // ignore unknown PCNs
        })
        .filter(item => item !== null) // remove unmatched
       */
      const matchedPCNs = new Set();

      csvData.value = pcnRows
        .map(row => row[2]) // get column C
        .filter(pcn => !!pcn) // remove empty
        .map(pcn => {
          // Try to find a metadata PCN that exists anywhere inside the CSV PCN
          return productData.value.find(item => pcn.includes(item.PCN)) || null
        })
        .filter(item => {
          if (!item) return false
          if (matchedPCNs.has(item.PCN)) return false
          matchedPCNs.add(item.PCN)
          return true
        })
        
      },
      error: (err) => {
        console.error('CSV parse error:', err)
      }
  })
}
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