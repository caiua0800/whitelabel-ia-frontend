const style = {
  modalContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.8)",
    zIndex: 11,
  },
  modal: {
    padding: "30px 40px",
    minWidth: 600,
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
  clientProfilePictureBox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  clientProfilePictureCircle: {
    width: 150,
    height: 150,
    borderRadius: "50%",
    boxSizing: "border-box",
    boxShadow: "4px 4px 3px rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  clientProfilePicture: {
    width: "160%",
  },
  modalSubTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    fontSize: 14,
    color: "rgba(0,0,0,0.7)",
    fontWeight: 400,
  },
  inputText: {
    width: "100%",
    height: 130,
    fontSize: 16,
    padding: "5px 10px",
    boxSizing: "border-box",
    border: 0,
    boxShadow: "5px 5px 4px rgba(0,0,0,0.4)",
    borderRadius: 4,
  },
  confirmBtn: {
    width: "100%",
    height: 35,
    boxSizing: "border-box",
    fontSize: 18,
    background: "rgba(50, 200, 0, 1)",
    border: 0,
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: 500,
    color: "white",
    transition: ".5s",
  },
  clientInfoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },
  infoRowContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  infoRowOne: {
    width: "100%",
  },
  infoRowBox: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "100%",
    height: 30,
    boxSizing: "border-box",
  },
  searchZipcode: {
    width: "100%",
    height: 30,
    boxSizing: "border-box",
    padding: 0,
    background: "rgba(230, 230, 230, 1)",
    border: 0,
    cursor: "pointer"
  },
  infoTitle: {
    paddingLeft: 10,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  infoRowInput: {
    width: "100%",
    height: "100%",
    padding: 0,
    paddingLeft: 20,
    boxSizing: "border-box",
    border: 0,
    fontSize: 18,
    outline: "none",
  },
  infoRowTwo: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "4fr 1fr",
    gap: 10,
    height: 40,
  },
  infoRowThree: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "4fr 1fr",
    gap: 10,
    height: 40,
  },
  confirmation: {
    width: "100%",
    marginTop: 10,
    // background: "red"
  },
  containerButtons: {
    width: "100%",
    height: 30,
    display: "grid",
    boxSizing: "border-box",
    gap: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: 0,
    border: 0,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default style;
