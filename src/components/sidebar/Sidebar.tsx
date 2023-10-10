import React, {useState} from "react";

import {SidebarData} from "./SidebarData";
import {Link} from "react-router-dom";
import './styles.css'
import {useApp} from "../../app/Context";


export function Sidebar() {
    const [sideBar, setSideBar] = useState(false);

    const {shop} = useApp()

    function handleChangeSideBar() {
        setSideBar((prevState) => !prevState);
    }

    const toggleSidebar = () => {
        setSideBar(!sideBar)
    }

    return (
        <div id="sidebar" className={(sideBar ? "open" : "")}>
            <div className="sidebar-toggler" onClick={toggleSidebar}>
                <i className="fas fa-chevron-right"></i>
            </div>
            <div>
                <div className="text-center text-lg mb-5">{ shop.getName() }</div>
                <ul>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className="mb-2 menu-item">
                                <Link to={item.path}>
                                    { sideBar &&
                                        <span style={{marginLeft: '16px'}}>
                                            <i className={item.icon + " mr-2"}></i>
                                            {item.title}
                                        </span>
                                    }

                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}
