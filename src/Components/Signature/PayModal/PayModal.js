import React, { useState, useEffect, useContext } from "react";
import style from "./PayModalStyle";
import { QRCodeCanvas } from "qrcode.react";
import LoadingCircle from "../../Loading/LoadingCircle";
import { gerarPix, verificarPagamento } from "../../../Services/dbservice";
import { AuthContext } from "../../../Context/AuthContext";
import { LoadingContext } from "../../../Context/LoadingContext";
import func from "../../../Services/fotmatters";

export default function PayModal({ onClose, generateQrCode, info }) {
  const [pixInfo, setPixInfo] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const { credentials, enterprise } = useContext(AuthContext);
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (generateQrCode) {
      generatePix();
    }
  }, [generateQrCode]);

  const generatePix = async () => {
    try {
      var indentTypeAux1 = enterprise.cnpj
        .replace(".", "")
        .replace(".", "")
        .replace("-", "")
        .replace("-", "")
        .replace("/", "")
        .trim();
      const response = await gerarPix(
        credentials.accessToken,
        indentTypeAux1.length > 11 ? "CNPJ" : "CPF"
      );
      setPixInfo(response);
    } catch (error) {
      alert("Erro ao gerar pix.");
    }
  };

  const verificarPix = async () => {
    try {
      startLoading();
      const response = await verificarPagamento(
        credentials.accessToken,
        pixInfo.id
      );
      handleVerifyPaymentMessage(response.data.message, response.data.status);
    } catch (error) {
      alert("Erro ao verificar pix.");
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const handleVerifyPaymentMessage = (msg, status) => {
    if (status === "pending") {
      alert("Pagamento ainda não foi aprovado.");
    } else if (status === "approved" || status === "paid") {
      alert(
        "Pagamento verificado com sucesso.\n Sua assinatura se renovará em alguns instantes."
      );
      onClose();
    } else {
      alert("Status indefinido, entre em contato com o suporte.");
    }
  };

  useEffect(() => {
    if (pixInfo) {
      setQrCode(pixInfo.point_of_interaction.transaction_data.qr_code);
    }
  }, [pixInfo]);

  return (
    <>
      <div style={style.container}>
        <div style={style.containerBox}>
          <span style={style.title}>Pague o QR Code</span>

          <div style={style.qrCodeContainer}>
            <LoadingCircle loading={qrCode ? false : true} />

            <QRCodeCanvas
              value={qrCode}
              size={300}
              level="H"
              includeMargin={true}
              style={style.qrCode}
            />
          </div>

          <div style={style.valueAndButtons}>
            <div style={style.valueAndButtonsCenter}>
              <span style={style.valueTitle}>VALOR</span>
              <span style={style.valueValue}>
                {info && func.formatarMoeda(info.value)}
              </span>
            </div>
            <button onClick={verificarPix} style={style.verifyPaymentButton}>
              Verificar pagamento
            </button>
            <button onClick={onClose} style={style.exitButton}>
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
