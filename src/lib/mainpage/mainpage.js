import {getViewport} from "../../hooks/layout/getViewport";

const viewport = getViewport()
export class Mainpage {

    constructor(name, config) {
        this.name = name
        this.idPrefix = "widget-" + name + "-"
        this.buildSelectors()

        this.img = null
        this.overlay = null
        this.container = null
        this.notifications = null
        this.title = null
        this.config = config

        this.isImageLoaded = false

        this.loopTimeout = null

        // provide elements
        this.refreshElements('all')
        
        // initialize calculated fields
        this.height = 0
        this.scroll = 0
        this.realImgHeight = 0
        this.compactBreakpoint = 0
        // setup default values for calculated fields
        this.setup()

        console.log({widget: this})
        
        this.registerListeners()

        this.background()
    }

    buildSelectors(){
        this.selectors = {
            img: this.idPrefix + "image",
            overlay: this.idPrefix + "overlay",
            container: this.idPrefix + "container",
            notifications: this.idPrefix + "notifications",
            title: this.idPrefix + "title",
        }
    }

    registerListeners = () => {
        window.addEventListener('scroll', this.onScroll)
        window.addEventListener('resize', this.onResize)
    }
    
    setup = () => {
        this.height = this.config.defaultHeight
        this.scroll = window.pageYOffset
    }

    onImgLoaded = () => {
        console.log('img loaded')
        this.isImageLoaded = true
        this.height = this.img.clientHeight ? this.img.clientHeight : 0
        this.loop()
    }

    onScroll = () => {
        this.scroll = window.pageYOffset
        this.moveImage()
        this.loop()
    }

    onResize = () => {
        if(this.img){
            if(this.img.clientHeight) {
                this.height = this.img.clientHeight
            }
            this.moveImage()
        }
        this.loop()
    }

    background = () => {
        this.loop()
        setInterval(this.loop, 30)
    }

    refreshElements(keys){
        if(keys === 'all'){
            keys = ['img', 'overlay', 'container', 'notifications', 'title']
        }
        keys.forEach(key => {
            this[key] = document.querySelector(`[widget-id="${this.selectors[key]}"]`)
        })
        if(keys.indexOf('img') !== -1){
            if(this.img && !this.isImageLoaded){
                if(this.img.complete){
                    this.onImgLoaded()
                }else{
                    this.img.addEventListener('load', this.onImgLoaded)
                }
            }
        }
    }

    moveImage = () => {
        // Image offset (parallax with gap)

        let gapImg
        if(window.outerHeight > 600){
            gapImg = 151
        }else{
            gapImg = 50
        }
        const imgOffset = (this.scroll <= gapImg) ? 0 : (gapImg - this.scroll) * 0.3
        if(this.img){
            this.img.style.transform = `translateY(${imgOffset}px)`
        }
    }

    loop = () => {
        window.clearTimeout(this.loopTimeout)
        this.loopTimeout = setTimeout(() => {
            this.refreshElements('all')
            if(!this.validate()) {
                return
            }

            this.realImgHeight = Math.min(this.height, window.outerHeight * this.config.maxImgViewportHeight)

            const notificationTop = this.notifications.getBoundingClientRect().top + this.notifications.clientHeight / 2


            // Sticky header
            let state = 'default'
            const shopNameBottom = 50
            const contentTop = this.realImgHeight - this.config.imageOverlap
            const shopNameHeight = this.title.clientHeight / 2
            const stickyBreakpoint = contentTop - (shopNameHeight + shopNameBottom) - notificationTop
            // console.log()
            // console.log({realImgHeight: this.realImgHeight, height: this.height})
            // console.log({scrollTop, stickyBreakpoint})
            // console.log({shopNameHeight, shopNameBottom, notificationTop})
            if(this.scroll >= stickyBreakpoint){
                this.overlay.classList.add('sticky')
                state = 'sticky'
            }else{
                this.overlay.classList.remove('sticky')
            }


            // Sticky compact header

            const compactBreakpoint = stickyBreakpoint + 30
            if(this.scroll >= compactBreakpoint + this.config.stickyRange){
                this.overlay.classList.add('sticky', 'sticky-compact')
                state = 'compact'
            }else if(this.scroll < compactBreakpoint - this.config.stickyRange){
                this.overlay.classList.remove('sticky-compact')
            }
            this.compactBreakpoint = compactBreakpoint


            // Image opacity

            const shopNameTop = this.title.getBoundingClientRect().top + this.title.clientHeight / 2
            const bgStage = Math.min(1, notificationTop / shopNameTop + 0.1)
            this.img.style.opacity = 1 - (bgStage * bgStage)

            this.draw()

            let eatTop = 0
            if(state === 'sticky' || state === 'compact'){
                eatTop = this.overlay.clientHeight
            }
            setTimeout(() => viewport.setTop(eatTop), 0)
        }, 5)
    }

    draw = () => {
        this.container.style.paddingTop = `${this.realImgHeight - this.config.imageOverlap}px`
        this.overlay.style.height = `${this.realImgHeight - this.config.imageOverlap}px`
    }

    validate(){
        const deps = [
            this.img,
            this.overlay,
            this.container,
            this.notifications,
            this.title,
        ]
        return deps.filter(arg => !arg).length === 0
    }

    use(){
        return this.selectors
    }

}

window.CustomMainpageWidgets = window.CustomMainpageWidgets || {}
if(window.CustomMainpageWidgets.length){
    Object.keys(window.CustomMainpageWidgets).forEach(key => {
        delete window.CustomMainpageWidgets[key]
    })
}
export const getWidget = (name, config) => {
    if(!(name in window.CustomMainpageWidgets)){
        window.CustomMainpageWidgets[name] = new Mainpage(name, config)
    }

    return window.CustomMainpageWidgets[name]
}

export const useMainpage = (name) => {
    const widget = () => window.CustomMainpageWidgets[name]
    return {
        scrollTo: (pos, smooth = true) => {
            //console.log(widget(), pos)
            if(!widget()) return
            const behavior = smooth ? 'smooth' : 'auto'
            switch (pos){
                case 'compact':
                    const top = widget().compactBreakpoint + widget().config.stickyRange + 1
                    window.scrollTo({top, behavior})
                    break
                case 'top':
                    window.scrollTo({top: 0, behavior})
                    break
            }
        },
    }
}

