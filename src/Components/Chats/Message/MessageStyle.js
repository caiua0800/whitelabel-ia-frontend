const style = {
    messageContainer: {
        width: "100%",
        display: "flex",
    },
    messageBox: {
        maxWidth: "65%",
        minWidth: "80px",
        padding: "10px 15px",
        borderRadius: "18px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
    },
    sentBox: {
        background: "#2a2f3b",
        color: "#e1e3e5",
        borderBottomLeftRadius: "4px",
    },
    replyBox: {
        background: "#005c4b",
        color: "#FFF",
        borderBottomRightRadius: "4px",
    },
    messageContent: {
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
        fontSize: "15px",
        paddingBottom: "15px",
        textAlign: "start",
    },
    messageTime: {
        position: "absolute",
        bottom: "5px",
        right: "12px",
        fontSize: "11px",
        color: "rgba(255, 255, 255, 0.6)",
    },
    imageContent: {
        maxWidth: "100%",
        borderRadius: "8px",
        cursor: "pointer",
    },
    caption: {
        paddingTop: "5px",
    },
    fileContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    fileIcon: {
        color: "rgba(255, 255, 255, 0.8)",
    },
    fileInfo: {},
    fileName: {
        display: "block",
    },
    fileMeta: {
        fontSize: "12px",
        color: "rgba(255, 255, 255, 0.6)",
    },
};

export default style;