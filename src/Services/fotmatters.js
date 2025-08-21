import React from "react";

function formatarData(dataISO) {
  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês é 0-indexed
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

function formatarContato(contato) {
  var n = contato.length;
  var c = contato;

  if (n === 13) {
    return `+${c[0]}${c[1]} (${c[2]}${c[3]}) ${c[4]}${c[5]}${c[6]}${c[7]}${c[8]}-${c[9]}${c[10]}${c[11]}${c[12]}`;
  } else if (n === 12) {
    return `+${c[0]}${c[1]} (${c[2]}${c[3]}) ${c[4]}${c[5]}${c[6]}${c[7]}${c[8]}-${c[9]}${c[10]}${c[11]}`;
  }
  return contato;
}

function formatarDataCompleta(dataISO) {
  const data = new Date(dataISO);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  const segundos = String(data.getSeconds()).padStart(2, "0");

  return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
}

function formatPermission(permission) {
  switch (permission) {
    case "manage_settings":
      return "Editar Configurações";
    case "view_dashboard":
      return "Ver Dashboard";
    default:
      return "Não identificado";
  }
}

function formatarMoeda(valor) {
  let valorStr = typeof valor === "string" ? valor : String(valor);
  valorStr = valorStr.replace(/[^\d,.]/g, "");
  valorStr = valorStr.replace(",", ".");
  let partes = valorStr.split(".");
  let parteInteira = partes[0] || "0";
  let parteDecimal = partes.length > 1 ? partes[1].substring(0, 2) : "00";
  parteInteira = parteInteira.replace(/^0+/, "") || "0";
  parteInteira = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  parteDecimal = parteDecimal.padEnd(2, "0").substring(0, 2);

  return `R$${parteInteira},${parteDecimal}`;
}

const textFormatter = (text) => {
  if (!text) return '';
  
  // Passo 1: Substituir enumerações (1., 2., etc.) por quebras de linha
  let formatted = text.replace(/(\d+)\./g, '\n$1. ');
  
  // Passo 2: Adicionar quebras após frases completas
  formatted = formatted.replace(/([.!?])\s+(?=[A-ZÀ-Ú])/g, '$1\n\n');
  
  // Passo 3: Formatar seções especiais
  formatted = formatted.replace(/(Imagine só:|Veja como:|Quer que eu)/g, '\n\n$1');
  
  // Passo 4: Remover espaços extras
  formatted = formatted.replace(/\s+/g, ' ').trim();
  
  // Passo 5: Converter quebras de linha em elementos React
  return formatted.split('\n').map((paragraph, i) => (
    <React.Fragment key={i}>
      {paragraph}
      <br />
    </React.Fragment>
  ));
};

const formatNumber = (number) => {
  if(number){
    number = number.slice(2)
  }
  const cleaned = number.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!match) return "";
  let formatted = "";
  if (match[1]) formatted += `(${match[1]}`;
  if (match[2]) formatted += `) ${match[2]}`;
  if (match[3]) formatted += `-${match[3]}`;
  return formatted;
};

const func = {
  formatarData,
  formatarContato,
  formatarDataCompleta,
  formatPermission,
  formatarMoeda,
  textFormatter,
  formatNumber
};

export default func;
