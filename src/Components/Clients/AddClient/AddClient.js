import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./AddClientStyle";
import { LoadingContext } from "../../../Context/LoadingContext";
import { ChatContext } from "../../../Context/ChatContext";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

export default function AddClient({ onClose }) {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { credentials } = useContext(AuthContext);

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

  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [city, setCity] = useState("");
  const [clientName, setClientName] = useState("");
  const [chatId, setChatId] = useState("");
  const [teveAlteracoes, setTeveAlteracoes] = useState(false);

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
    setClientName("");
    setClientContact("");
    setZipcode("");
    setState("");
    setStreet("");
    setCity("");
    setNeighborhood("");
    setComplement("");
    setNumber("");
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

    const handleAddClient = async () => {
      startLoading();

      try {
        await axios
          .post(
            `${process.env.REACT_APP_BASE_ROUTE}chat`,
            {
              id: clientContact,
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
            <span style={style.closeButtonModal} onClick={handleSairSemSalvar}>x</span>
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
                      value={clientContact}
                      onChange={(e) => setClientContact(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                  </div>
                </div>
                <div style={style.infoRowContainer}>
                  <span style={style.infoTitle}>CEP</span>
                  <div
                    style={{
                      ...style.infoRowBox,
                      gridTemplateColumns: "70% 30%",
                      gap: 5,
                    }}
                  >
                    <input
                      type="number"
                      value={zipcode}
                      onChange={(e) => setZipcode(e.target.value)}
                      placeholder=""
                      style={style.infoRowInput}
                    />
                    <button
                      onClick={preencherEndereco}
                      style={style.searchZipcode}
                    >
                      Buscar
                    </button>
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
                  gridTemplateColumns: "100%",
                }}
              >
                <button
                  onClick={handleAddClient}
                  style={{
                    ...style.button,
                    background: "rgba(30, 230, 0, 1)",
                  }}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
