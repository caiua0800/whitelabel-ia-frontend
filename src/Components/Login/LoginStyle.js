
const styles = {
    container: {
        width: "100vw",
        height: "100vh",
        background: "rgba(15, 0, 25, 1)",
        position: "relative",
        // background: "rgba(15, 55, 98, 1)"
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
        gridTemplateRows: "10vh 90vh",
        color: "blue"
    },
    header: {
        width: "100%",
        height: "100%",
        background: "linear-gradient(-20deg, #004886, #102c32)",
        display: "grid",
        gridTemplateColumns: "48% 52%"
    },
    firstHeaderPart: {
        width: "100%",
        height: "100%"
    },
    secondHeaderPart: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 20
    },
    inputBox: {
        width: 250,
        height: 40,
        borderRadius: 8,
        border: 0,
        padding: 0,
        boxSizing: "border-box",
        paddingLeft: 20,
        fontSize: 18,
        background: "rgba(210, 210, 210, 1)"
    },
    loginOrSignUp: {
        display: "flex",
        alignItems: "center",
        gap: 20
    },
    loginButton: {
        width: 150,
        height: 40,
        background: "rgba(100, 230, 0, 1)",
        borderRadius: 8,
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
        width: 1000,
        borderRadius: 20,
        opacity: 1
    }
}

export default styles;