import React, { useState, useEffect, useContext, useRef } from "react";
import style from "./AddClientStyle";
import { LoadingContext } from "../../../Context/LoadingContext";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { FiX, FiMapPin, FiSave } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function AddClient({ onClose }) {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { credentials } = useContext(AuthContext);

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

  const buscarEnderecoPorCEP = async (cep) => {
    startLoading();
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (!data.erro) {
        return { ...data, pais: "Brasil" };
      }
      return data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      throw new Error("Não foi possível buscar o CEP. Tente novamente.");
    } finally {
      stopLoading();
    }
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
        toast.error(error.message);
      }
    }
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    startLoading();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat`,
        { id: `55${clientContact.replace(/\D/g, '')}`, street, zipcode, number, city, neighborhood, country, clientName, complement, state },
        { headers: { Authorization: credentials.accessToken } }
      );
      if (response.status === 201) {
        toast.success("Contato salvo com sucesso.");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Erro ao salvar contato.");
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
            <h2 style={style.title}>Adicionar Novo Contato</h2>
            <button onClick={onClose} style={style.closeButton}><FiX size={20}/></button>
        </div>
        <form onSubmit={handleAddClient} style={style.form}>
            <div style={style.inputGrid}>
                 <div style={{...style.inputGroup, gridColumn: '1 / 3'}}>
                    <label style={style.label}>Nome do Cliente</label>
                    <input value={clientName} onChange={(e) => setClientName(e.target.value)} style={style.input} required/>
                </div>
                 <div style={style.inputGroup}>
                    <label style={style.label}>Contato (DDD + Número)</label>
                    <input value={clientContact} onChange={(e) => setClientContact(e.target.value)} style={style.input} required/>
                </div>
            </div>
             <div style={style.inputGrid}>
                <div style={style.inputGroup}>
                    <label style={style.label}>CEP</label>
                    <div style={style.cepWrapper}>
                        <input type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value.replace(/\D/g, ''))} maxLength={8} style={style.input} />
                        <button type="button" onClick={preencherEndereco} style={style.cepButton}><FiMapPin/></button>
                    </div>
                </div>
                 <div style={{...style.inputGroup, gridColumn: '2 / 4'}}>
                    <label style={style.label}>Logradouro</label>
                    <input value={street} onChange={(e) => setStreet(e.target.value)} style={style.input} />
                </div>
                <div style={style.inputGroup}>
                    <label style={style.label}>Número</label>
                    <input value={number} onChange={(e) => setNumber(e.target.value)} style={style.input} />
                </div>
            </div>
             <div style={style.inputGrid}>
                <div style={style.inputGroup}>
                    <label style={style.label}>Bairro</label>
                    <input value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} style={style.input} />
                </div>
                 <div style={style.inputGroup}>
                    <label style={style.label}>Complemento</label>
                    <input value={complement} onChange={(e) => setComplement(e.target.value)} style={style.input} />
                </div>
                 <div style={style.inputGroup}>
                    <label style={style.label}>Cidade</label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} style={style.input} />
                </div>
                 <div style={style.inputGroup}>
                    <label style={style.label}>Estado</label>
                    <input value={state} onChange={(e) => setState(e.target.value)} style={style.input} />
                </div>
            </div>
            <div style={style.buttonArea}>
                <button type="button" onClick={onClose} style={{...style.actionButton, ...style.cancelButton}}>Cancelar</button>
                <button type="submit" style={{...style.actionButton, ...style.saveButton}}>
                    <FiSave style={{marginRight: '8px'}}/> Salvar Contato
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}