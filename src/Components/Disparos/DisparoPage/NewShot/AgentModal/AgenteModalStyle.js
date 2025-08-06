const style = {
    container: {
        width: "100vw", height: "100vh", zIndex: 12, background: "rgba(0,0,0,0.6)",
        position: "fixed", top: 0, left: 0, display: "flex", justifyContent: "center", alignItems: "center",
        backdropFilter: "blur(5px)",
    },
    containerModal: {
        width: '100%', maxWidth: '400px', background: "#1e212b", borderRadius: "16px",
        display: "flex", flexDirection: "column", border: "1px solid #2a2f3b",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    },
    modalHeader: {
        padding: "20px 25px", borderBottom: "1px solid #2a2f3b", display: "flex",
        justifyContent: "space-between", alignItems: "center",
    },
    title: { fontSize: "20px", fontWeight: "600", color: "#FFF", margin: 0 },
    closeBtn: { background: "none", border: "none", color: "#aeb9c4", cursor: "pointer" },
    content: {
        display: "flex", flexDirection: "column", padding: '15px', gap: '10px'
    },
    agentBox: {
        display: "flex", alignItems: "center", borderRadius: "12px", cursor: "pointer",
        padding: "15px", transition: "background-color .2s", gap: '15px',
    },
    agentIcon: {
        background: "rgba(78, 207, 120, 0.1)", color: "#4ecf78", height: "40px", width: "40px",
        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    },
    agentInfo: { display: 'flex', flexDirection: 'column' },
    agentName: { fontSize: "16px", fontWeight: 600, color: "#FFF" },
    agentNumber: { fontSize: "14px", color: "#aeb9c4" },
    noAgentMessage: { color: '#aeb9c4', textAlign: 'center', padding: '20px' }
};

export default style;