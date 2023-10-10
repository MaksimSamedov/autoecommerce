import {CartService, ICartItem} from "../../services/CartService";
import {Quantity} from "../shared/Quantity";

export interface CartItemProps {
    item: ICartItem,
    onIncrease(): void,
    onDecrease(): void,
}

export function CartItem({item, onIncrease, onDecrease}: CartItemProps) {
    console.log({item, onIncrease, onDecrease})
    const cart = CartService.Instance()
    const product = item.product

    return (
        <tr>
            <td className="p-4">{product.name}</td>
            <td className="p-4">
                <Quantity quantity={item.quantity} onIncrease={onIncrease} onDecrease={onDecrease}/>
            </td>
            <td className="p-4">{item.quantity * product.price}</td>
        </tr>
    );
}