import React, { useContext } from "react";
import style from "./SidebarStyle";
import "./styleEffect.css";
import { menuItems } from "./static";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import { FiLogOut, FiX } from "react-icons/fi";

export default function Sidebar({ state, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, enterprise } = useContext(AuthContext);
  const { disconnectWebSocket } = useContext(ChatContext);

  const handleSelect = (route) => {
    onClose();
    navigate(route);
  };

  const handleLogout = () => {
    disconnectWebSocket();
    logout();
  };

  const MenuItem = ({ item }) => {
    const isActive = location.pathname === item.route;
    return (
      <div
        onClick={() => handleSelect(item.route)}
        style={{ ...style.routeBox, ...(isActive ? style.activeRouteBox : {}) }}
        className="routeBox-hover"
      >
        <div style={style.routeIcon}>{item.icon}</div>
        <span style={style.routeTitle}>{item.name}</span>
      </div>
    );
  };

  return (
    <>
      <div style={state ? style.overlay : {}} onClick={onClose}></div>
      <div style={state ? style.sidebarContainer : style.sidebarContainerClosed}>
        <div style={style.header}>
          <img
            style={style.companyLogoImage}
            src={enterprise?.logoUrl || "./images/agente-logo-white.png"}
            alt="Logo da Empresa"
          />
          <button onClick={onClose} style={style.closeButton}><FiX size={22} /></button>
        </div>

        <div style={style.routesBox}>
          {menuItems.map((item, key) => (
            <MenuItem key={key} item={item} />
          ))}
        </div>

        <div style={style.footer}>
          <div style={style.userInfo}>
            <span style={style.userName}>{user?.name || "Usuário"}</span>
            <span style={style.userRole}>{user?.role || "Admin"}</span>
          </div>
          <button onClick={handleLogout} style={style.logoutButton} title="Sair">
            <FiLogOut size={22} />
          </button>
        </div>
      </div>
    </>
  );
}