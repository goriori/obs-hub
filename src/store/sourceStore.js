import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useSourceStore = defineStore('sourceStore', () => {
    // full - момент отпускания мышки
// fast - момент перетаскивания и ресайза
    const update_aspects = ref([]) // [webcam, screen, scripts(при манипуляциях со скриптом всегда отправлять)]
    const update_type = ref('fast')
    const scripts = ref([])
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
                "show": false,
                "external_scripts": [],
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
    const addAspect = (aspect = 'webcam') => {
        update_aspects.value.push(aspect)
    }
    const addScript = (script, sourceName) => {
        scripts.value.push({source: sourceName, ...script})
        if (!sourceName) return
        if (sources.value['video_sources'][sourceName].external_scripts === undefined) return
        if (sourceName === 'virtual_camera') sources.value['virtual_camera'].external_scripts.push(script)
        else sources.value['video_sources'][sourceName].external_scripts.push(script)
    }
    const getSource = (sourceName) => {
        return sources.value['video_sources'][sourceName]
    }
    const getConfig = () => {
        return {
            update_aspects: update_aspects.value,
            update_type: update_type.value,
            config: sources.value
        }
    }
    const updateAspects = (aspects = ['webcam', 'screen']) => {
        update_aspects.value = aspects
    }
    const updateActiveScript = (id, active) => {
        const script = scripts.value.find(script => script.id === id)
        script.enabled = active
        sources.value.video_sources[script.source].external_scripts.find(script => script.id === id).enabled = active

    }
    const updateSource = (sourceName, newSource) => {
        sources.value['video_sources'][sourceName] = newSource
    }
    const updateType = (type = 'full' || 'fast') => {
        update_type.value = type
    }

    const updateShow = (sourceName, show) => {
        sources.value['video_sources'][sourceName].show = show
    }

    const updateResolutionVirtualCamera = ({width, height}) => {
        Object.assign(sources.value.virtual_camera, {width, height})
    }
    const changeZIndex = (sourceName, zIndex) => {
        console.log('changeZIndex', sourceName, zIndex)
        sources.value['video_sources'][sourceName]['z-index'] = zIndex
    }

    const deleteAspect = (aspect) => {
        update_aspects.value = update_aspects.value.filter(a => a !== aspect)
    }

    const deleteScript = (id) => {
        const script = scripts.value.find(script => script.id === id)
        if (!script) return
        sources.value.video_sources[script.source].external_scripts = sources.value.video_sources[script.source].external_scripts.filter(script => script.id !== id)

    }
    return {
        sources,
        scripts,
        addSource,
        addAspect,
        addScript,
        getSource,
        getConfig,
        updateAspects,
        updateActiveScript,
        updateSource,
        updateType,
        updateShow,
        updateResolutionVirtualCamera,
        changeZIndex,
        deleteAspect,
        deleteScript

    }
})
