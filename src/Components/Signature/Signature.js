import React from "react";
import style from "./SignatureStyle";
import "./effect.css";

const signaruteModels = [
  {
    name: "Plano Básico",
    lastPrice: 1699.99,
    actualPrice: 699.99,
    implementationPrice: 3500,
    clientsSignUp: true,
    receiveMessage: "Ilimitado",
    replyMessage: "Ilimitado",
    whatsappNumbers: 1,
    AccessQtt: 5,
    sendMarketing: 50,
    crmIntegration: false,
    sealingPart: true,
    pdf: false,
    grapths: false,
    machineLearning: false,
    sendAudio: true,
    audioPersonalization: false,
  },
  {
    name: "Plano Profissional",
    lastPrice: 1899.99,
    actualPrice: 899.99,
    implementationPrice: 4000,
    clientsSignUp: true,
    receiveMessage: "Ilimitado",
    replyMessage: "Ilimitado",
    whatsappNumbers: 2,
    AccessQtt: 15,
    sendMarketing: 500,
    crmIntegration: false,
    sealingPart: true,
    pdf: true,
    grapths: true,
    machineLearning: false,
    sendAudio: true,
    audioPersonalization: false,
  },
  {
    name: "Plano Enterprise",
    lastPrice: 3699.99,
    actualPrice: 1699.99,
    implementationPrice: 4500,
    clientsSignUp: true,
    receiveMessage: "Ilimitado",
    replyMessage: "Ilimitado",
    whatsappNumbers: 10,
    AccessQtt: 30,
    sendMarketing: 2500,
    crmIntegration: true,
    sealingPart: true,
    pdf: true,
    grapths: true,
    machineLearning: true,
    sendAudio: true,
    audioPersonalization: true,
  }
];

export default function Signature() {
  return (
    <div style={style.container}>
      <span style={style.title}>Planos de assinatura</span>
      <div style={style.signatureBoxes}>
        {signaruteModels.map((plan, index) => (
          <SignatureItem 
            key={index} 
            plan={plan} 
            isHighlighted={index === 1} // Highlight middle plan
          />
        ))}
      </div>
    </div>
  );
}

const SignatureItem = ({ plan, isHighlighted }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div
      className="signature-box"
      style={{
        ...style.signatureBox,
        transform: isHighlighted ? "scale(1.1)" : "scale(1)",
        zIndex: isHighlighted ? 3 : 1,
      }}
    >
      <div style={style.imageBox}>
        <img style={style.image} src="./images/agente-logo.png" alt={plan.name} />
      </div>
      <span style={style.boxTitle}>{plan.name}</span>

      <div style={style.pricesContainer}>
        <span style={style.lastPrice}>{formatCurrency(plan.lastPrice)}</span>
        <span style={style.actualPrice}>
          {formatCurrency(plan.actualPrice)} - {Math.round((1 - plan.actualPrice/plan.lastPrice) * 100)}% Off
        </span>
      </div>

      <div style={style.signatureItemHeader}>
        <span style={style.signatureItemHeaderTitle}></span>
        <span style={style.signatureItemHeaderTitle}>Itens disponiveis</span>
        <span style={style.signatureItemHeaderTitle}></span>
      </div>
      
      <div style={style.signatureItem}>
        <div style={style.items}>
          <span style={style.item}>- Cadastro de Clientes</span>
          <span style={style.item}>- Receber Mensagens</span>
          <span style={style.item}>- Responder Mensagens</span>
          <span style={style.item}>- Números de Whatsapp</span>
          <span style={style.item}>- Número de Acessos</span>
          <span style={style.item}>- Disparos</span>
          <span style={style.item}>- Integração com CRM</span>
          <span style={style.item}>- Área de Vendas</span>
          <span style={style.item}>- Relatórios</span>
          <span style={style.item}>- Gráficos e Estatísticas</span>
          <span style={style.item}>- Machine Learning</span>
          <span style={style.item}>- Envio de Áudio</span>
          <span style={style.item}>- Voz Personalizável</span>
        </div>
        
        <div style={style.items}>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.clientsSignUp ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>{plan.receiveMessage}</span>
          <span style={style.item2}>{plan.replyMessage}</span>
          <span style={style.item2}>{plan.whatsappNumbers}</span>
          <span style={style.item2}>{plan.AccessQtt}</span>
          <span style={style.item2}>{plan.sendMarketing}</span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.crmIntegration ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.sealingPart ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.pdf ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.grapths ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.machineLearning ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.sendAudio ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
          <span style={style.item2}>
            <div style={{
              ...style.circle,
              background: plan.audioPersonalization ? "rgba(210, 210, 210, 1)" : "rgba(210, 210, 210, 0)"
            }}></div>
          </span>
        </div>
      </div>
    </div>
  );
};