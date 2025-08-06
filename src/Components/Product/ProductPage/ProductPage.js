import React, { useState, useEffect, useContext } from "react";
import style from "./ProductPageStyle";
import { AuthContext } from "../../../Context/AuthContext";
import { editarProduto } from "../../../Services/dbservice";
import func from "../../../Services/fotmatters";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { FiX, FiTag, FiSave, FiTrash2 } from "react-icons/fi";
import toast from 'react-hot-toast';

export default function ProductPage({ onClose, product, reload }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.unityPrice?.toString().replace('.', ',') || "");
      setSelectedCategories(product.categoryNames || []);
      setStatus(product.status || 1);
    }
  }, [product]);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        ...product,
        name: name.trim(),
        description: description.trim(),
        status: parseInt(status),
        unityPrice: parseFloat(price.replace(",", ".")),
        categoryNames: selectedCategories,
      };
      const response = await editarProduto(credentials.accessToken, updatedProduct);
      if (response) {
        toast.success("Produto atualizado com sucesso.");
        await reload();
        onClose();
      }
    } catch (error) {
      toast.error(`Erro ao editar produto: ${error.message}`);
    }
  };
  
  const handleDeleteProduct = async () => {
     toast((t) => (
      <div>
        <p>Tem certeza que quer excluir <b>{product.name}</b>?</p>
        <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <button style={{background: '#ef4444', color: '#FFF', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer'}} 
            onClick={() => {
              deleteConfirmed();
              toast.dismiss(t.id);
            }}>
            Sim, excluir
          </button>
          <button style={{background: '#4b5563', color: '#FFF', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer'}} 
            onClick={() => toast.dismiss(t.id)}>
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  };
  
  const deleteConfirmed = async () => {
    try {
        const deletedProduct = { ...product, status: 4 };
        const response = await editarProduto(credentials.accessToken, deletedProduct);
        if (response) {
            toast.success("Produto excluído com sucesso.");
            await reload();
            onClose();
        }
    } catch (error) {
        toast.error(`Erro ao excluir produto: ${error.message}`);
    }
  }

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
                <h2 style={style.title}>Editar Produto</h2>
                <button onClick={onClose} style={style.closeBtn}><FiX size={22} /></button>
            </div>
            <form onSubmit={handleEditProduct} style={style.form}>
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
                    <button type="button" onClick={handleDeleteProduct} style={{...style.actionButton, ...style.deleteButton}}><FiTrash2 style={{marginRight: '8px'}}/> Excluir</button>
                    <button type="submit" style={{...style.actionButton, ...style.saveButton}}><FiSave style={{marginRight: '8px'}}/> Salvar Alterações</button>
                </div>
            </form>
        </div>
      </div>
      {showCategoriesModal && <CategoriesModal selectedCategories={selectedCategories} onClose={() => setShowCategoriesModal(false)} handleClick={setSelectedCategories} />}
    </>
  );
}