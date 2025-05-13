
const style = {
    header: {
        width: "100%",
        height: "100%",
        background: "rgba(200, 200, 220, 1)",
        display: "grid",
        gridTemplateColumns: "0.4fr 4fr 2fr 2fr",
        gap: 20,
        padding: "0 10px",
        boxSizing: "border-box",
        borderBottom: "1px solid rgba(255, 255, 255, 1)"
    },
    boxAdd: {
        width: "100%",
        height: "80%",
        borderRadius: 8,
        background: "radial-gradient(#60b6fb, #1e96fc)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "3px 4px 5px rgba(0,0,0,0.2)",
        boxSizing: "border-box",
        padding: "0 30px",
        cursor: "pointer",
        transition: ".3s"
    },
    addText: {
        fontSize: 16,
        color: "white",
        width: "100%",
        display:  "flex",
        justifyContent: "center",
        textAlign: "center",
        fontWeight: "600",
        transition: ".3s"
    },
    boxContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    box: {
        width: "400px",
        height: "80%",
        borderRadius: 8,
        background: "rgba(230, 230, 255, 1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    boxTitle: {
        fontSize: 22,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.7)"
    },
    boxValue: {
        fontSize: 28,
        fontWeight: 600
    }
}

export default style;