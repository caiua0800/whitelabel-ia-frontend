import React, { useState, useEffect, useRef, useContext } from "react";
import style from "./ChatStyle";
import Message from "../Message/Message";
import "./effect.css";
import { ChatContext } from "../../../Context/ChatContext";
import { sendWhatsapp, editarStatusAgente } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { LoadingContext } from "../../../Context/LoadingContext";
import OpcoesModal from "./OpcoesModal/OpcoesModal";

export default function Chat({ chat }) {
    const { messages, activeChat, handleEditChatStatus } = useContext(ChatContext)
    const { credentials } = useContext(AuthContext)
    const [clientChat, setClientChat] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const fileInputRef = useRef(null);
    const chatBodyRef = useRef(null);
    const [popUpIcon, setPopUpIcon] = useState(false);
    const [popUpIcon2, setPopUpIcon2] = useState(false);
    const [opcoesModal, setOpcoesModal] = useState(false);
    const { startLoading, stopLoading, stopLoadingDelay } = useContext(LoadingContext);

    useEffect(() => {
        if (activeChat) {
            setClientChat(activeChat);
            setTimeout(() => {
                if (chatBodyRef.current) {
                    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
                }
            }, 0);
        }
    }, [chat]);

    const handleSendMessage = async () => {
        if (!messageInput.trim()) return;

        try {

            await sendWhatsapp(messageInput, true, activeChat.id, credentials.accessToken);
            setMessageInput(""); // limpa o campo após enviar
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            alert("Erro ao enviar mensagem.");
        }
    };

    const handleBlockAndUnblockAgent = async () => {
        var newStatus = activeChat.status === 1 ? 2 : 1;

        try {
            startLoading();
            var res = await editarStatusAgente(activeChat.id, newStatus, credentials.accessToken);
            console.log(res);

            if (res.status === 200) {
                handleEditChatStatus(newStatus);
                stopLoadingDelay();
                // return alert(newStatus === 1 ? "Agente ativado com sucesso." : "Agente bloqueado com sucesso.");
                return;
            }
            stopLoadingDelay();
        } catch (error) {
            console.log("Erro ao editar status do agente:");
            console.log(error);
            stopLoadingDelay();
            alert("Erro ao editar status do agente.");
        }
    };

    const handleAttachClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert("Você pode selecionar no máximo 5 arquivos");
            return;
        }

        const newFiles = files.slice(0, 5);

        const processedFiles = newFiles.map(file => {
            return {
                file,
                preview: file.type.match('image.*') ? URL.createObjectURL(file) : null
            };
        });

        setSelectedFiles(prev => [...prev, ...processedFiles].slice(0, 5));
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => {
            const newFiles = [...prev];
            if (newFiles[index].preview) {
                URL.revokeObjectURL(newFiles[index].preview);
            }
            newFiles.splice(index, 1);
            return newFiles;
        });
    };

    const clearAllFiles = () => {
        selectedFiles.forEach(file => {
            if (file.preview) {
                URL.revokeObjectURL(file.preview);
            }
        });
        setSelectedFiles([]);
        fileInputRef.current.value = '';
    };

    useEffect(() => {
        return () => {
            selectedFiles.forEach(file => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [selectedFiles]);


    return (
        <>
            <div style={style.chatContainer}>
                <div style={style.chatHeader}>
                    <div style={style.clientInfo}>
                        <div style={style.clientPictureBox}>
                            <img style={style.clientPicture} src="./images/usuario.webp" />
                        </div>
                        <span style={style.clientName}>
                            {(clientChat) && clientChat.id}
                        </span>
                    </div>
                    <div style={style.chatOptionMenu}>
                        <div onMouseEnter={() => setPopUpIcon(true)} onMouseOut={() => setPopUpIcon(false)} onClick={handleBlockAndUnblockAgent} className="chat-options-button" style={style.chatOptionsButton}>
                            <img className="chat-options-button-icon" style={style.optionsIcon} src={(activeChat && activeChat.status) === 1 ? "./icons/bot2-icon.svg" : "./icons/block-icon.svg"} />
                            {popUpIcon && (
                                <div style={style.popUpIconButton}>
                                    {(activeChat && activeChat.status) === 1 ? "Agente Ativado" : "Agente Bloqueado"}
                                </div>
                            )}
                        </div>
                        <div onClick={() => setOpcoesModal(true)} onMouseEnter={() => setPopUpIcon2(true)} onMouseOut={() => setPopUpIcon2(false)} className="chat-options-button" style={style.chatOptionsButton}>
                            <img className="chat-options-button-icon" style={style.optionsIcon} src="./icons/options-icon.svg" />
                            {popUpIcon2 && (
                                <div style={style.popUpIconButton}>
                                    Opções
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div style={style.chatBody} ref={chatBodyRef}>
                    <div style={style.bodyContent}>
                        {messages && messages.map((message, key) => (
                            <Message message={message} id={key} />
                        ))}
                    </div>
                </div>
                <div style={style.sendMessagesBox}>
                    {selectedFiles.length > 0 && (
                        <div style={style.attachConfirmBox}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '8px'
                            }}>
                                <span style={{ fontSize: '14px', color: '#666' }}>
                                    {selectedFiles.length} arquivo(s) selecionado(s)
                                </span>
                                <button
                                    onClick={clearAllFiles}
                                    style={{
                                        background: 'transparent',
                                        color: '#ff4444',
                                        border: 'none',
                                        fontSize: '14px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Remover todos
                                </button>
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                                gap: '10px',
                                maxHeight: '200px',
                                overflowY: 'auto'
                            }}>
                                {selectedFiles.map((fileData, index) => (
                                    <div key={index} style={{
                                        position: 'relative',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        padding: '8px',
                                        backgroundColor: '#f9f9f9'
                                    }}>
                                        {fileData.preview ? (
                                            <>
                                                <img
                                                    src={fileData.preview}
                                                    alt="Preview"
                                                    style={{
                                                        width: '100%',
                                                        height: '80px',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                                <div style={{
                                                    fontSize: '12px',
                                                    marginTop: '4px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {fileData.file.name}
                                                </div>
                                            </>
                                        ) : (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center'
                                            }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    backgroundColor: '#e0e0e0',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: '8px'
                                                }}>
                                                    <span style={{ fontSize: '24px' }}>📄</span>
                                                </div>
                                                <div style={{
                                                    fontSize: '12px',
                                                    textAlign: 'center',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    width: '100%'
                                                }}>
                                                    {fileData.file.name}
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => removeFile(index)}
                                            style={{
                                                position: 'absolute',
                                                top: '-8px',
                                                right: '-8px',
                                                background: '#ff4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div style={style.attachFileButton} onClick={handleAttachClick}>
                        <img className="attach-icon icon" style={style.attachIcon} src="./icons/attach-icon.svg" />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            accept="image/*,.pdf,.doc,.docx,.txt"
                            multiple
                        />
                    </div>
                    <div style={style.messageInputBox}>
                        <input
                            placeholder="Digite sua mensagem..."
                            style={style.messageInput}
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                        />
                    </div>
                    <div
                        style={style.sendMessageButton}
                        onClick={handleSendMessage}
                    >
                        <img className="airplane-icon icon" style={style.sendMessageIcon} src="./icons/airplane-icon.svg" />
                    </div>
                </div>
            </div>

            {opcoesModal && (
                <>
                    <OpcoesModal onClose={() => setOpcoesModal(false)} />
                </>
            )}
        </>
    );
}