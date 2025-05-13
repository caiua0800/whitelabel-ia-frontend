import React from "react";
import style from "./MessageStyle";
import formatHelpers from "../../helpers/formatHelpers";

const Message = ({ message, id }) => {
    const renderMessageContent = () => {
        switch (message.messageType) {
            case 1:
                return message.text;
            case "image":
                return (
                    <div style={{ maxWidth: "100%" }}>
                        <img 
                            src={message.midea} 
                            alt={message.messageContent} 
                            style={{ 
                                maxWidth: "100%", 
                                maxHeight: "300px",
                                borderRadius: "8px",
                                marginBottom: "8px"
                            }} 
                        />
                        <div>{message.messageContent}</div>
                    </div>
                );
            case "file":
                return (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px"
                    }}>
                        <div style={{
                            marginRight: "10px",
                            fontSize: "24px"
                        }}>
                            📄
                        </div>
                        <div style={{ overflow: "hidden" }}>
                            <div style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                {message.messageContent}
                            </div>
                            <div style={{ fontSize: "12px", color: "#666" }}>
                                Arquivo anexado
                            </div>
                        </div>
                    </div>
                );
            default:
                return message.messageContent;
        }
    };

    return (
        <>
            <div key={id} style={{
                ...style.messageContainer,
                justifyContent: !message.isReply ? "flex-start" : "end"
            }}>
                <div style={{
                    ...style.messageBox,
                    background: !message.isReply ? "rgba(255, 255, 255, 1)" : "rgba(240, 240, 255, 1)",
                    textAlign: !message.isReply  ? "left" : "right"
                }}>
                    {renderMessageContent()}
                    <span style={{...style.messageTime, right: !message.isReply ? -40 : 0}}>
                        {formatHelpers.formatarData(message.dateCreated)}
                    </span>
                </div>
            </div>
        </>
    );
};

export default Message;