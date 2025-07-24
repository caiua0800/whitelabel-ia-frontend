import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./PerfilStyle";
import { LoadingContext } from "../../../../../Context/LoadingContext";
import { ChatContext } from "../../../../../Context/ChatContext";

export default function Perfil({ onClose }) {
  const { activeChat } = useContext(ChatContext);

  const formatPhone = (n) => {
    if (n?.trim().length === 13) {
      return `(${n[0]}${n[1]}) ${n[2]}${n[3]} ${n[4]}${n[5]}${n[6]}${n[7]}${n[8]}${n[9]}${n[10]}${n[11]}${n[12]}`;
    }
    return n || "";
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.modalContainer}>
          <div style={style.modal}>
            <span style={style.modalTitle}>Edite o contato</span>

            <div style={style.clientProfilePictureBox}>
              <div style={style.clientProfilePictureCircle}>
                <img
                  src="./icons/user-icon2.png"
                  style={style.clientProfilePicture}
                />
              </div>
            </div>

            <div style={style.clientInfoContainer}>
              <div style={style.infoRowOne}>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Nome do cliente</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.clientName || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
              </div>
              <div style={style.infoRowTwo}>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Contato</span>
                  <div style={style.infoRowBox}>
                    <input
                      disabled
                      value={formatPhone(activeChat?.id)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>CEP</span>
                  <div style={style.infoRowBox}>
                    <input
                      type="number"
                      value={activeChat.zipcode || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
              </div>
              <div style={style.infoRowThree}>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Logradouro</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.street || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Número</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.number || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
              </div>
              <div style={style.infoRowThree}>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Bairro</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.neighborhood || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Complemento</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.complement || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
              </div>
              <div style={style.infoRowThree}>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Cidade</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.city || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Estado</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={activeChat.state || ""}
                      placeholder=""
                      disabled
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
              </div>
              <div style={style.infoRowContainer}>
                <span style={style.infoTitle}>País</span>
                <div style={style.infoRowBox}>
                  <input
                    value={activeChat.country || ""}
                    placeholder=""
                    disabled
                    style={style.infoRowInput}
                  />
                </div>
              </div>
            </div>

            <div style={style.confirmation}>
              <div
                style={{
                  ...style.containerButtons,
                  gridTemplateColumns: "100%",
                }}
              >
                <button
                  onClick={onClose}
                  style={{ ...style.button, background: "rgba(255, 80, 0, 1)" }}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
