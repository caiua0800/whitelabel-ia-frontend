
const style = {
    chatContainer: {
        width: "100%",
        height: "70px",
        boxSizing: "border-box",
        padding: 5,
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s ease",
    },
    hour: {
        fontSize: 10,
        fontWeight: 600,
        color: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        bottom: 5,
        right: 5
    },
    chatContent: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "0 10px",
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
        marginLeft: "10px",
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
        color: "rgba(0, 0, 0, 1)"
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
        color: "rgba(0, 0, 0, 0.8)"
    },
    message: {
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
        whiteSpace: "nowrap",      
        overflow: "hidden",       
        textOverflow: "ellipsis",  
        maxWidth: "80px"        
    }
}

export default style;