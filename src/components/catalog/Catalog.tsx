import {ProductList} from "./ProductList";
import React, {useEffect, useRef, useState} from "react";
import {findProducts, getProductsCount, Product, SORT_NAME_ASC, SORT_NAME_DESC} from "../../models/Products";
import {Loader} from "../Loader";
import {PerPage} from "./pagination/PerPage";
import {ShowMore} from "./pagination/ShowMore";
import '../../styles/catalog/Catalog.css';
import {useMainpage} from "../../lib/mainpage/mainpage";
import {Shop} from "../../api/shop/Shop";
import {Branch} from "../../api/shop/Branch";
import {useApp} from "../../app/Context";
import {getViewport} from "../../hooks/layout/getViewport";
import {getLayout} from "../../hooks/layout/layout";

let check = 0
async function fetchProducts(search: string|undefined, page:number, size:number, sorting: string|undefined){
    const products = await findProducts(search, page, size, sorting)
    const totalCount = await getProductsCount()
    return {products, totalCount}
}

interface CatalogProps {
    perPage?: number
}

export function Catalog(props: CatalogProps) {
    const size = props.perPage ?? 12
    const [random,] = useState(Math.random())

    const [state, setState] = useState(0)
    const forceUpdate = () => setState(state + 1)

    const {branch} = useApp()

    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")
    const [detach, setDetach] = useState(false)
    const [sorting, setSorting] = useState<string|undefined>("default")
    const [productsList, setProductsList] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)
    const [ended, setEnded] = useState(false)

    const {scrollTo} = useMainpage('mainpage')

    const viewport = getViewport()
    const [top, setTop] = useState(viewport.top())
    const [bottom, setBottom] = useState(viewport.bottom())

    const layout = getLayout()

    useEffect(() => {
        const handler = () => {
            setTop(viewport.top())
            setBottom(viewport.bottom())
        }
        viewport.onResize(handler)
        return () => {
            viewport.removeListener(handler)
        }
    }, [])

    useEffect(() => {
        loadProducts(page, 500)
        return () => setLoading(false)
    }, [search, size, sorting])

    const loadProducts = (page: number, timeout: number): Promise<void> => {
        const _check = ++check
        return new Promise(resolve => {
            setTimeout(() => {
                if(_check !== check) return;

                setLoading(true)
                // if(page <= 0){
                //     setProductsList([])
                // }

                setTimeout(async () => {
                    const {products, totalCount} = await fetchProducts(search, page, size, sorting)
                    if(_check !== check) return resolve();

                    if(page <= 0){
                        setProductsList([...products])
                    }else{
                        setProductsList([...productsList, ...products])
                    }
                    // console.log('loaded', page, search);

                    setEnded(products.length < size)

                    setPage(Math.max(0, page))
                    setLoading(false)

                    forceUpdate()
                    return resolve()
                }, 100)
            }, timeout)
        })
    }

    const [searchValue, setSearchValue] = useState("")
    const handleSearch = (s: string) => {
        setPage(0)
        setSearchValue(s)
        if(s.trim() !== search.trim()){
            setSearch(s)
        }
        scrollTo('compact')
    }

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
        scrollTo("compact")
        setDetach(true)
        if(layout.isMobile()){
            layout.showHeader(false)
        }
    }

    const handleBlur = () => {
        setDetach(false)
        scrollTo('compact')
        layout.showHeader(true)
    }

    const handleSubmit:  React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log('submit');
        // @ts-ignore
        document?.activeElement?.blur()
        setDetach(false)
        scrollTo('compact')
        layout.showHeader(true)
    }

    useEffect(() => {
        setPage(0)
        loadProducts(0, 0)
            .then(() => scrollTo('compact'))
    }, [branch])

    const loadingClass = loading ? 'loading' : ''

    return (
        <div className={"catalog pt-3 " + loadingClass}>
            <div className="flex justify-between items-center px-7">
                <div className="grow w-[300px] pr-5">
                    <form className={detach ? 'detached-search' : ''}
                          style={{top: `${top}px`, bottom: `${bottom}px`}}
                          onSubmit={handleSubmit}
                    >
                        <input
                            type="search" placeholder="Search products..."
                            className="block w-full outline-0 p-0 catalog-search shadow-none"
                            value={searchValue}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </form>
                </div>
                <div className="grow-0 catalog-filter-toggler">
                    { (loading && page <= 0) ? (
                        <i className="loader"></i>
                    ) : (
                        <i className="fas fa-filter"></i>
                    ) }
                    {/*<select className="h-full text-sm md:text-lg pl-5 rounded" onChange={e => setSorting(e.target.value)}>*/}
                    {/*    <option value="default">Relevance</option>*/}
                    {/*    <option value={SORT_NAME_ASC}>Name (A-Z)</option>*/}
                    {/*    <option value={SORT_NAME_DESC}>Name (Z-A)</option>*/}
                    {/*</select>*/}
                </div>
            </div>
            <div className="pt-5 relative">
                { productsList.length > 0 ? (
                    <>
                        <ProductList products={productsList} />
                        { !ended && <ShowMore key={random} onLoadMore={() => loadProducts(page + 1, 50)} />}
                    </>
                ) : (
                    !loading && <p>No products found matching your selection</p>
                )}
            </div>
        </div>
    );
}