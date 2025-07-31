import { ref } from "vue";

export function useImageOverlay(){

    const hoveredKey = ref(null);
    const overlayVisible = ref(false);

    const images = {
        zOrder: new URL('@/assets/images/zOrderExample.png', import.meta.url).href,
        screenOutputs: new URL('@/assets/images/screenOutputsExample.png', import.meta.url).href,
        systemControllers: new URL('@/assets/images/systemControllers.png', import.meta.url).href,
        mpsEngineRingCross: new URL('@/assets/images/mpsRingCross.png', import.meta.url).href,
        boardFlashUtility: new URL('@/assets/images/BoardFlashUtility.png', import.meta.url).href,
        boardFlashProgram: new URL('@/assets/images/BoardFlashProgram.png', import.meta.url).href,
        shutdownRTP: new URL('@/assets/images/RTPShutdown.png', import.meta.url).href,
    };

     const showOverlay = (key) =>{
        hoveredKey.value = key;
        overlayVisible.value = true;
    }
    const hideOverlay = () => {
        overlayVisible.value = false;
    }

    return{
        hoveredKey,
        images,
        showOverlay,
        hideOverlay,
        overlayVisible
    }
}