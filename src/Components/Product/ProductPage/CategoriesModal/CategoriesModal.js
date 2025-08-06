import React, { useState, useEffect, useContext } from "react";
import style from "./CategoriesModalstyle";
import { ProductContext } from "../../../../Context/ProductContext";
import { AuthContext } from "../../../../Context/AuthContext";
import { FiX, FiSearch } from "react-icons/fi";

export default function CategoriesModal({ selectedCategories, onClose, handleClick }) {
  const [selecteds, setSelecteds] = useState(selectedCategories || []);
  const { getCategories, categories } = useContext(ProductContext);
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (!categories || categories.length === 0) {
        getCategories(credentials.accessToken);
    }
  }, [categories, getCategories, credentials]);

  const handleCategory = (c) => {
    if (selecteds.includes(c)) {
      setSelecteds(selecteds.filter((r) => r !== c));
    } else {
      setSelecteds([...selecteds, c]);
    }
  };

  const handleSaveAndExit = () => {
    handleClick(selecteds);
    onClose();
  };

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.modal} onClick={(e) => e.stopPropagation()}>
        <div style={style.modalHeader}>
            <h2 style={style.modalTitle}>Selecionar Categorias</h2>
            <button onClick={onClose} style={style.close}><FiX size={20}/></button>
        </div>
        <div style={style.modalContent}>
          <div style={style.categoriesBox}>
            {categories && categories.map((c) => (
              <div
                key={c.id}
                style={{...style.categoryItem, ...(selecteds.includes(c.name) ? style.categorySelected : {})}}
                onClick={() => handleCategory(c.name)}
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>
        <div style={style.modalFooter}>
            <button style={style.saveButton} onClick={handleSaveAndExit}>Salvar Seleção</button>
        </div>
      </div>
    </div>
  );
}