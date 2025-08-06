import React from 'react';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange, style }) => {
  if (totalPages <= 1) return null; // Não renderizar se não houver paginação

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage <= 2) {
      end = Math.min(3, totalPages);
    } else if (currentPage >= totalPages - 1) {
      start = Math.max(totalPages - 2, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const PageButton = ({ page, children, disabled = false, active = false }) => (
    <button
      onClick={() => !disabled && onPageChange(page)}
      disabled={disabled}
      style={{
        ...style.paginationButton,
        ...(active ? style.activeButton : {}),
        ...(disabled ? style.disabledButton : {}),
        margin: '0 4px'
      }}
    >
      {children}
    </button>
  );

  const pageNumbers = getPageNumbers();

  return (
    <div style={style.paginationContainer}>
      <PageButton page={1} disabled={currentPage === 1}>
        <FiChevronsLeft />
      </PageButton>
      <PageButton page={currentPage - 1} disabled={currentPage === 1}>
        <FiChevronLeft />
      </PageButton>

      {!pageNumbers.includes(1) && (
        <>
          <PageButton page={1}>1</PageButton>
          {!pageNumbers.includes(2) && <span style={style.ellipsis}>...</span>}
        </>
      )}

      {pageNumbers.map(number => (
        <PageButton 
          key={number} 
          page={number}
          active={currentPage === number}
        >
          {number}
        </PageButton>
      ))}

      {!pageNumbers.includes(totalPages) && (
        <>
          {!pageNumbers.includes(totalPages - 1) && <span style={style.ellipsis}>...</span>}
          <PageButton page={totalPages}>{totalPages}</PageButton>
        </>
      )}

      <PageButton page={currentPage + 1} disabled={currentPage === totalPages}>
        <FiChevronRight />
      </PageButton>
      <PageButton page={totalPages} disabled={currentPage === totalPages}>
        <FiChevronsRight />
      </PageButton>
    </div>
  );
};

export default Pagination;