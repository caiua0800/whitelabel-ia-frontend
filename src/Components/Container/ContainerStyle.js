const style = {
    container: {
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box",
        background: "#181a20",
        // background: "rgba(230, 230, 230, 1)",
        position: "relative",
        overflow: "hidden", // Garante que nada escape
    },
    openButton: {
        position: 'fixed',
        left: '25px',
        top: '22px', // Alinhado com a altura do header
        zIndex: 90,
        background: '#2a2f3b',
        color: '#aeb9c4',
        border: '1px solid #3c4257',
        width: '45px',
        height: '45px',
        borderRadius: '50%', // Redondinho, um charme!
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: 'scale(1)',
        opacity: 1,
        transition: "all 0.3s ease-in-out",
    },
    openButtonHidden: {
        transform: 'scale(0)',
        opacity: 0,
    },
    mainContent: {
        width: '100%',
        height: '100%',
        overflowY: 'auto', // O scroll agora é aqui dentro
    }
}

export default style;