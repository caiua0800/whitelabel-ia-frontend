import React, {useState, useContext, useEffect} from "react";
import style from "./ComprarDisparosStyle";
import "./effect.css"

export default function ComprarDisparos() {

    return (
        <>
            <div style={style.container}>
                <span style={style.title}>Comprar mais disparos</span>

                <div style={style.boxes}>
                    <div className="box" style={style.box}>
                        <span style={style.boxTitle}>100 Disparos</span>
                        <span style={style.boxValue}>R$90,00</span>
                    </div>
                    <div className="box" style={style.box}>
                        <span style={style.boxTitle}>200 Disparos</span>
                        <span style={style.boxValue}>R$150,00</span>
                    </div>
                    <div className="box" style={style.box}>
                        <span style={style.boxTitle}>500 Disparos</span>
                        <span style={style.boxValue}>R$300,00</span>
                    </div>
                    <div className="box" style={style.box}>
                        <span style={style.boxTitle}>1000 Disparos</span>
                        <span style={style.boxValue}>R$550,00</span>
                    </div>
                </div>
            </div>
        </>
    )
}