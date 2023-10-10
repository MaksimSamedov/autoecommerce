import React, {lazy, Suspense} from "react";
import {tg} from "../api/telegram/WebApp/WebApp";
// import { Catalog } from "../components/catalog/Catalog";
const Catalog = lazy(() =>
    import('../components/catalog/Catalog')
        .then(({ Catalog }) => ({ default: Catalog })),
);

export function CatalogPage() {
    tg.hideMainButton()
    return (
        <>
            {/*<section className="container mx-auto py-5 lg:py-12 px-5">*/}
            {/*    <h1 className="text-xl">Catalog</h1>*/}
            {/*</section>*/}
            <section className="container mx-auto py-5 lg:py-12 px-5">
                <Suspense fallback={<p>Loading...</p>}>
                    <Catalog />
                </Suspense>
            </section>
        </>
    );
}