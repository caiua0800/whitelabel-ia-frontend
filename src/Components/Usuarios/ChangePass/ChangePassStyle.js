
const style = {
    container: {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        padding: "30px 40px",
        boxSizing: "border-box",
        background: "rgba(210, 210, 210, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: 4,
        position: "relative"
    },
    close: {
        fontSize: 18,
        fontWeight: 600,
        position: "absolute",
        top: 20,
        left: 25,
        cursor: "pointer",
        color: "rgba(80, 80, 80, 1)"
    },
    title: {
        fontSize: 22,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    inputs: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    inputBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
    },
    inputBoxTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    input: {
        width: 250,
        height: 30,
        outline: "none",
        boxSizing: "border-box",
        border: 0,
        fontSize: 16,
        padding: 0,
        paddingLeft: 20,
        boxShadow: "3px 3px 3px rgba(0,0,0,0.2)"
    },
    confirmButton: {
        width: 250,
        height: 30,
        outline: "none",
        fontWeight: 600,
        border: 0,
        fontSize: 16,
        padding: 0,
        paddingLeft: 20,
        boxShadow: "3px 3px 3px rgba(0,0,0,0.2)",
        background: "rgba(100, 220, 0, 1)",
        color: "rgba(80, 80, 80, 1)",
        cursor: "pointer"
    },
    obsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        marginTop: 10
    },
    obsText: {
        fontSize: 12,
        fontWeight: 500,
        color: "rgba(0,0,0,0.5)"
    }
}

export default style;