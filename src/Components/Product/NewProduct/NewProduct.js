import React, { useState, useEffect, useContext } from "react";
import style from "./NewProductStyle";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { criarProduto } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";

export default function NewProduct({ onClose, reload }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const { credentials } = useContext(AuthContext);

  const formatLetter = (e) => {
    return e.target.value.toUpperCase();
  };

  const valueFormat = (e) => {
    if (e.target.value.trim().length === 2) return "";
    return e.target.value.replace("R$ ", "").replace(".", ",");
  };

  const handleCategory = (c) => {
    if (selectedCategories.includes(c)) {
      setSelectedCategories(selectedCategories.filter((r) => r != c));
    } else {
      setSelectedCategories([selectedCategories, c]);
    }
  };

  const handleChangeCategoryArray = (newArray) => {
    setSelectedCategories(newArray);
  };

  const handleDoubleClick = (c) => {
    const confirmDelete = window.confirm(
      `Deseja realmente remover a categoria "${c}"?`
    );
    if (confirmDelete) {
      handleCategory(c);
    }
  };

  const handleCreateProduct = async () => {
    console.log(name);
    console.log(description);
    console.log(price.replace("R$ ", "").trim());
    console.log(parseFloat(price.replace(",", ".").replace("R$ ", "")));
    console.log(parseFloat(price.replace(",", ".").replace("R$ ", "")) > 0);

    if (
      name.trim() != "" &&
      description.trim() != "" &&
      price.replace("R$ ", "").trim() != "" &&
      parseFloat(price.replace(",", ".").replace("R$ ", "")) > 0
    ) {
      try {
        console.log("selectedCategories")
        console.log(selectedCategories)

        const response = await criarProduto(credentials.accessToken, {
          name,
          description,
          status,
          unityPrice: price.replace(",", ".").replace("R$ ", ""),
          categoryNames: selectedCategories,
        });

        if (response) {
          alert("Produto criado com sucesso.");
          await reload();
          handleClose();
          return;
        } else {
          alert("Erro ao criar produto.");
          return;
        }
      } catch (error) {
        alert("Erro ao criar produto.");
        console.log(error);
        return;
      }
    } else {
      alert("Complete as informações obrigatórias.");
      return;
    }
  };

  const handleClose = () => {
    onClose();
    setName("");
    setDescription("");
    setPrice(0);
    setSelectedCategories([])
    onClose();
  }
  
  return (
    <>
      <div style={style.container}>
        <div style={style.containerContent}>
          <span style={style.title}>Crie um novo produto</span>
          <img
            onClick={handleClose}
            style={style.closeBtn}
            src="./icons/left-arrow-icon.svg"
          />

          <div style={style.content}>
            <div style={{ ...style.row, gridTemplateColumns: "6fr 2fr 2fr" }}>
              <div style={style.rowItemBox}>
                <span style={style.rowItemTitle}>Nome</span>
                <input
                  value={name}
                  onChange={(e) => setName(formatLetter(e))}
                  style={style.rowItemInput}
                />
              </div>
              <div style={style.rowItemBox}>
                <span style={style.rowItemTitle}>Valor</span>
                <input
                  value={`R$ ${price}`}
                  onChange={(e) => setPrice(valueFormat(e))}
                  style={style.rowItemInput}
                />
              </div>
              <div style={style.rowItemBox}>
                <span style={style.rowItemTitle}>Status</span>
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={style.rowItemInput}>
                    <option value={1}>Ativo</option>
                    <option value={2}>Esgotado</option>
                    <option value={3}>Indisponível</option>
                </select>
              </div>
            </div>
            <div style={{ ...style.row, gridTemplateColumns: "1fr" }}>
              <div style={style.rowItemBox}>
                <span style={style.rowItemTitle}>Descrição</span>
                <span style={style.rowItemObservation}>
                  Descreva todas as informações e funcionalidades do produto.
                </span>
                <input
                  value={description}
                  onChange={(e) => setDescription(formatLetter(e))}
                  style={style.rowItemTextArea}
                />
              </div>
            </div>
            <div style={{ ...style.row, gridTemplateColumns: "1fr" }}>
              <button
                onClick={() => setShowCategoriesModal(true)}
                style={style.selectCategoryButton}
              >
                Selecionar categoria do produto
              </button>
            </div>
            <div style={{ ...style.row, gridTemplateColumns: "1fr" }}>
              <span style={style.categoryObs}>
                Para retirar uma categoria selecionada, basta dar dois cliques
                sobre a categoria desejada
              </span>
            </div>
            <div style={{ ...style.row, gridTemplateColumns: "1fr" }}>
              <div style={style.selectedCategories}>
                {selectedCategories &&
                  selectedCategories.map((c, key) => (
                    <>
                      <span
                        key={key}
                        onDoubleClick={() => handleDoubleClick(c)}
                        style={style.selectedCategory}
                      >
                        {c}
                      </span>
                    </>
                  ))}
              </div>
            </div>
            <div style={{ ...style.row, gridTemplateColumns: "1fr" }}>
              <button onClick={handleCreateProduct} style={style.createButton}>
                Criar produto
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCategoriesModal && (
        <>
          <CategoriesModal
            selectedCategories={selectedCategories}
            onClose={() => setShowCategoriesModal(false)}
            handleClick={handleChangeCategoryArray}
          />
        </>
      )}
    </>
  );
}
