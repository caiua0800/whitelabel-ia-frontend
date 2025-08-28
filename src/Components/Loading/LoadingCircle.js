import React, { useState, useEffect, useContext } from "react";
import { Riple, TrophySpin } from "react-loading-indicators";
import { LoadingContext } from "../../Context/LoadingContext";

export default function LoadingCircle({ loading }) {
  return (
    <>
      {loading && (
        <div
          style={{
            background: "rgba(0,0,0,0.8)",
            zIndex: 99999,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ transform: "scale(1.4)" }}>
            <Riple color="#ededed" size="large" text="" textColor="" />
          </div>
        </div>
      )}
    </>
  );
}
