import interact from 'interactjs'
import { useBuilderProjectStore } from '@/stores/builderStore/builderProjectStore'

export const useInteract = () => {
    const builderProjectStore = useBuilderProjectStore()
    const initInteract = (block) => {
        const node = document.querySelector(`[data-uuid="${block.uuid}"]`)
        node.setAttribute(
            'data-x',
            String(block.x / builderProjectStore.currentProject.widgets.proportionX)
        )
        node.setAttribute(
            'data-y',
            String(block.y / builderProjectStore.currentProject.widgets.proportionX)
        )
        interact(`[data-uuid="${block.uuid}"]`)
            .draggable({
                modifiers: [
                    interact.modifiers.restrictRect({
                        restriction: 'parent',
                    }),
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                    }),
                ],
                listeners: {
                    start: (e) => {
                        const target = e.target
                        builderProjectStore.setCurrentBlock(block)

                        target.setAttribute(
                            'data-x',
                            builderProjectStore.currentBlock.x /
                            builderProjectStore.currentProject.widgets.proportionX
                        )
                        target.setAttribute(
                            'data-y',
                            builderProjectStore.currentBlock.y /
                            builderProjectStore.currentProject.widgets.proportionX
                        )
                    },
                    end: (e) => {
                        const target = e.target
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy
                        // тут еще записываем в стор координаты
                        builderProjectStore.currentBlock.x =
                            x * builderProjectStore.currentProject.widgets.proportionX
                        builderProjectStore.currentBlock.y =
                            y * builderProjectStore.currentProject.widgets.proportionX
                    },
                    // call this function on every dragmove event
                    move: (e) => {
                        const target = e.target
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy
                        // translate the element
                        target.style.left = x + 'px'
                        target.style.top = y + 'px'

                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                    },
                },
            })
            .resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },

                listeners: {
                    start: () => {
                        builderProjectStore.setCurrentBlock(block)
                    },
                    end: (e) => {
                        const target = e.target
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy
                        builderProjectStore.currentBlock.x =
                            x * builderProjectStore.currentProject.widgets.proportionX
                        builderProjectStore.currentBlock.y =
                            y * builderProjectStore.currentProject.widgets.proportionX
                        // тут еще записываем в стор координаты
                        builderProjectStore.currentBlock.width =
                            e.rect.width *
                            builderProjectStore.currentProject.widgets.proportionX
                        builderProjectStore.currentBlock.height =
                            e.rect.height *
                            builderProjectStore.currentProject.widgets.proportionX
                    },
                    move(e) {
                        const target = e.target
                        let x = parseFloat(target.getAttribute('data-x')) || 0
                        let y = parseFloat(target.getAttribute('data-y')) || 0

                        // update the element's style
                        target.style.width = e.rect.width + 'px'
                        target.style.height = e.rect.height + 'px'

                        // translate when resizing from top or left edges
                        x += e.deltaRect.left
                        y += e.deltaRect.top

                        target.style.left = x + 'px'
                        target.style.top = y + 'px'

                        target.setAttribute('data-x', x)
                        target.setAttribute('data-y', y)
                    },
                },
                modifiers: [
                    // keep the edges inside the parent
                    interact.modifiers.restrictEdges({
                        outer: 'parent',
                    }),
                ],
            })
    }
    return { initInteract }
}