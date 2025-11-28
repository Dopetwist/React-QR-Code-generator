import { Html5Qrcode } from "html5-qrcode";
import { useState } from "react";

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

        // 👉 Use scanned value here
        // setInputValue(decodedText);
      },
      (errorMessage) => {}
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
      <button onClick={startScanner} id="scan-btn">Scan QR Code</button>
    </>
  );
}

export default QrScan;