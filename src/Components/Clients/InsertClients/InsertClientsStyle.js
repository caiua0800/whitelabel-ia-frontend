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
      minWidth: 700,
      background: "rgba(210, 210, 210, 1)",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxSizing: "border-box",
      alignItems: "center",
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
    selectDocBox: {
      // width: 300,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 10
    },
    selectDocBoxTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: "rgba(80, 80, 80, 1)"
    },
    selectFileButton: {
      width: 200,
      cursor: "pointer"
    },
    obsText: {
      fontSize: 14,
      color: "rgba(0, 100, 255, 1)"
    },
    columnNamesBox: {
      display: "grid",
      gridTemplateColumns: "2fr 2fr",
      gap: 10,
      marginTop: 20
    },
    columnNameBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    columnName: {
      fontSize: 16,
      color: "rgba(80, 80, 80, 1)",
      fontWeight: 800
    },
    columnNameValue: {
      fontSize: 16,
      color: "rgba(80, 80, 80, 1)",
      fontWeight: 800,
      width: 250,
      border: 0,
      padding: 0,
      textAlign: "center",
      boxSizing: "border-box",
      outline: "none",
      height: 35
    },
    extractButton: {
      width: 250,
      height: 35,
      background: "rgba(0, 200, 220, 1)",
      color: "rgba(80, 80, 80, 1)",
      border: 0,
      cursor: "pointer",
      marginTop: 10,
      fontSize: 16, 
      fontWeight: 800
    },
    extractErrorMsg: {
      fontSize: 14,
      color: "red",
      fontWeight: 800
    },
    extractedTable: {
      width: 400,
      background: "rgba(230, 230, 230, 1)",
      borderRadius: 4,
      maxHeight: 200,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      // marginTop: 20
    },
    extractedTableHeader: {
      width: "100%",
      height: 35,
      display: "grid",
      gridTemplateColumns: "3fr 3fr",
      borderBottom: "2px solid rgba(80, 80, 80, 1)"
    },
    extractedTableHeaderCell: {
      fontSize: 16,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 600,
      color: "rgba(80, 80, 80, 1)"
    },
    extractedTableBody: {
      width: "100%",
      height: "max-content",
      display: "flex",
      flexDirection: "column"
    },
    extractedTableBodyRow: {
      width: "100%",
      height: 35,
      display: "grid",
      gridTemplateColumns: "3fr 3fr",
    },
    saveClients: {
      width: 350,
      height: 35,
      border: 0,
      boxSizing: "border-box",
      padding: 0,
      background: "rgba(0, 200, 0, 1)",
      borderRadius: 4,
      fontSize: 16,
      fontWeight: 800,
      color: "rgba(80, 80, 80, 1)",
      cursor: "pointer"
    },
    createTag: {
      display: "flex",
      gap: 10,
      marginTop: 10
    },
    createTagBox: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    selectTagButton: {
      width: 250,
      height: 35,
      border: 0,
      background: "linear-gradient(to bottom, rgba(170, 170, 170, 1), rgba(190, 190, 190, 1))",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 600,
      color: "rgba(80, 80, 80, 1)"
    },
    createTagBoxTitle: {
      fontSize: 14,
      color: "rgba(80, 80, 80, 1)"
    },
    createTagBoxInput: {
      fontSize: 14,
      width: 150,
      border: 0,
      height: 25,
      outline: "none"
    },
    createTagTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "rgba(80, 80, 80, 1)",
      marginTop: 10
    }
  };
  
  export default style;
  