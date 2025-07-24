import React, { useState, useEffect } from "react";
import "./lista.css";

// Dados estáticos das vendas
const vendasEstaticas = [
  { id: "001", vendedor: "Gerson", nomeCliente: "Caiua Alfa", cpfCliente: "111.111.111-11", valorTotal: "R$ 150,00", data: "20/05/2025" },
  { id: "002", vendedor: "Maria", nomeCliente: "Beta Teste", cpfCliente: "222.222.222-22", valorTotal: "R$ 230,50", data: "21/05/2025" },
  { id: "003", vendedor: "João", nomeCliente: "Gama Exemplo", cpfCliente: "333.333.333-33", valorTotal: "R$ 99,90", data: "22/05/2025" },
  { id: "004", vendedor: "Ana", nomeCliente: "Delta User", cpfCliente: "444.444.444-44", valorTotal: "R$ 500,00", data: "23/05/2025" },
  { id: "005", vendedor: "Pedro", nomeCliente: "Epsilon Cliente", cpfCliente: "555.555.555-55", valorTotal: "R$ 75,25", data: "24/05/2025" },
  { id: "006", vendedor: "Sofia", nomeCliente: "Zeta Comprador", cpfCliente: "666.666.666-66", valorTotal: "R$ 120,00", data: "25/05/2025" },
  { id: "007", vendedor: "Lucas", nomeCliente: "Eta Final", cpfCliente: "777.777.777-77", valorTotal: "R$ 310,80", data: "26/05/2025" },
];

const columnNames = ["Id", "Vendedor", "Nome Cliente", "CPF Cliente", "Valor Total", "Data"];

export default function VendasList() {
  const [vendas, setVendas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // Para o input de busca
  const itemsPerPage = 4;

  // Simula o carregamento dos dados ou filtro
  useEffect(() => {
    const filteredVendas = vendasEstaticas.filter(venda =>
      Object.values(venda).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setVendas(filteredVendas);
    setCurrentPage(1); // Resetar para a primeira página ao buscar
  }, [searchTerm]);


  // Calcular vendas da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendas = vendas.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular número total de páginas
  const totalPages = Math.ceil(vendas.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <>
      <div className="container-new">
        <div className="title-box-new">
          <span className="putariazinha">Vendas</span>
        </div>

        <div className="table-container-new">
          <div className="table-header-cells">
            {columnNames && columnNames.map((it, key) => (
              <>
                <div key={key} className="cell">
                  <span>{it}</span>
                </div>
              </>
            ))}
          </div>

          <div className="table-body-new">
            {currentVendas && currentVendas.map((venda, key) => (
              <>
                <div className="row">
                  <div key={key} className="cell">
                    <span>{venda.id}</span>
                  </div>
                  <div className="cell">
                    <span>{venda.vendedor}</span>
                  </div>
                  <div className="cell">
                    <span>{venda.nomeCliente}</span>
                  </div>
                  <div className="cell">
                    <span>{venda.cpfCliente}</span>
                  </div>
                  <div className="cell">
                    <span>{venda.valorTotal}</span>
                  </div>
                  <div className="cell">
                    <span>{venda.data}</span>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="list-footer">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
              Próxima
            </button>
          </div>
        </div>
      </div>
    </>
  );
}



// <div className="container-vendas-list">
//       <div className="container-titulo-list">
//         <h3 className="titulo-list-h3">Vendas</h3>
//       </div>
//       <div className="container-list">
//         <div className="list-vendas">
//           <div className="list-header">
//             <div className="container-input-b">
//               <div className="container-input">
//                 <div className="input-and-button-box">
//                   <input
//                     className="input-list-vendas"
//                     type="text"
//                     placeholder="Buscar venda..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//                 <div className="input-and-button-box">
//                   <button className="button-buscar-vendas">Buscar</button>
//                 </div>
//               </div>
//             </div>

//             <div className="container-titulo-cel">
//               <h3 className="list-header-h3">Id</h3>
//               <h3 className="list-header-h3">Vendedor</h3>
//               <h3 className="list-header-h3">Nome Cliente</h3>
//               <h3 className="list-header-h3">CPF Cliente</h3>
//               <h3 className="list-header-h3">Valor Total</h3>
//               <h3 className="list-header-h3">Data</h3>
//             </div>
//           </div>
//           <div className="list-body">
//             {currentVendas.map((venda) => (
//               <div className="cel-list" key={venda.id}>
//                 <h3 className="list-header-h3">{venda.id}</h3>
//                 <h3 className="list-header-h3">{venda.vendedor}</h3>
//                 <h3 className="list-header-h3">{venda.nomeCliente}</h3>
//                 <h3 className="list-header-h3">{venda.cpfCliente}</h3>
//                 <h3 className="list-header-h3">{venda.valorTotal}</h3>
//                 <h3 className="list-header-h3">{venda.data}</h3>
//               </div>
//             ))}
//           </div>
//           <div className="list-footer">
//             <button onClick={handlePrevPage} disabled={currentPage === 1}>
//               Anterior
//             </button>
//             {Array.from({ length: totalPages }, (_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => handlePageChange(index + 1)}
//                 className={currentPage === index + 1 ? "active" : ""}
//                 disabled={currentPage === index + 1}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
//               Próxima
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>