
const style = {
    container: {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 10
    },
    modalContainer: {
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        padding: "40px 40px 40px 40px",
        background: "rgba(210, 210, 210, 1)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxSizing: "border-box",
        borderRadius: 8,
        position: "relative"
    },
    closeButtonModal: {
        fontSize: 18,
        fontWeight: 600,
        position: "absolute",
        top: 10,
        left: 15,
        cursor: "pointer",
        transition: ".5s"
    },
    modalButton: {
        width: 300,
        height: 50,
        borderRadius: 12,
        boxSizing: "border-box",
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 22,
        fontWeight: 500,
        cursor: "pointer",
        border: 0,
        boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
        background: "rgba(0, 200, 255, 0.5)",
        transition: ".7s"
    },
    containerT: {
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "rgba(0,0,0,0.8)",
        zIndex: 11
    },
    modalT: {
        padding: "30px 40px",
        background: "rgba(210, 210, 210, 1)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxSizing: "border-box",
        borderRadius: 8,
        position: "relative"
    },
    closeButtonModalT: {
        fontSize: 18,
        fontWeight: 600,
        position: "absolute",
        top: 10,
        left: 15,
        cursor: "pointer",
        transition: ".5s"
    },
    modalTTitle: {
        width: "100%",
        display:  "flex",
        justifyContent: "center",
        fontSize: 22,
        color: "rgba(0,0,0,0.7)",
        fontWeight: 600
    },
    inputText: {
        width: 300,
        height: 130,
        fontSize: 16,
        padding: "5px 10px",
        boxSizing: "border-box",
        border: 0,
        boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
        borderRadius: 8
    },
    confirmBtn: {
        width: 300,
        height: 35,
        boxSizing: "border-box",
        fontSize: 18,
        background: "rgba(50, 200, 0, 1)",
        border: 0,
        borderRadius: 8,
        cursor: "pointer",
        transition: ".5s"
    }
}

export default style;