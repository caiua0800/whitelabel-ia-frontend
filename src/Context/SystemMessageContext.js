import React, { createContext, useState, useRef, useCallback } from "react";

export const SystemMessageContext = createContext();

const SystemMessageProvider = ({ children }) => {
  const [systemMessage, setSystemMessage] = useState(null);
  const messageTimer = useRef(null);

  const closeMessage = useCallback(() => {
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }
    setSystemMessage(null);
  }, []);

  const showMessage = useCallback((message, type = 'success', duration = 4000) => {
    if (messageTimer.current) {
      clearTimeout(messageTimer.current);
    }
    setSystemMessage({ message, type });

    messageTimer.current = setTimeout(() => {
      closeMessage();
    }, duration);
  }, [closeMessage]);


  return (
    <SystemMessageContext.Provider
      value={{
        showMessage,
        closeMessage,
        systemMessage,
      }}
    >
      {children}
    </SystemMessageContext.Provider>
  );
};

export default SystemMessageProvider;