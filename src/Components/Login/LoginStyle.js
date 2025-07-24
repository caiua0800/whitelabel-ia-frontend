
const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        background: "rgba(15, 0, 25, 1)",
        position: "relative",
    },
    background: {
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        opacity: 0.6
    },
    content: {
        width: "100%",
        height: "100%",
        zIndex: 2,
        position: "absolute",
        top: 0,
        left: 0
    },
    contentContent: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "100vh",
        color: "blue"
    },
    header: {
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9,
        display: "flex",
        padding: "10px 30px",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box"
    },
    agentLogo: {
        width: 80
    },
    firstHeaderPart: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        boxSizing: "border-box",
    },
    secondHeaderPart: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10
    },
    seLoko: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
    },
    seLokoTitle: {
        fontSize: 16,
        color: "rgba(210, 210, 210, 1)",
        fontWeight: 600
    },
    inputBox: {
        width: 300,
        height: 35,
        borderRadius: 4,
        border: 0,
        padding: 0,
        boxSizing: "border-box",
        paddingLeft: 20,
        fontSize: 18,
        background: "rgba(210, 210, 210, 0.6)",
        outline: "none",
        fontWeight: 600
    },
    loginOrSignUp: {
        display: "flex",
        alignItems: "center",
        gap: 20
    },
    loginButton: {
        width: 150,
        height: 35,
        background: "rgba(80, 200, 0, 1)",
        borderRadius: 4,
        border: 0,
        cursor: "pointer",
        fontSize: 18,
        color:  'rgba(0,0,0,0.7)',
        fontWeight: 600,
    },
    signUpButton: {
        borderRadius: 8,
        border: 0,
        cursor: "pointer",
        fontSize: 18,
        fontWeight: 600,
        display: "flex",
        color: "rgba(0, 200, 255, 1)",
        textDecoration: "underline",
    },
    wallpaperContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
        // marginTop: 40
    },
    wallpaperImage: {
        width: "60%",
        borderRadius: 4,
        opacity: 1
    }
}

export default styles;