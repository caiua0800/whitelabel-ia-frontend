import React, { useState, useContext, useEffect } from "react";
import style from "./ChatRowsStyle";
import ChatBox from "../ChatBox/ChatBox";
import "./effect.css";
import formatHelpers from "../../helpers/formatHelpers";
import { ChatContext } from "../../../Context/ChatContext";

const ChatsRows = ({ selectChat }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const { chatsDb } = useContext(ChatContext)
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (chatsDb) setChats(chatsDb)
    }, [chatsDb])

    const handleFilterClick = () => {
        setSortOrder(prev => prev === "desc" ? "asc" : "desc");
    };

    const filteredChats = chats.filter((chat) => {
        if (!searchTerm) return true;

        const normalizedSearch = formatHelpers.normalizeText(searchTerm);
        const normalizedName = formatHelpers.normalizeText(chat.client_name);
        const normalizedId = formatHelpers.normalizeText(chat.id);

        return (
            (normalizedName && normalizedName.includes(normalizedSearch)) ||
            (normalizedId && normalizedId.includes(normalizedSearch))
        );
    });

    const sortedChats = [...filteredChats].sort((a, b) => {
        const dateA = new Date(a.lastMessageDate || a.lastMessageDate);
        const dateB = new Date(b.lastMessageDate || b.lastMessageDate);

        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });


    return (
        <>
            <div style={style.chatsContainer}>
                <div style={style.chatsContent}>
                    <div style={style.chatsHeader}>
                        <div
                            className="filter-icon icon"
                            style={style.filterIconBox}
                            onClick={handleFilterClick}
                        >
                            <img
                                style={{
                                    ...style.filterIcon,
                                    transform: sortOrder === "asc" ? "scaleY(-1)" : "scaleY(1)",
                                    transition: "transform 0.3s ease"
                                }}
                                src="./icons/filter-icon.svg"
                            />
                        </div>
                        <span style={style.chatsHeaderTitle}>CONVERSAS</span>
                    </div>
                    <div style={style.chatsBody}>
                        <div style={style.chatsInputBoxFilter}>
                            <input
                                style={style.searchFilter}
                                placeholder="Pesquise..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div style={style.chatsRows}>
                            {sortedChats.map((chat, key) => (
                                <ChatBox key={key} chat={chat} />
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatsRows;