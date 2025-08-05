const style = {
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: "50px 100px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: 32,
    width: "100%",
    textAlign: "start",
    fontWeight: 800,
    color: "rgba(80, 80, 80, 1)",
  },
  boxes: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    gap: 10,
    marginTop: 40,
  },
  box: {
    width: 300,
    height: 100,
    borderRadius: 4,
    background: "rgba(0, 100, 220, 0.6)",
    cursor: "pointer",
    transition: ".2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  boxTitle: {
    fontSize: 22,
    fontWeight: 600,
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
  },
  boxValue: {
    fontSize: 18,
    fontWeight: 600,
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
  },
};

export default style;
