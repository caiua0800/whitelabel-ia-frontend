import React, { useContext, useState } from "react";
import style from "./ContainerStyle";
import Sidebar from "../Sidebar/Sidebar";
import Notification from "../Notification/Notification";
import Loading from "../Loading/Loading";
import SubscriptionNotification from "./SubscriptionNotification/SubscriptionNotification";
import { FiMenu } from "react-icons/fi"; // Importa o ícone mara
import "./ContainerEffect.css"; // Importa nosso novo arquivo de efeitos

const Container = ({ children }) => {
    const [sidebarState, setSidebarState] = useState(false);

    return (
        <>
            <div style={style.container}>
                <Sidebar
                    state={sidebarState}
                    onClose={() => setSidebarState(false)}
                />
                
                <button
                    onClick={() => setSidebarState(true)}
                    style={{
                        ...style.openButton,
                        // Adiciona uma classe para controlar a visibilidade com mais elegância
                        ...(sidebarState ? style.openButtonHidden : {}),
                    }}
                    className="open-sidebar-button" // Classe para o efeito de hover
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