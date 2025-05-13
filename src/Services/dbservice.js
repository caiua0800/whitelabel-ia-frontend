import axios from "axios";

const API_BASE_URL = 'http://localhost:5097/api';

export async function obterChats(token) {
    const res = await axios.get(`${API_BASE_URL}/chat`, {
        headers: { Authorization: token }
    });
    return res.data;
}

export async function obterMensagens(chatId, token) {
    const res = await axios.get(`${API_BASE_URL}/message/chat/${chatId}`, {
        headers: { Authorization: token }
    });
    return res.data;
}

export async function editarStatusAgente(chatId, newStatus, token) {
    console.log(chatId)
    const res = await axios.put(`${API_BASE_URL}/chat/status?id=${chatId}&newStatus=${newStatus}`, {
        headers: { Authorization: token }
    });
    return res;
}

export async function sendWhatsapp(message, isFromAdmin, chatId, token) {
    const res = await axios.post(`http://localhost:3007/send-whatsapp`, {
        message,
        isFromAdmin,
        to: chatId
    }, {
        headers: { Authorization: token }
    });

    console.log(res)
    return res;
}