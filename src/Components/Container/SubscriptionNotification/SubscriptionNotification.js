import React, { useState, useEffect, useContext } from "react";
import style from "./SubscriptionNotificationStyle";
import { AuthContext } from "../../../Context/AuthContext";
import { LoadingContext } from "../../../Context/LoadingContext";
import func from "../../../Services/fotmatters";
import { QRCodeCanvas } from "qrcode.react";
import LoadingCircle from "../../Loading/LoadingCircle";
import { gerarPix, verificarPagamento } from "../../../Services/dbservice";
import { FiAlertOctagon, FiCheckCircle, FiCopy, FiCreditCard, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";

const formatarDataSimples = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
  } catch (error) {
    return "Data inválida";
  }
};

export default function SubscriptionNotification() {
  const { subscriptionInfo, credentials, enterprise } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showPixScreen, setShowPixScreen] = useState(false);
  const [pixInfo, setPixInfo] = useState(null);
  const { startLoading, stopLoading } = useContext(LoadingContext)

  const isBlocked = subscriptionInfo?.status === 3;

  useEffect(() => {
    if (subscriptionInfo && (subscriptionInfo.status === 1 || subscriptionInfo.status === 3)) {
      setShowModal(isBlocked || verifyIfOpen());
    } else {
      setShowModal(false);
    }
  }, [subscriptionInfo, isBlocked]);

  const handleClose = () => {
    if (isBlocked) return;
    localStorage.setItem("last-time-subscription-warning-opened", new Date().toISOString());
    setShowModal(false);
  };

  const verifyIfOpen = () => {
    const lastTimeOpened = localStorage.getItem("last-time-subscription-warning-opened");
    if (!lastTimeOpened) return true;
    const diffInHours = (new Date() - new Date(lastTimeOpened)) / (1000 * 60 * 60);
    return true;
    // return diffInHours > 4;
  };

  const handleGeneratePix = async () => {
    startLoading();
    try {
      const docNumber = enterprise.cnpj.replace(/\D/g, "");
      const response = await gerarPix(
        credentials.accessToken,
        docNumber.length > 11 ? "CNPJ" : "CPF"
      );
      setPixInfo(response);
      setShowPixScreen(true);
    } catch (error) {
      toast.error("Erro ao gerar PIX. Tente novamente.");
    } finally {
      stopLoading();
    }
  };
  
  // Adicionando o contexto para a função
  handleGeneratePix.contextType = LoadingContext;

  const handlePaymentSuccess = () => {
    setTimeout(() => window.location.reload(), 2500);
  };

  if (!subscriptionInfo || !showModal) {
    return null;
  }

  return (
    <div style={style.containerModal}>
      <div style={style.modalContent}>
        {showPixScreen ? (
          <PixScreen
            pixInfo={pixInfo}
            credentials={credentials}
            onPaymentSuccess={handlePaymentSuccess}
            onClose={() => setShowPixScreen(false)}
            isBlocked={isBlocked}
          />
        ) : (
          <MainScreen
            subscriptionInfo={subscriptionInfo}
            isBlocked={isBlocked}
            onGeneratePix={handleGeneratePix}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

const MainScreen = ({ subscriptionInfo, isBlocked, onGeneratePix, onClose }) => {
  const [value, currency] = func.formatarMoeda(subscriptionInfo.value).split(" ");
  
  return (
    <>
      <div style={style.modalHeader(isBlocked)}>
        <div style={style.headerIcon}>
          <FiAlertOctagon size={40} color={isBlocked ? "#FF4757" : "#FACD14"} />
        </div>
        <h2 style={style.headerTitle}>
          {isBlocked ? "Acesso Suspenso" : "Aviso de Vencimento"}
        </h2>
        <p style={style.headerSubtitle}>
          {isBlocked
            ? "Sua assinatura expirou. Regularize para reativar seu acesso."
            : "Sua assinatura está próxima do vencimento. Evite interrupções."}
        </p>
      </div>

      <div style={style.modalBody}>
        <div style={style.statsBar}>
          <StatsItem label="Plano Atual" value={subscriptionInfo.name} />
          <StatsItem label="Vencimento" value={formatarDataSimples(subscriptionInfo.expiration)} />
          <StatsItem label="Dias Restantes" value={subscriptionInfo.block_days_remaining} />
        </div>

        <div style={style.paymentSection}>
          <p style={style.paymentLabel}>VALOR PARA RENOVAÇÃO</p>
          <h1 style={style.paymentValue}>
            {value}
            <span style={style.paymentCurrency}>{currency}</span>
          </h1>
        </div>

        <div style={style.actionButtons}>
          <button onClick={onGeneratePix} style={style.primaryButton(isBlocked)}>
            <FiCreditCard size={20} />
            {isBlocked ? "Pagar e Reativar Agora" : "Renovar com PIX"}
          </button>
          {!isBlocked && (
            <button onClick={onClose} style={style.secondaryButton}>
              Lembrar Mais Tarde
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const PixScreen = ({ pixInfo, credentials, onPaymentSuccess, onClose, isBlocked }) => {
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [verificationStatus, setVerificationStatus] = useState("idle"); // idle, verifying, success, pending
  const qrCodeValue = pixInfo?.point_of_interaction?.transaction_data?.qr_code;

  const handleVerify = async () => {
    setVerificationStatus("verifying");
    startLoading();
    try {
      const response = await verificarPagamento(credentials.accessToken, pixInfo.id);
      const { status } = response.data;
      if (status === "approved" || status === "paid") {
        setVerificationStatus("success");
        onPaymentSuccess();
      } else {
        setVerificationStatus("pending");
      }
    } catch (error) {
      toast.error("Erro na verificação. Tente novamente.");
      setVerificationStatus("idle");
    } finally {
      stopLoading();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCodeValue);
    toast.success("Código PIX Copia e Cola copiado!");
  };

  if (verificationStatus === "success") {
    return (
      <div style={{...style.pixScreen, ...style.verificationResultContainer}}>
        <div style={style.resultIconSuccess}>
          <FiCheckCircle size={40} color="#2ECC71" />
        </div>
        <h2 style={style.headerTitle}>Pagamento Confirmado!</h2>
        <p style={style.headerSubtitle}>Sua assinatura está sendo atualizada. A página será recarregada em instantes.</p>
      </div>
    );
  }

  if (verificationStatus === "pending") {
    return (
      <div style={{...style.pixScreen, ...style.verificationResultContainer}}>
        <div style={style.resultIconPending}>
          <FiClock size={40} color="#FACD14" />
        </div>
        <h2 style={style.headerTitle}>Aguardando Confirmação</h2>
        <p style={style.headerSubtitle}>Ainda não recebemos a confirmação do seu banco. Isso pode levar alguns segundos.</p>
        <div style={{...style.actionButtons, width: "100%"}}>
            <button onClick={() => setVerificationStatus("idle")} style={style.primaryButton(isBlocked)}>
                <FiCreditCard size={20} /> Tentar Novamente
            </button>
        </div>
      </div>
    );
  }

  return (
    <div style={style.pixScreen}>
      <h2 style={style.headerTitle}>Pagamento via PIX</h2>
      <p style={style.headerSubtitle}>
        Use o app do seu banco para ler o QR Code ou use o Copia e Cola.
      </p>

      <div style={style.qrCodeContainer}>
        {qrCodeValue ? (
          <QRCodeCanvas value={qrCodeValue} size={200} level="H" />
        ) : (
          <div style={{width: 200, height: 200, display: "flex", alignItems: "center", justifyContent: "center"}}>
            <LoadingCircle />
          </div>
        )}
      </div>

      {qrCodeValue && (
        <button onClick={copyToClipboard} style={style.copyPixButton}>
          <FiCopy size={16} /> Copiar Código PIX
        </button>
      )}

      <div style={style.actionButtons}>
        <button onClick={handleVerify} style={style.primaryButton(isBlocked, verificationStatus === 'verifying')} disabled={verificationStatus === 'verifying'}>
          {verificationStatus === 'verifying' ? <LoadingCircle size={20} /> : <><FiCheckCircle size={20} /> Já Paguei, Verificar</>}
        </button>
        {!isBlocked && (
          <button onClick={onClose} style={style.secondaryButton}>
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

const StatsItem = ({ label, value }) => (
  <div style={style.statsItem}>
    <p style={style.statsLabel}>{label}</p>
    <p style={style.statsValue}>{value}</p>
  </div>
);