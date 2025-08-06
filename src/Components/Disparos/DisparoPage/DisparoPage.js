import React, { useState, useEffect, useContext } from "react";
import style from "./DisparoPageStyle";
import ModalDefault from "../../ModalDefault/ModalDefault";
import func from "../../../Services/fotmatters";
import NewShot from "./NewShot/NewShot";
import ShotModel from "../../ShotModel/ShotModel";
import { verificarModelo } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { LoadingContext } from "../../../Context/LoadingContext";

export default function DisparoPage({ onClose, shot }) {
  const [newShotModal, setNewShotModal] = useState(false);
  const { credentials } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleClientesAlcancados = () => {
    if (shot) {
      if (shot.shotHistory) {
        var sum = 0;
        shot.shotHistory.forEach((s) => {
          if (s.status === 2) sum += s.sent_clients.length;
        });
        return sum;
      }
      return 0;
    }
    return 0;
  };

  const handleVerify = async () => {
    if (shot) {
      try {
        startLoading();
        const res = await verificarModelo(
          credentials.accessToken,
          shot.shot.id
        );
        console.log(res)
        if (res.success) {
          alert(
            "Template verificado e pronto pra uso.\nVolte em modelos e selecione-o novamente."
          );
          onClose();
          return;
        } else {
          alert("Template ainda não foi verificado.\nAguarde e tente novamente mais tarde.");
          onClose();
          return;
        }
      } catch (error) {
        alert("Erro ao verificar.");
        console.log(error);
      } finally {
        stopLoading();
      }
    } else {
      alert("Erro ao verificar");
    }
  };

  return (
    <>
      <ModalDefault zIndex={10}>
        {shot && shot.shot && shot.shot.status === 1 && (
          <div style={style.statusModal}>
            <div style={style.statusModalContainer}>
              <img
                onClick={onClose}
                src="./icons/left-arrow-icon.svg"
                style={style.closeBtn}
              />

              <div style={style.centerInfo}>
                <span style={style.infoWarning}>
                  O modelo ainda não foi verificado pela meta.
                </span>
                <button onClick={handleVerify} style={style.verifyButton}>
                  Verificar Status
                </button>
              </div>
            </div>
          </div>
        )}
        <div style={style.modal}>
          <img
            onClick={onClose}
            src="./icons/left-arrow-icon.svg"
            style={style.closeBtn}
          />
          <span style={style.title}>
            Seu modelo de disparo ID #{shot && shot.shot ? shot.shot.id : "0"}
          </span>

          <div style={style.modelContainer}>
            <ShotModel data={shot} />
          </div>

          <div style={style.info}>
            <div style={style.firstRow}>
              <div style={style.firstRow1}>
                <div style={style.firstRow1Box}>
                  <span style={style.firstRow1BoxTitle}>Nome do Modelo</span>
                  <input
                    style={style.firstRow1BoxInput}
                    value={shot && shot.shot && shot.shot.name}
                  />
                </div>
              </div>
              <div style={style.firstRow2}>
                <div style={style.firstRow2Header}>
                  <div style={style.firstRow2Box}>
                    <span style={style.firstRow2BoxTitle}>
                      Número de vezes disparado
                    </span>
                    <input
                      style={style.firstRow2BoxInput}
                      value={
                        shot && shot.shot && shot.shot.shotHistory
                          ? shot.shot.shotHistory.length
                          : 0
                      }
                    />
                  </div>
                  <div style={style.firstRow2Box}>
                    <span style={style.firstRow2BoxTitle}>
                      Clientes Alcançados
                    </span>
                    <input
                      value={handleClientesAlcancados()}
                      style={style.firstRow2BoxInput}
                    />
                  </div>
                </div>
                <div style={style.firstRow2Body}>
                  <span style={style.firstRow2BoxTitle}>
                    Histórico de envios
                  </span>
                  <div style={style.historyTable}>
                    <div style={style.historyTableHeader}>
                      <span style={style.historyTableHeaderCell}>Data</span>
                      <span style={style.historyTableHeaderCell}>
                        Quantidade de Envios
                      </span>
                      <span style={style.historyTableHeaderCell}>Status</span>
                    </div>

                    {shot &&
                      shot.shot &&
                      shot.shot.shotHistory &&
                      shot.shot.shotHistory.map((h, key) => (
                        <>
                          <div style={style.historyTableRow}>
                            <span style={style.historyTableCell}>
                              {func.formatarDataCompleta(h.date_sent)}
                            </span>
                            <span style={style.historyTableCell}>
                              {h.clients_qtt}
                            </span>
                            <span
                              style={{
                                ...style.historyTableCell,
                                ...style.statusBadge,
                                ...style.statusSuccess,
                              }}
                            >
                              {h.status}
                            </span>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button onClick={() => setNewShotModal(true)} style={style.sendNew}>
            Realizar novo envio ✈️
          </button>
          {/* 
          {newShotModal && (
            <>
                <NewShot shot={shot} onClose={() => {setNewShotModal(false); onClose()}} />
            </>
          )} */}

          {newShotModal && (
            <NewShot
              shot={shot}
              onClose={() => {
                setNewShotModal(false);
                onClose(); // Esta função vai atualizar a lista de disparos
              }}
            />
          )}
        </div>
      </ModalDefault>
    </>
  );
}
