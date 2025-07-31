<template>
    <div>
        <h1>- Before Building a Model -</h1>
        <div>
            <h2>Board Flashing</h2>
            <p>
                Before starting DC for the first time, you may want to flash the fireware of all your boards.
            </p>
            <p>
                A few notes before flashing board: 
            </p>
            <ul>
                <li>Do not attempt to flash more than one board at a time.</li>
                <li>Do not attempt to flash both the DSP and FPGA of a board together.</li>
                <li>Ensure DC is not already running, and there is no current RTP running in the background.</li>
                <li>DSP versions will change as they are programmed, but FPGA will require a restart.</li>
            </ul>
            <p> To flash the boards, do the following:</p>
            <ol>
                <li>Open the BlueCrest Tools folder on the desktop and launch the board-flash utility.</li>
                <li>Check your tech cert for the correct version of both DSP and FPGA to be flashing with.</li>
                <li>Under file selection, select either DSP or FPGA (Do NOT try to program both together).
                    Select the version as listed on the tech cert. 
                </li>
                <li>Right click on the outdated board, and click program.</li>
                <li>Wait until either the 'programming time' indicator has stopped, 
                    or check the CMD prompt to see if the programming is finished. 
                    (INSERT IMAGE OF CMD PROMPT WITH PROGRESS)</li>
                <li>Repeat these steps for every outdated board.</li>
                <li>When finished with either all DSP or FPGA, click the clear button
                     at the bottom and move to the next file.</li>
            </ol>
        </div>

        <h1>- Selected Engine Type -</h1>
        <EpicEngine v-if="enginePCNFound=== 'epic'"/>
        <RivalEngine v-if="enginePCNFound==='rival'"/>
        <EvoEngine v-if="enginePCNFound==='evo'" />
        <MpsEngine v-if="enginePCNFound==='mps'" />

    </div>
    <div>
        <!-- May need to add logic to detect if the user has NO Rat-->
        <h1>- Model Building -</h1>
        <p>
            There are several common elements to add to every model:
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
                    Common practice is to order everything upstream in values of 2 from the engine, 
                    and everything downstream in increments of 4. 
                    this allows for additions after the engine without a need to reorder.
                </p>
            </li>
            <li>
                <h2>Screen Outputs</h2>
                <p>
                    There are a few common elements to add in the 
                    <span class="hover-text" @mouseenter="showOverlay('screenOutputs')">
                        screen outputs</span> section:
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
                    <span class="hover-text" @mouseenter="showOverlay('systemControllers')">
                        system controller</span> section:
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
</script> <!--End Script-->

<style scoped>
</style>