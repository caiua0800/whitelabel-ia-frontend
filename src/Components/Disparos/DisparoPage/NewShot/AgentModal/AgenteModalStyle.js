
const style = {
    container: {
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        background: "rgba(0,0,0,0.6)",
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    containerModal: {
        padding: "30px 80px",
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
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20,
        gap: 20
    },
    agentBox: {
        display: "flex",
        flexDirection:  "column",
        alignItems: "center",
        boxShadow: "4px 4px 6px rgba(0,0,0,0.2)",
        borderRadius: 4,
        cursor: "pointer",
        boxSizing: "border-box",
        padding: "10px 20px",
        transition: ".3s",
        background: "rgba(0, 100, 255, 0.3)"
    },
    agentName: {
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(0, 80, 200, 1)"
    },
    agentNumber: {
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(20, 80, 255, 1)"
    }
}

export default style;