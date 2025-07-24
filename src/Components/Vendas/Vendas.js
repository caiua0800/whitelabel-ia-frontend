import React from "react";
import "./vendas.css";
import Header from "./Header/Header";
import Vendedores from "./Vendedores/Vendedores";
import Grafico from "./Grafico/Grafico";
import VendasList from "./Lista/Lista";

export default function Vendas() {
    return(
        <div className="container-vendas">
            <Header />
            <Vendedores />
            <Grafico />
            <VendasList />
        </div>
    )
}