const style = { 
    firstRow: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "3fr 2fr",
        gap: 20
    },
    agentsChatsContainer: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 20,
        position: "relative",
        minHeight: "200px" // Altura mínima para manter o layout
    },
    ourAdds: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        boxSizing: "border-box"
    },
    arrow: {
        width: 40,
        height: 40,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: 'border-box',
        overflow: "hidden",
        transition: "opacity 0.3s ease",
        zIndex: 8,
        '&:hover': {
            opacity: "0.8 !important"
        }
    },
    arrowIcon: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
    },
    emptyBox: {
        backgroundColor: "transparent",
        border: "1px dashed #ccc",
        borderRadius: "8px"
    }
};

export default style;