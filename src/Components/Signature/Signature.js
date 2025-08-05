import React, { useContext, useEffect, useState } from "react";
import style from "./SignatureStyle";
import "./effect.css";
import { AuthContext } from "../../Context/AuthContext";
import PayModal from "./PayModal/PayModal";
import func from "../../Services/fotmatters";

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
    name: "Plano Premium",
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
  },
];

export default function Signature() {
  const { subscriptionInfo } = useContext(AuthContext);
  const [activeSubscription, setActiveSubscription] = useState("");
  const [payModal, setPayModal] = useState(false);

  useEffect(() => {
    if (subscriptionInfo) {
      if (subscriptionInfo.name) {
        setActiveSubscription(subscriptionInfo.name);
        console.log(subscriptionInfo);
      }
    }
  }, [subscriptionInfo]);

  return (
    <>
      {payModal && (
        <PayModal
          info={subscriptionInfo}
          generateQrCode={payModal}
          onClose={() => setPayModal(false)}
        />
      )}
      <div style={style.container}>
        <span style={style.title}>Planos de assinatura</span>
        <div style={style.signatureInfoBoxContainer}>
          <div style={style.leftInfo}>
            <div style={style.leftInfoItemBox}>
              <span style={style.leftInfoItemBoxTitle}>Status:</span>
              <span
                style={{
                  ...style.leftInfoItemBoxValue,
                  color:
                    subscriptionInfo && subscriptionInfo.status === 1
                      ? "rgba(100, 150, 0, 1)"
                      : "rgba(180, 30, 0, 1)",
                }}
              >
                {subscriptionInfo && subscriptionInfo.status === 1
                  ? "Ativo"
                  : "Inativo"}
              </span>
            </div>
            <div style={style.leftInfoItemBox}>
              <span style={style.leftInfoItemBoxTitle}>Último Pagamento:</span>
              <span
                style={{
                  ...style.leftInfoItemBoxValue,
                  color: "rgba(100, 150, 0, 1)",
                }}
              >
                {subscriptionInfo && subscriptionInfo.datePaid
                  ? func.formatarDataCompleta(subscriptionInfo.datePaid)
                  : "Não informado"}
              </span>
            </div>
            <div style={style.leftInfoItemBox}>
              <span style={style.leftInfoItemBoxTitle}>Próximo Pagamento:</span>
              <span
                style={{
                  ...style.leftInfoItemBoxValue,
                  color: "rgba(100, 150, 0, 1)",
                }}
              >
                {subscriptionInfo && subscriptionInfo.expiration
                  ? func
                      .formatarDataCompleta(subscriptionInfo.expiration)
                      .split(" ")[0]
                  : "Não informado"}{" "}
              </span>
            </div>
            <div style={style.leftInfoItemBox}>
              <span style={style.leftInfoItemBoxTitle}>Data da Assintura:</span>
              <span
                style={{
                  ...style.leftInfoItemBoxValue,
                  color: "rgba(100, 150, 0, 1)",
                }}
              >
                {subscriptionInfo && subscriptionInfo.date_created
                  ? func
                      .formatarDataCompleta(subscriptionInfo.date_created)
                      .split(" ")[0]
                  : "Não informado"}{" "}
              </span>
            </div>
          </div>
          <div></div>
          <div style={style.payBox}>
            <span style={style.payBoxTitle}>Pagamento Necessário</span>
            <span style={style.payBoxSubTitle}>
              Vencimento dia{" "}
              {func.formatarDataCompleta(subscriptionInfo.expiration)}
            </span>
            <button
              onClick={() => setPayModal(true)}
              style={style.payBoxButton}
            >
              Pagar agora
            </button>
          </div>
        </div>
        <div style={style.signatureBoxes}>
          {signaruteModels.map((plan, index) => (
            <SignatureItem
              activeSubscription={activeSubscription}
              key={index}
              plan={plan}
              isHighlighted={index === 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}

const SignatureItem = ({ plan, isHighlighted, activeSubscription }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div
      className={isHighlighted ? "signature-box2" : "signature-box"}
      style={{
        ...style.signatureBox,
        background:
          activeSubscription === plan.name
            ? "rgba(10, 200, 220,1)"
            : "rgba(80, 200, 0,1)",
        transform: isHighlighted ? "scale(1.04)" : "scale(1)",
      }}
    >
      {activeSubscription === plan.name && (
        <span style={style.activeMessage}>Ativo</span>
      )}
      <div style={style.imageBox}>
        <img
          style={style.image}
          src="./images/agente-logo.png"
          alt={plan.name}
        />
      </div>
      <span style={style.boxTitle}>{plan.name}</span>

      <div style={style.pricesContainer}>
        <span style={style.lastPrice}>{formatCurrency(plan.lastPrice)}</span>
        <span style={style.actualPrice}>
          {formatCurrency(plan.actualPrice)} -{" "}
          {Math.round((1 - plan.actualPrice / plan.lastPrice) * 100)}% Off
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
            <div
              style={{
                ...style.circle,
                background: plan.clientsSignUp
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>{plan.receiveMessage}</span>
          <span style={style.item2}>{plan.replyMessage}</span>
          <span style={style.item2}>{plan.whatsappNumbers}</span>
          <span style={style.item2}>{plan.AccessQtt}</span>
          <span style={style.item2}>{plan.sendMarketing}</span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.crmIntegration
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.sealingPart
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.pdf
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.grapths
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.machineLearning
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.sendAudio
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
          <span style={style.item2}>
            <div
              style={{
                ...style.circle,
                background: plan.audioPersonalization
                  ? "rgba(210, 210, 210, 1)"
                  : "rgba(210, 210, 210, 0)",
              }}
            ></div>
          </span>
        </div>
      </div>
    </div>
  );
};
