import { useEffect, useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Download } from "lucide-react";
import html2canvas from "html2canvas";

function QRDownload({
        inputValue,
        titleValue,
        bgValue,
        fgValue,
        base64Image,
        checkExcavate,
        handleClose
    }) {
    const [ qrPNG, setQrPNG ] = useState(null);

    const qrRef = useRef();

    const qrSize = 128;

    const logoSize = Math.min(80, qrSize * 0.18); // adaptive size

    useEffect(() => {

        const svg = qrRef.current.querySelector("svg");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const pngUrl = "data:image/svg+xml;base64," + btoa(svgData);

        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = qrSize * 3;
            canvas.height = qrSize * 3;

            const ctx = canvas.getContext("2d");
            ctx.scale(3, 3);
            ctx.drawImage(img, 0, 0);

            const finalPNG = canvas.toDataURL("image/png");
            setQrPNG(finalPNG);
        };

        img.src = pngUrl;
    }, [inputValue, titleValue, bgValue, fgValue, qrSize, base64Image, logoSize, checkExcavate]);

    
    // Download generated QR Code Image
    const handleDownload = async () => {
        const element = qrRef.current;

        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            backgroundColor: null
        })

        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.target = "_blank";
        link.download = titleValue ? `${titleValue}.png` : "qr-code.png";
        link.click();
    };

    return (
        <div className="canvas-parent">

            <div id="close-btn">
                <X
                onClick={handleClose} 
                />
            </div>

            <div className="canvas-con" ref={qrRef}>
                {titleValue && <h5 className="title"> {titleValue} </h5>}

                // Present but invisible SVG
                <div style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}>
                    <QRCodeSVG
                        size={qrSize}
                        value={inputValue}
                        title={titleValue}
                        bgColor={bgValue ? bgValue : "White"}
                        fgColor={fgValue ? fgValue : "Black"}
                        marginSize={3}
                        imageSettings={{
                            src: base64Image,
                            height: logoSize,
                            width: logoSize,
                            excavate: !checkExcavate
                        }}
                    />
                </div>

                // Display PNG Image after SVG conversion
                {qrPNG && (
                    <img 
                        src={qrPNG} 
                        alt="qr" 
                        width={qrSize}
                        height={qrSize}
                    />
                )}

                                
            </div>

            <button 
                onClick={handleDownload}
                id="download-btn"
                > 
                <Download
                id="download-icon"
                size={17} 
                />

                Download 
            </button>
        </div>
    )
}

export default QRDownload;