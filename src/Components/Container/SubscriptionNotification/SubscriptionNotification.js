import React, { useState, useEffect, useContext } from "react";
import style from "./SubscriptionNotificationStyle";
import { AuthContext } from "../../../Context/AuthContext";
import formatHelpers from "../../helpers/formatHelpers";
import func from "../../../Services/fotmatters";
import QRcode, { QRCodeCanvas } from "qrcode.react";
import LoadingCircle from "../../Loading/LoadingCircle";
import { gerarPix, verificarPagamento } from "../../../Services/dbservice";
import { LoadingContext } from "../../../Context/LoadingContext";

const pixPayload =
  "00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426655440000520400005303986540510.005802BR5913Fulano de Tal6008BRASILIA62070503***63041D3F";

export default function SubscriptionNotification() {
  const { subscriptionInfo, credentials, enterprise } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [showWarning, setShowWarning] = useState(false);
  const [generatePixOption, setGeneratePixOption] = useState(false);
  const [pixInfo, setPixInfo] = useState(null);

  useEffect(() => {
    if (subscriptionInfo) console.log(subscriptionInfo.block_days_remaining);
    if (
      subscriptionInfo &&
      subscriptionInfo.block_days_remaining &&
      subscriptionInfo.block_days_remaining < 3
    ) {
      // if (subscriptionInfo.block_days_remaining <= 2) {
      const shouldShow = verifyIfOpen();
      setShowWarning(shouldShow);
      // }
    }
  }, [subscriptionInfo]);

  const handleClose = () => {
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

    if (!lastTimeOpened) return true;

    const lastOpenedDate = new Date(lastTimeOpened);
    const currentDate = new Date();
    const diffInMs = currentDate - lastOpenedDate;
    const diffInHours = diffInMs / (1000 * 60 * 60);
    return diffInHours > 4;
  };

  const generatePix = async () => {
    try {
      var indentTypeAux1 = enterprise.cnpj
        .replace(".", "")
        .replace(".", "")
        .replace("-", "")
        .replace("-", "")
        .replace("/", "")
        .trim();
      setGeneratePixOption(true);
      const response = await gerarPix(
        credentials.accessToken,
        indentTypeAux1.length > 11 ? "CNPJ" : "CPF"
      );
      setPixInfo(response);
      console.log(response);
    } catch (error) {
      alert("Erro ao gerar pix.");
      setGeneratePixOption(false);
    }
  };

  const verificarPix = async () => {
    try {
      startLoading()
      const response = await verificarPagamento(
        credentials.accessToken,
        pixInfo.id
      );
      handleVerifyPaymentMessage(response.data.message, response.data.status)
    } catch (error) {
      alert("Erro ao verificar pix.");
      console.log(error);
    } finally{
      stopLoading()
    }
  };

  const handleVerifyPaymentMessage = (msg, status) => {
    if(status === "pending"){
      alert("Pagamento ainda não foi aprovado.");
    }else if(status === "approved" || status === "paid"){
      alert("Pagamento verificado com sucesso.\n Sua assinatura se renovará em alguns instantes.");
      handleClose()
    }else{
      alert("Status indefinido, entre em contato com o suporte.");
    }
  }

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
                    {subscriptionInfo.name}
                  </span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Dureção assinatura:
                  </span>
                  <span style={style.infoContentBoxValue}>
                    {subscriptionInfo.duration} dia(s)
                  </span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Último pagamento:
                  </span>
                  <span style={style.infoContentBoxValue}>
                    {subscriptionInfo.datePaid || "Não informado"}
                  </span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>
                    Data de expiração:
                  </span>
                  <span style={style.infoContentBoxValue}>
                    {func.formatarDataCompleta(subscriptionInfo.expiration)}
                  </span>
                </div>
                <div style={style.infoContentBox}>
                  <span style={style.infoContentBoxTitle}>Dias restantes:</span>
                  <span style={style.infoContentBoxValue}>
                    {subscriptionInfo.block_days_remaining}
                  </span>
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
                  <span style={style.priceBoxValue}>
                    {func.formatarMoeda(subscriptionInfo.value)}
                  </span>
                </div>
                <div style={style.priceBoxBottom}>
                  <span style={style.priceBoxTitleBottom}>Status</span>
                  <span style={style.priceBoxValueBottom}>Pendente</span>
                </div>
              </div>
            </div>

            {generatePixOption ? (
              <>
                <GeneratePixOption
                  pixInfo={pixInfo}
                  handleClose={handleClose}
                  verificarPix={verificarPix}
                />
              </>
            ) : (
              <>
                <div style={style.containerContentSecondColumn}>
                  <button onClick={generatePix} style={style.generatePixButton}>
                    Gerar Pix para pagamento
                  </button>
                  <button style={style.payAfterButton} onClick={handleClose}>
                    Pagar mais tarde
                  </button>{" "}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

const GeneratePixOption = ({ pixInfo, handleClose, verificarPix }) => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    if (pixInfo) {
      setQrCode(pixInfo.point_of_interaction.transaction_data.qr_code);
    }
  }, [pixInfo]);

  return (
    <>
      <div style={style.containerPixOption}>
        <span style={style.title}>Pague com o QR code abaixo</span>

        <div style={style.qrCodeContainer}>
          <LoadingCircle loading={qrCode ? false : true} />
          {qrCode && (
            <QRCodeCanvas
              value={qrCode}
              size={300}
              level="H"
              includeMargin={true}
              style={style.qrCode}
            />
          )}
          {!qrCode && (
            <div style={{width: 300, height: 300}} />
          )}
        </div>

        <button onClick={verificarPix} style={style.buttonPaid}>Verificar Pagamento</button>
        <button onClick={handleClose} style={style.buttonExit}>
          Sair
        </button>
      </div>
    </>
  );
};
