import React, { useState, useContext } from "react";
import style from "./NewProductStyle";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { criarProduto } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { FiX, FiTag } from "react-icons/fi";
import toast from "react-hot-toast";

export default function NewProduct({ onClose, reload }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const { credentials } = useContext(AuthContext);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) {
      toast.error("Nome e Preço são obrigatórios.");
      return;
    }
    
    try {
      const formattedPrice = parseFloat(price.replace(",", "."));
      const response = await criarProduto(credentials.accessToken, {
        name, description, status: parseInt(status), unityPrice: formattedPrice,
        categoryNames: selectedCategories,
      });

      if (response) {
        toast.success("Produto criado com sucesso.");
        await reload();
        onClose();
      }
    } catch (error) {
      toast.error("Erro ao criar produto.");
      console.error(error);
    }
  };
  
  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2).toString().replace('.', ',');
    setPrice(value);
  };
  
  return (
    <>
      <div style={style.overlay} onClick={onClose}>
        <div style={style.modalContainer} onClick={(e) => e.stopPropagation()}>
            <div style={style.modalHeader}>
                <h2 style={style.title}>Criar Novo Produto</h2>
                <button onClick={onClose} style={style.closeBtn}><FiX size={22} /></button>
            </div>
            <form onSubmit={handleCreateProduct} style={style.form}>
                <div style={style.inputGrid}>
                    <div style={{...style.inputGroup, gridColumn: '1 / 3'}}>
                        <label style={style.label}>Nome do Produto</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} style={style.input}/>
                    </div>
                    <div style={style.inputGroup}>
                        <label style={style.label}>Valor (R$)</label>
                        <input value={price} onChange={handlePriceChange} style={style.input} placeholder="0,00"/>
                    </div>
                    <div style={style.inputGroup}>
                        <label style={style.label}>Status</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={style.input}>
                            <option value={1}>Ativo</option>
                            <option value={2}>Esgotado</option>
                            <option value={3}>Indisponível</option>
                        </select>
                    </div>
                </div>
                <div style={style.inputGroup}>
                    <label style={style.label}>Descrição</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{...style.input, ...style.textarea}}/>
                </div>
                <div style={style.inputGroup}>
                    <label style={style.label}>Categorias</label>
                    <button type="button" onClick={() => setShowCategoriesModal(true)} style={style.categoryButton}><FiTag style={{marginRight: '8px'}}/> Selecionar Categorias</button>
                    <div style={style.selectedCategories}>
                      {selectedCategories.map((c, key) => (
                        <span key={key} style={style.selectedCategory}>{c}</span>
                      ))}
                    </div>
                </div>
                <div style={style.footer}>
                    <button type="submit" style={style.createButton}>Criar Produto</button>
                </div>
            </form>
        </div>
      </div>
      {showCategoriesModal && <CategoriesModal selectedCategories={selectedCategories} onClose={() => setShowCategoriesModal(false)} handleClick={setSelectedCategories} />}
    </>
  );
}