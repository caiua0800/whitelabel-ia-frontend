import React, { useState, useRef, useContext } from "react";
import * as XLSX from "xlsx";
import style from "./InsertClientsStyle";
import { createMultipleClients } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import TagsModal from "./TagsModal/TagsModal";

export default function InsertClients({ onClose }) {
  const { credentials } = useContext(AuthContext);
  const [columnNameForName, setColumnNameForName] = useState("");
  const [columnNameForContact, setColumnNameForContact] = useState("");
  const [extractError, setExtractError] = useState(null);
  const [extractedClients, setExtractedClients] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(true);
  const [showTagModal, setShowTagModal] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setExtractedClients([]);
    setExtractError(null);
    setSaveSuccess(false);
    setSaveError(null);
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleExtract = () => {
    if (!selectedFile) {
      setExtractError("Por favor, selecione um arquivo primeiro.");
      return;
    }
    if (!columnNameForContact) {
      setExtractError("Por favor, especifique o nome da coluna do Contato.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Modificação importante: usar { header: 1 } para obter os dados brutos
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Encontrar a linha que contém os cabeçalhos reais
        const headerRowIndex = jsonData.findIndex(row => 
          row.some(cell => typeof cell === 'string' && cell.toLowerCase() === columnNameForContact.toLowerCase()) ||
          row.some(cell => typeof cell === 'string' && cell.toLowerCase() === columnNameForName.toLowerCase())
        );
        
        if (headerRowIndex === -1) {
          setExtractError("Não foi possível encontrar os cabeçalhos no arquivo.");
          return;
        }
  
        const headers = jsonData[headerRowIndex];
        const dataRows = jsonData.slice(headerRowIndex + 1);
        
        const nameColIndex = columnNameForName 
          ? headers.findIndex(h => h && h.toLowerCase() === columnNameForName.toLowerCase()) 
          : -1;
        const contactColIndex = headers.findIndex(h => h && h.toLowerCase() === columnNameForContact.toLowerCase());
        
        if (contactColIndex === -1) {
          setExtractError(`Coluna '${columnNameForContact}' não encontrada no arquivo.`);
          return;
        }
  
        const clients = dataRows
          .map((row) => {
            const contact = String(row[contactColIndex] || "")
              .replace(/\D/g, "")
              .trim();
  
            return {
              name: nameColIndex >= 0 
                ? String(row[nameColIndex] || "").trim()
                : "",
              contact: contact,
            };
          })
          .filter((client) => {
            return client.contact.length === 10 || client.contact.length === 11;
          });
  
        if (clients.length === 0) {
          setExtractError(
            "Nenhum contato válido encontrado. Verifique se os nomes das colunas estão corretos."
          );
        } else {
          setExtractError(null);
        }
  
        setExtractedClients(clients);
      } catch (error) {
        setExtractError("Erro ao processar o arquivo. Verifique o formato.");
        console.error(error);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleSaveClients = async () => {
    if (extractedClients.length === 0 || !credentials) return;

    setIsSaving(true);
    setSaveError(null);

    try {

      var tagAux = []

      selectedTags.forEach(t => {
        tagAux.push(t.id)
      })

      var aux = []
      extractedClients.forEach((e) => {
        aux.push({...e, tags: tagAux || []})
      })


      const response = await createMultipleClients(
        aux,
        credentials.accessToken
      );

      if (response) {
        setSaveSuccess(true);
        alert("Contatos salvos com sucesso.");
        onClose();
      } else {
        setSaveError(response?.message || "Erro ao salvar contatos.");
      }
    } catch (error) {
      console.error("Erro ao salvar contatos:", error);
      setSaveError(
        error.response?.data?.message ||
          "Erro ao salvar contatos. Tente novamente."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectTags = (newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  return (
    <>
      <div style={style.container}>
        <div style={style.modalContainer}>
          <div style={style.modal}>
            <span style={style.closeButtonModal} onClick={onClose}>
              ×
            </span>
            <span style={style.modalTitle}>Importar Contatos</span>

            <div style={style.columnNamesBox}>
              <div style={style.columnNameBox}>
                <span style={style.columnName}>Coluna do Nome (opcional)</span>
                <input
                  onChange={(e) => setColumnNameForName(e.target.value)}
                  value={columnNameForName}
                  style={style.columnNameValue}
                  placeholder="Ex: nome_cliente"
                />
              </div>
              <div style={style.columnNameBox}>
                <span style={style.columnName}>Coluna do Contato*</span>
                <input
                  onChange={(e) => setColumnNameForContact(e.target.value)}
                  value={columnNameForContact}
                  style={style.columnNameValue}
                  placeholder="Ex: telefone"
                  required
                />
              </div>
            </div>

            <div style={style.selectDocBox}>
              <span style={style.selectDocBoxTitle}>Selecione o arquivo</span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".xlsx, .xls, .csv"
                onChange={handleFileUpload}
              />
              <button
                style={style.selectFileButton}
                onClick={handleSelectFileClick}
              >
                Selecionar Arquivo
              </button>

              {selectedFile && (
                <span style={{ fontSize: 12, marginTop: 5, display: "block" }}>
                  Arquivo selecionado: {selectedFile.name}
                </span>
              )}

              <span style={style.obsText}>
                Formatos suportados: XLSX, XLS, CSV
                <br />
                Formato do contato: DDD + Número (ex: 11987654321)
              </span>

              <button
                style={style.extractButton}
                onClick={handleExtract}
                disabled={!selectedFile || !columnNameForContact}
              >
                Extrair Contatos
              </button>

              {extractError && (
                <span style={style.extractErrorMsg}>{extractError}</span>
              )}

              {extractedClients.length > 0 && (
                <>
                  <div style={style.createTag}>
                    <div style={style.createTagBox}>
                      <button onClick={() => setShowTagModal(true)} style={style.selectTagButton}>
                        Selecionar Tag (opcional)
                      </button>
                    </div>
                  </div>

                  {saveError && (
                    <span style={{ ...style.extractErrorMsg, marginTop: 10 }}>
                      {saveError}
                    </span>
                  )}
                  {saveSuccess && (
                    <span
                      style={{ color: "green", fontSize: 14, marginTop: 10 }}
                    >
                      Contatos salvos com sucesso!
                    </span>
                  )}
                </>
              )}
            </div>

            {extractedClients.length > 0 && (
              <>
                <div style={style.summary}>
                  Contatos prontos para importar: {extractedClients.length}
                </div>

                <div style={style.extractedTable}>
                  <div style={style.extractedTableHeader}>
                    <span style={style.extractedTableHeaderCell}>Nome</span>
                    <span style={style.extractedTableHeaderCell}>Contato</span>
                  </div>
                  <div style={style.extractedTableBody}>
                    {extractedClients.slice(0, 5).map((client, index) => (
                      <div key={index} style={style.extractedTableBodyRow}>
                        <span style={style.extractedTableBodyCell}>
                          {client.name || "-"}
                        </span>
                        <span style={style.extractedTableBodyCell}>
                          {client.contact.replace(
                            /^(\d{2})(\d{4,5})(\d{4})$/,
                            "($1) $2-$3"
                          )}
                        </span>
                      </div>
                    ))}
                    {extractedClients.length > 5 && (
                      <div
                        style={{
                          ...style.extractedTableBodyRow,
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontSize: 12 }}>
                          + {extractedClients.length - 5} contatos
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  style={style.saveClients}
                  onClick={handleSaveClients}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span style={{ marginRight: 8 }}>Salvando...</span>
                      <div className="spinner"></div>
                    </>
                  ) : (
                    "Importar Contatos"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showTagModal && (
        <>
          <TagsModal handleSelect={handleSelectTags} currentTagsAdded={selectedTags} onClose={() => setShowTagModal(false)} />
        </>
      )}
    </>
  );
}
