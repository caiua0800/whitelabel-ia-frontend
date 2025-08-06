import React from "react";
import style from "./MessageStyle";
import formatHelpers from "../../helpers/formatHelpers";
import { FiImage, FiFileText } from "react-icons/fi";

const Message = ({ message }) => {
  const renderMessageContent = () => {
    switch (message.messageType) {
      case "image":
        return (
          <>
            <img src={message.midea} alt="Imagem" style={style.imageContent} />
            {message.text && <div style={style.caption}>{message.text}</div>}
          </>
        );
      case "file":
        return (
          <div style={style.fileContainer}>
            <FiFileText size={24} style={style.fileIcon} />
            <div style={style.fileInfo}>
              <span style={style.fileName}>{message.messageContent}</span>
              <span style={style.fileMeta}>Arquivo</span>
            </div>
          </div>
        );
      default:
        return message.text;
    }
  };

  const isReply = message.isReply;

  return (
    <div style={{...style.messageContainer, justifyContent: isReply ? "flex-end" : "flex-start"}}>
      <div style={{ ...style.messageBox, ...(isReply ? style.replyBox : style.sentBox) }}>
        <div style={style.messageContent}>
          {renderMessageContent()}
        </div>
        <span style={style.messageTime}>
          {formatHelpers.formatarData(message.dateCreated)}
        </span>
      </div>
    </div>
  );
};

export default Message;