import React, { useState } from "react";
import Add from "../Add/Add";
import AgentChatBox from "../Agents/AgentChatBox";
import style from "./AgentFirstRowStyle";

const AgentChatFirstRow = ({ agents }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(agents?.length / itemsPerPage) || 1;

    const nextSlide = () => {
        if (currentIndex < totalPages - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Filtra os agentes visíveis no carrossel
    const visibleAgents = agents?.slice(
        currentIndex * itemsPerPage,
        (currentIndex + 1) * itemsPerPage
    ) || [];

    // Verifica se há mais itens para navegar
    const hasNext = currentIndex < totalPages - 1;
    const hasPrev = currentIndex > 0;

    return (
        <div style={style.firstRow}>
            <div style={style.agentsChatsContainer}>
                {/* Seta esquerda */}
                <div 
                    style={{ 
                        ...style.arrow, 
                        left: -45,
                        opacity: hasPrev ? 1 : 0.4,
                        cursor: hasPrev ? 'pointer' : 'not-allowed'
                    }}
                    onClick={hasPrev ? prevSlide : undefined}
                >
                    <img 
                        style={style.arrowIcon} 
                        src="./icons/left-arrow-icon.svg" 
                        alt="Anterior" 
                    /> 
                </div>

                {/* AgentChatBox visíveis */}
                {visibleAgents.map((agent, index) => (
                    <AgentChatBox 
                        agent={agent} 
                        key={`${agent.id}-${index}`} 
                    />
                ))}

                {/* Preenche com boxes vazios se necessário */}
                {visibleAgents.length < itemsPerPage && 
                    Array.from({ length: itemsPerPage - visibleAgents.length }).map((_, index) => (
                        <div key={`empty-${index}`} style={style.emptyBox}></div>
                    ))
                }

                {/* Seta direita */}
                <div 
                    style={{ 
                        ...style.arrow, 
                        right: -45,
                        opacity: hasNext ? 1 : 0.4,
                        cursor: hasNext ? 'pointer' : 'not-allowed'
                    }}
                    onClick={hasNext ? nextSlide : undefined}
                >
                    <img 
                        style={style.arrowIcon} 
                        src="./icons/right-arrow-icon.svg" 
                        alt="Próximo" 
                    /> 
                </div>
            </div>

            <div style={style.ourAdds}>
                <Add />
            </div>
        </div>
    );
};

export default AgentChatFirstRow;