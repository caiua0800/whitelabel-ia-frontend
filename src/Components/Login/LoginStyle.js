const styles = {
    page: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      fontFamily: "'Poppins', sans-serif",
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
      backgroundSize: "400% 400%",
      animation: "gradient 15s ease infinite",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "40px",
      color: "white",
    },
    logo: {
      width: "120px",
      marginBottom: "40px",
    },
    title: {
      fontSize: "3em",
      fontWeight: 700,
      textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    subtitle: {
      fontSize: "1.2em",
      marginTop: "10px",
      maxWidth: "400px",
      lineHeight: 1.5,
      opacity: 0.9,
    },
    rightPanel: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f7f6",
    },
    loginContainer: {
      width: "100%",
      maxWidth: "400px",
      padding: "50px",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      display: "flex",
      flexDirection: "column",
      gap: "25px",
    },
    formTitle: {
      fontSize: "2em",
      fontWeight: 600,
      color: "#333",
      textAlign: "center",
      margin: 0,
      marginBottom: "10px",
    },
    inputGroup: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#888",
    },
    input: {
      width: "100%",
      height: "50px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "0 20px 0 50px",
      boxSizing: "border-box",
      fontSize: "1em",
      background: "#fff",
      outline: "none",
      transition: "all 0.3s ease",
    },
    button: {
      width: "100%",
      height: "50px",
      borderRadius: "10px",
      border: "none",
      background: "linear-gradient(90deg, #e73c7e, #23a6d5)",
      color: "white",
      fontSize: "1.2em",
      fontWeight: 600,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.3s ease",
    },
    buttonIcon: {
      marginLeft: "10px",
    },
  };
  
  const keyframes = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = keyframes;
  document.head.appendChild(styleSheet);
  
  styles.input[':focus'] = {
    borderColor: '#e73c7e',
    boxShadow: '0 0 0 3px rgba(231, 60, 126, 0.3)',
  };
  
  styles.button[':hover'] = {
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  };
  
  styles.button[':disabled'] = {
    opacity: 0.7,
    cursor: 'not-allowed',
  };
  
  export default styles;