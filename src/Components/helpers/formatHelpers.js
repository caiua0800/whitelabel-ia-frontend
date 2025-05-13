
const formatHelpers = {
    formatarData: (dataString) => {
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            return "Data inválida";
        }

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');

        const hoje = new Date();
        const hojeDia = String(hoje.getDate()).padStart(2, '0');
        const hojeMes = String(hoje.getMonth() + 1).padStart(2, '0');
        const hojeAno = hoje.getFullYear();

        if (ano === hojeAno && mes === hojeMes && dia === hojeDia) {
            return `${horas}:${minutos}`; // Ex: "17:01"
        } else if (ano === hojeAno) {
            return `${dia}/${mes} ${horas}:${minutos}`; // Ex: "07/05 17:01"
        } else {
            return `${dia}/${mes}/${ano} ${horas}:${minutos}`; // Ex: "07/05/2025 17:01"
        }
    },
    normalizeText: (text) => {
        return text
            ?.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    },
}

export default formatHelpers;