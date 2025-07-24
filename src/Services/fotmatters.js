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

const func = {
  formatarData,
  formatarContato,
  formatarDataCompleta,
  formatPermission,
  formatarMoeda,
};

export default func;
