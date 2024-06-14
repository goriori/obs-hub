import {defineStore} from 'pinia'
import {ref} from 'vue'
import {calculateWidth} from "@/utils/helpers/calculateWidth.js";
import {calculateHeight} from "@/utils/helpers/calculateHeight.js";

export const useScreenStore = defineStore('screenStore', () => {
    const mainScreen = ref({
        id: 1,
        title: 'Main Screen',
        selector: 'main-screen',
        position: {
            x: 0,
            y: 0,
            width: calculateWidth(window.innerWidth, window.innerHeight),
            height: calculateHeight(window.innerHeight, window.innerWidth),
        },
    })

    return {
        mainScreen,
    }
})
