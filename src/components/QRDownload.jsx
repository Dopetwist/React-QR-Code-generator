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

        const qrFunction = async () => {
            const svg = qrRef.current.querySelector("svg");
            if (!svg) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);
            // const pngUrl = "data:image/svg+xml;base64," + btoa(svgData);

            // const img = new Image();
            // img.crossOrigin = "anonymous";

            const img = await loadImage(url);

            const canvas = document.createElement("canvas");
            const size = qrSize + 100; // add space for title
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");

            // Draw QR
            ctx.drawImage(img, 50, 50, qrSize, qrSize);
            URL.revokeObjectURL(url);

            // Draw Logo
            if (base64Image) {
                const logoImg = await loadImage(base64Image);
                const logoSizePx = logoSize;
                const logoPos = 50 + qrSize / 2 - logoSizePx / 2;

                ctx.drawImage(logoImg, logoPos, logoPos, logoSizePx, logoSizePx);
            }

            const finalPNG = canvas.toDataURL("image/png");
            setQrPNG(finalPNG);

            // console.log(finalPNG);

            // img.onload = () => {
            //     const canvas = document.createElement("canvas");
            //     canvas.width = qrSize * 3;
            //     canvas.height = qrSize * 3;

            //     const ctx = canvas.getContext("2d");
            //     ctx.scale(3, 3);
            //     ctx.drawImage(img, 0, 0);

            //     const finalPNG = canvas.toDataURL("image/png");
            //     setQrPNG(finalPNG);
            // };

            // img.src = pngUrl;
        }

        qrFunction();
    }, [inputValue, titleValue, bgValue, fgValue, qrSize, base64Image, logoSize, checkExcavate]);


    function loadImage(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.src = src;
        });
    }
    
    // Download generated QR Code Image
    const handleDownload = async () => {
        const element = qrRef.current;

        // console.log(element);

        console.log(qrPNG);

        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            backgroundColor: null
        })

        const dataURL = canvas.toDataURL("image/png");

        // console.log(dataURL);

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

                {/* Present but invisible SVG */}
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

                {/* Display PNG Image after SVG conversion */}
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