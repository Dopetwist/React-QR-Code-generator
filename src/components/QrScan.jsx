import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { X } from "lucide-react";


function QrScan() {
  const [ isScannerOpen, setIsScannerOpen ] = useState(false);
  const [ phone, setPhone ] = useState(null);
  const scannerRef = useRef(null);
  const lockRef = useRef(false); // prevents multi-scans

  // Phone number validator
  const isPhoneNumber = (text) => {
    return /^(\+?\d{7,15})$/.test(text.trim());
  };

  // Generate vCard
  const generateVCard = ({ name, phone }) => {
    return `
    BEGIN:VCARD
    VERSION:3.0
    FN:${name}
    TEL;TYPE=CELL:${phone}
    END:VCARD
    `.trim();
  };

  // Add to Contacts
  const addToContacts = () => {
    const vCard = generateVCard({
      name: "Scanned Contact",
      phone
    });

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "contact.vcf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Call number
  const callNumber = () => {
    window.location.href = `tel:${phone}`;
  };

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
      async (decodedText) => {
        const value = decodedText.trim();

        if (isPhoneNumber(value)) {
          await html5QrCode.stop();
          setPhone(value);
          setIsScannerOpen(false);
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
      }
    );

    document.body.style.overflow = "hidden";
  };

  // Cleanup
  useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {});
    };
  }, []);

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

      <div className={`phone-container ${phone ? "show" : ""}`}>
        <div id="close-btn">
          <X onClick={() => {setPhone(null)}} />
        </div>

        <h3>📱 Phone Number Detected</h3>
        <p>{phone}</p>

        <div className="action-btns">
          <button onClick={callNumber}>
            📞 Call
          </button>

          <button onClick={addToContacts}>
            👤 Add to Contacts
          </button>
        </div>
      </div>
    </>
  );
}

export default QrScan;