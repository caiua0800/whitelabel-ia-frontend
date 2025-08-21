import React, { useState } from "react";
import style from "./SalePageStyle";
import func from "../../../Services/fotmatters";
import StatusModal from "./StatusModal/StatusModal";
import { 
    FiX, FiHash, FiCalendar, FiPackage, FiTag, FiUser,
    FiFileText, FiTrendingUp, FiCheckCircle, FiDownloadCloud 
} from "react-icons/fi";

const InfoCard = ({ icon, title, value, highlight = false }) => (
    <div style={style.infoCard}>
        <div style={style.infoCardIcon}>{icon}</div>
        <div>
            <span style={style.infoCardTitle}>{title}</span>
            <p style={highlight ? { ...style.infoCardValue, ...style.highlightValue } : style.infoCardValue}>
                {value}
            </p>
        </div>
    </div>
);

export default function SalePage({ onClose, sale, reload }) {
  const [statusModal, setStatusModal] = useState(false);

  const modernTableStyles = {
    tableContainer: {
      width: "100%",
      maxHeight: "30vh",
      overflowY: "auto",
      borderRadius: "12px",
      border: `1px solid ${style.colors.border}`,
      background: style.colors.surface,
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: 'fixed',
    },
    tableHead: {
      backgroundColor: style.colors.background,
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    tableHeaderCell: {
      padding: "16px 20px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: "600",
      color: style.colors.subtleText,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      borderBottom: `1px solid ${style.colors.border}`,
    },
    tableRow: {
      borderBottom: `1px solid ${style.colors.border}`,
      transition: 'background-color 0.2s ease-in-out',
    },
    tableCell: {
      padding: "18px 20px",
      fontSize: "15px",
      color: style.colors.text,
      textAlign: "left",
      verticalAlign: "middle",
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  };


  return (
    <>
      <div style={style.containerGeneral}>
        <div style={style.modal}>
          <div style={style.modalHeader}>
            <h2 style={style.title}>Detalhes da Venda</h2>
            <button onClick={onClose} style={style.closeBtn} className="sale-page-btn-hover">
              <FiX size={22}/>
            </button>
          </div>

          <div style={style.modalContent}>
            <div style={style.detailsGrid}>
              <InfoCard icon={<FiHash size={20}/>} title="ID da Venda" value={sale.sale.id || "N/A"} />
              <InfoCard icon={<FiUser size={20}/>} title="Chat do Cliente" value={func.formatNumber(sale.sale.clientId) || "N/A"} />
              <InfoCard icon={<FiCalendar size={20}/>} title="Data da Venda" value={func.formatarDataCompleta(sale.sale.dateCreated)} />
              <InfoCard icon={<FiPackage size={20}/>} title="Qtd. Produtos" value={sale.products.length} />
              <InfoCard icon={<FiTag size={20}/>} title="Desconto Aplicado" value={`${sale.sale.discount * 100}%`} />
              <InfoCard icon={<FiTrendingUp size={20}/>} title="Valor Total" value={func.formatarMoeda(sale.sale.totalAmount)} highlight />
              <InfoCard icon={<FiCheckCircle size={20}/>} title="Valor a Receber" value={func.formatarMoeda(sale.sale.totalAmountReceivable)} highlight />
            </div>
            
            <div style={style.descriptionBox}>
                <span style={style.infoCardTitle}><FiFileText size={16} style={{marginRight: '8px', verticalAlign: 'middle'}}/> Descrição</span>
                <p style={style.descriptionText}>{sale.sale.description || "Nenhuma descrição fornecida para esta venda."}</p>
            </div>

            <div style={style.soldProducts}>
              <h3 style={style.soldProductsTitle}>Produtos Vendidos</h3>
              <div style={modernTableStyles.tableContainer}>
                <table style={modernTableStyles.table}>
                  <thead style={modernTableStyles.tableHead}>
                    <tr>
                      <th style={{...modernTableStyles.tableHeaderCell, width: '120px'}}>ID</th>
                      <th style={modernTableStyles.tableHeaderCell}>Valor Unit.</th>
                      <th style={modernTableStyles.tableHeaderCell}>Qtd.</th>
                      <th style={modernTableStyles.tableHeaderCell}>Valor Total</th>
                      <th style={modernTableStyles.tableHeaderCell}>Desconto</th>
                      <th style={modernTableStyles.tableHeaderCell}>Valor Final</th>
                    </tr>
                  </thead>
                  <tbody className="sale-table-body">
                    {sale.products.map((product) => (
                      <tr key={product.id} style={modernTableStyles.tableRow} className="sale-table-row-hover">
                        <td style={modernTableStyles.tableCell}>{product.productId || "-"}</td>
                        <td style={modernTableStyles.tableCell}>{func.formatarMoeda(product.productUnityPrice) || "-"}</td>
                        <td style={modernTableStyles.tableCell}>{product.productQtt || "-"}</td>
                        <td style={modernTableStyles.tableCell}>{func.formatarMoeda(product.totalAmount) || "-"}</td>
                        <td style={modernTableStyles.tableCell}>{product.discount * 100 + "%" || "-"}</td>
                        <td style={modernTableStyles.tableCell}>{func.formatarMoeda(product.productUnityPrice * product.productQtt * (1 - product.discount)) || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div style={style.bottomModal}>
            <button style={style.statusButton} onClick={() => setStatusModal(true)} className="sale-page-btn-hover">
                Alterar Status
            </button>
            <button style={style.bottomModalButton} className="sale-page-btn-hover primary">
              <FiDownloadCloud size={18} />
              Gerar Comprovante
            </button>
          </div>
        </div>
      </div>
      {statusModal && <StatusModal sale={sale.sale} onClose={() => {setStatusModal(false); onClose(); reload()}} />}
    </>
  );
} 