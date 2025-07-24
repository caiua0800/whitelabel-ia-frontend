import React, { useState, useEffect, useContext } from "react";
import style from "./UsuariosStyle";
import { AuthContext } from "../../Context/AuthContext";
import formatHelpers from "../helpers/formatHelpers";
import func from "../../Services/fotmatters";
import { getPrompt, obterAdmins, updatePrompt } from "../../Services/dbservice";
import ChangePass from "./ChangePass/ChangePass";
import { ChatContext } from "../../Context/ChatContext";
import { LoadingContext } from "../../Context/LoadingContext";

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
  const userName = user?.name || "Nome não disponível";
  const userLoginId = user?.loginId || "Usuário não definido";
  const enterpriseName = enterprise?.name || "Empresa não definida";
  const createdDate = user?.dateCreated
    ? func.formatarDataCompleta(user.dateCreated)
    : "Data não disponível";
  const enterpriseId = enterprise?.id ? enterprise?.id : "ID não disponível";
  const [chosenAgent, setChosenAgent] = useState(null);

  useEffect(() => {
    if (avaliableAgents) {
      if (avaliableAgents[0]) {
        setChosenAgent(avaliableAgents[0]);
      }
    }
  }, [avaliableAgents]);

  const getAdmins = async () => {
    try {
      startLoading()
      const response = await obterAdmins(credentials.accessToken);

      if (response) {
        setAdmins(response);
      } else {
        console.log("Erro ao obter admins");
        console.log(response);
      }
    } catch (error) {
      console.log("Erro ao obter admins");
      console.log(error);
    } finally{
      stopLoading()
    }
  };

  const obterPrompt = async () => {
    try {
      startLoading()
      var res = await getPrompt(credentials.accessToken, chosenAgent.number);
      if (res) {
        setPrompt(res);
      }
    } catch (error) {
      console.log("Erro ao obter Prompt");
      console.log(error);
    } finally{
      stopLoading()
    }
  };

  const editarPrompt = async () => {
    try {
      if (!chosenAgent) {
        alert("Selecione um agente primeiro");
        return;
      }
      startLoading()
      var res = await updatePrompt(
        credentials.accessToken,
        prompt,
        chosenAgent.number
      );

      if (res) {
        alert("Prompt editado com sucesso.");
      } else {
        alert("Erro ao editar prompt");
      }
    } catch (error) {
      console.log("Erro ao editar Prompt");
      console.log(error);
      alert("Erro ao editar prompt");
    } finally{
      stopLoading()
    }
  };

  useEffect(() => {
    getAdmins();
    obterPrompt();
  }, []);

  useEffect(() => {
    if (chosenAgent) {
      obterPrompt();
    }
  }, [chosenAgent]);

  return (
    <>
      {modalChangePass && (
        <>
          <ChangePass onClose={() => setModalChangePass(false)} />
        </>
      )}
      <div style={style.container}>
        <span style={style.title}>Usuários</span>

        <div style={style.loggedUserContainer}>
          <div style={style.loggedUserBox}>
            <div style={style.loggedUserBoxFirst}>
              <div style={style.profileBox}>
                <div style={style.profilePicture}>
                  <img
                    style={style.profilePictureImage}
                    src="./icons/user-icon3.png"
                    alt="Foto do perfil"
                  />
                </div>
                <span style={style.name}>{userName}</span>
              </div>
              <div style={style.loginInfo}>
                <span style={style.usernameBoxTitle}>Usuário</span>
                <input
                  style={style.usernameInput}
                  value={userLoginId}
                  readOnly
                />
              </div>
              <div style={style.loginInfo}>
                <span style={style.usernameBoxTitle}>Senha</span>
                <input
                  style={style.usernameInput}
                  type="password"
                  value="••••••••"
                  readOnly
                />
                <button
                  onClick={() => setModalChangePass(true)}
                  style={style.changePass}
                >
                  Alterar senha
                </button>
                <button onClick={() => {disconnectWebSocket(); logout()}} style={style.exit}>
                  Sair
                </button>
              </div>
            </div>
            <div style={style.loggedUserBoxSecond}>
              <div style={style.loggedUserBoxSecondFirst}>
                <div style={style.infoBox}>
                  <span style={style.infoBoxTitle}>Criado em</span>
                  <span style={style.infoBoxValue}>{createdDate}</span>
                </div>
                <div style={style.infoBox}>
                  <span style={style.infoBoxTitle}>Empresa cadastrada</span>
                  <span style={style.infoBoxValue}>{enterpriseName}</span>
                </div>
                <div style={style.infoBox}>
                  <span style={style.infoBoxTitle}>ID da empresa</span>
                  <span style={style.infoBoxValue}>{enterpriseId}</span>
                </div>
              </div>
              <div style={style.loggedUserBoxSecondSecond}>
                <span style={style.loggedUserBoxSecondSecondTitle}>
                  Permissões do usuário
                </span>
                <div style={style.permissions}>
                  {user &&
                    user.permissions &&
                    user.permissions.map((p, key) => (
                      <>
                        <span
                          style={{
                            ...style.permissionName,
                            color: p.allowed
                              ? "rgba(0, 200, 0, 1)"
                              : "rgba(230, 50, 20, 1)",
                          }}
                        >
                          {func.formatPermission(p.name)}
                        </span>
                      </>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={style.promptContainer}>
          <span style={style.promptContainerTitle}>Prompt da empresa:</span>
          <select
            style={style.agentNumberSelect}
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
                <option key={agent.number} value={agent.number}>
                  {agent.name}
                </option>
              ))}
          </select>

          <span style={style.promptContainerSubTitle}>
            Editar o prompt de maneira incorreta irá influenciar imediatamente
            no desempenho do agente de IA.
          </span>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            style={style.promptInput}
          />
          <button onClick={editarPrompt} style={style.editPromptButton}>
            Salvar Prompt
          </button>
        </div>

        <div style={style.anotherUsersContainer}>
          <span style={style.anotherUsersContainerTitle}>
            Todos os usuários
          </span>

          <div style={style.usersTable}>
            <div style={style.usersTableHeader}>
              <span style={style.usersTableHeaderCell}>Nome</span>
              <span style={style.usersTableHeaderCell}>Usuário</span>
              <span style={style.usersTableHeaderCell}>Criado em</span>
            </div>
            <div style={style.usersTableBody}>
              {admins &&
                admins.map((admin, key) => (
                  <>
                    <div key={key} style={style.usersTableBodyRow}>
                      <span style={style.usersTableBodyRowCell}>
                        {admin.name}
                      </span>
                      <span style={style.usersTableBodyRowCell}>
                        {admin.loginId}
                      </span>
                      <span style={style.usersTableBodyRowCell}>
                        {func.formatarDataCompleta(admin.dateCreated)}
                      </span>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
