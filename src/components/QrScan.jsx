import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";


function QrScan() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerInstance, setScannerInstance] = useState(null);

  const startScanner = async () => {
    setIsScannerOpen(true);

    const html5QrCode = new Html5Qrcode("reader");
    setScannerInstance(html5QrCode);

    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        console.log("Scanned:", decodedText);

        stopScanner();

        let url = decodedText;

        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        window.open(url, "_blank");

      }
    );
  };

  const stopScanner = () => {
    if (scannerInstance) {
        scannerInstance.stop().then(() => {
        setIsScannerOpen(false);
      });
    }
  };

  return (
    <>
      {/* overlay */}
      <div className={`scanner-overlay ${isScannerOpen ? "show" : ""}`}></div>

      {/* scanner modal */}
      <div className={`scanner-container ${isScannerOpen ? "show" : ""}`}>
        <div id="reader"></div>
        <button onClick={stopScanner} className="scanner-close-btn">Close</button>
      </div>

      {/* open button */}
      <button onClick={startScanner} id="scan-btn">
        <div className="camera">📷</div> Scan QR Code
        </button>
    </>
  );
}

export default QrScan;