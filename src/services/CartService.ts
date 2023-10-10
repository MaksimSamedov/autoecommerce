import {Product} from "../models/Products";


export class CartService {

    private static INSTANCE: CartService|null = null

    private items: ICartItem[]

    private constructor() {
        this.items = []
        this.Load()
    }

    public static Instance(): CartService
    {
        if(!CartService.INSTANCE) CartService.INSTANCE = new CartService();
        return CartService.INSTANCE;
    }

    public AddProduct(product: Product){
        for(let i = 0; i < this.items.length; i++){
            const prod = this.items[i]
            if(prod.id === product.id){
                prod.quantity++
                this.Save()
                return
            }
        }
        this.items.push({
            id: product.id,
            quantity: 1,
            product,
        })
        this.Save()
    }

    RemoveProduct(id: number){
        this.items = this.items.filter(item => item.id !== id)
        this.Save()
    }

    ChangeQuantity(id: number, delta: number): boolean
    {
        let result = false
        for(let i = 0; i < this.items.length; i++){
            const prod = this.items[i]
            if(prod.id === id){
                prod.quantity = Math.max(0, prod.quantity + delta)
                if(prod.quantity === 0){
                    this.items.splice(i, 1)
                    result = true
                    break
                }
                result = true
                break
            }
        }
        this.Save()
        return result
    }

    GetItems = () => {
        return [...this.items]
    }

    GetTotals = () => {
        let sum = 0
        this.items.forEach(item => sum += item.product.price * item.quantity)
        return {
            itemsCount: this.items.length,
            total: sum,
        }
    }

    GetCount = (id: number) => {
        let count = 0
        this.items.forEach(item => {
            if(item.id === id){
                count = item.quantity
            }
        })
        return count
    }

    Clear = () => {
        this.items = []
        this.Save()
    }

    private Save = () => {
        try{
            sessionStorage.setItem('cart', JSON.stringify(this.items))
        }catch (e) {}
    }

    private Load = () => {
        try{
            const json = sessionStorage.getItem('cart')
            if(json){
                this.items = JSON.parse(json)
            }
        }catch (e){}
    }
}

export interface ICartItem {
    id: number,
    quantity: number,
    product: Product,
}

export interface ICartTotals {
    itemsCount: number,
    total: number,
}


