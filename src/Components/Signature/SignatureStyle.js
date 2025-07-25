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
    overflowY: "auto"
  },
  title: {
    fontSize: 38,
    fontWeight: 800,
    color: "rgba(80, 80, 80, 1)",
  },
  signaturesContainer: {
    width: "100%",
    height: "max-content",
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
    overflow: "hidden"
  },
  signatureBoxes: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
    gap: 100
  },
  signatureBox: {
    boxSizing: "border-box",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    transition: ".3s",
    cursor: "pointer",
    // background: "rgba(210, 210, 210,1)",
    background: "rgba(80, 200, 0,1)",
    borderRadius: 4,
    border: "3px solid white"
  },
  boxTitle: {
    display: "flex",
    justifyContent: "center",
    fontSize: 28,
    // color: "rgba(80, 80, 80, 1)",
    color: "rgba(255, 255, 255, 1)",
    fontWeight: 600,
    textShadow: "3px 3px 4px rgba(0,0,0,0.2)" 
  },
  imageBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: 150,
    filter: "drop-shadow(6px 6px 4px rgba(0,0,0,0.2))"
  },
  pricesContainer: {
    display: "flex",
    flexDirection: "column"
  },
  lastPrice: {
    fontSize: 20,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.8)",
    textDecoration: "line-through"
  },
  actualPrice: {
    fontSize: 24,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 1)",
  },
  signatureItem: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "4fr 2fr",
    // marginTop: 20
  },
  items: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center"
  },
  item: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 600,
    color: "rgba(0, 0, 255, 0.6)",
    height: 20,
  },
  circle: {
    width: 10,
    height: 10,
    border: "2px solid white",
    borderRadius: "50%"
  },
  item2: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 1)",
    height: 20,
  },
  signatureItemHeader: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr 2fr",
    borderBottom: "2px solid rgba(255, 255, 255, 1)",
    marginTop: 20
  },
  signatureItemHeaderTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "white"
  }
};

export default style;
