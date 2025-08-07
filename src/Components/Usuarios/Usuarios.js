import React, { useState, useEffect, useContext } from "react";
import style from "./UsuariosStyle";
import { AuthContext } from "../../Context/AuthContext";
import func from "../../Services/fotmatters";
import {
  editarStatusTodosOsAgentes,
  getPrompt,
  obterAdmins,
  updatePrompt,
} from "../../Services/dbservice";
import ChangePass from "./ChangePass/ChangePass";
import { ChatContext } from "../../Context/ChatContext";
import { SystemMessageContext } from "../../Context/SystemMessageContext";
import { LoadingContext } from "../../Context/LoadingContext";
import {
  FiUser,
  FiBriefcase,
  FiKey,
  FiLogOut,
  FiPower,
  FiSave,
  FiEdit2,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function Usuarios() {
  const {
    user = {},
    enterprise = {},
    credentials,
    logout,
  } = useContext(AuthContext);
  const { avaliableAgents, disconnectWebSocket } = useContext(ChatContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [admins, setAdmins] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [modalChangePass, setModalChangePass] = useState(false);
  const userName = user?.name || "Usuário";
  const enterpriseName = enterprise?.name || "Empresa";
  const [chosenAgent, setChosenAgent] = useState(null);
  const { showMessage } = useContext(SystemMessageContext);

  useEffect(() => {
    if (avaliableAgents && avaliableAgents.length > 0) {
      setChosenAgent(avaliableAgents[0]);
    }
  }, [avaliableAgents]);

  const getAdmins = async () => {
    try {
      startLoading();
      const response = await obterAdmins(credentials.accessToken);
      if (response) setAdmins(response);
    } catch (error) {
      console.error("Erro ao obter admins", error);
    } finally {
      stopLoading();
    }
  };

  const obterPrompt = async () => {
    if (!chosenAgent) return;
    try {
      startLoading();
      const res = await getPrompt(credentials.accessToken, chosenAgent.number);
      if (res) setPrompt(res);
    } catch (error) {
      console.error("Erro ao obter Prompt", error);
    } finally {
      stopLoading();
    }
  };

  const editarPrompt = async () => {
    if (!chosenAgent) {
      showMessage("Selecione um agente primeiro.", "error");
      return;
    }
    startLoading();
    try {
      const res = await updatePrompt(
        credentials.accessToken,
        prompt,
        chosenAgent.number
      );
      if (res) {
        showMessage("Prompt atualizado com sucesso.", "success");
      } else {
        showMessage("Erro ao atualizar prompt.", "error");
      }
    } catch (error) {
      showMessage("Erro ao atualizar prompt.", "error");
      console.error("Erro ao editar Prompt", error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (credentials?.accessToken) {
      getAdmins();
    }
  }, [credentials?.accessToken]);

  useEffect(() => {
    if (chosenAgent) {
      obterPrompt();
    }
  }, [chosenAgent]);

  const handleBlockAGENT = async () => {
    toast(
      (t) => (
        <div>
          <p>
            Tem certeza que deseja <b>parar a IA</b>?
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              style={{
                background: "#ef4444",
                color: "#FFF",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => {
                confirmBlockAgent();
                toast.dismiss(t.id);
              }}
            >
              Sim, Parar
            </button>
            <button
              style={{
                background: "#4b5563",
                color: "#FFF",
                border: "none",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  const confirmBlockAgent = async () => {
    startLoading();
    try {
      var res = await editarStatusTodosOsAgentes(credentials.accessToken);
      if (res.status === 200) {
        showMessage("Agente de IA parado com sucesso.", "success");
      }
    } catch (error) {
      console.error("Erro ao editar status do agente:", error);
      showMessage("Erro ao parar o agente de IA.", "success");
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      {modalChangePass && (
        <ChangePass onClose={() => setModalChangePass(false)} />
      )}
      <div style={style.container}>
        <div style={style.header}>
          <h1 style={style.title}>Configurações</h1>
        </div>

        <div style={style.grid}>
          <div style={style.profileCard}>
            <div style={style.profileHeader}>
              <div style={style.profilePicture}>
                <img
                  style={style.profilePictureImage}
                  src="./icons/user-icon3.png"
                  alt="Foto do perfil"
                />
              </div>
              <div style={style.profileInfo}>
                <span style={style.name}>{userName}</span>
                <span style={style.enterpriseName}>{enterpriseName}</span>
              </div>
            </div>
            <div style={style.profileActions}>
              <button
                onClick={() => setModalChangePass(true)}
                style={style.actionButton}
              >
                <FiKey style={{ marginRight: "8px" }} /> Alterar Senha
              </button>
              <button
                onClick={() => {
                  disconnectWebSocket();
                  logout();
                }}
                style={{ ...style.actionButton, ...style.logoutButton }}
              >
                <FiLogOut style={{ marginRight: "8px" }} /> Sair
              </button>
            </div>
          </div>

          <div style={style.promptCard}>
            <div style={style.cardHeader}>
              <h2 style={style.cardTitle}>Inteligência Artificial (IA)</h2>
              <button
                onClick={handleBlockAGENT}
                style={style.stopIAButton}
                title="Parar IA"
              >
                <FiPower size={16} /> Parar IA
              </button>
            </div>
            <div style={style.promptContent}>
              <label style={style.label}>Selecione o Agente</label>
              <select
                style={style.agentSelect}
                value={chosenAgent?.number || ""}
                onChange={(e) => {
                  const selected = avaliableAgents.find(
                    (a) => a.number === e.target.value
                  );
                  setChosenAgent(selected);
                }}
              >
                {avaliableAgents &&
                  avaliableAgents.map((agent) => (
                    <option key={agent.id} value={agent.number}>
                      {agent.name}
                    </option>
                  ))}
              </select>

              <label style={style.label}>
                Prompt do Agente (Personalidade da IA)
              </label>
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                style={style.promptInput}
              />
              <button onClick={editarPrompt} style={style.savePromptButton}>
                <FiSave style={{ marginRight: "8px" }} /> Salvar Prompt
              </button>
            </div>
          </div>

          <div style={style.usersCard}>
            <div style={style.cardHeader}>
              <h2 style={style.cardTitle}>Usuários da Empresa</h2>
            </div>
            <div style={style.usersTable}>
              <div style={style.usersTableHeader}>
                <span style={style.usersTableHeaderCell}>Nome</span>
                <span style={style.usersTableHeaderCell}>Login</span>
                <span style={style.usersTableHeaderCell}>Criado em</span>
              </div>
              <div style={style.usersTableBody}>
                {admins &&
                  admins.map((admin) => (
                    <div key={admin.id} style={style.usersTableBodyRow}>
                      <span style={style.usersTableBodyRowCell}>
                        {admin.name}
                      </span>
                      <span
                        style={{
                          ...style.usersTableBodyRowCell,
                          color: "#aeb9c4",
                        }}
                      >
                        {admin.loginId}
                      </span>
                      <span
                        style={{
                          ...style.usersTableBodyRowCell,
                          color: "#aeb9c4",
                        }}
                      >
                        {func.formatarDataCompleta(admin.dateCreated)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
