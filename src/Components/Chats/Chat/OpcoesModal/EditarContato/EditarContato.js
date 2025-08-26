import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./EditarContatoStyle";
import { LoadingContext } from "../../../../../Context/LoadingContext";
import { ChatContext } from "../../../../../Context/ChatContext";
import axios from "axios";
import { AuthContext } from "../../../../../Context/AuthContext";
import { FiX, FiMapPin, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";
import func from "../../../../../Services/fotmatters";

export default function EditarContato({ onClose, chat }) {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { setActiveChat } = useContext(ChatContext);
  const { credentials } = useContext(AuthContext);

  const initialData = useRef({});
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("Brasil");
  const [city, setCity] = useState("");
  const [clientName, setClientName] = useState("");
  const [teveAlteracoes, setTeveAlteracoes] = useState(false);

  useEffect(() => {
    if (chat) {
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
      setStreet(newInitialData.street);
      setComplement(newInitialData.complement);
      setNumber(newInitialData.number);
      setNeighborhood(newInitialData.neighborhood);
      setState(newInitialData.state);
      setZipcode(newInitialData.zipcode);
      setCountry(newInitialData.country);
      setCity(newInitialData.city);
      setClientName(newInitialData.clientName);
    }
  }, [chat]);

  useEffect(() => {
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

  const preencherEndereco = async () => {
    if (zipcode.trim().length === 8) {
      startLoading();
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${zipcode}/json/`
        );
        const data = response.data;
        if (!data.erro) {
          setStreet(data.logradouro || "");
          setNeighborhood(data.bairro || "");
          setCity(data.localidade || "");
          setState(data.uf || "");
          setCountry("Brasil");
        } else {
          toast.error("CEP não encontrado.");
        }
      } catch (error) {
        toast.error("Não foi possível buscar o CEP.");
      } finally {
        stopLoading();
      }
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/${chat.id}`,
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
        { headers: { Authorization: credentials.accessToken } }
      );
      setActiveChat(response.data);
      toast.success("Contato atualizado com sucesso.");
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar contato.");
    } finally {
      stopLoading();
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
          <h2 style={style.title}>Editar Contato</h2>
          <button onClick={onClose} style={style.closeButton}>
            <FiX size={20} />
          </button>
        </div>
        <form onSubmit={handleSaveEdit} style={style.form}>
          <div style={style.inputGroup}>
            <label style={style.label}>Nome do Cliente</label>
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              style={style.input}
            />
          </div>
          <div style={style.inputGrid}>
            <div style={style.inputGroup}>
              <label style={style.label}>Contato</label>
              <input
                disabled
                value={func.formatarContato(func.getChatId(chat?.id))}
                style={{ ...style.input, ...style.disabledInput }}
              />
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>CEP</label>
              <div style={style.cepWrapper}>
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) =>
                    setZipcode(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={8}
                  style={style.input}
                />
                <button
                  type="button"
                  onClick={preencherEndereco}
                  style={style.cepButton}
                >
                  <FiMapPin />
                </button>
              </div>
            </div>
          </div>
          <div style={style.inputGrid}>
            <div style={{ ...style.inputGroup, gridColumn: "1 / 3" }}>
              <label style={style.label}>Logradouro</label>
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                style={style.input}
              />
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Número</label>
              <input
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                style={style.input}
              />
            </div>
          </div>
          <div style={style.inputGrid}>
            <div style={style.inputGroup}>
              <label style={style.label}>Bairro</label>
              <input
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                style={style.input}
              />
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Complemento</label>
              <input
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                style={style.input}
              />
            </div>
          </div>
          <div style={style.inputGrid}>
            <div style={style.inputGroup}>
              <label style={style.label}>Cidade</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={style.input}
              />
            </div>
            <div style={style.inputGroup}>
              <label style={style.label}>Estado</label>
              <input
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={style.input}
              />
            </div>
          </div>
          <div style={style.buttonArea}>
            <button
              type="button"
              onClick={onClose}
              style={{ ...style.actionButton, ...style.cancelButton }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{ ...style.actionButton, ...style.saveButton }}
              disabled={!teveAlteracoes}
            >
              <FiSave style={{ marginRight: "8px" }} /> Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
