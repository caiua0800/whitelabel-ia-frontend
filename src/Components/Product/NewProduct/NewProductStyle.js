const style = {
    container: {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      background: "rgba(210, 210, 210, 1)",
      zIndex: 10
    },
    containerContent: {
        width: "100%",
        height: "100%",
        padding: "30px 50px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative"
    },
    title: {
      fontSize: 38,
      fontWeight: 800,
      color: "rgba(80, 80, 80, 1)",
    },
    closeBtn: {
        position: "absolute",
        top: 30,
        left: 30,
        width: 60,
        cursor: "pointer",
        opacity: 0.6
    },
    content: {
        width: "100%",
        display: "grid",
        gridTemplateRows: "auto auto auto",
        gap: 10,
        marginTop: 40
    },
    row: {
        width: "100%",
        display: "grid",
        gap: 10
    },
    rowItemBox: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
    },
    rowItemTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    rowItemObservation: {
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.6)",
        fontWeight: 500
    },
    rowItemInput: {
        width: "100%",
        height: 35,
        boxSizing: "border-box",
        padding: 0,
        paddingLeft: 20,
        border: 0,
        boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
        borderRadius: 4,
        outline: "none",
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    rowItemTextArea: {
        width: "100%",
        height: 250,
        boxSizing: "border-box",
        padding: 15,
        border: 0,
        boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
        borderRadius: 4,
        outline: "none",
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    selectCategoryButton: {
        width: "100%",
        height: 35,
        border: 0,
        boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: 0,
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
        background: "rgba(0, 200, 255, 1)",
        borderRadius: 4
    },
    categoryObs: {
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.6)",
        fontWeight: 500
    },
    selectedCategories: {
        width: "100%",
        maxHeight: 150,
        display: "flex",
        justifyContent: "start",
        gap: 10,
        flexWrap: "wrap"
    },
    selectedCategory: {
        padding: "5px 20px",
        boxSizing: "border-box",
        background: "rgba(100, 220, 0, 0.6)",
        color: "rgba(80, 80, 80, 1)",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 14,
        fontWeight: 600
    },
    createButton: {
        width: "100%",
        height: 35,
        border: 0,
        boxShadow: "3px 3px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
        boxSizing: "border-box",
        padding: 0,
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
        background: "rgba(100, 220, 0, 1)",
        borderRadius: 4
    }
  };
  
  export default style;
  