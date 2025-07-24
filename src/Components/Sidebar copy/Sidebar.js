import React, { useState, useEffect, useContext } from "react";
import style from "./SidebarStyle";
import "./styleEffect.css";
import { menuItems } from "./static";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext"

export default function Sidebar({ state, onClose }) {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  return (
    <>
      <div
        style={state ? style.sidebarContainer : style.sidebarContainerClosed}
      >
        <div style={style.sidebarContent}>
          <div
            onClick={onClose}
            className="close-icon"
            style={style.closeIconBox}
          >
            <img style={style.closeIcon} src="./icons/close-icon.svg" />
          </div>
          <div style={style.header}>
            <div style={style.logoBox}>
              <img style={style.logoImage} src="./images/agente-logo.png" />
            </div>
            <div style={style.agenteTitleBox}>
              <span style={style.agenteTitle}>Agente IA M82</span>
            </div>
          </div>
          <div style={style.menu}>
            <div style={style.menuContent}>
              <div style={style.menuItems}>
                <div style={style.menuItemsCenter}>
                  {menuItems.map((item, key) => (
                    <>
                      <div
                        onClick={() => {
                          item.route && navigate(item.route);
                          onClose();
                        }}
                        className="menu-item"
                        key={key}
                        style={style.menuItem}
                      >
                        <div style={style.menuItemIconBox}>
                          <img style={style.menuItemIcon} src={item && item.icon} />
                        </div>
                        <div style={style.menuItemTextBox}>
                          <span style={style.menuItemText}>{item && item.name}</span>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
            <div style={style.userButtonBox}>
              <div className="user-button" style={style.userButton}>
                <div style={style.userImageBox}>
                  <img style={style.userImage} src="./icons/user-icon3.png" />
                </div>
                <span onClick={() => {navigate("/usuarios");onClose()}} style={style.username}>{(user && user.name ) ? user.name : (user && user.loginId) ? user.loginId : ""}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
