const style = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.8)",
    zIndex: 11,
  },
  modalContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    padding: "30px 40px",
    width: 600,
    background: "rgba(210, 210, 210, 1)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
  },
  closeButtonModal: {
    fontSize: 18,
    fontWeight: 600,
    position: "absolute",
    top: 10,
    left: 15,
    cursor: "pointer",
    transition: ".5s",
  },
  modalTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: 28,
    color: "rgba(0,0,0,0.7)",
    fontWeight: 600,
  },
  buttons: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    gap: 10
  },
  tagSearchArea: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  inputArea: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "100%",
    gap: 10,
    height: 35
  },
  inputSearch: {
    width: "100%",
    height: "100%",
    border: 0,
    boxSizing: "border-box",
    padding: 0,
    paddingLeft: 20,
    background: "rgba(240, 240, 240, 1)",
    fontSize: 18,
    fontWeight: 600,
  },
  buttonSearch: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: 0,
    border: 0,
    borderRadius: 4,
    height: "100%",
    fontSize: 18,
    fontWeight: 600,
    background: "rgba(20, 200, 200, 1)",
    color: "white",
    cursor: "pointer"
  },
  resultTitle: {
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  resultOfSearch: {
    width: "100%",
    maxHeight: 250,
    overflowY: "auto",
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    padding: 20,
    background: "rgba(220, 220, 220, 1)",
    borderRadius: 4
  },
  tag: {
    padding: "4px 10px",
    height: "max-content",
    background: "rgba(180, 180, 180, 1)",
    color: "black",
    fontWeight: 600,
    borderRadius: 4,
    cursor: "pointer",
    transition: ".3s"
  },
  addedTags: {
    width: "100%",
    maxHeight: 250,
    overflowY: "auto",
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    padding: 20,
    background: "rgba(220, 220, 220, 1)",
    borderRadius: 4
  },
  button: {
    width: "100%",
    height: 30,
    fontSize: 16,
    fontWeight: 600
  }
};

export default style;
