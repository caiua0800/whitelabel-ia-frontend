import React, { useState, useEffect, useContext } from "react";
import style from "./DisparoPageStyle";
import ModalDefault from "../../ModalDefault/ModalDefault";
import Model1 from "../../NovoDisparo/Models/Model1";
import func from "../../../Services/fotmatters";
import NewShot from "./NewShot/NewShot";
import Model2 from "../../NovoDisparo/Models/Model2";
import ShotModel from "../../ShotModel/ShotModel";

export default function DisparoPage({ onClose, shot }) {
  const [newShotModal, setNewShotModal] = useState(false);


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

  return (
    <>
      <ModalDefault zIndex={10}>
        <div style={style.modal}>
          <img
            onClick={onClose}
            src="./icons/left-arrow-icon.svg"
            style={style.closeBtn}
          />
          <span style={style.title}>
            Seu modelo de disparo ID #{(shot && shot.shot) ? shot.shot.id : "0"}
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
                        shot && shot.shot && shot.shot.shotHistory ? shot.shot.shotHistory.length : 0
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

                    {shot && shot.shot &&
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
          <button onClick={() => setNewShotModal(true)} style={style.sendNew}>Realizar novo envio ✈️</button>

          {newShotModal && (
            <>
                <NewShot shot={shot} onClose={() => {setNewShotModal(false); onClose()}} />
            </>
          )}
        </div>
      </ModalDefault>
    </>
  );
}
