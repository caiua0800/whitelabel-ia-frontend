const style = {
  container: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 10,
  },
  containerContent: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 600,
    background: "rgba(210, 210, 210, 1)",
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    boxSizing: "border-box",
    position: "relative",
  },
  close: {
    position: "absolute",
    top: 10,
    left: 25,
    fontSize: 32,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    cursor: "pointer",
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: "rgba(80, 80, 80, 1)",
  },
  tagNameArea: {
    width: 350,
    display: "flex",
    justifyContent: "center",
    algnItems: "center",
    position: "relative",
  },
  tagImage: {
    width: "100%",
  },
  tagNameInput: {
    outline: "none",
    width: 300,
    border: 0,
    boxSizing: "border-box",
    height: 40,
    background: "rgba(0,0,0,0.2)",
    padding: 0,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 800,
    color: "white",
  },
  tagDescriptionArea: {
    display: "flex",
    width: 350,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 20
  },
  tagDescriptionAreaTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  descriptionTextarea: {
    width: "100%",
    boxSizing: "border-box",
    padding: 15,
    height: 100,
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    background: "rgba(230, 230, 230, 1)",
    border: 0,
    outline: "none"
  },
  buttonArea: {
    width: 350,
    height: 35,
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
    gap: 10,
    marginTop: 10
  },
  button: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: 0,
    border: 0,
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 19,
    fontWeight: 600,
    border: "2px solid transparent",
    transition: ".3s"
  }
};

export default style;
