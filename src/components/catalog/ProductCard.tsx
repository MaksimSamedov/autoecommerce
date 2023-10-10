import {Product} from "../../models/Products";
import {CartService} from "../../services/CartService";
import {useState} from "react";
import {Quantity} from "../shared/Quantity";

interface ProductCardProps {
    product: Product,
}

export function ProductCard({product}: ProductCardProps) {
    const cart = CartService.Instance()
    const [count, setCount] = useState(cart.GetCount(product.id))

    const addToCart = () => {
        cart.AddProduct(product)
        setCount(1)
    }
    const increase = () => {
        cart.ChangeQuantity(product.id, 1)
        setCount(count + 1)
    }
    const decrease = () => {
        cart.ChangeQuantity(product.id, -1)
        setCount(count - 1)
    }

    return (
        <>
            <div className="w-full">
                <img src={product.image} className="block w-1/2 mx-auto"/>
            </div>
            <p>{product.price}{product.currency}</p>
            <div>{product.description}</div>
            <div>
                {
                    count > 0
                        ? (
                            <Quantity quantity={count} onIncrease={increase} onDecrease={decrease}/>
                        )
                        : (
                            <button className="btn btn-green" onClick={addToCart}>Add to cart</button>
                        )
                }
            </div>
        </>
    );
}