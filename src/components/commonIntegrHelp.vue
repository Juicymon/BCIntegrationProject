<template>
    <div>
        <h1>Selected Engine Type: </h1>
        <div v-show="enginePCNFound === 'mps'">
            <h2>MPS Engine</h2>
            <ul>
                <li>When plugging the DSR Ring cables in for an MPS engine, ensure you have connected them as follow: </li>
                <li>When building the model for an MPS engine, ensure you have selected the <b>'APS Enhanced'</b> options for the engine and sealer. </li>
            </ul>
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
            If your system does not have a rat, select <b>HEI - SF/AF</b>
        </p>
        <p>
            There are several common elements to add to most inserters when first building their models.
        </p>
        <ul>
            <li>
                <h2>Z-Order</h2>
                <p>
                    Once you have your model created, it is important to set the 
                    <span class="hover-text" @mouseenter="showOverlay('zOrder')" >Z-Order</span> 
                    for each module, starting at the engine.
                </p>
                <p>Common practice is to order everything upstream in values of 2 from the engine, and everything downstream in increments of 4. 
                    this allows for additions after the engine without a need to reorder.
                </p>
            </li>
            <li>
                <h2>Screen Outputs</h2>
                <p>
                    There are a few common elements to add in the 
                    <span class="hover-text" @mouseenter="showOverlay('screenOutputs')" >screen outputs</span> section:
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
                    <span class="hover-text" @mouseenter="showOverlay('systemControllers')" >system controller</span> section:
                </p>
                <ul>
                    <li>FOM Operator</li>
                    <li>FOM Reports</li>
                    <li>FOM Service</li>
                </ul>
            </li>
        </ul>
        <div v-if="overlayVisible" class="overlay">
            <img :src="images[hoveredKey]" class="overlay-image"  @mouseleave="hideOverlay" />
        </div>
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
    const overlayVisible = ref(false);
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
    
    const showOverlay = (key) =>{
        hoveredKey.value = key;
        overlayVisible.value = true;
    }
    const hideOverlay = () => {
        overlayVisible.value = false;
    }
</script> <!--End Script-->

<style scoped>
.hover-text {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}

.overlay{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.overlay-image{
    max-width: 80vw;
    max-height: 80vh;
    border: 3px solid white;
    border-radius: 8px;
    transition: opacity 0.3s ease;
}
</style>