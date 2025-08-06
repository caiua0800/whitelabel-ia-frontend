import React, { useState, useEffect, useContext } from "react";
import style from "./AgenteModalStyle";
import { AuthContext } from "../../../../../Context/AuthContext";
import "./effect.css";
import { getAgents } from "../../../../../Services/dbservice";
import { FiX, FiUser } from "react-icons/fi";
import { LoadingContext } from "../../../../../Context/LoadingContext";

export default function AgentModal({ onClose, setSelectedAgent }) {
  const { credentials } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);
  const {startLoading, stopLoading} = useContext(LoadingContext)

  useEffect(() => {
    const obterAgents = async () => {
      if (!credentials?.accessToken) return;
      try {
        startLoading()
        const response = await getAgents(credentials.accessToken);
        if (response.status === 200) {
          setAgents(response.data);
        }
      } catch (error) {
        console.error("Houve um erro ao consultar os agentes", error);
      } finally{
        stopLoading()
      }
    };
    obterAgents();
  }, [credentials?.accessToken]);

  const handleSelect = (a) => {
    setSelectedAgent(a);
    onClose();
  }

  return (
    <div style={style.container} onClick={onClose}>
      <div style={style.containerModal} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
            <h2 style={style.title}>Selecione o Agente</h2>
            <button onClick={onClose} style={style.closeBtn}><FiX size={20}/></button>
        </div>
        <div style={style.content}>
          {agents && agents.length > 0 ? (
            agents.map((agent) => (
              <div onClick={() => handleSelect(agent)} key={agent.id} className="agentBox-hover" style={style.agentBox}>
                <div style={style.agentIcon}><FiUser size={20} /></div>
                <div style={style.agentInfo}>
                    <span style={style.agentName}>{agent.name || "Sem nome"}</span>
                    <span style={style.agentNumber}>{agent.number}</span>
                </div>
              </div>
            ))
          ) : (
            <div style={style.noAgentMessage}>Nenhum agente encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}