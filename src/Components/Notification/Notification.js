import React, { useState, useEffect, useContext } from "react";
import style from "./NotificationStyle";
import { ChatContext } from "../../Context/ChatContext";
import formatHelpers from "../helpers/formatHelpers";


export default function Notification() {
    const { notification, handleCloseNotification } = useContext(ChatContext);

    return (
        <>
            {notification && (
                <>
                    <div style={style.notificationContainer}>
                        <div style={style.notificationBox}>
                            <span onClick={handleCloseNotification} style={style.closeBtn}>X</span>
                            <div style={style.photoContainer}>
                                <div style={style.photoBox}>
                                    <img alt="profile picture"
                                        src="./images/usuario.webp"
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
                                        {notification && notification.text}
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