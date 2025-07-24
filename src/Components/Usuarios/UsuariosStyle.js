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
  loggedUserContainer: {
    width: "100%",
    padding: 30,
    boxSizing: "border-box",
    background: "rgba(210, 210, 210, 1)",
    borderRadius: 4,
    boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent:  "center",
    alignItems: "center"
  },
  loggedUserBox: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr",
  },
  loggedUserBoxFirst: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "start",
    gap: 10
  },
  profileBox: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    gap: 10
  },
  profilePicture: {
    width: 50,
    height: 50,
    boxSizing: "border-box",
    borderRadius: "50%",
    boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    border: "3px solid rgba(100, 200, 0, 1)"
  },
  profilePictureImage: {
    width: "180%"
  },
  name: {
    fontSize: 28,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  loginInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
  usernameBox: {
    
  },
  usernameBoxTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  usernameInput: {
    width: 200,
    height: 30,
    border: 0,
    outline: "none",
    boxSizing: "border-box",
    background: "rgba(225, 225, 225, 1)",
    borderRadius: 4,
    padding: 0,
    paddingLeft: 20,
    fontSize: 16,
    fontWeight: 600
  },
  changePass: {
    width: 200,
    height: 20,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    marginTop: 5,
    cursor: "pointer",
    border: "1px solid rgba(80, 80, 80, 1)",
    borderRadius: 4,
    background: "rgba(240, 240, 240, 1)"
  },
  exit: {
    width: 200,
    height: 20,
    fontWeight: 600,
    color: "rgba(255, 255, 255, 1)",
    marginTop: 5,
    cursor: "pointer",
    border: "1px solid rgba(0, 0, 0, 1)",
    borderRadius: 4,
    background: "rgba(240, 40, 38, 1)"
  },
  loggedUserBoxSecond: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "2fr 2fr"
  },
  loggedUserBoxSecondFirst: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20
  },
  infoBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  infoBoxTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  infoBoxValue: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(100, 100, 100, 1)"
  },
  loggedUserBoxSecondSecond: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  loggedUserBoxSecondSecondTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  permissions: {
    maxwidth: "100%",
    boxSizing: "border-box",
    background: "rgba(235, 235, 235, 1)",
    borderRadius: 4,
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    padding: "10px"
  },
  permissionName: {
    fontSIze: 12,
    color: "black"
  },
  anotherUsersContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: 10,
    marginTop: 20
  },
  anotherUsersContainerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "rgba(80, 80, 80, 1)"
  },
  usersTable: {
    width: "100%",
    display: "grid",
    gridTemplateRows: "35px 300px"
  },
  usersTableHeader: {
    width: "100%",
    height: "100%",
    display:  "grid",
    gridTemplateColumns: "3fr 2fr 2fr",
    background: "rgba(210, 210, 210, 1)"
  },
  usersTableHeaderCell: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: 600
  },
  usersTableBody: {
    width: "100%",
    maxHeight: "100%",
    boxSizing: "border-box",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column"
  },
  usersTableBodyRow: {
    width: "100%",
    height: 35,
    display: "grid",
    gridTemplateColumns: "3fr 2fr 2fr",
    background: "rgba(245, 245, 245, 1)"
  },
  usersTableBodyRowCell: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    fontWeight: 600
  },
  promptContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  promptContainerTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  promptContainerSubTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(230, 20, 0, 1)"
  },
  promptInput: {
    width: "100%",
    height: 200,
    padding: 10,
    boxSizing: "border-box",
    border: 0,
    fontSIze: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)"
  },
  editPromptButton: {
    width: "100%",
    marginTop: 10,
    height: 35,
    border: 0,
    boxSizing: "border-box",
    padding: 0,
    fontSize: 16,
    cursor: "pointer",
    fontWeight: 600,
    borderRadius: 4,
    background: "rgba(100, 220, 0, 1)",
    color: "rgba(80, 80, 80, 1)"
  },
  agentNumberSelect: {
    width: 140,
    height: 30,
    border: 0,
    borderRadius: 4,
    boxSizing: "border-box",
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    cursor: "pointer",
    outline: "none",
    marginBottom: 10,
    marginTop: 10,
    boxShadow: "3px 3px 4px rgba(0,0,0,0.4)"
  }
};

export default style;
