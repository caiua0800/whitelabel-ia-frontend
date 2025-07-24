import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./EditarContatoStyle";
import { LoadingContext } from "../../../Context/LoadingContext";
import { ChatContext } from "../../../Context/ChatContext";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

export default function EditarContato({ onClose, chat }) {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { credentials } = useContext(AuthContext);

  // Estado inicial (usado para comparação)
  const initialData = useRef({
    street: "",
    complement: "",
    number: "",
    neighborhood: "",
    state: "",
    zipcode: "",
    country: "Brasil",
    city: "",
    clientName: "",
  });

  // Estados atuais
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [city, setCity] = useState("");
  const [clientName, setClientName] = useState("");
  const [chatId, setChatId] = useState("");
  const [teveAlteracoes, setTeveAlteracoes] = useState(false);

  // Atualiza estados iniciais e atuais quando activeChat muda
  useEffect(() => {
    if (chat) {
      setChatId(chat.id || "");
      const newInitialData = {
        street: chat.street || "",
        complement: chat.complement || "",
        number: chat.number || "",
        neighborhood: chat.neighborhood || "",
        state: chat.state || "",
        zipcode: chat.zipcode || "",
        country: chat.country || "Brasil",
        city: chat.city || "",
        clientName: chat.clientName || "",
      };

      initialData.current = newInitialData;

      // Atualiza estados atuais
      setStreet(newInitialData.street);
      setComplement(newInitialData.complement);
      setNumber(newInitialData.number);
      setNeighborhood(newInitialData.neighborhood);
      setState(newInitialData.state);
      setZipcode(newInitialData.zipcode);
      setCountry(newInitialData.country);
      setCity(newInitialData.city);
      setClientName(newInitialData.clientName);

      // Verifica alterações iniciais
      checkForChanges();
    }
  }, [chat]);

  useEffect(() => {
    checkForChanges();
  }, [
    street,
    complement,
    number,
    neighborhood,
    state,
    zipcode,
    country,
    city,
    clientName,
  ]);

  const checkForChanges = () => {
    const currentValues = {
      street,
      complement,
      number,
      neighborhood,
      state,
      zipcode,
      country,
      city,
      clientName,
    };

    const hasChanges = Object.keys(currentValues).some(
      (key) => currentValues[key] !== initialData.current[key]
    );

    setTeveAlteracoes(hasChanges);
  };

  const buscarEnderecoPorCEP = async (cep) => {
    startLoading();
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (!data.erro) {
        return {
          ...data,
          pais: "Brasil",
        };
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      throw new Error("Não foi possível buscar o CEP. Tente novamente.");
    } finally {
      stopLoading();
    }
  };

  const formatPhone = (n) => {
    if (n?.trim().length === 13) {
      return `(${n[0]}${n[1]}) ${n[2]}${n[3]} ${n[4]}${n[5]}${n[6]}${n[7]}${n[8]}${n[9]}${n[10]}${n[11]}${n[12]}`;
    }
    return n || "";
  };

  const handleSairSemSalvar = () => {
    onClose();
  };

  const preencherEndereco = async () => {
    if (zipcode.trim().length === 8) {
      try {
        const endereco = await buscarEnderecoPorCEP(zipcode);

        setStreet(endereco.logradouro || "");
        setNeighborhood(endereco.bairro || "");
        setCity(endereco.localidade || "");
        setState(endereco.uf || "");
        setCountry(endereco.pais || "Brasil");
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        // Não limpa os campos, apenas mantém o que estava
      }
    }
  };

  const handleSaveEdit = async () => {
    startLoading();

    try {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_ROUTE}chat/${chat.id}`,
          {
            ...chat,
            street,
            zipcode,
            number,
            city,
            neighborhood,
            country,
            clientName,
            complement,
            state,
          },
          {
            headers: { Authorization: credentials.accessToken },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            alert("Contato salvo com sucesso.");
            onClose();
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Erro ao salvar contato.");
        });
    } catch (error) {
      console.log(error);
      alert("Erro ao salvar contato.");
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.modalContainer}>
          <div style={style.modal}>
            <span style={style.modalTitle}>Cadastre o contato</span>

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
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder=""
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
                      value={formatPhone(chat?.id)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>CEP</span>
                  <div style={{...style.infoRowBox, gridTemplateColumns: "70% 30%", gap: 5}}>
                    <input
                      type="number"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                    <button onClick={preencherEndereco} style={style.searchZipcode}>Buscar</button>
                  </div>
                </div>
              </div>
              <div style={style.infoRowThree}>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Logradouro</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Número</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder=""
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
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Complemento</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={complement}
                      onChange={(e) => setComplement(e.target.value)}
                      placeholder=""
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>Estado</span>
                  <div style={style.infoRowBox}>
                    <input
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
              </div>
              <div style={style.infoRowContainer}>
                <span style={style.infoTitle}>País</span>
                <div style={style.infoRowBox}>
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder=""
                    style={style.infoRowInput}
                  />
                </div>
              </div>
            </div>

            <div style={style.confirmation}>
              <div
                style={{
                  ...style.containerButtons,
                  gridTemplateColumns: teveAlteracoes ? "2fr 2fr" : "100%",
                }}
              >
                <button
                  onClick={handleSairSemSalvar}
                  style={{ ...style.button, background: "rgba(255, 80, 0, 1)" }}
                >
                  {teveAlteracoes ? "Sair sem salvar" : "Sair"}
                </button>
                {teveAlteracoes && (
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      ...style.button,
                      background: "rgba(30, 230, 0, 1)",
                    }}
                  >
                    Salvar e sair
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
