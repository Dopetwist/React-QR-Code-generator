import { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";


function QrScan() {
  const [ isScannerOpen, setIsScannerOpen ] = useState(false);
  const scannerRef = useRef(null);
  const lockRef = useRef(false); // prevents multi-scans

  //detect phone number
  const isPhoneNumber = (text) => {
    // Allows formats like:
    // 08012345678
    // +2348012345678
    // tel:08012345678
    return /^(\+?\d{7,15}|tel:\+?\d{7,15})$/.test(text.trim());
  };

  //successful scan logic
  const onScanSuccess = async (decodedText) => {
    await scannerRef.current?.stop(); //stop scanning after detection

    const value = decodedText.trim();

    // If QR contains a tel link already
    if (value.startsWith("tel:")) {
      window.location.href = value;
      return;
    }

    // If QR contains a raw phone number
    if (isPhoneNumber(value)) {
      window.location.href = `tel:${value}`;
      return;
    }

    if (lockRef.current) return;  // prevent multiple triggers
    lockRef.current = true;

    stopScanner();

    // Open url in a new browser tab
    let url = decodedText;

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    //check for mobile devices
    const isMobile = screen.width < 1024;

    if (isMobile) {
      window.location.href = url; //open url on same tab for mobile
    } else {
      window.open(url, "_blank"); //open url on a new tab for desktop
    }

    // Handle other QR content
    console.log("Scanned value:", value);
  }


  const startScanner = async () => {
    setIsScannerOpen(true);

    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    lockRef.current = false; // reset lock

    html5QrCode.start(
      { facingMode: "environment" },
      { 
        fps: 10, 
        qrbox: { width: 320, height: 320 }
      },
      (decodedText) => {
        onScanSuccess(decodedText);
      }
    );

    document.body.style.overflow = "hidden";
  };

  const stopScanner = async () => {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
          scannerRef.current.clear(); // <-- important cleanup
        } catch (err) {
          console.error("Stop failed:", err);
        }

        setIsScannerOpen(false);
      }

      document.body.style.overflow = "auto";
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