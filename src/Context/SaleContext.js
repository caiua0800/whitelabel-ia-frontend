import React, { createContext, useState } from "react";
import {
  obterCategorias,
  obterVendas,
  searchProducts,
  searchVendas,
} from "../Services/dbservice";
import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import axios from "axios";

export const SaleContext = createContext();

const SaleProvider = ({ children }) => {
  const [sales, setSales] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getSales = async (
    searchTerm,
    pageNumber,
    pageSize,
    token,
    order = "desc",
    startDate = null,
    endDate = null,
    status = null
  ) => {
    try {
      const response = await searchVendas(
        searchTerm,
        pageNumber,
        pageSize,
        token,
        order, // Removi a atribuição redundante
        startDate,
        endDate,
        status
      );
  
      let salesData = [];
      let pages = 1;

      
      if (response && response.items) {
        salesData = response.items;
        pages = response.totalPages || Math.ceil(response.totalCount / pageSize);
      } else if (Array.isArray(response)) {
        salesData = response;
      }
  
      setSales(salesData);
      return {
        items: salesData,
        totalCount: response.totalCount || salesData.length,
        totalPages: pages
      };
    } catch (error) {
      console.error("Erro ao obter vendas:", error);
      return {
        items: [],
        totalCount: 0,
        totalPages: 0
      };
    }
  };
  return (
    <SaleContext.Provider
      value={{
        sales,
        getSales
      }}
    >
      {children}
    </SaleContext.Provider>
  );
};

export default SaleProvider;
