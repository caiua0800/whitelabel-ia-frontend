const style = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.6)",
  },
  containerBox: {
    padding: "30px",
    minWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    background: "rgba(235, 235, 235, 1)",
    borderRadius: 4
  },
  title: {
    fontSize: 22,
    color: "rgba(80, 80, 80, 1)",
    fontWeight: 600
  },
  qrCodeContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    height: 300,
    position: "relative"
  },
  qrCode: {
    boxShadow: "4px 4px 10px rgba(0,0,0,0.4)",
    borderRadius: 12
  },
  valueAndButtons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    width: "100%"
  },
  valueAndButtonsCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  valueTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "black"
  },
  valueValue: {
    fontSize: 22,
    fontWeight: 600,
    color: "rgba(0, 180, 0, 1)"
  },
  verifyPaymentButton: {
    width: 300,
    height: 35,
    borderRadius: 4,
    boxSizing: "border-box",
    background: "rgba(50, 220, 0, 1)",
    fontSize: 16,
    fontWeight: 600,
    color: "black",
    marginTop: 10,
    cursor: "pointer",
    border: 0,
    outline: "none"
  },
  exitButton: {
    width: 300,
    height: 35,
    borderRadius: 4,
    boxSizing: "border-box",
    background: "rgba(180, 180, 180, 1)",
    fontSize: 16,
    fontWeight: 600,
    color: "black",
    marginTop: 10,
    cursor: "pointer",
    border: 0,
    outline: "none"
  }
};

export default style;
