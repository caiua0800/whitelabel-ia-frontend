
const style = {
    container: {
        width: "100%",
        height: "100%",
        background: "rgba(230, 230, 230, 1)"
    },
    createAgentButton: {
        position: "fixed",
        top: 30,
        right: 30,
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer",
        transition: ".5s",
        opacity: "0.6"
    },
    addIcon: {
        width: "100%"
    },
    containerBody: {
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "2fr 4fr",
        padding: "120px 60px 10px 60px",
        boxSizing: "border-box",
        gap: 40
    },
    secondRow: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "100%",
        gap: 10
    }
}

export default style;