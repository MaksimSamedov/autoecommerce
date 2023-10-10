import {getLayout} from "./layout";


type listener = () => void

type Viewport = {
    top: number
    bottom: number
    left: number
    right: number
    listeners: listener[]
}

const viewport: Viewport = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    listeners: [],
}
const runListeners = () => {
    viewport.listeners.forEach(callback => callback())
}

getLayout().onChange(() => {
    if(!getLayout().header()){
        viewport.bottom = 0
        runListeners()
    }
})

export const getViewport = () => {
    return {
        top: () => viewport.top,
        bottom: () => viewport.bottom,
        left: () => viewport.left,
        right: () => viewport.right,
        onResize: (callback: listener) => {
            if(viewport.listeners.indexOf(callback) === -1){
                viewport.listeners.push(callback)
            }
        },
        removeListener: (callback: listener) => {
            viewport.listeners = viewport.listeners.filter(cb => cb !== callback)
        },
        setTop: (top: number) => {
            if(viewport.top !== top){
                viewport.top = top
                setTimeout(runListeners, 0)
            }
        },
        setBottom: (bottom: number) => {
            if(viewport.bottom !== bottom){
                viewport.bottom = bottom
                setTimeout(runListeners, 0)
            }
        },
    }
}