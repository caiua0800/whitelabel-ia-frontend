import React, { useState, useEffect, useContext } from "react";
import style from "./ProductPageStyle";
import { AuthContext } from "../../../Context/AuthContext";
import { criarProduto, editarProduto } from "../../../Services/dbservice";
import func from "../../../Services/fotmatters";
import CategoriesModal from "./CategoriesModal/CategoriesModal";

export default function ProductPage({ onClose, product, reload }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const { credentials } = useContext(AuthContext);

  useEffect(() => {
    if (
      product &&
      product.name &&
      product.description &&
      product.unityPrice &&
      product.status
    ) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.unityPrice);
      setSelectedCategories(product.categoryNames);
      setStatus(product.status);
    }
  }, [product]);

  const formatLetter = (e) => {
    return e.target.value.toUpperCase();
  };

  const valueFormat = (e) => {
    if (e.target.value.trim().length === 2) return "";
    if (e.target.value.includes(","))
      return e.target.value
        .replace("R$ ", "")
        .replace(".", ",")
        .replace(",", "");
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

  const handleEditProduct = async () => {
    try {
      if (!product || !product.id) {
        throw new Error("Produto inválido para edição");
      }

      const updatedProduct = {
        id: product.id,
        name: name.trim(),
        description: description.trim(),
        status: status,
        unityPrice: parseFloat(
          price.toString().replace("R$ ", "").replace(",", ".")
        ),
        categoryNames: selectedCategories,
      };

      const response = await editarProduto(
        credentials.accessToken,
        updatedProduct
      );

      if (response) {
        alert("Produto atualizado com sucesso.");
        await reload();
        handleClose();
      } else {
        alert("Erro ao atualizar produto");
        return;
      }
    } catch (error) {
      console.error("Erro ao editar produto:", error);
      alert(`Erro ao editar produto: ${error.message}`);
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir o produto?`
    );
    if (confirmDelete) {

      try {
        if (!product || !product.id) {
          throw new Error("Produto inválido para edição");
        }

        const updatedProduct = {
          id: product.id,
          name: product.name,
          description: product.description,
          status: 4,
          unityPrice: product.unityPrice,
          categoryNames: product.categoryNames,
        };

        const response = await editarProduto(
          credentials.accessToken,
          updatedProduct
        );

        if (response) {
          alert("Produto excluído com sucesso.");
          await reload();
          handleClose();
        } else {
          alert("Erro ao excluir produto");
          return;
        }
      } catch (error) {
        console.error("Erro ao editar produto:", error);
        alert(`Erro ao editar produto: ${error.message}`);
      }
    }
    return;
  };

  const handleClose = () => {
    onClose();
    setName("");
    setDescription("");
    setPrice(0);
    setSelectedCategories([]);
    onClose();
  };

  const priceFormatter = (val) => {
    return val;
    // return parseFloat(val.replace("R$ ", "").replace(",", ".").trim());
  };

  return (
    <>
      <div style={style.containerGeneral}>
        <div style={style.modal}>
          <span onClick={onClose} style={style.closeBtn}>
            x
          </span>
          <span onClick={handleDeleteProduct} style={style.deleteButton}>
            Excluir Produto
          </span>
          <span style={style.title}>Página do Produto</span>

          <div style={{ ...style.content, gridTemplateRows: "auto auto auto" }}>
            <div
              style={{
                ...style.row,
                display: "grid",
                gridTemplateColumns: "6fr 2fr 2fr",
              }}
            >
              <div style={style.inputBox}>
                <span style={style.inputBoxTitle}>Nome</span>
                <input
                  style={style.inputBoxInput}
                  value={product && name}
                  onChange={(e) => setName(formatLetter(e))}
                />
              </div>
              <div style={style.inputBox}>
                <span style={style.inputBoxTitle}>Valor</span>
                <input
                  style={style.inputBoxInput}
                  value={`R$ ${product && price}`}
                  onChange={(e) => setPrice(valueFormat(e))}
                />
              </div>
              <div style={style.inputBox}>
                <span style={style.inputBoxTitle}>Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={style.inputBoxInput}
                >
                  <option value={1}>Ativo</option>
                  <option value={2}>Esgotado</option>
                  <option value={3}>Indisponível</option>
                </select>
              </div>
            </div>
            <div
              style={{
                ...style.row,
                display: "grid",
                gridTemplateColumns: "auto",
              }}
            >
              <div style={style.inputBox}>
                <span style={style.inputBoxTitle}>Descrição</span>
                <textarea
                  value={product && description}
                  style={style.inputBoxTextarea}
                  onChange={(e) => setDescription(formatLetter(e))}
                />
              </div>
            </div>
            <div
              style={{
                ...style.row,
                display: "grid",
                gridTemplateColumns: "auto",
              }}
            >
              <button
                onClick={() => setShowCategoriesModal(true)}
                style={style.selectCategoriesButton}
              >
                Selecionar Categorias
              </button>
            </div>
            <div
              style={{
                ...style.row,
                display: "grid",
                gridTemplateColumns: "auto",
              }}
            >
              <span style={style.categoriesBoxTitle}>
                Categorias selecionadas
              </span>
              <span style={style.categoriesBoxSubTitle}>
                Clique duas vezes sobre uma categoria para remove-la.
              </span>
            </div>
            <div
              style={{
                ...style.row,
                display: "grid",
                gridTemplateColumns: "auto",
              }}
            >
              <div style={style.categoryBoxes}>
                {selectedCategories &&
                  selectedCategories.map((c, key) => (
                    <span
                      key={key}
                      onDoubleClick={() => handleDoubleClick(c)}
                      style={style.category}
                    >
                      {c}
                    </span>
                  ))}
              </div>
            </div>
            <div
              style={{
                ...style.row,
                display: "grid",
                gridTemplateColumns: "auto",
              }}
            >
              {(product && product.name != name.trim()) ||
              product.description != description.trim() ||
              product.unityPrice != priceFormatter(price) ||
              product.status != status ||
              JSON.stringify(product.categoryNames) !==
                JSON.stringify(selectedCategories) ? (
                <button
                  style={{ ...style.saveButton, cursor: "pointer" }}
                  onClick={handleEditProduct}
                >
                  Salvar
                </button>
              ) : (
                <>
                  <button style={{ ...style.saveButton, opacity: "0.6" }}>
                    Salvar
                  </button>
                  <span style={style.underSavebuttonText}>
                    Nenhuma alteração feita.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showCategoriesModal && (
        <>
          <CategoriesModal
            handleClick={handleChangeCategoryArray}
            selectedCategories={selectedCategories}
            onClose={() => setShowCategoriesModal(false)}
          />
        </>
      )}
    </>
  );
}
