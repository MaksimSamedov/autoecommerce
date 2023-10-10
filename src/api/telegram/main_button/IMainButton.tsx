import React, {DOMElement} from "react";

export interface IMainButton {
    isVisible: boolean
    onClick(cb: () => void): void
    offClick(cb: () => void): void
    show(): void
    hide(): void
}

interface callable {
    (): void
}

class LocalMainButton implements IMainButton {

    private static INSTANCE: LocalMainButton

    private readonly element: HTMLElement
    private text: string
    private callbacks: callable[]
    public isVisible: boolean

    private constructor() {
        this.element = document.createElement('div')
        this.text = ""
        this.isVisible = false
        this.callbacks = []
        this.render()
    }
    public static getInstance(): IMainButton {
        if(!LocalMainButton.INSTANCE){
            LocalMainButton.INSTANCE = new LocalMainButton()
        }
        return LocalMainButton.INSTANCE
    }
    onClick(cb: () => void) {
        this.callbacks.push(cb)
    }
    offClick(cb: () => void) {
        this.callbacks = this.callbacks.filter(c => c !== cb)
    }
    show() {
        this.isVisible = true
        this.element.style.display = 'block'
    }
    hide() {
        this.isVisible = false
        this.element.style.display = 'none'
    }

    private render(): void {
        const id = 'telegram_main_button'
        const exists = document.getElementById(id)
        if(exists){
            exists.remove()
        }

        this.element.id = id
        this.element.innerText = '«'
        this.element.addEventListener('click', e => {
            this.callbacks.forEach(cb => {
                cb()
            })
        })
        this.renderStyles()
        document.body.appendChild(this.element)
    }

    private renderStyles(): void {
        this.element.style.display = 'none'
        this.element.style.position = 'absolute'
        this.element.style.top = '10px'
        this.element.style.left = '10px'
        this.element.style.width = '40px'
        this.element.style.height = '40px'
        this.element.style.padding = '5px'
        this.element.style.fontSize = '20px'
        this.element.style.lineHeight = '26px'
        this.element.style.textAlign = 'center'
        this.element.style.backgroundColor = '#fff'
        this.element.style.borderRadius = '50%'
        this.element.style.border = '1px solid grey'
        this.element.style.zIndex = '100000'
    }
}

// const tg = window.Telegram.WebApp
// const mainButton = tg.MainButton

const local = true

export const FakeMainButton = () => LocalMainButton.getInstance()
