import React, { useState, useEffect, useContext } from "react";
import style from "./SubscriptionNotificationStyle";
import { AuthContext } from "../../../Context/AuthContext";

export default function SubscriptionNotification() {
  const { subscriptionInfo } = useContext(AuthContext);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    console.log(subscriptionInfo)

    if (subscriptionInfo && subscriptionInfo.block_days_remaining) {
      if (subscriptionInfo.block_days_remaining <= 3) {
        const shouldShow = verifyIfOpen();
        setShowWarning(shouldShow);
      }
    }
  }, [subscriptionInfo]);

  const handleClose = () => {
    // Atualiza o localStorage com o momento atual quando o usuário fecha
    localStorage.setItem(
      "last-time-subscription-warning-opened",
      new Date().toISOString()
    );
    setShowWarning(false);
  };

  const verifyIfOpen = () => {
    const lastTimeOpened = localStorage.getItem(
      "last-time-subscription-warning-opened"
    );

    // Se nunca foi aberto antes, pode mostrar
    if (!lastTimeOpened) return true;

    const lastOpenedDate = new Date(lastTimeOpened);
    const currentDate = new Date();

    // Calcula a diferença em milissegundos
    const diffInMs = currentDate - lastOpenedDate;
    // Converte para horas
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // Mostra apenas se passou mais de 4 horas
    return diffInHours > 4;
  };

  return (
    <>
      {subscriptionInfo && showWarning && (
        <div style={style.containerModal}>
          <div style={style.containerContent}>
            <div style={style.containerContentFirstColumn}>
              <div style={style.containerContentTitleBox}>
                <span style={style.containerContentTitle}>
                  Lembrete de pagamento
                </span>
              </div>

              <div style={style.signatureBoxInfo}>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Nome assinatura:
                  </span>
                  <span style={style.infoContentBoxValue}>
                    Assinatura Premium
                  </span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Data de implantação:
                  </span>
                  <span style={style.infoContentBoxValue}>25/10/2024</span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Dureção assinatura:
                  </span>
                  <span style={style.infoContentBoxValue}>
                    {subscriptionInfo.block_days_remaining} dia(s)
                  </span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Último pagamento:
                  </span>
                  <span style={style.infoContentBoxValue}>25/06/2025</span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Data de expiração:
                  </span>
                  <span style={style.infoContentBoxValue}>25/07/2025</span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>Dias restantes:</span>
                  <span style={style.infoContentBoxValue}>22</span>
                </div>

                <div style={style.assustaEle}>
                  <span style={style.assustaEleNormal}>
                    <span style={style.assustaEleBold}>ATENÇÃO: </span>O não
                    pagamento da assinatura até o dia da expiração acarretará em
                    suspenção imediata dos serviços.
                  </span>
                </div>

                <div style={style.priceBox}>
                  <span style={style.priceBoxTitle}>VALOR À PAGAR</span>
                  <span style={style.priceBoxValue}>R$899,00</span>
                </div>
                <div style={style.priceBoxBottom}>
                  <span style={style.priceBoxTitleBottom}>Status</span>
                  <span style={style.priceBoxValueBottom}>Pendente</span>
                </div>
              </div>
            </div>

            <div style={style.containerContentSecondColumn}>
              <button style={style.generatePixButton}>
                Gerar Pix para pagamento
              </button>
              <button style={style.payAfterButton} onClick={handleClose}>
                Pagar mais tarde
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
