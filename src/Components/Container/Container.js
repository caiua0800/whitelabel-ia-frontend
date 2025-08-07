import React, { useContext, useState } from "react";
import style from "./ContainerStyle";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
import Loading from "../Loading/Loading";
import SubscriptionNotification from "./SubscriptionNotification/SubscriptionNotification";
import { FiMenu } from "react-icons/fi";
import "./ContainerEffect.css";
import SystemMessage from "../SystemMessage/SystemMessage"; // <<< IMPORTA NOSSA DIVA

const Container = ({ children }) => {
    const [sidebarState, setSidebarState] = useState(false);

    return (
        <>
            <SystemMessage /> {/* <<< E COLOCA ELA AQUI PRA BRILHAR */}

            <div style={style.container}>
                <Sidebar
                    state={sidebarState}
                    onClose={() => setSidebarState(false)}
                />
                
                <button
                    onClick={() => setSidebarState(true)}
                    style={{
                        ...style.openButton,
                        ...(sidebarState ? style.openButtonHidden : {}),
                    }}
                    className="open-sidebar-button" 
                >
                    <FiMenu size={22} />
                </button>
                
                <main style={style.mainContent}>
                    {children}
                </main>
            </div>
            <SubscriptionNotification />
            <Notification />
            <Loading />
        </>
    )
}

export default Container;