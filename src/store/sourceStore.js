import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSourceStore = defineStore('sourceStore', () => {
    const sources = ref({
        virtual_camera: {
            external_scripts: [],
            width: 1920,
            height: 1080,
            fps: 30
        },
        video_sources: {
            "webcam": {
                "id": 2,
                "show": false,
                "external_scripts": [],
                device_index: 0,
                "resolution": {
                    "width": 1280,
                    "height": 720
                },
                "position": {
                    "x": 0,
                    "y": 0,
                    "width": 640,
                    "height": 360
                },
                "z-index": 0,
                "dshow_settings": true
            },
            "screen": {
                "id": 1,
                "show": true,
                "external_scripts": {},
                "monitor_index": 1,
                "region": {
                    "x": 0,
                    "y": 0,
                    "width": 1920,
                    "height": 1080
                },
                "position": {
                    "x": 0,
                    "y": 0,
                    "width": 1920,
                    "height": 1080
                },
                "z-index": 1
            }
        }
    })
    const addSource = (sourceName, source) => {
        sources.value['video_sources'][sourceName] = source
    }
    const getSource = (sourceName) => {
        return sources.value['video_sources'][sourceName]
    }

    const updateSource = (sourceName, newSource) => {
        sources.value['video_sources'][sourceName] = newSource
    }
    const changeZIndex = (sourceName, zIndex) => {
        console.log('changeZIndex', sourceName, zIndex)
        sources.value['video_sources'][sourceName]['z-index'] = zIndex
    }
    return {
        sources,
        addSource,
        getSource,
        updateSource,
        changeZIndex
    }
})
