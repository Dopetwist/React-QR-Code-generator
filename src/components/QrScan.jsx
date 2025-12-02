import { useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";


function QrScan() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const scannerRef = useRef(null);
  const lockRef = useRef(false); // prevents multi-scans
  const [flash, setFlash] = useState(false);


  const startScanner = async () => {
    setIsScannerOpen(true);

    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;

    lockRef.current = false; // reset lock

    html5QrCode.start(
      { facingMode: "environment" },
      { 
        fps: 10, 
        qrbox: (viewportWidth, viewportHeight) => {
          // Extra large detection box
          const minEdge = Math.min(viewportWidth, viewportHeight);
          return {
            width: minEdge - 60,
            height: minEdge - 60
          }
        }
      },
      (decodedText) => {
        if (lockRef.current) return;  // prevent multiple triggers
        lockRef.current = true;

        // Trigger green flash
        setFlash(true);
        setTimeout(() => setFlash(false), 250); // flash duration

        // Trigger vibration
        if (navigator.vibrate) {
          navigator.vibrate(200); // vibrate for 200ms
        }

        stopScanner();

        // Open url in a new browser tab
        let url = decodedText;

        if (!url.startsWith("http")) {
            url = "https://" + url;
        }

        window.open(url, "_blank");

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
      {flash && <div className="scan-flash show"></div>}

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