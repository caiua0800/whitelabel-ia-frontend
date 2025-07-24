import React from "react";
import "./header.css"; // Importe o CSS específico

export default function Header() {
  return (
    <div className="container-header">
      <div className="box-coins">
        <div className="coins">
          <div className="coins-container-img">
            <img 
              className="coins-img" 
              src="./icons/coin-svgrepo-com.svg" 
              alt="Total de vendas"
            />
          </div>
          <div className="coins-container-text">
            <h3 className="coins-text">R$578.028</h3>
          </div>
        </div>
      </div>
      
      <div className="box-filtro">
        <div className="filtro">
          <div className="filtro-container-text">
            <h3 className="filtro-text">Últimos 30 Dias</h3>
          </div>
          <div className="filtro-container-img">
            <img 
              className="filtro-img" 
              src="./icons/filter-icon.svg" 
              alt="Filtro"
            />
          </div>
        </div>
      </div>
    </div>
  );
}