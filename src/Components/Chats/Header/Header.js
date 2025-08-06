import React, { useContext } from "react";
import style from "./HeaderStyle";
import { FiMessageSquare, FiEyeOff } from "react-icons/fi";
import {ChatContext} from "../../../Context/ChatContext"

export default function Header() {
    const { totalChats, notSeenChats } = useContext(ChatContext);

    const StatCard = ({ icon, title, value }) => (
        <div style={style.statCard}>
            <div style={style.statIconWrapper}>{icon}</div>
            <div style={style.statTextWrapper}>
                <span style={style.statTitle}>{title}</span>
                <span style={style.statValue}>{value}</span>
            </div>
        </div>
    );

    return (
        <div style={style.header}>
            <div style={style.branding}>
                {/* <img src="./images/agente-logo-white.png" alt="Logo" style={style.logo} /> */}
                <h1 style={style.dashboardTitle}>Dashboard</h1>
            </div>
            <div style={style.statsContainer}>
                <StatCard icon={<FiMessageSquare size={22} />} title="Total de Chats" value={totalChats} />
                <StatCard icon={<FiEyeOff size={22} />} title="Chats Não Vistos" value={notSeenChats} />
            </div>
        </div>
    );
}