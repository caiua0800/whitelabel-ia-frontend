import axios from "axios";

const REACT_APP_BASE_ROUTE_DOTNET_SERVER =
  process.env.REACT_APP_BASE_ROUTE_DOTNET_SERVER;
const REACT_APP_BASE_ROUTE_WHATSAPP_SERVER =
  process.env.REACT_APP_BASE_ROUTE_WHATSAPP_SERVER;

export async function obterChats(agentNumber, token) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat?agentNumber=${agentNumber}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterShots(token) {
  const res = await axios.get(`${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/dto`, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function obterInformacoesDisparos(token, month, year) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/monthly-stats?month=${month}&year=${year}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterVendas(token) {
  const res = await axios.get(`${REACT_APP_BASE_ROUTE_DOTNET_SERVER}sale/dto`, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function searchVendas(
  searchTerm,
  pageNumber,
  pageSize,
  token,
  order = "desc",
  startDate = null,
  endDate = null,
  status = null
) {
  let url = `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}sale/search?searchTerm=${encodeURIComponent(
    searchTerm || ""
  )}&pageNumber=${pageNumber}&pageSize=${pageSize}&order=${order}`;

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate)}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate)}`;
  }
  if (status) {
    url += `&status=${status}`;
  }

  const res = await axios.get(url, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function searchShots(
  searchTerm,
  pageNumber,
  pageSize,
  token,
  order = "desc",
  startDate = null,
  endDate = null,
  status = null
) {
  let url = `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/search?searchTerm=${encodeURIComponent(
    searchTerm || ""
  )}&pageNumber=${pageNumber}&pageSize=${pageSize}&order=${order}`;

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate)}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate)}`;
  }
  if (status) {
    url += `&status=${status}`;
  }

  const res = await axios.get(url, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function criarShot(token, shot) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot`,
    shot,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function criarShot2(token, shot) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot`,
    shot,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterModelos(token) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}MessageModel`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function enviarDisparo(token, agentNumber, shotId, clients) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/send/${shotId}?agentNumber=${agentNumber}`,
    clients,
    {
      headers: { Authorization: token },
    }
  );

  console.log(res)
  console.log(res.status)

  return res.status;
}


export async function verificarModelo(token, shotId) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/check-template-status/${shotId}`,
    null,
    {
      headers: { Authorization: token },
    }
  );

  return res.data;
}

export async function criarModelo(token, modeloInfo) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}messageModel`,
    modeloInfo,
    {
      headers: { Authorization: token },
    }
  );

  if (res.status == 201) {
    try {
      var shotResponse = await axios.post(
        `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot`,
        {
          messageModelId: res.data.id,
          name: modeloInfo.name,
          status: 1,
          header: {
            text: modeloInfo.headerText
          },
          body: {
            text: modeloInfo.bodyText
          },
          footer: {
            text: modeloInfo.footerText
          }
        },
        {
          headers: { Authorization: token },
        }
      );
      console.log(shotResponse);
      return shotResponse.status;
    } catch (error) {
      console.log("Erro ao criar shot");
      console.log(error);
      return null;
    }
  } else {
    return null;
  }
}

export async function iniciarChat(
  to,
  agentNumber,
  message,
  whatsappToken,
  token,
) {

  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/start-chat?agentNumber=${agentNumber}&whatsappToken=${whatsappToken}`,
    { to, message, agent_number: agentNumber, whatsapp_token: whatsappToken },
    {
      headers: { Authorization: token },
    }
  );
  return res.status;
}

export async function iniciarChatLeads(token, agentNumber, client_shot_dto) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}shot/start-chat-leads?agentNumber=${agentNumber}`,
    { client_shot_dto },
    {
      headers: { Authorization: token },
    }
  );
  return res.status;
}

export async function criarProduto(token, product) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}product`,
    product,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function gerarPix(token, identificationType) {
  console.log(identificationType);
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}payments/signature-pix`,
    {
      identificationType,
      description: "Pagamento da assinatura.",
    },
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function verificarPagamento(token, paymentId) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}payments/verify/${paymentId}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
}

export async function editarProduto(token, product) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}product/${product.id}`,
    product,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterCategorias(token) {
  const res = await axios.get(`${REACT_APP_BASE_ROUTE_DOTNET_SERVER}category`, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function obterAdmins(token) {
  const res = await axios.get(`${REACT_APP_BASE_ROUTE_DOTNET_SERVER}admin`, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function changePass(actual_pass, new_pass, admin_id, token) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}admin/change-password/${admin_id}`,
    {
      currentPassword: actual_pass,
      newPassword: new_pass,
    },
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function searchChats(
  searchTerm,
  pageNumber,
  pageSize,
  agentNumber,
  token,
  order = "desc",
  startDate = null,
  endDate = null,
  tags = null,
  withMessage = false
) {
  let url = `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/search?agentNumber=${agentNumber}&searchTerm=${encodeURIComponent(
    searchTerm
  )}&pageNumber=${pageNumber}&pageSize=${pageSize}&order=${order}`;

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate)}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate)}`;
  }
  if (tags) {
    url += `&tagIds=${tags}`;
  }

  if (withMessage) {
    url += `&withMessage=${withMessage}`;
  }

  const res = await axios.get(url, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function searchProducts(
  searchTerm,
  pageNumber,
  pageSize,
  token,
  order = "desc",
  startDate = null,
  endDate = null,
  categoryIds = null,
  status = null
) {
  let url = `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}product/search?searchTerm=${encodeURIComponent(
    searchTerm
  )}&pageNumber=${pageNumber}&pageSize=${pageSize}&order=${order}`;

  if (startDate) {
    url += `&startDate=${encodeURIComponent(startDate)}`;
  }
  if (endDate) {
    url += `&endDate=${encodeURIComponent(endDate)}`;
  }
  if (categoryIds) {
    url += `&categoryIds=${categoryIds}`;
  }

  if (status) {
    url += `&status=${status}`;
  }

  const res = await axios.get(url, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function obterChat(token, id) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/${id}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterMensagens(chatId, agentNumber, token) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}message/chat/${chatId}/${agentNumber}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterTags(token) {
  const res = await axios.get(`${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag`, {
    headers: { Authorization: token },
  });
  return res.data;
}

export async function searchTags(searchTerm, token) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag/search?name=${searchTerm}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function saveChatIdToTag(tagId, chatId, token) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag/${tagId}/chats/${chatId}`,
    null,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function saveTagsToTheChat(newTags, chatId, token) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/tag/${chatId}`,
    newTags,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function removeChatIdFromTag(tagId, chatId, token) {
  const res = await axios.delete(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag/${tagId}/chats/${chatId}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function criarTag(tag, token) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag`,
    tag,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function criarCategoria(tag, token) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}category`,
    tag,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function deleteTag(id, token) {
  const res = await axios.delete(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag/${id}`,
    {
      headers: { Authorization: token },
    }
  );

  if (res.status === 200) return true;
  else return false;
}

export async function editTag(tag, token) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag/${tag.id}`,
    tag,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function editCategory(tag, token) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}category/${tag.id}`,
    tag,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function obterTag(id, token) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}tag/${id}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function editarStatusAgente(chatId, newStatus, token) {
  console.log(chatId);
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/status?id=${chatId}&newStatus=${newStatus}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
}

export async function editarStatusTodosOsAgentes(token) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/status/all?newStatus=2`,
    {}, //
    {
      headers: { Authorization: token },
    }
  );
  return res;
}

export async function editarStatusVenda(saleId, newStatus, token) {
  console.log(saleId, newStatus, token);
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}sale/${saleId}/new-status/${newStatus}`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
}

export async function sendWhatsapp(
  message,
  agentNumber,
  isFromAdmin,
  chatId,
  token
) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_WHATSAPP_SERVER}send-whatsapp`,
    {
      message,
      isFromAdmin,
      to: chatId,
      whatsappNumId: agentNumber,
    },
    {
      headers: { Authorization: token },
    }
  );

  console.log(res);
  return res;
}

export async function createMultipleClients(clients, token) {
  const res = await axios.post(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}chat/multiple`,
    clients,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function getPrompt(token, agentNumber) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}agent/prompt?agentNumber=${agentNumber}`,
    {
      headers: { Authorization: token },
    }
  );
  return res.data;
}

export async function updatePrompt(token, newPrompt, agentNumber) {
  const res = await axios.put(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}agent/prompt`,
    {
      NewPrompt: newPrompt,
      AgentNumber: agentNumber,
    },
    {
      headers: { Authorization: token },
    }
  );
  return res.status === 200;
}

export async function getAgents(token) {
  const res = await axios.get(
    `${REACT_APP_BASE_ROUTE_DOTNET_SERVER}agent/all`,
    {
      headers: { Authorization: token },
    }
  );
  return res;
}
