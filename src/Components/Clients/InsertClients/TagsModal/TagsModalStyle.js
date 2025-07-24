
const style = {
    container: {
        width: "100vw",
        height: "100vh",
        zIndex: 11,
        background: "rgba(0,0,0,0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    containerModal: {
        padding: "30px",
        boxSizing: "border-box",
        background: "rgba(210, 210, 210, 1)",
        borderRadius: 4,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    closeBtn: {
        fontSize: 18,
        fontWeight: 600,
        cursor: "pointer",
        color: "rgba(80, 80, 80, 1)",
        position: "absolute",
        top: 25,
        left: 25
    },
    title: {
        fontSize: 26,
        fontWeight: "600",
        color: "rgba(80, 80, 80, 1)"
    },
    searchBoxContainer: {
        width: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        marginTop: 20
    },
    searchBarTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    searchBox: {
        width: "100%",
        height: 40,
        display: "grid",
        gridTemplateColumns: "80% 20%",
        gap: 10,
        boxSizing: "border-box"
    },
    searchInput: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: 0,
        paddingLeft: 20,
        border: 0,
        outline: "none",
        background: "rgba(230, 230, 230, 1)",
        fontSize: 16,
        fontWeight: 600,
        boxShadow: "4px 4px 3px rgba(0,0,0,0.2)",
            borderRadius: 4,
        border: "2px solid rgba(80, 80, 80, 1)"
    },
    searchButton: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        border: 0,
        outline: "none",
        background: "rgba(100, 200, 0, 1)",
        fontSize: 16,
        fontWeight: 600,
        boxShadow: "4px 4px 3px rgba(0,0,0,0.2)" ,
        cursor: "pointer",
        borderRadius: 4,
        border: "2px solid rgba(80, 80, 80, 1)"
    },
    areaTitle: {
        marginTop: 20,
        fontSize: 16,
        color: "rgba(80, 80, 80, 1)",
        fontWeight: 600,
        width: "100%",
        display: "flex",
        justifyContent: "start" 
    },
    tagUnselecteds: {
        width: 400,
        height: 120,
        overflowY: "auto",
        display: "flex",
        flexWrap: "wrap",
        background: "rgba(200, 200, 200, 1)",
        borderRadius: 4,
        padding: 10,
        boxSizing: "border-box",
        gap: 10
    },
    tag: {
        width: "max-content",
        height: "max-content",
        padding: "5px 10px",
        boxSizing: "border-box",
        borderRadius: 4,
        background: "rgba(180, 180, 180, 1)",
    },
    tagText: {
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
    },
    saveButton: {
        width: 400,
        height: 35,
        boxSizing: "border-box",
        border: 0,
        outline: "none",
        background: "rgba(0, 200, 200, 1)",
        fontSize: 16,
        fontWeight: 600,
        cursor: "pointer",
        borderRadius: 4,
        marginTop: 10,
        color: "rgba(80, 80, 80, 1)"
    }
}

export default style;