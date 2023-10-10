import {Product} from "../../models/Products";
import {Modal} from "../layout/Modal";
import {ProductCard} from "./ProductCard";
import {useEffect, useState} from "react";
import '../../styles/catalog/ProductListItem.css';
import {formatPrice} from "../../utils/catalog/currency";
import {ModalBody} from "../layout/modal/ModalBody";
import {Quantity} from "../shared/Quantity";
import {ModalFooter} from "../layout/modal/ModalFooter";
import {CartService} from "../../services/CartService";
import {tg} from "../../api/telegram/WebApp/WebApp";


interface ProductProps {
    product: Product,
}

export function ProductListItem({product}: ProductProps) {
    const cart = CartService.Instance()
    const [count, setCount] = useState(cart.GetCount(product.id))
    const [details, setDetails] = useState(false)

    const price = formatPrice({
        price: product.price,
        currencyCode: product.currency,
    })

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

    const showDetails = () => {
        setDetails(true)
        tg.onBackButtonClick(hideDetails)
        tg.showBackButton()
    }
    const hideDetails = () => {
        setDetails(false)
        tg.hideBackButton()
    }

    useEffect(() => {
        return () => {
            if(details){
                tg.hideBackButton()
                tg.offBackButtonClick(hideDetails)
            }
        }
    }, [])

    return (
        <div className="w-1/2 sm:w-1/3 md:w-1/4 p-4 cursor-pointer product-list-item">
            <div className="product-list-item-image">
                <img src={product.image} onClick={() => showDetails()} />
            </div>
            <div className="product-list-item-info">
                <div className="product-list-item-price text-center">
                    <span className="product-price">{price}</span>
                </div>
                <h3 onClick={() => showDetails()} >{product.name}</h3>
                {details &&
                    <Modal title={product.name} key={1} onClose={() => hideDetails()}>
                        <ModalBody>
                            <div className="w-full">
                                <img src={product.image} className="block w-1/2 mx-auto"/>
                            </div>
                            <div>{product.description}</div>
                            {/*<ProductCard product={product} />*/}
                        </ModalBody>
                        <ModalFooter>
                            <div className="modal-footer-product">
                                <div className="product-price">{price}</div>
                                <div className="add-to-cart">
                                    {
                                        count > 0
                                            ? (
                                                <Quantity quantity={count} onIncrease={increase} onDecrease={decrease}/>
                                            )
                                            : (
                                                <button className="btn-add-to-cart btn-add-to-cart-text" onClick={addToCart}>В корзину</button>
                                            )
                                    }
                                </div>
                            </div>
                        </ModalFooter>
                    </Modal>
                }
            </div>
        </div>
    );
}