import {FakeMainButton} from "../main_button/IMainButton";

class WebApp {
    constructor() {
        this.tg = window.Telegram
        this.wa = window.Telegram.WebApp
        this.BackButton = (this.wa.platform !== 'unknown')
            ? this.wa.BackButton
            : FakeMainButton()
        console.log(this.wa.platform, this.tg)
        this.platform = (this.wa.platform !== 'unknown') ? this.wa.platform : null
    }

    showMainButton(){
        this.wa.MainButton.show()
    }

    hideMainButton(){
        this.wa.MainButton.hide()
    }

    setMainButtonText(text){
        this.wa.MainButton.text = text
    }

    onClick(cb){
        this.wa.MainButton.onClick = cb
    }

    setColor(color){
        this.wa.MainButton.color = color
    }

    getUserId(){
        return this.wa.initDataUnsafe.user.id + ''
    }

    openLink(link){
        this.wa.openLink(link)
    }

    showAlert(message, cb) {
        try{
            if(cb){
                this.wa.showAlert(message, cb)
            }else{
                this.wa.showAlert(message)
            }
        }catch (e){
            alert(message)
            cb && cb()
        }
    }

    showBackButton(){
        this.BackButton.show()
    }

    hideBackButton(){
        this.BackButton.hide()
    }

    onBackButtonClick(cb) {
        this.BackButton.onClick(cb)
    }

    offBackButtonClick(cb) {
        this.BackButton.offClick(cb)
    }

    isTelegram() {
        return this.tg && this.wa
    }

    WebApp() {
        return this.wa
    }
}

export const tg = new WebApp()