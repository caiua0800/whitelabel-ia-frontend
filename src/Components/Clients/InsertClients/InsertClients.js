import React, { useState, useRef, useContext } from "react";
import * as XLSX from "xlsx";
import style from "./InsertClientsStyle";
import { createMultipleClients } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import TagsModal from "./TagsModal/TagsModal";
import { FiX, FiUpload, FiFile, FiTag, FiCheckCircle } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function InsertClients({ onClose }) {
  const { credentials } = useContext(AuthContext);
  const [columnNameForName, setColumnNameForName] = useState("");
  const [columnNameForContact, setColumnNameForContact] = useState("");
  const [extractedClients, setExtractedClients] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setExtractedClients([]);
  };

  const handleExtract = () => {
    if (!selectedFile) {
      toast.error("Por favor, selecione um arquivo primeiro.");
      return;
    }
    if (!columnNameForContact) {
      toast.error("O nome da coluna de Contato é obrigatório.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        const headerRowIndex = jsonData.findIndex(row => 
          row.some(cell => typeof cell === 'string' && cell.toLowerCase() === columnNameForContact.toLowerCase()) ||
          (columnNameForName && row.some(cell => typeof cell === 'string' && cell.toLowerCase() === columnNameForName.toLowerCase()))
        );
        if (headerRowIndex === -1) {
          toast.error("Não foi possível encontrar os cabeçalhos no arquivo.");
          return;
        }
        const headers = jsonData[headerRowIndex].map(h => h.toLowerCase());
        const dataRows = jsonData.slice(headerRowIndex + 1);
        const nameColIndex = columnNameForName ? headers.indexOf(columnNameForName.toLowerCase()) : -1;
        const contactColIndex = headers.indexOf(columnNameForContact.toLowerCase());
        
        if (contactColIndex === -1) {
          toast.error(`Coluna '${columnNameForContact}' não encontrada.`);
          return;
        }
  
        const clients = dataRows
          .map(row => ({
            name: nameColIndex >= 0 ? String(row[nameColIndex] || "").trim() : "",
            contact: String(row[contactColIndex] || "").replace(/\D/g, "").trim(),
          }))
          .filter(client => client.contact.length === 10 || client.contact.length === 11);
  
        if (clients.length === 0) {
          toast.error("Nenhum contato válido encontrado.");
        } else {
          toast.success(`${clients.length} contatos extraídos com sucesso!`);
        }
        setExtractedClients(clients);
      } catch (error) {
        toast.error("Erro ao processar o arquivo.");
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleSaveClients = async () => {
    if (extractedClients.length === 0 || !credentials) return;
    setIsSaving(true);
    try {
      const tagIds = selectedTags.map(t => t.id);
      const clientsToSave = extractedClients.map(e => ({...e, tags: tagIds}));
      await createMultipleClients(clientsToSave, credentials.accessToken);
      toast.success("Contatos importados com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar contatos.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div style={style.overlay} onClick={onClose}>
        <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
          <div style={style.modalHeader}>
            <h2 style={style.modalTitle}>Importar Contatos via Planilha</h2>
            <button style={style.closeButtonModal} onClick={onClose}><FiX size={20} /></button>
          </div>
          <div style={style.modalBody}>
            <div style={style.step}>
                <div style={style.stepNumber}>1</div>
                <div style={style.stepContent}>
                    <label style={style.label}>Nome das Colunas na Planilha</label>
                    <div style={style.inputGrid}>
                        <input onChange={(e) => setColumnNameForName(e.target.value)} value={columnNameForName} style={style.input} placeholder="Coluna do Nome (opcional)"/>
                        <input onChange={(e) => setColumnNameForContact(e.target.value)} value={columnNameForContact} style={style.input} placeholder="Coluna do Contato*" required/>
                    </div>
                </div>
            </div>
            <div style={style.step}>
                <div style={style.stepNumber}>2</div>
                 <div style={style.stepContent}>
                    <label style={style.label}>Selecione o Arquivo</label>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".xlsx, .xls, .csv" onChange={handleFileUpload}/>
                    <button style={style.selectFileButton} onClick={() => fileInputRef.current?.click()}><FiUpload style={{marginRight: '8px'}}/> Escolher Arquivo</button>
                    {selectedFile && <span style={style.fileName}><FiFile style={{marginRight: '5px'}}/> {selectedFile.name}</span>}
                </div>
            </div>
             <div style={style.step}>
                <div style={style.stepNumber}>3</div>
                 <div style={style.stepContent}>
                    <label style={style.label}>Adicionar Tags (opcional)</label>
                    <button onClick={() => setShowTagModal(true)} style={style.tagButton}><FiTag style={{marginRight: '8px'}}/> Selecionar Tags ({selectedTags.length})</button>
                </div>
            </div>
             <div style={style.step}>
                <div style={style.stepNumber}>4</div>
                 <div style={style.stepContent}>
                    <button style={style.extractButton} onClick={handleExtract} disabled={!selectedFile || !columnNameForContact}>Extrair Contatos da Planilha</button>
                </div>
            </div>
             {extractedClients.length > 0 && (
              <div style={style.summaryBox}>
                <FiCheckCircle size={20} style={{color: '#4ecf78'}}/>
                <span><b>{extractedClients.length} contatos válidos</b> prontos para importação.</span>
              </div>
            )}
          </div>
          <div style={style.modalFooter}>
            <button style={style.saveButton} onClick={handleSaveClients} disabled={isSaving || extractedClients.length === 0}>
              {isSaving ? "Importando..." : "Importar Contatos"}
            </button>
          </div>
        </div>
      </div>
      {showTagModal && <TagsModal handleSelect={setSelectedTags} currentTagsAdded={selectedTags} onClose={() => setShowTagModal(false)} />}
    </>
  );
}