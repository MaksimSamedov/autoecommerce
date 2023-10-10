import {Product} from "../../models/Products";
import {ProductListItem} from "./ProductListItem";
import '../../styles/catalog/ProductList.css'

interface ProductListProps {
    products: Product[],
}

export function ProductList({products}: ProductListProps) {
    return (
        <>
            {
                !!products.length && <>
                    <div className="flex flex-wrap">
                        {products.map(product => <ProductListItem product={product} key={product.id} /> )}
                    </div>
                </>
            }
            {!!products.length || <p>No products found</p>}
        </>
    );
}