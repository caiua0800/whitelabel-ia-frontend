import React, { useState, useEffect, useContext } from "react";
import style from "./AgentsStyle";
import AgentChatFirstRow from "../AgentFirstRow/AgentChatFirstRow";
import Table from "../Tables/Table";
import "./effect.css"

const agentsInfo = [
    { id: 1, name: "Irineu", chatsQtt: 133, phoneNumber: "(17) 992562727", description: "Sou o armandinho dos chats.", status: 1 },
    { id: 2, name: "Jorge", chatsQtt: 22, phoneNumber: "(17) 992562727", description: "Sou o armandinho dos chats.", status: 2 },
    { id: 3, name: "Maycon Kluster", chatsQtt: 4382, phoneNumber: "(17) 992562727", description: "Sou o armandinho dos chats.", status: 1 },
    { id: 4, name: "Maycon Castro", chatsQtt: 4382, phoneNumber: "(17) 992562727", description: "Sou o armandinho dos chats.", status: 1 },
    { id: 5, name: "Pedro Kluster", chatsQtt: 4382, phoneNumber: "(17) 992562727", description: "Sou o armandinho dos chats.", status: 1 },
    { id: 6, name: "Caiuã Kluster", chatsQtt: 4382, phoneNumber: "(17) 992562727", description: "Sou o armandinho dos chats.", status: 1 },
]

const columns = [
    { name: "Id", value: "id" },
    { name: "Nome", value: "name" },
    { name: "Número", value: "phoneNumber" },
    { name: "Descrição", value: "description" },
    { name: "Status", value: "status" },
]


export default function Agents() {

    return (
        <>

            <div style={style.container}>
                <div className="add-agent-icon" style={style.createAgentButton}>
                    <img style={style.addIcon} src="./icons/add-icon.svg" />
                </div>
                <div style={style.containerBody}>
                    <AgentChatFirstRow agents={agentsInfo} />

                    <div style={style.secondRow}>
                        <Table columns={columns} data={agentsInfo} />
                    </div>
                </div>
            </div>
        </>
    )
}


