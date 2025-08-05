

const style = {
    chatsContainer: {
        width: "100%",
        height: "100%",
        background: "rgba(30, 80, 80, 1)"
    },
    chatsContent: {
        width: "100%",
        height: "84vh",
        display: "grid",
        gridTemplateRows: "auto auto auto auto"
    },
    chatsHeader: {
        width: "100%",
        height: "3vh",
        background: "rgba(30, 80, 80, 1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
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
    filterIconBox2: {
        width: 20,
        height: 20,
        position: "absolute",
        top: "50%",
        right: 30,
        transform: "translateY(-50%)",
        overflow: "hidden",
        opacity: 0.6,
        transition: ".5s",
        cursor: "pointer"
    },
    alternateAgentBox: {
        width: "100%",
        height: "7vh",
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
        boxSizing: "border-box"
    },
    alternateAgentBoxSelect: {
        width: "80%",
        height: 30,
        border: 0,
        borderRadius: 4,
        background: "rgba(210, 210, 210, 1)",
        color: "rgba(80, 80, 80, 1)",
        outline: "none",
        fontSize: 16,
        fontWeight:  600,
        cursor: "pointer"
    },
    popUpIconButton: {
        position: "absolute",
        bottom: -50,
        left: -80,
        fontSize: 16,
        color: "black",
        background: "white",
        opacity: 0.6,
        borderRadius: 8,
        padding: 5,
        zIndex: 9,
        boxShadow: "2px 2px 3px rgba(0,0,0,0.6)"
    },
    filterIcon: {
        width: "100%"
    },
    chatsHeaderTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(255, 255, 255, 1)"
    },
    chatsBody: {
        width: "100%",
        height: "69vh",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        boxSizing: "border-box"
    },
    chatsInputBoxFilter: {
        width: "100%",
        background: "rgba(30, 100, 100, 1)",
        display: "flex",
        boxSizing: "border-box",
        padding: "14px 10px",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 10
    },
    searchFilter: {
        width: "90%",
        height: "35px",
        boxSizing: "border-box",
        borderRadius: 20,
        border: 0,
        paddingLeft: 20,
        background: "rgba(200,200,200,1)",
        border: "2px solid rgba(200, 200, 200, 1)",
        fontSize: 16,
        fontWeight: 600,
        outline: "none"
    },
    searchFilterButton: {
        width: "90%",
        height: 25,
        borderRadius: 4,
        border: 0,
        background: "rgba(210, 210, 210, 1)",
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)",
        cursor: "pointer"
    },
    chatsRows: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        maxHeight: "max-content",
        boxSizing: "border-box"
    },
    paginationContainer: {
        width: "100%",
        background: "rgba(230, 230, 230, 1)",
        height: "5vh",
        display: "grid",
        gridTemplateColumns: "1fr 4fr 3fr 4fr 1fr",
        padding: 5,
        gap: 5,
        boxSizing: "border-box"
    },
    paginationButton: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: 0,
        border: 0,
        fontSize: "0.8rem",
        fontWeight: 600,
        background: "rgba(180, 180, 180, 1)",
        cursor: "pointer",
        borderRadius: 4,
        border: "2px solid black"
    },
    paginationView: {
        width: "100%",
        height: "100%",
        background: "rgba(180, 180, 180, 1)",
        cursor: "pointer",
        borderRadius: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        fontSize: 12
    }
}

export default style;