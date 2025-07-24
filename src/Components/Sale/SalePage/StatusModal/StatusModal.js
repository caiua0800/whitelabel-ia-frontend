import React, { useState, useEffect, useContext } from "react";
import style from "./StatusModalStyle";
import { ProductContext } from "../../../../Context/ProductContext";
import { AuthContext } from "../../../../Context/AuthContext";
import { editarStatusVenda } from "../../../../Services/dbservice";

export default function StatusModal({ onClose, sale }) {
  const { credentials } = useContext(AuthContext);
  const [saleStatus, setSaleStatus] = useState("1");

  useEffect(() => {
    if (sale && sale.status) {
      setSaleStatus(sale.status);
    }
  }, []);

  const handleEditStatus = async () => {

    try {
        const response  = await editarStatusVenda(sale.id, saleStatus, credentials.accessToken);

        if(response.status === 200){
            alert('Status da venda alterado com sucesso.');
            onClose();
        }else{
            console.log('Erro ao alterar status da venda.');
        }
        console.log(response);
    } catch (error) {
        alert("Houve um erro ao alterar o status da venda.");
        console.log(error)
    }
  }

  const handleClose = () => {
    setSaleStatus(sale.status);
    onClose();
  }

  return (
    <div style={style.container}>
      <div style={style.modal}>
        <span onClick={handleClose} style={style.close}>
          x
        </span>
        <span style={style.modalTitle}>Status da Venda</span>

        <select
          style={style.statusSelect}
          value={saleStatus}
          onChange={(e) => setSaleStatus(e.target.value)}
        >
          <option value={"1"}>Pendente</option>
          <option value={"2"}>Paga</option>
          <option value={"3"}>Cencelada</option>
          <option value={"4"}>Expirada</option>
        </select>

        {(sale.status + "") != saleStatus && (
          <>
            <button onClick={handleEditStatus} style={style.saveButton}>Salvar alterações</button>
          </>
        )}
      </div>
    </div>
  );
}
