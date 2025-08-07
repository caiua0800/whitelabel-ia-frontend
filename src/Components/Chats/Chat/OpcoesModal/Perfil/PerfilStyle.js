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
  title: { fontSize: "20px", fontWeight: "600", color: "#FFF", margin: 0 },
  closeButton: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
  modalBody: { padding: "25px" },
  profileHeader: {
    display: 'flex', alignItems: 'center', gap: '20px',
    paddingBottom: '20px', borderBottom: '1px solid #2a2f3b', marginBottom: '20px',
  },
  profilePictureCircle: {
    width: 80, height: 80, borderRadius: "50%",
    overflow: "hidden", border: '2px solid #4ecf78', flexShrink: 0
  },
  profilePicture: { width: "100%", height: '100%', objectFit: 'cover' },
  profileNameContainer: {},
  profileName: { fontSize: 24, fontWeight: 600, color: '#FFF' },
  profileContact: { fontSize: 16, color: '#aeb9c4' },
  infoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  infoField: { display: 'flex', alignItems: 'center', gap: '15px' },
  infoIcon: {
    width: '40px', height: '40px', borderRadius: '10px', background: '#2a2f3b',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#aeb9c4', flexShrink: 0,
  },
  infoLabel: { fontSize: '13px', color: '#aeb9c4', display: 'block' },
  infoValue: { fontSize: '15px', fontWeight: '500', color: '#FFF' },
};

export default style;