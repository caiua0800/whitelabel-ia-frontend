const style = {
    tableContainer: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "80% 20%",
        gap: "10px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden"
    },
    container: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "15% 85%",
        overflow: "hidden"
    },
    tableHeader: {
        width: "100%",
        height: "100%",
        borderBottom: "2px solid #e0e0e0",
        display: "grid",
        backgroundColor: "#f8f9fa"
    },
    tableHeaderCell: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#495057",
        fontSize: "16px",
        fontWeight: 600,
        padding: "12px",
        boxSizing: "border-box",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
    },
    tableBody: {
        width: "100%",
        height: "100%",
        overflowY: "auto",
        scrollBehavior: "smooth"
    },
    tableRow: {
        width: "100%",
        minHeight: "50px",
        display: "grid",
        alignItems: "center",
        borderBottom: "1px solid #e0e0e0",
        transition: "background-color 0.2s",
        '&:hover': {
            backgroundColor: "#f1f3f5 !important"
        }
    },
    tableCell: {
        padding: "12px",
        boxSizing: "border-box",
        textAlign: "center",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        fontSize: "14px",
        color: "#212529"
    },
    noDataMessage: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#6c757d",
        fontSize: "16px"
    },
    paginationContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        backgroundColor: "#f8f9fa",
        borderTop: "1px solid #e0e0e0"
    },
    paginationControls: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    paginationNumbers: {
        display: "flex",
        gap: "5px"
    },
    paginationButton: {
        padding: "8px 12px",
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        backgroundColor: "#fff",
        color: "#007bff",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: 500,
        minWidth: "40px",
        textAlign: "center",
        transition: "all 0.2s",
        '&:hover:not(:disabled)': {
            backgroundColor: "#e9ecef",
            borderColor: "#ced4da"
        },
        '&:disabled': {
            color: "#6c757d",
            cursor: "not-allowed",
            opacity: 0.6
        }
    },
    activePaginationButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        borderColor: "#007bff",
        '&:hover': {
            backgroundColor: "#0069d9",
            borderColor: "#0062cc"
        }
    },
    pageInputContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        margin: "0 10px"
    },
    pageText: {
        fontSize: "14px",
        color: "#495057"
    },
    pageInput: {
        width: "50px",
        padding: "8px",
        textAlign: "center",
        border: "1px solid #ced4da",
        borderRadius: "4px",
        fontSize: "14px",
        '&:focus': {
            outline: "none",
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    },
    pageCount: {
        fontSize: "14px",
        color: "#6c757d"
    }
};

export default style;