const style = {
  // --- Camada de Fundo e Animação ---
  containerModal: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 99,
    background: "rgba(10, 12, 15, 0.7)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fontFamily: "'Inter', sans-serif",
  },

  // --- Corpo Principal do Modal ---
  modalContent: {
    width: "95%",
    maxWidth: "520px",
    maxHeight: "95vh",
    borderRadius: "24px",
    background: "#181A1F",
    border: "1px solid #33363A",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  // --- Cabeçalho ---
  modalHeader: (isBlocked) => ({
    padding: "25px 35px",
    textAlign: "center",
    borderBottom: "1px solid #33363A",
    background: isBlocked ? "rgba(255, 71, 87, 0.05)" : "rgba(250, 173, 20, 0.05)",
  }),
  headerIcon: {
    marginBottom: "10px",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#FFFFFF",
    margin: 0,
  },
  headerSubtitle: {
    fontSize: "16px",
    color: "#A0AEC0",
    marginTop: "5px",
    fontWeight: 400,
    lineHeight: 1.5,
  },

  // --- Corpo do Modal ---
  modalBody: {
    padding: "30px 35px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  // --- Barra de Estatísticas ---
  statsBar: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    padding: "20px",
    background: "#22252A",
    borderRadius: "12px",
  },
  statsItem: {
    textAlign: "center",
    flex: 1,
  },
  statsLabel: {
    fontSize: "13px",
    color: "#718096",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statsValue: {
    fontSize: "18px",
    color: "#FFFFFF",
    fontWeight: 600,
    marginTop: "5px",
  },

  // --- Seção de Pagamento ---
  paymentSection: {
    textAlign: "center",
    marginTop: "10px",
  },
  paymentLabel: {
    fontSize: "14px",
    color: "#A0AEC0",
    fontWeight: 500,
  },
  paymentValue: {
    fontSize: "48px",
    fontWeight: 800,
    color: "#FFFFFF",
    margin: "5px 0",
  },
  paymentCurrency: {
    fontWeight: 500,
    fontSize: "24px",
    color: "#718096",
    marginLeft: "5px",
  },

  // --- Botões de Ação ---
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "20px",
  },
  primaryButton: (isBlocked, isDisabled = false) => ({
    width: "100%",
    padding: "16px",
    background: isBlocked ? "linear-gradient(90deg, #FF4757, #E83F4C)" : "linear-gradient(90deg, #2ECC71, #28B463)",
    border: "none",
    borderRadius: "12px",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
    boxShadow: `0 5px 20px ${isBlocked ? "rgba(255, 71, 87, 0.3)" : "rgba(46, 204, 113, 0.3)"}`,
    fontSize: "16px",
    fontWeight: 600,
    color: "#FFFFFF",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  }),
  secondaryButton: {
    width: "100%",
    padding: "16px",
    background: "transparent",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: 500,
    color: "#718096",
    transition: "color 0.2s ease, background-color 0.2s ease",
  },

  // --- Tela do PIX ---
  pixScreen: {
    padding: "30px 35px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "450px", // Garante altura mínima
  },
  qrCodeContainer: {
    padding: "15px",
    background: "#FFFFFF",
    borderRadius: "16px",
    display: "inline-block",
    marginTop: "20px",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
  },
  copyPixButton: {
    width: "100%",
    marginTop: "25px",
    padding: "12px",
    background: "#2D3748",
    border: "1px solid #4A5568",
    color: "#E2E8F0",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.2s ease",
  },
  
  // --- NOVOS ESTILOS PARA VERIFICAÇÃO ---
  verificationResultContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    minHeight: "300px",
    animation: "fadeIn 0.5s ease",
  },
  resultIconSuccess: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(46, 204, 113, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resultIconPending: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "rgba(250, 173, 20, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default style;