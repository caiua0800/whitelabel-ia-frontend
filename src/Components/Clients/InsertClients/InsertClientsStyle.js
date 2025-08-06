const style = {
  overlay: {
      width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0,
      background: "rgba(0,0,0,0.6)", zIndex: 12, display: "flex",
      justifyContent: "center", alignItems: "center", backdropFilter: "blur(5px)",
  },
  modalContainer: {
      width: '100%', maxWidth: '600px', background: "#1e212b",
      borderRadius: "16px", border: "1px solid #2a2f3b",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },
  modalHeader: {
      padding: "20px 25px", borderBottom: "1px solid #2a2f3b", display: "flex",
      justifyContent: "space-between", alignItems: "center",
  },
  modalTitle: { fontSize: "20px", fontWeight: "600", color: "#FFF", margin: 0 },
  closeButtonModal: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
  modalBody: {
      padding: '25px', display: 'flex', flexDirection: 'column', gap: '20px',
  },
  step: {
      display: 'flex', gap: '15px', alignItems: 'flex-start'
  },
  stepNumber: {
      background: '#2a2f3b', color: '#aeb9c4', fontWeight: '600',
      width: '30px', height: '30px', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
  },
  stepContent: {
      flexGrow: 1,
  },
  label: {
      display: "block", fontSize: "14px", fontWeight: "500",
      marginBottom: "8px", color: "#aeb9c4",
  },
  inputGrid: {
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'
  },
  input: {
      width: "100%", height: "45px", background: "#2a2f3b",
      border: "1px solid #3c4257", borderRadius: "12px", padding: "0 20px",
      boxSizing: "border-box", color: "#FFF", fontSize: "14px", outline: "none",
  },
  selectFileButton: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: "45px",
      background: "#2a2f3b", border: "1px solid #3c4257", borderRadius: "12px",
      color: "#aeb9c4", fontSize: "14px", cursor: "pointer", width: '100%'
  },
  fileName: {
      fontSize: '12px', color: '#aeb9c4', marginTop: '8px',
  },
  tagButton: {
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: "45px",
      background: "#2a2f3b", border: "1px solid #3c4257", borderRadius: "12px",
      color: "#aeb9c4", fontSize: "14px", cursor: "pointer",
  },
  extractButton: {
      height: "45px", background: '#3b82f6', color: '#FFF', border: 'none',
      borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
      width: '100%'
  },
  summaryBox: {
      background: 'rgba(78, 207, 120, 0.1)', border: '1px solid rgba(78, 207, 120, 0.3)',
      borderRadius: '10px', padding: '15px', display: 'flex', alignItems: 'center',
      gap: '10px', color: '#4ecf78', fontSize: '14px',
  },
  modalFooter: {
      padding: '20px 25px', borderTop: '1px solid #2a2f3b',
      display: 'flex', justifyContent: 'flex-end',
  },
  saveButton: {
      background: '#4ecf78', color: '#1e212b', border: 'none',
      borderRadius: '10px', padding: '10px 20px', fontSize: '15px',
      fontWeight: '600', cursor: 'pointer',
  }
};

export default style;