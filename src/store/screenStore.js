import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useScreenStore = defineStore('screenStore', () => {
    const screens = ref([
        {
            id: 1,
            title: 'Main Screen',
            type: 'main-screen',
            selector: 'main-screen',
            isFocus: false,
            size: {
                width: 1920,
                height: 1080
            },
            position: {
                x: 0,
                y: 0
            },
            component: null
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
        screens.value.find(screen => screen.id === id).position = position
    }
    const resizeScreen = (id, size) => {
        screens.value.find(screen => screen.id === id).size = size
    }
    const updateScreenList = (screenList) => {
        screens.value = screens.value.splice(0, 1)
        screens.value = [...screens.value, ...screenList]
    }
    return {
        screens,
        addScreen,
        deleteScreen,
        changePositionScreen,
        resizeScreen,
        updateScreenList
    }
})
