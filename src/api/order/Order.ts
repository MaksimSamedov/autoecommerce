import {tg} from "../telegram/WebApp/WebApp";
import {api} from "../api";
import {ICartItem} from "../../services/CartService";

interface ICreateOrderDto {
    customer: string
    items: IOrderItemDto[]
}

interface  IPaymentInfo {
    paymentLink: string
    status: string
}

interface IOrderResponseDto {
    id: number,
    stage: string|number
    items: IOrderItemResponseDto[]
    paymentInfo: IPaymentInfo
}

interface IOrderItemDto {
    branchProductInfoId: number
    quantity: number
}

interface IOrderItemResponseDto extends IOrderItemDto {
    id: number
    price: number
    status: string
}

function mapCartItemsToOrderItems(items: ICartItem[]): IOrderItemDto[] {
    const res: IOrderItemDto[] = []
    items.forEach(item => {
        res.push({
            branchProductInfoId: item.product.id,
            quantity: item.quantity,
        })
    })
    return res
}

export function createOrder(cart_items: ICartItem[]): Promise<string|null> {
    return new Promise<string|null>(resolve => {
        const user_id = tg.getUserId()
        const order_items = mapCartItemsToOrderItems(cart_items)

        const dto: ICreateOrderDto = {
            customer: user_id,
            items: order_items,
        }

        fetch(
            api.route('/order/create'),
            {
                method: "POST",
                body: JSON.stringify(dto),
            },
        ).then(res => res.json())
            .then((dto: IOrderResponseDto|null) => {
                if(dto && dto.paymentInfo.paymentLink){
                    resolve(dto.paymentInfo.paymentLink)
                }else{
                    resolve(null)
                }
            })
    })
}

export function processToPayment(link: string) {
    tg.openLink(link)
}


