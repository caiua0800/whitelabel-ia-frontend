import React, { createContext, useState } from "react";
import { obterCategorias, searchProducts } from "../Services/dbservice";

import { AuthContext } from "./AuthContext";
import { LoadingContext } from "./LoadingContext";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProducts = async (
    searchTerm,
    pageNumber,
    pageSize,
    token,
    order = "desc",
    startDate = null,
    endDate = null,
    categoryIds = null,
    status
  ) => {
    try {
      const response = await searchProducts(
        searchTerm,
        pageNumber,
        pageSize,
        token,
        order,
        startDate,
        endDate,
        categoryIds,
        status
      );

      var productsData = [];
      if (Array.isArray(response)) {
        productsData = response;
      } else if (response && Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response && response.items) {
        productsData = response.items;
      }

      setProducts(productsData);
      return productsData;
    } catch (error) {
      console.log("Erro ao obter produtos");
      console.log(error);
    }
  };

  const getCategories = async (token) => {
    try {
      const response = await obterCategorias(token);

      var categoriesData = [];
      if (Array.isArray(response)) {
        categoriesData = response;
      } else if (response && Array.isArray(response.data)) {
        categoriesData = response.data;
      } else if (response && response.items) {
        categoriesData = response.items;
      }

      setCategories(categoriesData);
    } catch (error) {}
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        categories,
        getCategories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
