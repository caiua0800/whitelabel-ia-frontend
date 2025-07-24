import React, { useState, useEffect } from "react";
import style from "./ModalDefaultStyle";

export default function ModalDefault({ children, zIndex }) {
  return (
    <>
      <div style={{...style.modalContainer, zIndex: zIndex}}>
        {children}
        </div>
    </>
  );
}
