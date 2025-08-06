const style = {
    header: {
        width: "100%",
        height: "100%",
        background: "#1e212b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px 0px 100px",
        boxSizing: "border-box",
        borderBottom: "1px solid #2a2f3b",
    },
    branding: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        
    },
    logo: {
        height: "45px",
        width: "auto",
    },
    dashboardTitle: {
        fontSize: "24px",
        fontWeight: "600",
        color: "#FFF",
        margin: "0",
    },
    statsContainer: {
        display: "flex",
        gap: "20px",
    },
    statCard: {
        background: "#2a2f3b",
        borderRadius: "12px",
        padding: "15px 25px",
        display: "flex",
        alignItems: "center",
        gap: "15px",
        minWidth: "220px",
        border: "1px solid #3c4257",
    },
    statIconWrapper: {
        background: "rgba(78, 205, 120, 0.1)",
        color: "#4ecf78",
        height: "45px",
        width: "45px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    statTextWrapper: {
        display: "flex",
        flexDirection: "column",
    },
    statTitle: {
        fontSize: "14px",
        color: "#aeb9c4",
        fontWeight: "500",
    },
    statValue: {
        fontSize: "22px",
        color: "#FFF",
        fontWeight: "600",
    },
};

export default style;