<template>
    <div>
        <h1>- Before Building a Model -</h1>
        <div>
            <h2>Board Flashing</h2>
            <p>
                Before starting DC for the first time, you may want to flash the fireware of all your boards. 
                If DC is already running, please exit DC and ensure the RTP has stopped. 
                To flash the boards, do the following:
            </p>
            <ol>
                <li>Open the BlueCrest Tools folder on the desktop and launch the board-flash utility.</li>
                <li>Check your tech cert for the correct version of both DSP and FPGA to be flashing with.</li>
                <li></li>
            </ol>
        </div>

        <h1>- Selected Engine Type -</h1>
        <EpicEngine v-if="enginePCNFound=== 'epic'"/>
        <RivalEngine v-if="enginePCNFound==='rival'"/>
        <EvoEngine v-if="enginePCNFound==='evo'" />
        <MpsEngine v-if="enginePCNFound==='mps'" />
       <!--  <div v-show="enginePCNFound === 'mps'">
            <h2>MPS Engine</h2>
            <ul>
                <li>Ensure the DSR Cables at the engine have a crossover like this   
                    <span class="hover-text" @mouseenter="showOverlay('mpsEngineRingCross')" >EXAMPLE</span>.
                </li>
                <li>When building the model for an MPS engine, ensure you have selected the <b>'APS Enhanced'</b> options for the engine and sealer. </li>
            </ul>
        </div>
 -->
     <!--    <div v-show="enginePCNFound === 'rival'">
            <h2>Rival Engine</h2>
        </div>

        <div v-show="enginePCNFound === 'evo'">
            <h2>Evolution Engine</h2>
        </div -->

        <!-- <div v-show="enginePCNFound === 'epic'">
            <h2>Epic Engine</h2>
                <ul>
                    <li>
                        <a href="https://bluecrestinc.sharepoint.com/sites/ProductSupportContent/Shared%20Documents/Product%20Support%20Content/Parts%20Lists/Epic%20v3%20Auto%20Adjust%20Chassis%20and%20Engine%20Parts%20Guide.pdf#search=epic"
                        target="_blank">Epic V3 Engine and Chassis Parts Guide</a>
                    </li>
                    <li>
                        <a href="https://bluecrestinc.sharepoint.com/sites/ProductSupportContent/Shared%20Documents/Product%20Support%20Content/Service%20Manuals%20and%20Procedures/Epic%20v3.1%20Service%20Manual%20Vol2.pdf#search=zvb5"
                        target="_blank">Epic Service Manual</a>
                    </li>
                </ul>
        </div> -->
    </div>
    <div>
        <!-- May need to add logic to detect if the user has NO Rat-->
        <h1>- Model Building -</h1>
        <p>
            There are several common elements to add to every model.
        </p>
        <ul>
            <li>
                <h2>Z-Order</h2>
                <p>
                    Once you have your model created, it is important to set the 
                    <span class="hover-text" @mouseenter="showOverlay('zOrder')" >Z-Order</span> 
                    for each module, starting at the engine.
                </p>
                <p>
                    Common practice is to order everything upstream in values of 2 from the engine, and everything downstream in increments of 4. 
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
    import EpicEngine from './epicEngine.vue';
    import RivalEngine from './rivalEngine.vue';
    import EvoEngine from './evoEngine.vue';
    import MpsEngine from './mpsEngine.vue';

    const enginePCNFound = ref('');

    const props = defineProps({
        csvData: {
            type: Array,
            required: true
        }
    })

    import { useImageOverlay } from './useImageOverlay';
        const {
            hoveredKey,
            images,
            showOverlay,
            hideOverlay,
            overlayVisible
        } = useImageOverlay()

    /* const hoveredKey = ref(null);
    const overlayVisible = ref(false);
    const images = {
        zOrder: new URL('@/assets/images/zOrderExample.png', import.meta.url).href,
        screenOutputs: new URL('@/assets/images/screenOutputsExample.png', import.meta.url).href,
        systemControllers: new URL('@/assets/images/systemControllers.png', import.meta.url).href,
        mpsEngineRingCross: new URL('@/assets/images/mpsRingCross.png', import.meta.url).href,
    }; */

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
        {immediate: true, deep: true});
    
   /*  const showOverlay = (key) =>{
        hoveredKey.value = key;
        overlayVisible.value = true;
    }
    const hideOverlay = () => {
        overlayVisible.value = false;
    } */
</script> <!--End Script-->

<style scoped>
/* .hover-text {
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
} */
</style>