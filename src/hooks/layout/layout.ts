

type listener = () => void
type Layout = {
    header: boolean
    isMobile: boolean
    listeners: listener[]
}

const layout: Layout = {
    header: true,
    isMobile: window.innerWidth < 768 || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)),
    listeners: [],
}
const runListeners = () => {
    layout.listeners.forEach(callback => callback())
}


export const getLayout = () => {
    return {
        header: () => layout.header,
        showHeader: (show: boolean) => {
            layout.header = show
            runListeners()
        },
        onChange: (callback: listener) => {
            if(layout.listeners.indexOf(callback) === -1){
                layout.listeners.push(callback)
            }
        },
        removeListener: (callback: listener) => {
            layout.listeners = layout.listeners.filter(cb => cb !== callback)
        },
        isMobile: () => layout.isMobile,
    }
}