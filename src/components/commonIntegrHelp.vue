<template>
    <div>
        <h1>Selected Engine Type: </h1>
        <div v-show="enginePCNFound === 'mps'">
            <h2>MPS Engine</h2>
            <p>
                This is an MPS engine
            </p>
        </div>
        <div v-show="enginePCNFound === 'rival'">
            <h2>Rival Engine</h2>
            <p>
                This is a Rival engine
            </p>
        </div>
        <div v-show="enginePCNFound === 'evo'">
            <h2>Evolution Engine</h2>
            <p>
                This is an Evolution engine
            </p>
        </div>
        <div v-show="enginePCNFound === 'epic'">
            <h2>Epic Engine</h2>
            <p>
                This is an Epic engine
            </p>
        </div>
    </div>
    <div>
        <h1>Model Building</h1>
        <p>
            There are several common elements to add to most inserters when first building their models.
        </p>
        <ul>
            <li>
                <h2>Z-Order</h2>
                <p>
                    Once you have your model created, it is important to set the 
                    <span class="hover-text" @mouseenter="hoveredKey = 'zOrder'" @mouseleave="hoveredKey=null">Z-Order</span> 
                    for each module, starting at the engine.
                     <img v-show="hoveredKey === 'zOrder'" :src="images.zOrder" class="preview-image" alt= "Example of Z-Order in DC"/>
                </p>
                <p>Common practice is to order everything upstream in values of 2 from the engine, and everything downstream in increments of 4. 
                    this allows for additions after the engine without a need to reorder.
                </p>
            </li>
            <li>
                <h2>Screen Outputs</h2>
                <p>
                    There are a few common elements to add in the 
                    <span class="hover-text" @mouseenter="hoveredKey='screenOutputs'" @mouseleave="hoveredKey=null">screen outputs</span> section:
                    <img v-show="hoveredKey === 'screenOutputs'" :src="images.screenOutputs" class="preview-image" alt= "Example of Screen Outputs in DC"/>
                </p>
                <ul>
                        <li>Cycle Status Background</li>
                        <li>DC Banner</li>
                        <li>Input Cycle Indicator</li>
                        <li>Output Cycle Indicator</li>
                </ul>
            </li>
            <li>
                <h2>System Controller</h2>
                <p>
                    There are a few common elements to add in the 
                    <span class="hover-text" @mouseenter="hoveredKey='systemControllers'" @mouseleave="hoveredKey=null">system controller</span> section:
                    <img v-show="hoveredKey==='systemControllers'" :src="images.systemControllers" class="preview-image" alt="Example of System Controllers">
                </p>
                <ul>
                    <li>FOM Operator</li>
                    <li>FOM Reports</li>
                    <li>FOM Service</li>
                </ul>
            </li>
            <li>
                <h2></h2>
            </li>
        </ul>
     </div>
</template>

<script setup>
    import {ref, watch} from 'vue';

    const props = defineProps({
        csvData: {
            type: Array,
            required: true
        }
    })
    
    const enginePCNFound = ref('');
    const hoveredKey = ref(null);
    const images = {
        zOrder: new URL('@/assets/zOrderExample.png', import.meta.url).href,
        screenOutputs: new URL('@/assets/screenOutputsExample.png', import.meta.url).href,
        systemControllers: new URL('@/assets/systemControllers.png', import.meta.url).href,
    }

    watch(
        () => props.csvData,
        (newData) => {
            switch (true){
                case props.csvData.some(item => item.PCN.includes('Y561')):
                    enginePCNFound.value = 'mps';
                    break;
                case props.csvData.some(item => item.PCN.includes('Y234')):
                    enginePCNFound.value = 'rival';
                    break;
                case props.csvData.some(item => item.PCN.includes('ZRE0')):
                    enginePCNFound.value = 'evo';
                    break;
                case props.csvData.some(item => item.PCN.includes('EPIC')):
                    enginePCNFound.value = 'epic';
                    break;
            }
        },
        { immediate: true, deep: true });
</script> <!--End Script-->

<style scoped>
.hover-text {
    color: blue;
  text-decoration: underline;
  cursor: pointer;
}

.preview-image {
  display: block;
  margin-top: 1.2em;
  max-width: 50%;
  border: 2px solid #ccc;
}
</style>