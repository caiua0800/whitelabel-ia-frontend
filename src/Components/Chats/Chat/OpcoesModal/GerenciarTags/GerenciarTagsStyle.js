const style = {
  overlay: {
    width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,
    background: "rgba(0,0,0,0.6)", zIndex: 16, display: "flex",
    justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)",
  },
  modalContainer: {
    width: '100%', maxWidth: '600px', background: "#1e212b", borderRadius: "16px",
    display: "flex", flexDirection: "column", border: "1px solid #2a2f3b",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  modalHeader: {
    padding: "20px 25px", borderBottom: "1px solid #2a2f3b", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  modalTitle: { fontSize: "20px", fontWeight: "600", color: "#FFF", margin: 0 },
  closeButton: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
  modalBody: { padding: "25px", display: 'flex', flexDirection: 'column', gap: '20px' },
  searchWrapper: { position: "relative" },
  searchIcon: { position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#aeb9c4" },
  searchInput: {
    width: "100%", height: "45px", background: "#2a2f3b", border: "1px solid #3c4257",
    borderRadius: "12px", padding: "0 20px 0 45px", boxSizing: "border-box", color: "#FFF",
    fontSize: "14px", outline: "none",
  },
  tagsSection: {},
  areaTitle: { fontSize: "14px", color: "#aeb9c4", fontWeight: 600, marginBottom: '10px' },
  tagsContainer: {
    minHeight: '100px', maxHeight: '150px', overflowY: 'auto', display: "flex", flexWrap: "wrap",
    background: "#2a2f3b", borderRadius: "12px", padding: "10px", gap: "10px", border: "1px solid #3c4257",
  },
  tag: {
    padding: "5px 12px", maxHeight: "28px", borderRadius: "20px", background: "#3c4257",
    fontSize: "14px", color: "#aeb9c4", cursor: 'pointer', transition: 'all 0.2s ease',
  },
  tagSelected: { background: '#4ecf78', color: '#1e212b', fontWeight: '600' },
  noTagsMessage: { width: '100%', textAlign: 'center', color: '#aeb9c4', alignSelf: 'center', fontSize: '14px' },
  modalFooter: { padding: '20px 25px', borderTop: '1px solid #2a2f3b', display: 'flex', justifyContent: 'flex-end' },
  saveButton: {
    background: '#4ecf78', color: '#1e212b', border: 'none', borderRadius: '10px',
    padding: '10px 20px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  }
};

export default style;