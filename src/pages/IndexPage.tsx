import React, {BaseSyntheticEvent, useEffect, useReducer, useRef, useState} from "react";
import {ProductList} from "../components/catalog/ProductList";
import {getRelevantProducts} from "../models/Products";
import {Link} from "react-router-dom";
import {ROUTE_CATALOG} from "../config/routes";
import '../styles/indexPage.css'
import {tg} from "../api/telegram/WebApp/WebApp";
import {getWidget, useMainpage} from "../lib/mainpage/mainpage";
import {Catalog} from "../components/catalog/Catalog";
import {useApp} from "../app/Context";
import {BranchSelector} from "../components/catalog/branch/BranchSelector";
import {Branch} from "../api/shop/Branch";

function IndexPage()
{
    const products = getRelevantProducts(12)
    const {context, shop, branch} = useApp()

    const [, forceUpdate] = useReducer(x => x + 1, 0)

    const config = {
        defaultHeight: 300,
        maxImgViewportHeight: 0.7,
        imageOverlap: 40,
        stickyRange: 15,
    }
    const {img, overlay, container, notifications, title} = getWidget('mainpage', config).use()

    const handleChangeBranch = (branch: Branch) => {
        context.setBranch(branch)
        forceUpdate()
    }

    tg.hideMainButton()

    return (
        <>
            <img id="index-page-image" widget-id={img} key={0} src={shop.getImage()} alt="" />
            <div id="index-page" widget-id={container} key={1} className="w-full">
                <section id="index-shop-info" widget-id={overlay} key={2}>
                    <h1 widget-id={title} key={3}>{shop.getName()}</h1>
                    <div id="notifications" widget-id={notifications} key={4}><i className="fas fa-bell"></i></div>
                </section>
                <section id="index-content">
                    <div className="px-7 pt-4">
                        <BranchSelector currentBranch={branch} onChange={handleChangeBranch} />
                    </div>
                    { branch && <Catalog perPage={12} /> }
                </section>
            </div>
        </>
    )
}

export default IndexPage;