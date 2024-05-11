import {defineStore} from 'pinia'
import {ref} from 'vue'
import scriptService from "@/API/scriptService/scriptService.js";

export const useSourceStore = defineStore('sourceStore', () => {
    // full - момент отпускания мышки
    // fast - момент перетаскивания и ресайза
    const update_aspects = ref([]) // [webcam, screen, scripts(при манипуляциях со скриптом всегда отправлять)]
    const update_type = ref('fast')
    const scripts = ref([])
    const sources = ref({})
    const defaultSources = {
        "virtual_camera": {"external_scripts": [], "width": 1920, "height": 1080, "fps": 30},
        "video_sources": {
            "webcam": {
                "id": 2,
                "show": false,
                "external_scripts": [],
                "device_index": 0,
                "resolution": {"width": 1280, "height": 720},
                "position": {"x": 0, "y": 0, "width": 569, "height": 320},
                "z-index": 1,
                "dshow_settings": true
            },
            "screen": {
                "id": 1,
                "show": false,
                "external_scripts": [],
                "monitor_index": 1,
                "region": {"x": 0, "y": 0, "width": 1920, "height": 1080},
                "position": {"x": 0, "y": 0, "width": 1920, "height": 1080},
                "z-index": 0
            }
        }
    }
    const loadScript = async (loadData) => {
        return await scriptService.loadScript(loadData)
    }
    const addSource = (sourceName, source) => {
        sources.value['video_sources'][sourceName] = source
    }
    const addAspect = (aspect = 'webcam') => {
        update_aspects.value.push(aspect)
    }
    const addScript = (script, sourceName) => {
        if (!sourceName) return
        scripts.value.push({source: sourceName, ...script})
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
    const updateActiveScript = (name, active) => {
        console.log(name, active)
        const script = scripts.value.find(script => script.name === name)
        script.enabled = active
        sources.value.video_sources[script.source].external_scripts.find(script => script.name === name).enabled = active

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
        sources.value['video_sources'][sourceName]['z-index'] = zIndex
    }

    const deleteAspect = (aspect) => {
        update_aspects.value = update_aspects.value.filter(a => a !== aspect)
    }

    const deleteScript = (name) => {
        const script = scripts.value.find(script => script.name === name)
        if (!script) return
        scripts.value = scripts.value.filter(script => script.name !== name)
    }
    const deleteScriptServer = async (deleteData) => {
        return await scriptService.deleteScript(deleteData)
    }
    return {
        sources,
        scripts,
        defaultSources,
        loadScript,
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
        deleteScript,
        deleteScriptServer

    }
})
