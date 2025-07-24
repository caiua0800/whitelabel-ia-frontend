import React, { useState, useEffect, useContext } from "react";
import style from "./NotificationStyle";
import { ChatContext } from "../../Context/ChatContext";
import formatHelpers from "../helpers/formatHelpers";
import { useNavigate } from "react-router-dom";


export default function Notification() {
    const navigate = useNavigate();
    const { notification, handleCloseNotification, handleSetActiveChatByNotification } = useContext(ChatContext);

    const handleSelect = (chatId) => {
        navigate("/");
        handleSetActiveChatByNotification(chatId);
        handleCloseNotification(); 
    }

    const limitarText0 = (t) => {
        var aux = ""
        if(t && t.length > 20){
            for(let i = 0; i < t.length && i < 20; i++){
                aux += t[i];
            }
            aux += "..."
        }else{
            if(!t) aux = "";
            else aux = t;
        }
        console.log(aux)
        return aux;
    }

    return (
        <>
            {notification && (
                <>
                    <div style={style.notificationContainer}>
                        <div onClick={() => handleSelect(notification.chatId)} style={style.notificationBox}>
                            <span onClick={handleCloseNotification} style={style.closeBtn}>x</span>
                            <div style={style.photoContainer}>
                                <div style={style.photoBox}>
                                    <img alt="profile picture"
                                        src="./icons/user-icon3.png"
                                        style={style.photo}
                                    />
                                </div>
                            </div>
                            <div style={style.anotherPart}>
                                <div style={style.numberPart}>
                                    <span style={style.clientNumber}>{notification && notification.chatId}</span>
                                </div>
                                <div style={style.messagePart}>
                                    <span style={style.message}>
                                        {notification && limitarText0(notification.text)}
                                    </span>
                                    <span style={style.hour}>{notification && formatHelpers.formatarData(notification.dateCreated)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    )
}