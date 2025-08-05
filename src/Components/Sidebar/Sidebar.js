import React, { useState, useEffect, useContext } from "react";
import style from "./SidebarStyle";
import "./styleEffect.css";
import { menuItems } from "./static";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";

export default function Sidebar({ state, onClose }) {
  const navigate = useNavigate();
  const { user, logout, enterprise } = useContext(AuthContext);
  const { disconnectWebSocket } = useContext(ChatContext);

  const handleSelect = (r) => {
    onClose();
    navigate(r);
  };
  return (
    <>
      <div
        style={state ? style.sidebarContainer : style.sidebarContainerClosed}
      >
        <div
          onClick={onClose}
          className="close-icon"
          style={style.closeIconBox}
        >
          <img style={style.closeIcon} src="./icons/close-icon.svg" />
        </div>

        <div style={style.companyLogo}>
          <img
            style={style.companyLogoImage}
            src={
              enterprise && enterprise.logoUrl
                ? enterprise.logoUrl
                : ""
            }
          />
        </div>

        <div style={style.routesBox}>
          {menuItems &&
            menuItems.map((item, key) => (
              <>
                <div
                  onClick={() => handleSelect(item.route)}
                  key={key}
                  className="routeBox"
                  style={style.routeBox}
                >
                  <span style={style.routeTitle}>{item.name}</span>
                  <div style={style.routeArrowBox}>
                    <img
                      style={style.routeArrow}
                      src="./icons/left-arrow-icon2.svg"
                    />
                  </div>
                </div>
              </>
            ))}
        </div>
        <div style={style.bottom}>
          <button
            onClick={() => {
              disconnectWebSocket();
              logout();
            }}
            style={style.logoutButton}
          >
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
