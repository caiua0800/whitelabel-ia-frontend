

const style = {
    chatsContainer: {
        width: "100%",
        height: "100%",
        background: "white"
    },
    chatsContent: {
        width: "100%",
        height: "84vh",
        display: "grid",
        gridTemplateRows: "auto auto"
    },
    chatsHeader: {
        width: "100%",
        height: "5vh",
        background: "rgba(220, 220, 230, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    filterIconBox: {
        width: 20,
        height: 20,
        position: "absolute",
        top: "50%",
        left: 30,
        transform: "translateY(-50%)",
        overflow: "hidden",
        opacity: 0.6,
        transition: ".5s",
        cursor: "pointer"
    },
    filterIcon: {
        width: "100%"
    },
    chatsHeaderTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    chatsBody: {
        width: "100%",
        height: "79vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        boxSizing: "border-box"
    },
    chatsInputBoxFilter: {
        width: "100%",
        background: "rgba(220, 220, 230, 1)",
        display: "flex",
        boxSizing: "border-box",
        padding: "14px 10px",
        alignItems: "center",
        justifyContent: "center"
    },
    searchFilter: {
        width: "90%",
        height: "35px",
        boxSizing: "border-box",
        borderRadius: 20,
        border: 0,
        paddingLeft: 20,
        background: "rgba(220,220,230,1)",
        border: "2px solid rgba(190, 190, 190, 1)",
        fontSize: 16,
        fontWeight: 600
    },
    chatsRows: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        maxHeight: "max-content",
        boxSizing: "border-box"
    },
}

export default style;