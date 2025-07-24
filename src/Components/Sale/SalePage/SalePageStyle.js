const style = {
  containerGeneral: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    borderRadius: 4,
    width: "80%",
    // height: "80%",
    padding: "30px 40px",
    boxSizing: "border-box",
    background: "rgba(210, 210, 210, 1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: 15,
    left: 20,
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    cursor: "pointer",
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  content: {
    display: "grid",
    width: "100%",
    gap: 10,
  },
  modalContent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 5
  },
  modalContentRow1: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 4fr 2fr 3fr",
    gap: 10
  },
  modalContentRow2: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr",
    gap: 10
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  boxTitle: {
    fontsize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  boxInput: {
    width: "100%",
    height: 35,
    border: 0,
    outline: "none",
    borderRadius: 4,
    padding: 0,
    paddingLeft: 20,
    boxSizing: "border-box",
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  }, 
  inputBoxContainer: {
    width: "100%",
    display: "grid",
    gap: 10,
  },
  inputBoxContainerButton: {
    width: "100%",
    height: 35,
    border: 0,
    padding: 0,
    boxSizing: "border-box",
    cursor: "pointer",
    borderRadius: 4,
    fontWeight: 600,
    fontSize: 16
  },
  soldProducts: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  soldProductsTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  table: {
    width: "100%",
    display: "grid",
    background: "rgba(255, 255, 255, 1)",
    gridTemplateRows: "40px auto",
    boxSizing: "border-box",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    border: "1px solid rgba(240, 240, 240, 1)",
  },

  tableHeader: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "4fr 4fr 2fr",
    background: "rgba(245, 245, 245, 1)",
    borderBottom: "1px solid rgba(230, 230, 230, 1)",
  },

  tableHeaderCell: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    fontWeight: 600,
    fontSize: "14px",
    color: "rgba(80, 80, 80, 1)",
    textTransform: "uppercase",
    background: "red",
    letterSpacing: "0.5px",
  },
  tableHeaderCell1: {
    width: "100%",
    height: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    fontWeight: 600,
    fontSize: "14px",
    color: "rgba(80, 80, 80, 1)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  tableBody: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30px auto"
  },

  tableRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "4fr 4fr 2fr",
    alignItems: "center",
    padding: "10px 16px",
    boxSizing: "border-box",
    borderBottom: "1px solid rgba(240, 240, 240, 1)",
    transition: "background 0.2s ease",
    "&:hover": {
      background: "rgba(245, 245, 245, 1)",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  rollCell: {
    width: "100%",
    background: "red",
    display: "flex",
    justifyContent: "center"
  },

  tableCell: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0 5px",
    boxSizing: "border-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  tableCellText: {
    fontSize: "14px",
    color: "rgba(100, 100, 100, 1)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  bottom: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr 2fr",
  },
  bottomModal: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    marginTop: 10
  },
  bottomModalButton: {
    padding: "5px 20px",
    border: 0,
    boxSizing: "border-box",
    cursor: "pointer",
    borderRadius: 4,
    fontWeight: 600,
    fontSize: 16
  },
};


export default style;
