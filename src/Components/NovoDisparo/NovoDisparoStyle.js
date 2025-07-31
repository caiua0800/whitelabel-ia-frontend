const style = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "80px 50px",
    alignItems: "start",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 10,
    background: "rgba(240, 240, 240, 1)",
    overflowY: "auto",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 30,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  backButtonImage: {
    width: 50,
    opacity: 0.7,
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  title: {
    fontSize: 38,
    fontWeight: 800,
    color: "rgba(80, 80, 80, 1)",
  },
  selectModelContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  selectModelContainerTitle: {
    fontSize: 18,
    color: "rgba(80, 80, 80, 1)",
    width: "100%",
    textAlign: "start",
    borderBottom: "2px solid rgba(80, 80, 80, 1)",
    boxSizing: "border-box",
    paddingBottom: 5
  },
  content: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    marginTop: 20
  },
  modelsContainer: {
    width: "100%",
    display: "grid",
    gridTemplateRows: "40px auto",
    boxSizing: "border-box",
    padding: 20
  },
  modelsContainerTitleBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  modelsContainerTitleBoxText: {
    fontSize: 22,
    fontWeight: 500,
    color: "rgba(80, 80, 80, 1)"
  },
  avaliableModels: {
    width: "100%",
    gap: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  preencher: {
    width: "100%",
    borderLeft: "2px solid rgba(80, 80, 80, 1)",
    boxSizing: "border-box",
    padding: "20px 30px", // Aumentei o padding lateral
    display: "flex", // Adicionado
    flexDirection: "column", // Adicionado
    gap: "20px",
    position: "relative",
  },
  preencherContent: {
    position: "sticky",
    top: 0,
    width: "100%",
    boxSizing: "border-box",
    padding: "20px 30px", 
    display: "flex", 
    flexDirection: "column", 
    gap: "20px",
  },
  preencherTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: "rgba(80, 80, 80, 1)",
    boxSizing: "border-box",
    // borderBottom: "1px solid rgba(80, 80, 80, 0.5)",
  },
  variableInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%"
  },
  variableLabel: {
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(50, 50, 50, 1)"
  },
  variableTextarea: {
    width: "100%",
    padding: "10px",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid #ccc",
    boxSizing: "border-box",
    resize: "vertical" ,
    outline: "none"
  },
  placeholderPreencher: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: '#888',
    fontSize: '16px',
    textAlign: 'center'
  },
  createModel: {
    width: "100%",
    border: 0,
    padding: "10px 0",
    borderRadius: 4,
    cursor: "pointer",
    background: "rgba(100, 220, 0, 1)",
    fontSize: 16,
    fontWeight: 600,
    border: "2px solid rgba(80, 80, 80, 0.6)"
  }
};

export default style;
