const style = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#181a20",
    color: "#FFF",
    padding: "30px 80px",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
    flexShrink: 0,
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '15px',
  },
  actionButton: {
    display: 'flex', alignItems: 'center', background: '#2a2f3b',
    border: '1px solid #3c4257', color: '#aeb9c4', borderRadius: '10px',
    padding: '10px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  },
  actionButtonPrimary: {
    display: 'flex', alignItems: 'center', background: '#4ecf78',
    color: '#1e212b', border: 'none', borderRadius: '10px',
    padding: '10px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  },
  panel: {
    display: "flex",
    gap: "15px",
    width: "100%",
    marginBottom: "20px",
    flexShrink: 0,
  },
  searchWrapper: { position: "relative", flexGrow: 1 },
  searchIcon: { position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#aeb9c4" },
  searchInput: {
    width: "100%", height: "45px", background: "#2a2f3b",
    border: "1px solid #3c4257", borderRadius: "12px", padding: "0 20px 0 45px",
    boxSizing: "border-box", color: "#FFF", fontSize: "14px", outline: "none",
  },
  filterGroup: {
    display: 'flex',
    gap: '15px'
  },
  selectInput: {
    width: '200px', height: "45px", background: "#2a2f3b", border: "1px solid #3c4257",
    borderRadius: "12px", padding: "0 15px", boxSizing: "border-box",
    color: "#FFF", fontSize: "14px", cursor: "pointer", outline: "none",
  },
  tagButton: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', height: "45px",
    background: "#2a2f3b", border: "1px solid #3c4257", borderRadius: "12px",
    color: "#aeb9c4", fontSize: "14px", cursor: "pointer", padding: '0 20px',
  },
  clearButton: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', height: "45px",
    background: "rgba(255, 91, 91, 0.1)", border: "1px solid rgba(255, 91, 91, 0.3)",
    borderRadius: "12px", color: "#ff5b5b", fontSize: "14px", cursor: "pointer", padding: '0 20px',
  },
  searchButton: {
    height: "45px", background: '#4ecf78', color: '#1e212b',
    border: 'none', borderRadius: '12px', padding: '0 25px',
    fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  },
  tableContainer: {
    flexGrow: 1, background: '#1e212b', borderRadius: '12px',
    border: '1px solid #2a2f3b', overflow: 'hidden', display: 'flex',
    flexDirection: 'column', minHeight: 0,
  },
  tableHeader: {
    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
    padding: '15px 25px', background: '#2a2f3b',
    borderBottom: '1px solid #3c4257', flexShrink: 0,
  },
  tableHeaderCell: {
    fontSize: '13px', fontWeight: '600', color: '#aeb9c4',
    textTransform: 'uppercase',
  },
  tableBody: {
    overflowY: 'auto', flexGrow: 1,
  },
  tableRow: {
    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
    padding: '15px 25px', borderBottom: '1px solid #2a2f3b',
    alignItems: 'center', cursor: 'pointer',
  },
  tableCell: {
    fontSize: '14px', color: '#FFF',
  },
  messageCenter: {
    flexGrow: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', color: '#aeb9c4',
  },
  paginationContainer: {
    display: "flex", justifyContent: "center", alignItems: "center",
    padding: "15px 20px", borderTop: "1px solid #2a2f3b",
    flexShrink: 0, gap: '8px',
  },
  paginationButton: {
    background: "#2a2f3b", border: "1px solid #3c4257", color: "#aeb9c4",
    height: '36px', minWidth: '36px', padding: "0 15px", borderRadius: "8px",
    cursor: "pointer", display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '14px', fontWeight: '600'
  },
  paginationView: {
    color: "#aeb9c4",
    fontSize: "14px",
    fontWeight: '500'
  },
  disabledButton: { opacity: 0.5, cursor: 'not-allowed' },
};

export default style;
