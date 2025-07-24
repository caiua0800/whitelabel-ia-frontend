

const style = {
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px 50px",
        alignItems: "start",
        boxSizing: "border-box"
    },
    title: {
        fontSize: 42,
        fontWeight: 800,
        color: "rgba(80, 80, 80, 1)"
    },
    explanationBox: {
        width: "100%",
        borderRadius: 4,
        background: "#9CEC5B",
        boxShadow: "4px 4px 5px rgba(0,0,0,0.2)",
        boxSizing: "border-box",
        padding: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    explanationBoxCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "start"   
    },
    expText: {
        fontSize: 19,
        fontWeight: 500,
        color: "rgba(80, 80, 80)"
    },
    expTextBold: {
        fontSize: 19,
        fontWeight: 800,
        color: "rgba(80, 140, 80)"
    },
    optionsBox: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr",
        gap: 10,
        marginTop: 20
    },
    optionButton: {
        width: "100%",
        boxSizing: "border-box",
        padding: 0,
        border: 0,
        cursor: "pointer",
        height: 40,
        fontSize: 18,
        fontWeight: 600,
        background: "rgba(210, 210, 210, 1)",
        borderRadius: 4,
        boxShadow: "2px 2px 3px rgba(0,0,0,0.2)"
    },
    tagsContainerBox: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    tagsContainerBoxFirst: {
        width: "100%",
        marginTop: 10,
        marginBottom: 20,
        display: "grid",
        gridTemplateColumns: "6fr 4fr",
        alignItems: "end",
        gap: 10
    },
    tagsContainerBoxTitle: {
        fontSize: 32,
        width: "100%",
        marginTop: 30,
        display: "flex",
        justifyContent: "start",
        alignItems: "end",
        fontWeight: 800,
        color: "rgba(80, 80, 80, 1)",
    },
    createOrderFilter: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    filterName: {
        fontSize: 18,
        fontWeight: 600
    },
    selectFilter: {
        width: "100%",
        height: 35,
        border: 0,
        boxSizing: "border-box",
        padding: 0,
        background: "rgba(210, 210, 210, 1)",
        textAlign: "center",
        fontWeight: 600,
        fontSize: 18
    },
    searchFilter: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    searchFilterTitle: {
        fontSize: 18,
        fontWeight: 600
    },
    searchFilterInput: {
        width: "100%",
        height: 35,
        boxSizing: "border-box",
        padding: 0,
        paddingLeft: 20,
        background: "rgba(255, 255, 255, 1)",
        border: 0,
        outline: 0,
        fontSize: 18,
        fontWeight: 600
    },
    tagsContainer: {
        width: "100%",
        maxHeight: 250,
        display: "flex",
        gap: 10,
        justifyContent: "start"
    },
    tag: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        transition: ".3s",
        cursor:  "pointer"
    },
    tagText: {
        fontSize: 22,
        padding: "5px 20px",
        fontWeight: 800,
        zIndex: 2,
        borderRadius: 4,
        boxShadow: "3px 3px 1px rgba(0,0,0,0.2)",
        transition: ".3s"
    },
    bottom: {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "2fr 2fr 2fr"
    },
    paginationContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginTop: 40
    },
    paginationButton: {
        width: 120,
        height: 30,
        borderRadius: 4,
        background: "rgba(210, 210, 210, 1)",
        padding: 0,
        boxSizing: "border-box",
        border: 0,
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    actualPageBox: {
        height: 30,
        width: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    actualPageText: {
        fontSize: 18,
        fontWeight: 600,
        color: "rgba(80, 80, 80, 1)"
    },
    itemsPerPageContainer: {
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        gap: 10
    },
    itemsPerPageText: {
        fontSize: 18,
        fontWeight: 500,
        color: "rgba(80, 80, 80, 1)"
    },
    itemsPerPageInput: {
        // width: 60,
        height: 30,
        outline: 0,
        border: 0,
        boxSizing: "border-box",
        padding: 5,
        textAlign: "center",
        fontSize: 16,
        fontWeight: 600,
        borderRadius: 4,
        background: "rgba(210, 210, 210, 1)"
    }
}

export default style;