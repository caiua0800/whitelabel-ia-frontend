const style = {
  modal: {
    width: "100%",
    height: "100%",
    background: "rgba(210, 210, 210, 1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    padding: "30px 40px",
    overflowY: "auto",
  },
  closeBtn: {
    position: "absolute",
    top: 30,
    left: 30,
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(80, 80, 80, 1)",
    width: 60,
    height: 60,
    cursor: "pointer",
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  filters: {
    width: "100%",
    display: "grid",
    marginTop: 40,
    gridTemplateColumns: "4fr 2fr 2fr 2fr 2fr",
    gap: 10,
  },
  filterBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    boxSizing: "border-box",
  },
  filterName: {
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  input: {
    width: "100%",
    height: 35,
    border: 0,
    boxSizing: "border-box",
    padding: 0,
    paddingLeft: 20,
    outline: "none",
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    boxShadow: "4px 4px 4px rgba(0,0,0,0.4)",
  },
  tagButton: {
    width: "100%",
    cursor: "pointer",
    height: 35,
    border: 0,
    boxSizing: "border-box",
    padding: 0,
    fontSize: 16,
    color: "rgba(80, 80, 80, 1)",
    fontWeight: 600,
    borderRadius: 4,
    boxShadow: "4px 4px 4px rgba(0,0,0,0.4)",
    background: "rgba(0, 200, 220, 1)",
  },
  searchButton: {
    width: "100%",
    cursor: "pointer",
    height: 35,
    border: 0,
    boxSizing: "border-box",
    padding: 0,
    fontSize: 16,
    color: "rgba(80, 80, 80, 1)",
    fontWeight: 600,
    borderRadius: 4,
    boxShadow: "4px 4px 4px rgba(0,0,0,0.4)",
    background: "rgba(200, 200, 200, 1)",
    border: "2px solid rgba(80, 80, 80, 1)",
  },
  tableContainer: {
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  tableTitle: {
    fontSize: 22,
    color: "rgba(80, 80, 80, 1)",
    fontWeight: 600,
  },
  tableCheckbox: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  selectAllBox: {
    display: "flex",
    gap: 5,
  },
  selectAllBoxTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  selectAllBoxCheckbox: {
    width: 20,
    height: 20,
  },
  table: {
    width: "100%",
    marginTop: 10,
    // height: 500,
    overflowY: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    backgroundColor: "white",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1.5fr 0.5fr",
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "16px 20px",
    position: "sticky",
    top: 0,
    zIndex: 1,
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
  },
  tableHeaderCell: {
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: "0.5px",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1.5fr 0.5fr",
    // padding: "14px 20px",
    borderBottom: "1px solid #f1f5f9",
    alignItems: "center",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#f8fafc",
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  tableCell: {
    fontSize: "14px",
    color: "#334155",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 0",
    fontWeight: "500",
  },
  inputCheckboxCell: {
    width: 20,
    height: 20,
  },
  clientName: {
    fontWeight: "600",
    color: "#1e293b",
  },
  contactCell: {
    fontFamily: "'Roboto Mono', monospace",
    color: "#3b82f6",
  },
  dateCell: {
    color: "#64748b",
    fontSize: "13px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "#64748b",
    padding: "40px 0",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  tableHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // background: "red",
    marginBottom: "10px",
    width: "100%",
  },

  paginationContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  paginationContainerBottom: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "20px",
    width: "100%",
  },

  paginationButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "white",
    color: "#4a5568",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "600",
    fontSize: "14px",
    "&:hover": {
      backgroundColor: "#f7fafc",
      borderColor: "#cbd5e0",
    },
  },

  paginationButtonActive: {
    backgroundColor: "#4f46e5",
    color: "white",
    borderColor: "#4f46e5",
    "&:hover": {
      backgroundColor: "#4338ca",
      borderColor: "#4338ca",
    },
  },

  paginationButtonDisabled: {
    opacity: "0.5",
    cursor: "not-allowed",
    "&:hover": {
      backgroundColor: "white",
      borderColor: "#e2e8f0",
    },
  },

  paginationEllipsis: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    color: "#718096",
    fontSize: "14px",
  },
  selectedCounter: {
    padding: "8px 16px",
    backgroundColor: "#e0f2fe",
    color: "#0369a1",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "600",
    alignSelf: "flex-start",
  },
  seeAllButton: {
    width: "100%",
    marginTop: 10,
    height: 35,
    background: "rgba(0, 200, 220, 1)",
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    border: 0,
    borderRadius: 4,
    fontSize: 16,
  },
  sendMessages: {
    width: "100%",
    marginTop: 10,
    height: 35,
    background: "rgba(100, 220, 0, 1)",
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    border: 0,
    borderRadius: 4,
    fontSize: 16,
  },
  selectNumberPart: {
    width: "100%",
    display: "flex",
    justifyContent: "start",
    marginTop: 10,
    alignItems: "center",
    gap: 10
  },
  selectNumberPartText: {
    fontSize: 18,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
  },
  selectNumberPartButton: {
    width: 200,
    height: 30,
    border: 0,
    outline: "none",
    borderRadius: 4,
    boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
    fontSize: 16,
    fontWeight: 600,
    color: "rgba(80, 80, 80, 1)",
    background: "rgba(0, 200, 220, 1)",
    cursor: "pointer"
  },
  selectedAgentBox: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedAgentBoxMessage: {
    fontSize: 16,
    textDecoration: "underline",
    fontWeight: "600",
    color: "rgba(0,0,0,1)"
  },
  selectedAgentBoxUnselectButton: {
    padding: "0px 10px",
    height: 30,
    boxSizing: "border-box",
    border: 0,
    outline: 0,
    boxShadow: "3px 3px 2px rgba(0,0,0,0.4)",
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)",
    background: "rgba(220, 20, 0, 1)",
    borderRadius: 4,
    cursor: "pointer"
  }
};

export default style;
