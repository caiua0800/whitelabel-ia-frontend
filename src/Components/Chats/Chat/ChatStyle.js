

const style = {
    chatContainer: {
        width: "100%",
        height: "84vh",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderLeft: "2px solid rgba(0,0,0,0.1)"
    },
    chatHeader: {
        width: "100%",
        height: "8vh",
        background: "rgba(220, 220, 230, 1)",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 30px",
        boxSizing: "border-box",
        alignItems: "center"
    },
    chatOptionMenu: {
        display: "flex",
        gap: 20
    },
    chatOptionsButton: {
        width: 30,
        height: 30,
        cursor: "pointer",
        transition: ".3s",
        position: "relative"
    },
    popUpIconButton: {
        position: "absolute",
        bottom: -50,
        left: -80,
        fontSize: 16,
        color: "black",
        background: "white",
        opacity: 0.4,
        borderRadius: 8,
        padding: 5,
        boxShadow: "2px 2px 3px rgba(0,0,0,0.6)"
    },
    optionsIcon: {
        width: "100%",
        opacity: 0.3,
        transition: ".7s"
    },
    chatBody: {
        width: "100%",
        height: "68vh",
        boxSizing: "border-box",
        overflowY: "auto",
        padding: 30,
        boxSizing: "border-box",
        background: "rgba(240, 240, 255, 1)"
    },
    bodyContent: {
        width: "100%",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    sendMessagesBox: {
        width: "100%",
        height: "8vh",
        background: "rgba(220, 220, 230, 1)",
        display: "grid",
        gridTemplateColumns: "1fr 15fr 1fr",
        padding: "0 20px",
        boxSizing: "border-box",
        position: "relative"
    },
    attachConfirmBox: {
        position: "absolute",
        top: -200,
        height: 200,
        boxShadow: "-5px -4px 5px rgba(0,0,0,0.2)",
        width: "100%",
        background: "rgba(255, 255, 249, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: 10,
    },
    attachShowFileBox: {
        padding: '8px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '40px',
    },
    fileShow: {
        width:  "100%"
    },
    attachFileButton: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center"
    },
    attachIcon: {
        width: 35,
        height: 35,
        transition: ".5s",
        cursor: "pointer",
        opacity: 0.6
    },
    messageInputBox: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    messageInput: {
        width: "100%",
        height: "35px",
        boxSizing: "border-box",
        paddingLeft: 20,
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(100, 100, 100, 1)"
    },
    sendMessageButton: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    sendMessageIcon: {
        width: 35,
        height: 35,
        transition: ".5s",
        cursor: "pointer",
        opacity: 0.6
    },
    clientInfo: {
        display: "flex",
        alignItems: "center"
    },
    clientPictureBox: {
        width: 40,
        height: 40,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        boxShadow: "3px 3px 5px rgba(0,0,0,0.4)"
    },
    clientPicture: {
        width: "150%",
    },
    clientName: {
        fontSize: 22,
        color: "rgba(0,0,0,0.7)",
        fontWeight: 600,
        marginLeft: 20,
    }
}

export default style;