import { FiMessageSquare, FiPackage, FiShoppingCart, FiUsers, FiTag, FiGrid, FiSend, FiSettings } from "react-icons/fi";

export const menuItems = [
    { name: "CHATS", icon: <FiMessageSquare size={22} />, route: "/" },
    { name: "PRODUTOS", icon: <FiPackage size={22} />, route: "/produtos" },
    { name: "VENDAS", icon: <FiShoppingCart size={22} />, route: "/vendas" },
    { name: "CLIENTES", icon: <FiUsers size={22} />, route: "/clientes" },
    { name: "TAGS", icon: <FiTag size={22} />, route: "/tags" },
    { name: "CATEGORIAS", icon: <FiGrid size={22} />, route: "/categorias" },
    { name: "DISPAROS", icon: <FiSend size={22} />, route: "/disparos" },
    { name: "CONFIGURAÇÕES", icon: <FiSettings size={22} />, route: "/usuarios" },
];