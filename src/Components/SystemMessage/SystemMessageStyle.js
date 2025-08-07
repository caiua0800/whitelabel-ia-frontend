const style = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9998,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)", // <<< O BLUR DA RIQUEZA!
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
    },
    messageBox: {
        minWidth: '300px',
        maxWidth: '500px',
        background: '#2a2f3b',
        borderRadius: '12px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        border: '1px solid #3c4257',
        overflow: 'hidden', // Garante que a borda colorida fique dentro
    },
    messageContent: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px',
    },
    iconWrapper: {
        marginRight: '15px',
        display: 'flex',
        alignItems: 'center',
    },
    messageText: {
        fontSize: '15px',
        fontWeight: '500',
        color: '#FFF',
        flexGrow: 1,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#aeb9c4',
        cursor: 'pointer',
        marginLeft: '15px',
        padding: '5px',
    },
    success: {
        borderLeft: '5px solid #4ecf78',
        '& > div': { // Estiliza o ícone dentro do success
          color: '#4ecf78',
        }
    },
    error: {
        borderLeft: '5px solid #ff5b5b',
        '& > div': { // Estiliza o ícone dentro do error
          color: '#ff5b5b',
        }
    },
    info: {
        borderLeft: '5px solid #3b82f6',
        '& > div': { // Estiliza o ícone dentro do info
          color: '#3b82f6',
        }
    }
};

// Truque para aplicar os estilos de ícone
style.success = {...style.success, iconWrapper: { ...style.iconWrapper, color: '#4ecf78' }};
style.error = {...style.error, iconWrapper: { ...style.iconWrapper, color: '#ff5b5b' }};
style.info = {...style.info, iconWrapper: { ...style.iconWrapper, color: '#3b82f6' }};

export default style;