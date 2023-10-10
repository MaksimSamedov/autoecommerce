import {Navigation} from "./Navigation";
import {useRoute} from "../../config/routes";
import {useApp} from "../../app/Context";
import {useEffect, useRef, useState} from "react";
import {getViewport} from "../../hooks/layout/getViewport";
import {getLayout} from "../../hooks/layout/layout";

export function Header() {
    const {routes, setSlug} = useRoute()
    const {context, branch} = useApp()
    const viewport = getViewport()
    const layout = getLayout()

    const [show, setShow] = useState(!!branch)
    const [selectedBranch, setSelectedBranch] = useState(branch)

    useEffect(() => {
        context.onSwitchBranch((branch) => {
            setShow(!!branch && layout.header())
            setSelectedBranch(branch)
        })
        layout.onChange(() => {
            setShow(!!context.Branch() && layout.header())
        })
    }, [])

    useEffect(() => {
        if(show){
            // @ts-ignore
            viewport.setBottom(document.getElementById('header').clientHeight)
        }else{
            viewport.setBottom(0)
        }
    }, [show])

    return (
        show ? (
            <header className="w-full text-amber-300 text-lg uppercase">
                {/*<div className="container mx-auto pt-5 pb-0 flex flex-wrap justify-between px-5  pb-sm-5">*/}
                {/*<Link to={routes.home} className="w-full block text-center mb-1  mb-sm-0 w-sm-auto">Test shop 1.0</Link>*/}
                <Navigation />
                {/*</div>*/}
            </header>
        ) : (<></>)

    );
}