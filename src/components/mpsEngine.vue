<template>
    <div>
        <h2>MPS Engine</h2>
            <ul>
                <li>Ensure the DSR Cables at the engine have a crossover like this   
                    <span class="hover-text" @mouseenter="showOverlay('mpsEngineRingCross')">EXAMPLE</span>.
                </li>
                <li>When building the model for an MPS engine, ensure you have selected the 
                    <b>'APS Enhanced'</b> options for the engine and sealer. </li>
            </ul>
    </div>
    <div v-if="overlayVisible" class="overlay">
            <img :src="images[hoveredKey]" class="overlay-image"  @mouseleave="hideOverlay" />
        </div>
</template>

<script setup>
import { ref } from 'vue';
import { useImageOverlay } from './useImageOverlay';

   
    const {
        hoveredKey,
        images,
        showOverlay,
        hideOverlay,
        overlayVisible
        } = useImageOverlay()
</script>