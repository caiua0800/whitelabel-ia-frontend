import React, { useState, useEffect, useContext } from "react";
import style from "./CategoriesModalstyle";
import { ProductContext } from "../../../../Context/ProductContext";
import { AuthContext } from "../../../../Context/AuthContext";

export default function CategoriesModal({
  selectedCategories,
  onClose,
  handleClick,
}) {
  const [selecteds, setSelecteds] = useState([]);
  const { getCategories, categories } = useContext(ProductContext);
  const [databaseCategories, setDatabaseCategories] = useState([]);
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (categories) {
      setDatabaseCategories(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategories && selectedCategories.length > 0)
      setSelecteds(selectedCategories || []);
  }, [selectedCategories]);

  const handleCategory = (c) => {
    if (selecteds.includes(c)) {
      setSelecteds(selecteds.filter((r) => r !== c));
    } else {
      setSelecteds([...selecteds, c]);
    }
  };

  const handleSaveAndExit = () => {
    handleClick(selecteds);
    handleClose()
  };

  const handleClose = () => {
    setDatabaseCategories([]);
    setSelecteds([])
    onClose();
  }

  const fetchCategories = async () => {
    await getCategories(credentials.accessToken);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={style.container}>
      <div style={style.modal}>
        <span onClick={handleClose} style={style.close}>
          x
        </span>
        <span style={style.modalTitle}>Categorias</span>
        <div style={style.modalContent}>
          <span style={style.boxTitle}>Categorias Disponíveis</span>
          <div style={style.categoriesBox}>
            {databaseCategories &&
              databaseCategories.map((c, key) => (
                <span
                  key={key}
                  style={style.categoryItem}
                  onClick={() => handleCategory(c.name)}
                >
                  {c.name}
                </span>
              ))}
          </div>
          <span style={style.boxTitle}>Categorias Selecionadas</span>
          <div style={style.categoriesBox}>
            {selecteds &&
              selecteds.map((c, key) => (
                <span
                  key={key}
                  style={style.categoryItem}
                  onClick={() => handleCategory(c)}
                >
                  {c}
                </span>
              ))}
          </div>
          <button style={style.saveIcon} onClick={handleSaveAndExit}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
