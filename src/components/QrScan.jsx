import { Html5Qrcode } from "html5-qrcode";
import { useState } from "react";

function QrScan() {
    const [scanner, setScanner] = useState(null);

    const startScan = () => {
        const html5QrCode = new Html5Qrcode("reader");
        setScanner(html5QrCode);

        html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
            console.log("Scanned:", decodedText);
            html5QrCode.stop();
            document.getElementById("reader").style.display = "none";
        }
        );

        document.getElementById("reader").style.display = "block";
    };

    return (
        <div id="scan-con">
            <button 
            onClick={startScan}
            id="scan-btn"
            >
                Scan QR Code
            </button>
            <div id="reader" style={{ width: "300px", display: "none" }}></div>
        </div>
    );
}

export default QrScan;