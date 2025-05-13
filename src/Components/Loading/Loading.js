import React, { useState, useEffect, useContext } from "react";
import { TrophySpin } from "react-loading-indicators";
import { LoadingContext } from "../../Context/LoadingContext";


export default function Loading() {
    const { loading } = useContext(LoadingContext);

    return (
        <>
            {loading && (
                <div style={{
                    background: "rgba(0,0,0,0.8)",
                    zIndex: 99,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{ transform: "scale(1.4)" }}>
                        <TrophySpin color="rgba(0,200, 230, 1)" size="large" text="" textColor="" />
                    </div>
                </div>
            )}
        </>
    )
}