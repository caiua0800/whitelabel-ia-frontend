import React, { useState, useEffect, useContext } from "react";
import style from "./SalePageStyle";
import { AuthContext } from "../../../Context/AuthContext";
import { criarProduto, editarProduto } from "../../../Services/dbservice";
import func from "../../../Services/fotmatters";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import StatusModal from "./StatusModal/StatusModal";

const primaryColor = "#4f46e5";
const hoverColor = "#f3f4f6";
const borderColor = "#e5e7eb";
const textColor = "#374151";
const accentColor = "#10b981";

export default function ProductPage({ onClose, sale, reload }) {
  const [statusModal, setStatusModal] = useState(false);

  return (
    <>
      <div style={style.containerGeneral}>
        <div style={style.modal}>
          <span onClick={onClose} style={style.closeBtn}>
            x
          </span>
          <span style={style.title}>Página da Venda</span>

          <div style={style.modalContent}>
            <div style={style.modalContentRow1}>
              <div style={style.box}>
                <span style={style.boxTitle}>Id</span>
                <input style={style.boxInput} value={sale.sale.id} />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Data da Venda</span>
                <input
                  style={style.boxInput}
                  value={func.formatarDataCompleta(sale.sale.dateCreated)}
                />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Quantidade de produtos</span>
                <input
                  style={style.boxInput}
                  value={sale && sale.products && sale.products.length}
                />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Status Venda</span>
                <div
                  style={{
                    ...style.inputBoxContainer,
                    gridTemplateColumns: "50% 50%",
                  }}
                >
                  <input style={style.boxInput} value={sale.sale.status} />
                  <button
                  onClick={() => setStatusModal(true)}
                    style={{
                      ...style.inputBoxContainerButton,
                      background: "rgba(0, 200, 220, 1)",
                      color: "rgba(80, 80, 80, 1)",
                    }}
                  >
                    Status
                  </button>
                </div>
              </div>
            </div>
            <div style={style.modalContentRow2}>
              <div style={style.box}>
                <span style={style.boxTitle}>Desconto</span>
                <input
                  style={style.boxInput}
                  value={sale.sale.discount * 100 + "%"}
                />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Descrição</span>
                <input style={style.boxInput} value={sale.sale.description} />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Valor Total</span>
                <input
                  style={style.boxInput}
                  value={func.formatarMoeda(sale.sale.totalAmount)}
                />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Valor Recebível</span>
                <input
                  style={style.boxInput}
                  value={func.formatarMoeda(sale.sale.totalAmountReceivable)}
                />
              </div>
              <div style={style.box}>
                <span style={style.boxTitle}>Status Pagamento</span>
                <div
                  style={{
                    ...style.inputBoxContainer,
                    gridTemplateColumns: "50% 50%",
                  }}
                >
                  <input style={style.boxInput} value={sale.payment.status} />
                  <button
                    style={{
                      ...style.inputBoxContainerButton,
                      background: "rgba(100, 220, 0, 1)",
                      color: "rgba(80, 80, 80, 1)",
                      textDecoration: "line-through",
                      opacity: 0.7
                    }}
                  >
                    Reenviar Pix
                  </button>
                </div>
              </div>
            </div>

            <div style={style.soldProducts}>
              <span style={style.soldProductsTitle}>Produtos vendidos</span>
              <div style={modernTableStyles.tableContainer}>
                <table style={modernTableStyles.table}>
                  <thead style={modernTableStyles.tableHead}>
                    <tr>
                      <th style={modernTableStyles.tableHeaderCell}>Id</th>
                      <th style={modernTableStyles.tableHeaderCell}>
                        Valor Unitário
                      </th>
                      <th style={modernTableStyles.tableHeaderCell}>
                        Quantidade
                      </th>
                      <th style={modernTableStyles.tableHeaderCell}>
                        Valor Total
                      </th>
                      <th style={modernTableStyles.tableHeaderCell}>
                        Desconto
                      </th>
                      <th style={modernTableStyles.tableHeaderCell}>
                        Valor recebível
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sale && sale.products && sale.products.length > 0 ? (
                      sale.products.map((sale) => (
                        <tr
                          key={sale.id}
                          style={modernTableStyles.tableRow}
                          // onClick={() => setSelectedSale(sale)}
                        >
                          <td style={modernTableStyles.tableCell}>
                            {sale.productId || "Não informado"}
                          </td>
                          <td style={modernTableStyles.tableCell}>
                            {func.formatarMoeda(sale.productUnityPrice) ||
                              "Não informado"}
                          </td>
                          <td style={modernTableStyles.tableCell}>
                            {sale.productQtt || "Não informado"}
                          </td>
                          <td
                            style={{
                              ...modernTableStyles.tableCell,
                            }}
                          >
                            {func.formatarMoeda(sale.totalAmount) ||
                              "Não informado"}
                          </td>
                          <td
                            style={{
                              ...modernTableStyles.tableCell,
                            }}
                          >
                            {sale.discount * 100 + "%" || "Não informado"}
                          </td>
                          <td
                            style={{
                              ...modernTableStyles.tableCell,
                            }}
                          >
                            {func.formatarMoeda(
                              sale.productUnityPrice * sale.productQtt -
                                sale.productUnityPrice *
                                  sale.productQtt *
                                  sale.discount
                            ) || "Não informado"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          style={modernTableStyles.noResults}
                        ></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={style.bottomModal}>
            <button style={style.bottomModalButton}>Gerar Comprovante</button>
          </div>
        </div>
      </div>

      {statusModal && (
        <>
          <StatusModal sale={sale.sale} onClose={() => {setStatusModal(false); onClose(); reload()}} />
        </>
      )}
    </>
  );
}

const modernTableStyles = {
  tableContainer: {
    width: "100%",
    maxHeight: 400,
    overflowY: "auto",
  },
  tableWrapper: {
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginTop: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    tableLayout: "fixed", // Adicionado para garantir alinhamento consistente
  },
  tableHead: {
    backgroundColor: "#f9fafb",
  },
  tableHeaderCell: {
    padding: "12px 16px",
    textAlign: "center", // Centralizado
    fontSize: "12px",
    fontWeight: "600",
    color: textColor,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: `1px solid ${borderColor}`,
  },
  tableRow: {
    borderBottom: `1px solid ${borderColor}`,
    transition: "background-color 0.2s ease",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: hoverColor,
    },
    "&:last-child": {
      borderBottom: "none",
    },
  },
  tableCell: {
    padding: "16px",
    fontSize: "14px",
    color: textColor,
    textAlign: "center", // Centralizado
    verticalAlign: "middle", // Alinhamento vertical
  },
  noResults: {
    padding: "24px",
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
  },
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginTop: "24px",
  },
  paginationButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  pageInfo: {
    fontSize: "14px",
    color: textColor,
    fontWeight: "500",
  },
};
