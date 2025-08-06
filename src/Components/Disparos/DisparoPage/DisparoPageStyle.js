const style = {
  modal: {
    width: "90vw",
    maxWidth: "1200px",
    height: "90vh",
    background: "#1e212b",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    border: "1px solid #2a2f3b",
    color: "#FFF",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "20px 25px",
    borderBottom: "1px solid #2a2f3b",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#aeb9c4",
    cursor: "pointer",
    padding: "5px",
  },
  modalBody: {
    flexGrow: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    padding: "25px",
    boxSizing: "border-box",
    overflowY: "auto",
  },
  leftColumn: {},
  rightColumn: {},
  section: {
    marginBottom: "25px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    boxSizing: "border-box",
    color: "#aeb9c4",
    marginBottom: "15px",
    textTransform: 'uppercase',
  },
  modelContainer: {
    background: "#181a20",
    borderRadius: "12px",
    padding: "30px 50px",
    boxSizing: "border-box",
    overflow: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems:  "center",
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px'
  },
  infoCard: {
    background: '#2a2f3b',
    padding: '15px',
    boxSizing: "border-box",
    borderRadius: '10px'
  },
  infoCardTitle: {
    fontSize: '13px',
    color: '#aeb9c4',
    display: 'block',
  },
  infoCardValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#FFF',
    display: 'block',
    marginTop: '5px'
  },
  pendingBox: {
    background: "rgba(251, 191, 36, 0.1)",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    borderRadius: '10px',
    padding: '15px',
    display: 'flex',
    boxSizing: "border-box",
    alignItems: 'center',
    gap: '15px',
    marginTop: '20px'
  },
  pendingText: {
    color: '#fbbf24',
    fontSize: '14px',
  },
  verifyButton: {
    background: '#fbbf24',
    color: '#1e212b',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  historyTable: {
    background: '#2a2f3b',
    borderRadius: '12px',
    overflow: 'hidden',
    maxHeight: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  historyTableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    padding: '12px 15px',
    background: '#3c4257',
    boxSizing: "border-box",
  },
  historyTableHeaderCell: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#aeb9c4',
  },
  historyTableBody: {
    overflowY: 'auto',
  },
  historyTableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    padding: '12px 15px',
    boxSizing: "border-box",
    borderBottom: '1px solid #3c4257',
  },
  historyTableCell: {
    fontSize: '14px',
  },
  statusBadge: {
    display: 'inline-flex',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  statusSuccess: {
    backgroundColor: "rgba(78, 207, 120, 0.1)",
    color: "#4ecf78",
  },
  statusError: {
    backgroundColor: "rgba(255, 91, 91, 0.1)",
    color: "#ff5b5b",
  },
  noHistory: {
    padding: '30px',
    textAlign: 'center',
    color: '#aeb9c4',
  },
  modalFooter: {
    padding: '20px 25px',
    borderTop: '1px solid #2a2f3b',
    display: 'flex',
    justifyContent: 'flex-end',
    flexShrink: 0,
  },
  sendNewButton: {
    background: '#4ecf78',
    color: '#1e212b',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 25px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  }
};

export default style;