import {Link, useLocation, useNavigate} from "react-router-dom";
import {ROUTE_CART, ROUTE_CATALOG, ROUTE_HOME, useRoute} from "../../config/routes";
import {tg} from "../../api/telegram/WebApp/WebApp";
import {useMainpage} from "../../lib/mainpage/mainpage";

export function Navigation() {
    const location = useLocation()
    const navigate = useNavigate()
    const showHeader = (location.pathname !== ROUTE_CART) || !tg.isTelegram()
    const {routes, setSlug} = useRoute()
    const {scrollTo} = useMainpage('mainpage')

    const handleNavigate = (route: string, position?: string) => {
        if(location.pathname !== route){
            navigate(route)
            position && setTimeout(() => scrollTo(position, false), 100)
        }else{
            position && setTimeout(() => scrollTo(position), 100)
        }
    }

    return (
        <div id="header"
             className="fixed bottom-0 left-0 right-0 z-[100] w-full flex justify-around w-sm-auto"
             style={{
                 transform: `translate(${showHeader ? 0 : -100}%)`
             }}
        >
            <span className="px-4 py-3 col-auto">
                <span className="hover:text-amber-100" onClick={() => handleNavigate(routes.home, 'top')}>
                    <i className="text-xl fas fa-home"></i>
                </span>
            </span>
            <span className="px-4 py-3 col-auto">
                <a onClick={() => handleNavigate(routes.home, 'compact')} className="hover:text-amber-100">
                    <i className="text-xl fas fa-search"></i>
                </a>
                {/*<Link to={routes.catalog} className="hover:text-amber-100">*/}
                {/*    <i className="text-xl fas fa-search"></i>*/}
                {/*</Link>*/}
            </span>
            <span className="px-4 py-3 col-auto">
                <span onClick={() => handleNavigate(routes.cart)} className="hover:text-amber-100">
                    <i className="text-xl fas fa-shopping-basket"></i>
                </span>
            </span>
        </div>
    );
}