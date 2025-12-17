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
            const svg = qrRef.current?.querySelector("svg");
            if (!svg) return;

            // Desired display size (in CSS pixels)
            const displayPx = qrSize; // <-- change this to the size you want the image to display at
            // Pixel density scale (retina)
            const DPR = 3; // increase number for extra sharpness
            const scale = DPR * 3; // safe for iOS

            // Canvas pixel size (intrinsic PNG size)
            // const canvasPx = displayPx * DPR;

            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
            const url = URL.createObjectURL(svgBlob);

            try {
                const img = await loadImage(url); // existing helper that returns a Promise<HTMLImageElement>

                const canvas = document.createElement("canvas");
                canvas.width = qrSize * scale;
                canvas.height = qrSize * scale;

                const ctx = canvas.getContext("2d");

                // Scale the drawing so 1 CSS px maps correctly to DPR pixels
                ctx.scale(scale, scale);

                // Calculate padding if needed (previously used 50). We'll use no extra padding here.
                // Draw the SVG into a display-size box (displayPx x displayPx)
                ctx.drawImage(img, 0, 0, displayPx, displayPx);

                // Draw logo centered on top (optional)
                if (base64Image) {
                    const logoImg = await loadImage(base64Image);
                    const logoSizeCss = logoSize // css px logo size
                    const logoPosCss = (displayPx / 2) - (logoSizeCss / 2);

                    // draw at CSS-coordinates — ctx already scaled by DPR
                    ctx.drawImage(logoImg, logoPosCss, logoPosCss, logoSizeCss, logoSizeCss);
                }

                const finalPNG = canvas.toDataURL("image/png");
                setQrPNG(finalPNG);
            } finally {
                URL.revokeObjectURL(url);
            }
        };

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

        if (!element) return;

        const scale = window.devicePixelRatio * 3;

        const canvas = await html2canvas(element, {
            scale: scale,
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
                <X onClick={handleClose} />
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