
export default function AgentChatBox({ agent, key }) {

    return (
        <>
            <div key={key} style={style.agentChatBox}>
                <div style={style.agentChatBoxContent}>
                    <div style={style.agentImageBox}>
                        <div style={style.profilePictureBox}>
                            <img style={style.profilePictureImage} src="./images/usuario.webp" />
                        </div>
                    </div>
                    <div style={style.agentChatsInfoBox}>
                        <span style={style.agentName}>{agent && agent.name}</span>
                        <div style={style.chatsInfoContent}>
                            <div style={style.qttChats}>
                                <span style={{ fontWeight: 600, fontSize: 32, color: "rgba(80, 255, 0, 1)" }}>{agent && agent.chatsQtt}</span>
                                <span style={{ fontSize: 28, color: "white" }}>Chats Iniciados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const style = {
    agentChatBox: {
        width: "100%",
        height: "150px",
        background: "rgba(0, 160, 220, 1)",
        borderRadius: 8,
        boxSizing: "border-box",
        padding: "10px 20px"
    },
    agentChatBoxContent: {
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "30% 70%",
    },
    agentImageBox: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    profilePictureBox: {
        width: 80,
        height: 80,
        borderRadius: "50%",
        boxShadow: "3px 3px 4px rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    profilePictureImage: {
        width: "150%"
    },
    agentChatsInfoBox: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexDirection: "column"
    },
    agentName: {
        fontSize: 28,
        color: "white",
        fontWeight: 600
    },
    chatsInfoContent: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start"
    },
    qttChats: {
        display: "flex",
        gap: 5,
        alignItems: "center"
    },
}