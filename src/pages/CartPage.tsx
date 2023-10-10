import React, {useEffect, useState} from "react";
import {CartService} from "../services/CartService";
import {CartItem} from "../components/cart/CartItem";
import {tg} from "../api/telegram/WebApp/WebApp";
import {createOrder, processToPayment} from "../api/order/Order";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {ROUTE_CATALOG, useRoute} from "../config/routes";
import {getViewport} from "../hooks/layout/getViewport";
import {useMainpage} from "../lib/mainpage/mainpage";

export function CartPage() {
    const cart = CartService.Instance()
    const navigate = useNavigate()

    const [page, setPage] = useState(1)
    const [items, setItems] = useState(cart.GetItems())
    const totals = cart.GetTotals()
    const [loading, setLoading] = useState(false)
    const {routes} = useRoute()
    const {scrollTo} = useMainpage('mainpage')

    const clear = () => {
        cart.Clear()
        setItems(cart.GetItems())
    }
    const onChange = (id: number, delta: number) => {
        cart.ChangeQuantity(id, delta)
        setItems(cart.GetItems())
    }

    const onClear = () => {
        cart.Clear()
        setItems(cart.GetItems())
    }

    const checkout = () => {
        if(loading) return
        setLoading(true)
        createOrder(items).then(link => {
            if(!link){
                setLoading(false)
                tg.showAlert('Error while opening payment link.')
                return
            }
            processToPayment(link)
        })
            .catch(reason => {
                setLoading(false)
                tg.showAlert('Error while creating order.')
            })
    }

    const handleBack = () => {
        navigate(routes.home)
        setTimeout(() => scrollTo('compact', false), 100)
    }


    useEffect(() => {
        tg.setMainButtonText('Make order')
        tg.showMainButton()
        tg.showBackButton()
        tg.onBackButtonClick(handleBack)
        return () => {
            tg.hideBackButton()
            tg.offBackButtonClick(handleBack)
        }
    }, [])

    return (
        <section className="mx-auto w-auto py-5 lg:py-12 px-5">
            <h1 className="text-xl">Cart</h1>
            {totals?.total > 0 && <>
                <table className="border border-collapse table-auto my-7 w-full">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Name</th>
                        <th className="p-2">Quantity</th>
                        <th className="p-2">Total</th>
                    </tr>
                    </thead>
                    <tbody className="bg-gray-100">
                    {
                        items?.map((item, i) => (
                            <CartItem
                                key={i}
                                item={item}
                                onIncrease={() => onChange(item.id, 1)}
                                onDecrease={() => onChange(item.id, -1)}
                            />
                        ))
                    }
                    </tbody>
                    <tfoot className="bg-gray-200">
                    <tr>
                        <th className="p-2">Total</th>
                        <th className="p-2"></th>
                        <th className="p-2">{totals?.total}</th>
                    </tr>
                    </tfoot>
                </table>
                <div>
                    <button className="btn btn-red" onClick={onClear}>Clear cart</button>
                    {/*<Link to={ROUTE_CART} className="btn btn-green ml-3 inline-block">Checkout</Link>*/}
                    <button className="btn btn-green ml-3 inline-block" onClick={checkout} disabled={loading}>Checkout</button>
                </div>
            </>}
            {totals?.total === 0 && <p>Cart is empty</p>}
        </section>
    );
}