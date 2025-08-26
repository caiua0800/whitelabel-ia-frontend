import React, { useContext } from "react";
import style from "./NotificationStyle";
import { ChatContext } from "../../Context/ChatContext";
import formatHelpers from "../helpers/formatHelpers";
import { useNavigate } from "react-router-dom";
import func from "../../Services/fotmatters";

// Um ícone moderno em SVG para substituir a imagem
const ChatIcon = () => (
  <svg
    style={style.icon}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 11.5C21 16.7467 16.7467 21 11.5 21C10.8562 21 10.2222 20.944 9.60233 20.8359C8.2433 21.5831 6.09637 22.5348 4.09524 22.9048C3.89524 22.9448 3.69524 22.7448 3.73524 22.5448C4.10524 20.5437 5.05692 18.3967 5.80413 17.0377C5.05596 16.1853 4.5 15.0932 4.5 13.8C4.5 8.55329 8.75329 4 14 4C17.7663 4 21 7.23371 21 11.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Notification() {
  const navigate = useNavigate();
  const {
    notification,
    handleCloseNotification,
    handleSetActiveChatByNotification,
  } = useContext(ChatContext);

  const handleSelect = (chatId) => {
    navigate("/");
    handleSetActiveChatByNotification(chatId);
    handleCloseNotification();
  };

  const limitarTexto = (text) => {
    if (!text) return "";
    return text.length > 30 ? `${text.substring(0, 30)}...` : text;
  };

  return (
    <>
      <style>
        {`
                    @keyframes slideInFromBottom {
                        0% {
                            transform: translateY(100%);
                            opacity: 0;
                        }
                        100% {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                `}
      </style>
      {notification && (
        <div style={style.notificationContainer}>
          <div
            onClick={() => handleSelect(notification.chatId)}
            style={style.notificationBox}
          >
            <div style={style.iconContainer}>
              <ChatIcon />
            </div>
            <div style={style.contentContainer}>
              <div style={style.header}>
                <span style={style.title}>Nova Mensagem</span>
                <span style={style.senderId}>
                  {func.getChatId(notification.chatId)}
                </span>
              </div>
              <div style={style.messageBody}>
                <span style={style.message}>
                  {limitarTexto(notification.text)}
                </span>
              </div>
              <div style={style.footer}>
                <span style={style.hour}>
                  {formatHelpers.formatarData(notification.dateCreated)}
                </span>
              </div>
            </div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleCloseNotification();
              }}
              style={style.closeBtn}
            >
              ×
            </span>
          </div>
        </div>
      )}
    </>
  );
}
