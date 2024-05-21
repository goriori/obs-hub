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
            width: calculateWidth(window.innerWidth),
            height: calculateHeight(window.innerHeight)
        },
    })
    const screens = ref([])


    const addScreen = (screen, captureType) => {
        const lastScreen = screens.value[screens.value.length - 1]
        screens.value.push({
            id: lastScreen?.id + 1,
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
    const changeZIndexScreen = (id, zIndex) => {
        const screen = screens.value.find(screen => screen.id === id)
        screen['z-index'] = zIndex
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
        screens.value = [...screenList]
    }

    const updateScreenListIndex = () => {
        const listScreen = screens.value.map((screen, index) => screen)
            .filter(screen => screen)
            .sort((a, b) => b['z-index'] - a['z-index'])
        updateScreenList(listScreen)
    }


    return {
        mainScreen,
        screens,
        addScreen,
        deleteScreen,
        getScreen,
        getTypeScreens,
        changePositionScreen,
        changeZIndexScreen,
        resizeScreen,
        updateScreenList,
        updateScreenListIndex
    }
})
