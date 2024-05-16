import {defineStore} from 'pinia'
import {ref} from 'vue'
import {calculateWidth} from "@/utils/helpers/calculateWidth.js";
import {calculateHeight} from "@/utils/helpers/calculateHeight.js";

export const useScreenStore = defineStore('screenStore', () => {
    const screens = ref([
        {
            id: 1,
            title: 'Main Screen',
            type: 'main-screen',
            selector: 'main-screen',
            isFocus: false,
            isActive: false,
            position: {
                x: 0,
                y: 0,
                width: calculateWidth(window.innerWidth),
                height: calculateHeight(window.innerHeight)
            },
            component: null,
            show: true,
            external_scripts: {},
            monitor_index: 1,
            region: {
                x: 0,
                y: 0,
                width: 1920,
                height: 1080
            },
            "z-index": 0
        }
    ])


    const addScreen = (screen, captureType) => {
        const lastScreen = screens.value[screens.value.length - 1]
        screens.value.push({
            id: lastScreen.id + 1,
            type: captureType,
            ...screen
        })
    }
    const deleteScreen = (id) => {
        screens.value = screens.value.filter(screen => screen.id !== id)
    }
    const changePositionScreen = (id, position) => {
        const screen = screens.value.find(screen => screen.id === id)
        Object.assign(screen.position, position)
        Object.assign(screen.positionApplication, position)
    }
    const resizeScreen = (id, size) => {
        const screen = screens.value.find(screen => screen.id === id)
        Object.assign(screen.position, size)
        Object.assign(screen.positionApplication, size)
    }

    const getScreen = (id) => {
        return screens.value.find(screen => screen.id === id)
    }
    const getTypeScreens = () => {
        return screens.value.map(screen => screen.type)
    }
    const updateScreenList = (screenList) => {
        screens.value = screens.value.splice(0, 1)
        screens.value = [...screens.value, ...screenList]
    }
    return {
        screens,
        addScreen,
        deleteScreen,
        getScreen,
        getTypeScreens,
        changePositionScreen,
        resizeScreen,
        updateScreenList
    }
})
