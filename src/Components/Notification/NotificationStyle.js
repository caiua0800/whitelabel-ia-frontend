

const style = {
    notificationContainer: {
        position: "fixed",
        top: 70,
        right: 80,
        width: 560,
        height: 140,
        zIndex: 9
    },
    notificationBox: { 
        background: "rgba(40, 200, 220, 1)",
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
        position: "relative"
    },
    closeBtn: {
        position: "absolute",
        top: 10,
        left: 15,
        fontSize: 16,
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
        border: "1px solid rgba(0,0,0,0.4)",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.4)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    photo: {
        width: "160%"
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
        textAlign: "center",
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