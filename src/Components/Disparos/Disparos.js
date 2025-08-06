import React, { useState, useEffect, useContext, useCallback } from "react";
import func from "../../Services/fotmatters";
import style from "./DisparosStyle";
import { useNavigate } from "react-router-dom";
import { obterInformacoesDisparos, searchShots } from "../../Services/dbservice";
import { AuthContext } from "../../Context/AuthContext";
import DisparoPage from "./DisparoPage/DisparoPage";
import { LoadingContext } from "../../Context/LoadingContext";
import { FiSend, FiUsers, FiBarChart2, FiCalendar, FiPlus, FiSearch } from "react-icons/fi";
import Pagination from "../Chats/ChatRows/Pagination";

const ITEMS_PER_PAGE = 5;

export default function Disparos() {
  const [novoDisparoModal, setNovoDisparoModal] = useState(false);
  const navigate = useNavigate();
  const [informacoesDisparos, setInformacoesDisparos] = useState(null);
  const [paginatedShots, setPaginatedShots] = useState({ items: [], totalCount: 0, pageNumber: 1 });
  const { credentials } = useContext(AuthContext);
  const [selectedShot, setSelectedShot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [order, setOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleGoToNewShot = () => navigate("/novo-disparo");

  const fetchShots = useCallback(async (page = 1) => {
    startLoading();
    try {
      setIsLoading(true);
      const response = await searchShots(
        searchTerm, page, ITEMS_PER_PAGE, credentials?.accessToken, order,
        startDate, endDate, statusFilter ? parseInt(statusFilter) : null
      );
      setPaginatedShots(response);
    } catch (error) {
      console.error("Erro ao buscar disparos:", error);
    } finally {
      setIsLoading(false);
      stopLoading();
    }
  }, [searchTerm, order, startDate, endDate, statusFilter, credentials, startLoading, stopLoading]);

  const handleGetInformacoesDisparos = async () => {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const anoAtual = dataAtual.getFullYear();
    try {
      const res = await obterInformacoesDisparos(credentials.accessToken, mesAtual, anoAtual);
      setInformacoesDisparos(res);
    } catch (error) {
      console.error("Erro ao buscar informações de disparos:", error);
    }
  };

  useEffect(() => {
    if (credentials?.accessToken) {
      fetchShots(1);
      handleGetInformacoesDisparos();
    }
  }, [credentials?.accessToken]);
  
  const handleSearch = () => fetchShots(1);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(paginatedShots.totalCount / ITEMS_PER_PAGE)) {
      fetchShots(newPage);
    }
  };

  const StatCard = ({ icon, title, value, detail }) => (
    <div style={style.statCard}>
        <div style={style.statIconWrapper}>{icon}</div>
        <div style={style.statTextWrapper}>
            <span style={style.statTitle}>{title}</span>
            <span style={style.statValue}>{value ?? '...'}</span>
            {detail && <span style={style.statDetail}>{detail}</span>}
        </div>
    </div>
  );

  return (
    <>
      <div style={style.container}>
        <div style={style.header}>
            <h1 style={style.title}>Campanhas de Disparo</h1>
            <button onClick={handleGoToNewShot} style={style.newShotButton}>
                <FiPlus style={{ marginRight: '8px' }}/>
                Nova Campanha
            </button>
        </div>
        
        <div style={style.statsGrid}>
            <StatCard icon={<FiSend size={22}/>} title="Disparos Disponíveis" value={informacoesDisparos?.avaliableShots} detail="Neste ciclo"/>
            <StatCard icon={<FiUsers size={22}/>} title="Clientes Alcançados" value={informacoesDisparos?.uniqueClientsAllTime} detail="Total"/>
            <StatCard icon={<FiBarChart2 size={22}/>} title="Disparos Efetuados" value={informacoesDisparos?.totalShotsAllTime} detail="Total"/>
            <StatCard icon={<FiCalendar size={22}/>} title="Disparos Este Mês" value={informacoesDisparos?.totalShots}/>
        </div>

        <div style={style.panel}>
            <div style={style.searchWrapper}>
                <FiSearch style={style.searchIcon}/>
                <input style={style.searchInput} placeholder="Pesquisar por nome..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSearch()} />
            </div>
            <input style={style.dateInput} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input style={style.dateInput} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <select style={style.selectInput} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Status (Todos)</option>
                <option value="1">Pendente</option>
                <option value="2">Ativo</option>
                <option value="3">Inativo</option>
            </select>
            <select style={style.selectInput} value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="desc">Mais recentes</option>
                <option value="asc">Mais antigos</option>
            </select>
            <button style={style.searchButton} onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "..." : "Filtrar"}
            </button>
        </div>
        
        <div style={style.tableContainer}>
            <div style={style.tableHeader}>
              <span style={style.tableHeaderCell}>Campanha</span>
              <span style={style.tableHeaderCell}>Modelo</span>
              <span style={style.tableHeaderCell}>Data de Criação</span>
              <span style={style.tableHeaderCell}>Status</span>
            </div>
            
            <div style={style.tableBody}>
                {isLoading ? (
                  <div style={style.messageCenter}>Carregando campanhas...</div>
                ) : paginatedShots.items.length > 0 ? (
                  paginatedShots.items.map((item) => (
                    <div onClick={() => setSelectedShot(item)} key={item.shot.id} style={style.tableRow} className="table-row-hover">
                      <span style={{...style.tableCell, ...style.cellCampaign}}>{item.shot.name}</span>
                      <span style={{...style.tableCell, color: '#aeb9c4'}}>{item.shot.modelName || 'N/A'}</span>
                      <span style={style.tableCell}>{func.formatarDataCompleta(item.shot.dateCreated)}</span>
                      <span style={style.tableCell}>
                          <span style={{...style.statusBadge, ...(item.shot.status === 2 ? style.statusActive : item.shot.status === 1 ? style.statusPending : style.statusInactive)}}>
                              {item.shot.status === 2 ? "Ativo" : item.shot.status === 1 ? "Pendente" : "Inativo"}
                          </span>
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={style.messageCenter}>Nenhuma campanha encontrada.</div>
                )}
            </div>
        </div>
        
        {paginatedShots.totalCount > ITEMS_PER_PAGE &&
            <Pagination
                currentPage={paginatedShots.pageNumber}
                totalPages={Math.ceil(paginatedShots.totalCount / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
                style={style}
            />
        }
      </div>

      {selectedShot != null && (
        <DisparoPage
          shot={selectedShot}
          onClose={() => {
            setSelectedShot(null);
            fetchShots(paginatedShots.pageNumber);
            handleGetInformacoesDisparos();
          }}
        />
      )}
    </>
  );
}