import React, { useState, useContext, useEffect } from "react";
import style from "./HeaderStyle";
import "./effect.css"
import { ChatContext } from "../../../Context/ChatContext";

export default function Header() {
    const {totalChats, notSeenChats} = useContext(ChatContext);

    return (
        <>
            <div style={style.header}>
                <div></div>
                <div style={style.boxContainer}>
                    <div style={style.boxAdd}>
                        <div className="text-add" style={style.addText}>
                            Faça um upgrade no nosso plano e ganhe MUITO mais benefícios,
                            entre eles, DISPAROS DOBRADOS, FUNÇÕES NOVAS, PERSONALIZAÇÃO, e MUITO MAIS!
                        </div>
                    </div>
                </div>
                <div style={style.boxContainer}>
                    <div style={style.box}>
                        <div style={style.boxTitle}>Total de Chats</div>
                        <div style={style.boxValue}>{totalChats}</div>
                    </div>
                </div>
                <div style={style.boxContainer}>
                    <div style={style.box}>
                        <div style={style.boxTitle}>Chats Não Vistos</div>
                        <div style={style.boxValue}>{notSeenChats}</div>
                    </div>
                </div>
            </div>
        </>
    )
}