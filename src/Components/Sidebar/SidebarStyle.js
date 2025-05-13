

const style = {
    sidebarContainer: {
        width: "20vw",
        height: "95vh",
        background: "rgba(100, 150, 244, 1)",
        position: "fixed",
        top: "50%",
        left: "2vh",
        transform: "translateY(-50%) translateX(0)", // Adicionado translateX(0)
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
        boxShadow: "3px 4px 10px rgba(0,0,0,0.4)",
        zIndex: 9,
        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out", // Transições específicas
    },
    sidebarContainerClosed: {
        transform: "translateY(-50%) translateX(-100%)", // Move para esquerda (fora da tela)
        opacity: 0,
        width: "20vw",
        height: "95vh",
        background: "rgba(100, 150, 244, 1)",
        position: "fixed",
        top: "50%",
        left: "2vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 4,
        zIndex: 9,
        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
    },
    sidebarContent: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "4fr 10fr",
        padding: 20,
        boxSizing: "border-box",
        position: "relative"
    },
    closeIconBox: {
        position: "absolute",
        top: 20,
        left: 20,
        width: 30,
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        cursor: "pointer"
    },
    closeIcon: {
        width: "100%"
    },
    header: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    logoBox: {
        width: 200,
        height: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    logoImage: {
        width: "100%"
    },
    agenteTitleBox: {
        width: "100%",
        textAlign: "center"
    },
    agenteTitle: {
        fontSize: 28,
        marginTop: 10,
        color: "white",
        fontWeight: 600
    },
    menu: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "80% 20%"
    },
    menuContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    menuItems: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    menuItem: {
        // width: "100%",
        height: 55,
        display: "grid",
        gridTemplateColumns: "35px auto",
        boxSizing: "border-box",
        gap: 10,
        cursor: "pointer",
        transition: ".3s"
    },
    menuItemIconBox: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItem: "center"
    },
    menuItemIcon: {
        width: "100%"
    },
    menuItemTextBox: {
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    },
    menuItemText: {
        color: "white",
        fontWeight: 600,
        fontSize: 24
    },
    userButtonBox: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    userButton: {
        width: "100%",
        height: "75px",
        background: "purple",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        borderRadius: 4,
        cursor: "pointer",
        transition: ".3s"
    },
    userImageBox: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: "3px solid #FFFFFF",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    userImage: {
        width: "140%"
    },
    username: {
        fontSize: 28,
        color: "#FFFFFF",
        fontWeight: 600,
    }
}

export default style;