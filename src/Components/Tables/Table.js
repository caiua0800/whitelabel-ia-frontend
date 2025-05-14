import React, { useState } from "react";
import style from "./TableStyle";

export default function Table({ columns, data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(data?.length / itemsPerPage) || 1;

    // Filtra os dados para a página atual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];

    const handlePageChange = (pageNumber) => {
        const page = Math.max(1, Math.min(pageNumber, totalPages));
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            handlePageChange(value);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisibleButtons = 5;
        let startPage, endPage;

        if (totalPages <= maxVisibleButtons) {
            startPage = 1;
            endPage = totalPages;
        } else {
            const maxButtonsBeforeCurrent = Math.floor(maxVisibleButtons / 2);
            const maxButtonsAfterCurrent = Math.ceil(maxVisibleButtons / 2) - 1;
            
            if (currentPage <= maxButtonsBeforeCurrent) {
                startPage = 1;
                endPage = maxVisibleButtons;
            } else if (currentPage + maxButtonsAfterCurrent >= totalPages) {
                startPage = totalPages - maxVisibleButtons + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - maxButtonsBeforeCurrent;
                endPage = currentPage + maxButtonsAfterCurrent;
            }
        }

        // Botão inicial
        if (startPage > 1) {
            buttons.push(
                <button
                    key="first"
                    style={style.paginationButton}
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
            );
        }

        // Botões numéricos
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    style={{
                        ...style.paginationButton,
                        ...(currentPage === i ? style.activePaginationButton : {})
                    }}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // Botão final
        if (endPage < totalPages) {
            buttons.push(
                <button
                    key="last"
                    style={style.paginationButton}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            );
        }

        return buttons;
    };

    return (
        <div style={style.tableContainer}>
            <div style={style.container}>
                {/* Cabeçalho da tabela */}
                <div style={{
                    ...style.tableHeader,
                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`
                }}>
                    {columns?.map((column, index) => (
                        <div key={`header-${index}`} style={style.tableHeaderCell}>
                            {column.name}
                        </div>
                    ))}
                </div>

                {/* Corpo da tabela */}
                <div style={style.tableBody}>
                    {currentItems.length > 0 ? (
                        currentItems.map((item, rowIndex) => (
                            <div
                                key={`row-${rowIndex}`}
                                style={{
                                    ...style.tableRow,
                                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                                    backgroundColor: rowIndex % 2 === 0 ? '#f5f5f5' : '#e9e9e9'
                                }}
                            >
                                {columns.map((column, colIndex) => (
                                    <div key={`cell-${rowIndex}-${colIndex}`} style={style.tableCell}>
                                        {item[column.value] || '-'}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <div style={style.noDataMessage}>
                            Nenhum dado disponível
                        </div>
                    )}
                </div>
            </div>

            {/* Paginação */}
            <div style={style.paginationContainer}>
                <div style={style.paginationControls}>
                    <button
                        style={style.paginationButton}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ‹ Anterior
                    </button>

                    <div style={style.paginationNumbers}>
                        {renderPaginationButtons()}
                    </div>

                    <div style={style.pageInputContainer}>
                        <span style={style.pageText}>Ir para:</span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage}
                            onChange={handleInputChange}
                            style={style.pageInput}
                        />
                        <span style={style.pageCount}>de {totalPages}</span>
                    </div>

                    <button
                        style={style.paginationButton}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                        Próxima ›
                    </button>
                </div>
            </div>
        </div>
    );
}