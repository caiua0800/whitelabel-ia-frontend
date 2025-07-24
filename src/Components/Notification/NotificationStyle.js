

const style = {
    notificationContainer: {
        position: "fixed",
        bottom: 20,
        left: 30,
        width: 560,
        height: 140,
        zIndex: 9
    },
    notificationBox: { 
        background: "rgba(100, 200, 0, 1)",
        border: "2px solid rgba(80, 80, 80, 1)",
        boxShadow: "3px 3px 3px rgba(0,0,0,0.4)",
        minWidth: "200px",
        width: "max-content",
        maxWidth: "100%",
        height: "100%",
        borderRadius: 8,
        boxSizing: "border-box",
        padding: "5px 40px",
        display: "grid",
        gridTemplateColumns: "30% 70%",
        gap: 20,
        cursor: "pointer",
        position: "relative"
    },
    closeBtn: {
        position: "absolute",
        top: 10,
        left: 15,
        fontSize: 18,
        color: "black",
        fontWeight: 600,
        cursor: "pointer"
    },
    photoContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    photoBox: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        border: "3px solid rgba(0,0,0,0.4)",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.4)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    photo: {
        width: "170%"
    },
    anotherPart: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        display: "grid",
        gridTemplateRows: "50% 50%"
    },
    numberPart: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "end"
    },
    clientNumber: {
        fontSize: 22,
        color: "white",
        fontWeight: "600"
    },
    messagePart: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        textAlign: "start",
        position: "relative"
    },
    message: {
        fontSize: 16,
        color: "black"
    },
    hour: {
        position: "absolute",
        bottom: 10,
        right: 20,
        fontSize: 14,
        color: "rgba(0,0,0,0.7)"
    }
}

export default style;