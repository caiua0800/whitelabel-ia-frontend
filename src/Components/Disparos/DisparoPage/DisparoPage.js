import React, { useState, useContext } from "react";
import style from "./DisparoPageStyle";
import ModalDefault from "../../ModalDefault/ModalDefault";
import func from "../../../Services/fotmatters";
import NewShot from "./NewShot/NewShot";
import ShotModel from "../../ShotModel/ShotModel";
import { verificarModelo } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { LoadingContext } from "../../../Context/LoadingContext";
import { FiX, FiInfo, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function DisparoPage({ onClose, shot }) {
  const [newShotModal, setNewShotModal] = useState(false);
  const { credentials } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleClientesAlcancados = () => {
    if (shot?.shotHistory) {
      return shot.shotHistory.reduce((sum, s) => s.status === 2 ? sum + (s.sent_clients?.length || 0) : sum, 0);
    }
    return 0;
  };

  const handleVerify = async () => {
    if (shot) {
      startLoading();
      try {
        const res = await verificarModelo(credentials.accessToken, shot.shot.id);
        if (res.success) {
          toast.success("Template verificado e pronto para uso!");
          onClose();
        } else {
          toast.error("Template ainda não foi verificado. Tente mais tarde.");
        }
      } catch (error) {
        toast.error("Erro ao verificar o status do template.");
        console.error(error);
      } finally {
        stopLoading();
      }
    }
  };

  const InfoCard = ({ title, value }) => (
    <div style={style.infoCard}>
        <span style={style.infoCardTitle}>{title}</span>
        <span style={style.infoCardValue}>{value}</span>
    </div>
  );

  return (
    <>
      <ModalDefault zIndex={10}>
        <div style={style.modal}>
          <div style={style.modalHeader}>
            <h2 style={style.title}>Detalhes da Campanha #{shot?.shot?.id || "0"}</h2>
            <button style={style.closeBtn} onClick={onClose}><FiX size={22} /></button>
          </div>
          
          <div style={style.modalBody}>
            <div style={style.leftColumn}>
                <div style={style.section}>
                    <h3 style={style.sectionTitle}>Preview do Modelo</h3>
                    <div style={style.modelContainer}>
                      <ShotModel data={shot} />
                    </div>
                </div>

                <div style={style.section}>
                    <h3 style={style.sectionTitle}>Informações Gerais</h3>
                    <div style={style.infoGrid}>
                        <InfoCard title="Nome do Modelo" value={shot?.shot?.name || 'N/A'}/>
                        <InfoCard title="Vezes disparado" value={shot?.shot?.shotHistory?.length || 0}/>
                        <InfoCard title="Clientes Alcançados" value={handleClientesAlcancados()}/>
                    </div>
                </div>

                {shot?.shot?.status === 1 && (
                    <div style={style.pendingBox}>
                        <FiAlertCircle size={20} style={{color: '#fbbf24'}}/>
                        <div style={style.pendingText}>
                            <strong>Modelo Pendente:</strong> Este modelo ainda não foi aprovado pela Meta.
                            <button onClick={handleVerify} style={style.verifyButton}>Verificar Status</button>
                        </div>
                    </div>
                )}

            </div>
            
            <div style={style.rightColumn}>
                <div style={style.section}>
                    <h3 style={style.sectionTitle}>Histórico de Envios</h3>
                    <div style={style.historyTable}>
                        <div style={style.historyTableHeader}>
                          <span style={style.historyTableHeaderCell}>Data</span>
                          <span style={style.historyTableHeaderCell}>Envios</span>
                          <span style={style.historyTableHeaderCell}>Status</span>
                        </div>
                        <div style={style.historyTableBody}>
                          {shot?.shot?.shotHistory && shot.shot.shotHistory.length > 0 ? (
                            shot.shot.shotHistory.map((h, key) => (
                              <div style={style.historyTableRow} key={key}>
                                <span style={style.historyTableCell}>{func.formatarDataCompleta(h.date_sent)}</span>
                                <span style={style.historyTableCell}>{h.clients_qtt}</span>
                                <span style={style.historyTableCell}>
                                    <span style={{...style.statusBadge, ...(h.status === 2 ? style.statusSuccess : style.statusError)}}>
                                        {h.status === 2 ? "Enviado" : "Falhou"}
                                    </span>
                                </span>
                              </div>
                            ))
                          ) : (
                            <div style={style.noHistory}>Nenhum envio registrado.</div>
                          )}
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div style={style.modalFooter}>
            <button onClick={() => setNewShotModal(true)} style={style.sendNewButton}>
              Realizar Novo Envio
            </button>
          </div>
        </div>
      </ModalDefault>
      
      {newShotModal && (
        <NewShot
          shot={shot}
          onClose={() => {
            setNewShotModal(false);
            onClose();
          }}
        />
      )}
    </>
  );
}