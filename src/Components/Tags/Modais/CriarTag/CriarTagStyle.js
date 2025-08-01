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
    position: "relative"
  },
  close: {
    position: "absolute",
    top: 10,
    left: 25,
    fontSize: 32,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    cursor: "pointer"
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: "rgba(80, 80, 80, 1)"
  },
  tagNameArea: {
    width: 350,
    position: "relative"
  },
  tagImage: {
    width: "100%",
    opacity: 0,
  },
  tagNameInput: {
    outline: "none",
    width: "100%",
    border: 0,
    boxSizing: "border-box",
    height: 40,
    background: "rgba(255,255,255,1)",
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
  createTagButton: {
    width: 350,
    height: 40,
    border: 0,
    cursor: "pointer",
    marginTop: 10,
    background: "rgba(30, 230, 0, 1)",
    borderRadius: 4,
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  errorMessage: {
    fontWeight: 600,
    color: "rgba(200, 0, 0, 1)"
  }
};

export default style;
