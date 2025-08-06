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
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: 'auto 1fr',
    gap: '20px',
    flexGrow: 1,
    overflow: 'hidden'
  },
  card: {
    background: '#1e212b',
    borderRadius: '16px',
    border: '1px solid #2a2f3b',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    padding: "20px 25px",
    borderBottom: "1px solid #2a2f3b",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  profileCard: {
    gridRow: '1 / 2',
    background: '#1e212b',
    borderRadius: '16px',
    border: '1px solid #2a2f3b',
    padding: '25px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderBottom: '1px solid #2a2f3b',
    paddingBottom: '20px',
  },
  profilePicture: {
    width: 60, height: 60, borderRadius: "50%",
    overflow: "hidden", border: "2px solid #4ecf78",
  },
  profilePictureImage: { width: "100%", height: '100%', objectFit: 'cover' },
  profileInfo: {},
  name: { fontSize: 22, fontWeight: 600, display: 'block' },
  enterpriseName: { fontSize: 14, color: "#aeb9c4" },
  profileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  actionButton: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px',
    background: '#2a2f3b', border: '1px solid #3c4257', borderRadius: '10px',
    color: '#aeb9c4', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
  },
  logoutButton: {
    background: 'rgba(255, 91, 91, 0.1)',
    color: '#ff5b5b',
    borderColor: 'rgba(255, 91, 91, 0.3)',
  },
  promptCard: {
    gridColumn: '2 / 3', gridRow: '1 / 3',
    background: '#1e212b', borderRadius: '16px', border: '1px solid #2a2f3b',
    display: 'flex', flexDirection: 'column',
  },
  stopIAButton: {
    display: 'flex', alignItems: 'center', background: 'rgba(255, 91, 91, 0.1)',
    color: '#ff5b5b', border: '1px solid rgba(255, 91, 91, 0.3)',
    padding: '8px 15px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer',
  },
  promptContent: {
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  label: { fontSize: "14px", fontWeight: '500', color: "#aeb9c4", marginBottom: '8px' },
  agentSelect: {
    height: "45px", background: "#2a2f3b", border: "1px solid #3c4257", borderRadius: "12px",
    padding: "0 15px", boxSizing: "border-box", color: "#FFF", fontSize: "14px",
    cursor: "pointer", outline: "none", marginBottom: '15px'
  },
  promptInput: {
    flexGrow: 1, background: "#2a2f3b", border: "1px solid #3c4257", borderRadius: "12px",
    padding: "15px", boxSizing: "border-box", color: "#FFF", fontSize: "14px",
    outline: "none", resize: 'none',
  },
  savePromptButton: {
    height: "45px", background: '#4ecf78', color: '#1e212b', border: 'none',
    borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
    marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  usersCard: {
    gridRow: '2 / 3',
    background: '#1e212b', borderRadius: '16px', border: '1px solid #2a2f3b',
    display: 'flex', flexDirection: 'column',
  },
  usersTable: {
    flexGrow: 1, display: 'flex', flexDirection: 'column',
  },
  usersTableHeader: {
    display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', padding: '12px 25px',
    background: '#2a2f3b', borderBottom: '1px solid #3c4257',
  },
  usersTableHeaderCell: { fontSize: '13px', fontWeight: '600', color: '#aeb9c4' },
  usersTableBody: { overflowY: 'auto', flexGrow: 1 },
  usersTableBodyRow: {
    display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr', padding: '12px 25px',
    borderBottom: '1px solid #2a2f3b',
  },
  usersTableBodyRowCell: { fontSize: '14px', color: '#FFF', fontWeight: '600' },
};

export default style;