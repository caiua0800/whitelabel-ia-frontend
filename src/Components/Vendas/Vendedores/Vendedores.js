import React from "react";
import "./vendedores.css";

export default function Vendedores() {
  const vendedores = [
    { nome: "Roberto Lopez", vendas: 374 },
    { nome: "Roberto Lopez", vendas: 374 },
    { nome: "Roberto Lopez", vendas: 374 }
  ];

  return (
    <div className="container-vendedores">
      <div className="titulo-container-vendedores">
        <h3 className="titulo-vendedores">Melhores vendedores</h3>
      </div>
      
      <div className="container-cards">
        {vendedores.map((vendedor, index) => (
          <div className="card" key={index}>
            <div className="card-container-img">
              <img 
                className="card-img" 
                src="./images/usuario.webp" 
                alt="Vendedor"
              />
            </div>
            <div className="card-container-name">
              <h3 className="card-name">{vendedor.nome}</h3>
            </div>
            <div className="card-container-vendas">
              <h3 className="card-vendas">{vendedor.vendas}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}