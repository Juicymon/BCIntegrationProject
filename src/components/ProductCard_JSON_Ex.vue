<template>
    <div class="card" ref="cardRef">
        <div class="card-header" @click="toggleOpen"> 
            <h2>{{product.productName}}</h2> 
            <button class="toggle-btn"> {{ isOpen ? '-' : '+' }}</button>
        </div>

        <div v-if="isOpen" class="card-body">
            <p><strong>PCN:</strong>{{product.PCN}}</p>
            <p><strong>Description:</strong>{{ product.productDesc }}</p>
        </div>
    </div>
</template> <!--end template-->

<script setup>
    import { ref, nextTick } from 'vue';

    defineProps({
        product:{
            type: Object, 
            require: true
        }
    });

    const isOpen = ref(false);
    const cardRef = ref(null);

    const toggleOpen = () =>{
        isOpen.value = !isOpen.value;
        
        if (isOpen.value) {
    nextTick(() => {
      cardRef.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
        }
    }
    


</script> <!--end script-->


<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9f9f9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.toggle-btn {
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
}

.card-body {
  margin-top: 0.5rem;
}
</style> <!--end Style-->