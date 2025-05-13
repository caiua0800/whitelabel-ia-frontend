
const style = {
    chatContainer: {
        width: "100%",
        height: "70px",
        // background: "rgba(240, 240, 250, 1)",
        boxSizing: "border-box",
        padding: 5,
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s ease",
    },
    hour: {
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(30, 30, 30, 0.4)",
        position: "absolute",
        bottom: 10,
        right: 10
    },
    chatContent: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 20px",
    },
    profilePhotoBox: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        boxSizing: "border-box",
        boxShadow: "2px 2px 4px rgba(0,0,0,0.4)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    profilePhoto: {
        width: "150%"
    },
    info: {
        display: "grid",
        gridTemplateRows: "2fr 2fr",
        marginLeft: "20px",
        marginTop: "0px"
    },
    clientName: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        fontSize: 14,
        fontWeight: 600,
        color: "rgba(60, 60, 60, 0.7)"
    },
    clientLastMessage: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "start",
        gap: 2,
        overflow: "hidden"
    },
    staticInput: {
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(60, 60, 60, 0.8)"
    },
    message: {
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(60, 60, 60, 0.6)",
        whiteSpace: "nowrap",      
        overflow: "hidden",       
        textOverflow: "ellipsis",  
        maxWidth: "100px"        
    }
}

export default style;