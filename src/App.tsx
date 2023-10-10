import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import {Header} from "./components/layout/Header";
import {CatalogPage} from "./pages/CatalogPage";
import './index.css';
import './styles/default.css'
import {CartPage} from "./pages/CartPage";
import {useRoute} from "./config/routes";
// import {useStomp} from "usestomp-hook/lib";
// import { useCookies } from 'react-cookie'

function App() {
    const [messages, setMessages] = useState([])
    const {routes} = useRoute()

    // const authType = "TELEGRAM"
    // const authorization = "query_id=AAG5PicrAAAAALk-JyvmEY3Y&user=%7B%22id%22%3A723992249%2C%22first_name%22%3A%22%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%22%2C%22last_name%22%3A%22%D0%A1%D0%B0%D0%BC%D0%B5%D0%B4%D0%BE%D0%B2%22%2C%22username%22%3A%22DioxiD36%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1693075936&hash=22e622a46a2ab7c9f7810ad6704bf9c099045caa1b285a225243d31420877d56&botId=1"
    // const [cookies, setCookie] = useCookies(['AuthType', 'Authorization'])
    // setCookie('AuthType', authType)
    // setCookie('Authorization', authorization)
    //
    //
    // const url:string = String(process.env.REACT_APP_WS_URL) + String(process.env.REACT_APP_ORDER_API_URL_ROUTE) + '/socket'
    // const { disconnect, subscribe, unsubscribe, subscriptions, send, isConnected } =
    //     useStomp({
    //         brokerURL: url
    //     }, () => {
    //
    //         // @ts-ignore
    //         subscribe('/user/d.shishlov/notifications/order', msg => setMessages([...messages, msg]))
    //
    //         // @ts-ignore
    //         send('/app/greetings', {pizda: 'pizda'}, null)
    //     });

    return (
        <>
            {/*<Sidebar />*/}
            <div>
                { messages.map(msg => <p>{msg}</p>) }
            </div>
            <Header />
            <div id="content" className="w-100 pb-14">
                <Routes>
                    <Route path={routes.home} element={<IndexPage/>} />
                    <Route path={routes.catalog} element={<CatalogPage/>} />
                    <Route path={routes.cart} element={<CartPage/>} />
                    <Route path={routes.noShopSelected} element={<h1>No shop selected!</h1>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
