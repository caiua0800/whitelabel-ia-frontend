const style = {
    messageContainer: {
        width: "100%",
        height: "max-content",
        display: "flex",
        marginBottom: 20,
        boxSizing: "border-box",
    },
    messageBox: {
        maxWidth: "70%",
        boxSizing: "border-box",
        padding: 10,
        borderRadius: 8,
        boxShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        position: "relative",
        wordBreak: "break-word",
        textAlign: "left",
        display: "flex",
    },
    messageTime: {
        width: "max-content",
        position: "absolute",
        bottom: -20,
        // right: 0,
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(30, 30, 30, 0.7)"
    },
    fileMessage: {
        display: "flex",
        alignItems: "center",
        padding: "8px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        maxWidth: "100%"
    }
}

export default style;