const style = {
    container: {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.6)",
      zIndex: 11,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      padding: "30px 80px",
      background: "rgba(210, 210, 210, 1)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",
      borderRadius: 4
    },
    close: {
      position: "absolute",
      top: 10,
      left: 15,
      fontSize: 22,
      fontWeight: 600,
      cursor: "pointer",
      color: "rgba(80, 80, 80, 1)",
    },
    modalTitle: {
      fontSize: 28,
      color: "rgba(80, 80, 80, 1)",
      fontWeight: 600,
    },
    modalContent: {
      marginTop: 20,
      display:  "flex",
      flexDirection: "column",
      alignItems: "start"
    },
    boxTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "rgba(0, 80, 80, 1)",
      marginTop: 20,
      width: "100%",
      borderBottom: "2px solid rgba(80, 80, 80, 1)"
    },
    categoriesBox: {
      width: 500,
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      boxSizing: "border-box",
      justifyContent: "start",
      paddingTop: 10
    },
    categoryItem: {
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      background: "rgba(0, 200, 255, 0.6)",
      color: "rgba(80, 80, 80, 1)",
      padding:  "5px 20px",
      boxSizing: "border-box",
      boxShadow: "3px 3px 2px rgba(0,0,0,0.2)"
    },
    saveIcon: {
      width: "100%",
      height: 35,
      border: 0,
      boxShadow: "3px 3px 2px rgba(0,0,0,0.2)",
      marginTop: 10,
      borderRadius: 4,
      background: "rgba(100, 200, 0, 1)",
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer"
    },
    statusSelect: {
        width: 300,
        height: 35,
        border: 0,
        boxShadow: "3px 3px 2px rgba(0,0,0,0.3)",
        boxSizing: "border-box",
        padding: 0,
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
        outline: "none"
    },
    saveButton: {
        width: 300,
        height: 35,
        padding: 0,
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
        outline: "none",
        border: 0,
        boxShadow: "3px 3px 2px rgba(0,0,0,0.3)",
        background: "rgba(100, 220, 0, 1)",
        cursor: "pointer",
        marginTop: 10
    }
  };
  
  export default style;
  