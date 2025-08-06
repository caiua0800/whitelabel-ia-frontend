const style = {
    chatContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "15px 20px",
        boxSizing: "border-box",
        cursor: "pointer",
        borderBottom: "1px solid #2a2f3b",
        transition: "background-color 0.2s ease",
    },
    activeChat: {
        background: "#2a2f3b",
    },
    profilePhotoBox: {
        width: 50,
        height: 50,
        minWidth: 50,
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "15px",
    },
    profilePhoto: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden",
        gap: "4px",
    },
    nameAndTime: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    clientName: {
        fontSize: "16px",
        fontWeight: 600,
        color: "#FFF",
    },
    hour: {
        fontSize: "12px",
        color: "#aeb9c4",
    },
    clientLastMessage: {
        width: "100%",
        display: "flex",
        justifyContent: "start"
    },
    message: {
        fontSize: "14px",
        color: "#aeb9c4",
        whiteSpace: "nowrap",
        textAlign: "start",
        width: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
};

export default style;