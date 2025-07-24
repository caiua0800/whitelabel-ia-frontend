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
    cursor: "pointer"
  },
  backButtonImage: {
    width: 50,
    opacity: 0.7
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
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
    alignItems: "start"
  },
  selectModelContainerTitle: {
    fontSize: 18,
    color: "rgba(80, 80, 80, 1)"
  },
  models: {
    width: "100%",
    display: "flex",
    gap: 20,
    marginTop: 20
  },
  completeArea: {
    width: "100%",
    marginTop: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  completeAreaTitle: {
    fontSize: 22,
    color: "rgba(80, 80, 80, 1)",
    fontWeight: 600,
    marginBottom: 40,
  },
  bigGrid: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "30% 70%",
    gap: 10,
    height: 350
  },
  firstPart: {
    width: "100%",
    display: "grid",
    gridTemplateRows: "auto 250px",
  },
  box: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  input: {
    width: "100%",
    height: 35,
    boxSizing: "border-box",
    padding: 0,
    paddingLeft: 20,
    outline: "none",
    border: 0,
    boxShadow: "3px 3px 2px rgba(0,0,0,0.4)",
    fontSize: 16,
    fontWeight: 600,
    background: "rgba(210, 230, 255, 1)"
  },
  textarea: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: 20,
    outline: "none",
    border: 0,
    boxShadow: "3px 3px 2px rgba(0,0,0,0.4)",
    fontSize: 16,
    fontWeight: 600,
    background: "rgba(210, 230, 255, 1)"
  },
  saveBtn: {
    width: "100%",
    marginTop: 20,
    height: 35,
    border: 0,
    background: "rgba(0, 200, 220, 1)",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    color: "rgba(80, 80, 80, 1)"
  },
  secondPart: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateRows: "350px",
    gap: 10
  }
};

export default style;
