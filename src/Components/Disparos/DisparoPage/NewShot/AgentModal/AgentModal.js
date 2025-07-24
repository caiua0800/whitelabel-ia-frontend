import React, { useState, useEffect, useContext } from "react";
import style from "./AgenteModalStyle";
import { AuthContext } from "../../../../../Context/AuthContext";
import "./effect.css";
import { getAgents } from "../../../../../Services/dbservice";

export default function AgentModal({ onClose, setSelectedAgent }) {
  const { credentials } = useContext(AuthContext);
  const [agents, setAgents] = useState([]);

  const obterAgents = async () => {
    try {
      const response = await getAgents(credentials.accessToken);

      if (response.status === 200) {
        setAgents(response.data);
      } else {
        console.log("Houve um erro ao consultar os agentes");
        console.log(response);
      }
    } catch (error) {
      console.log("Houve um erro ao consultar os agentes");
      console.log(error);
    }
  };

  useEffect(() => {
    obterAgents();
  }, []);

  const handleSelect = (a) => {
    setSelectedAgent(a);
    onClose();
  }

  return (
    <div style={style.container}>
      <div style={style.containerModal}>
        <span onClick={onClose} style={style.closeBtn}>
          ×
        </span>

        <span style={style.title}>Selecione o agente</span>

        <div style={style.content}>
          {agents &&
            agents.map((agent, key) => (
              <>
                <div onClick={() => handleSelect(agent)} key={key} className="agentBox" style={style.agentBox}>
                  <span style={style.agentName}>
                    {agent && (agent.name ? agent.name : "Sem nome")}
                  </span>
                  <span style={style.agentNumber}>+55 (17) 99256-2727</span>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
