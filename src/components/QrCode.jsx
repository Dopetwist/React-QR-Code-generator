import { useEffect, useState } from "react";
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Download } from "lucide-react";
import html2canvas from "html2canvas";
import ImgFile from "./ImgFile";
import LinkInput from "./LinkInput";
import TitleInput from "./TitleInput";
import BgInput from "./BgInput";
import FgInput from "./FgInput";
import Button from "./Button";

function QrCode() {

    const [ inputValue, setInputValue ] = useState("");
    const [ titleValue, setTitleValue ] = useState("");
    const [ bgValue, setBgValue ] = useState("");
    const [ fgValue, setFgValue ] = useState("");
    const [ base64Image, setBase64Image ] = useState(null);
    const [ checkExcavate, setExcavate ] = useState(false);
    const [ radio, setRadio ] = useState("");
    const [ hidden, setHidden ] = useState(true);
    const [ dark, setDark ] = useState(false);

    const qrRef = useRef();

    const qrSize = 128;

    const logoSize = Math.min(80, qrSize * 0.18); // adaptive size

    const isMobile = screen.width < 1024;



    // Function to convert uploaded images to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    

    // Set base64 image to state
    const handleFile = async (e) => {

        const file = e.target.files[0];
        if (!file) return;

        const base64 = await convertToBase64(file);

        setBase64Image(base64);
    };

    
    // Toggle boolean value
    useEffect(() => {
        const toggleExcavate = () => {
            setExcavate(!checkExcavate);
        }

        toggleExcavate();
    }, []);


    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleTitle = (e) => {
        setTitleValue(e.target.value);
    };

    const handleBackground = (e) => {
        setBgValue(e.target.value);
    };

    const handleForeground = (e) => {
        setFgValue(e.target.value);
    };

    const handleClose = () => {
        setHidden(true);
        setDark(false);
        setInputValue("");
        setTitleValue("");
        setBgValue("");
        setFgValue("");
        setBase64Image(null);
        setExcavate(true);
        setRadio("");

        document.body.style.overflow = "auto";
    }

    const preloadLogo = (src) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);  // works even with base64
            img.src = src;
        });
    }



    // Function to capture screenshot
    const captureScreenshot = async () => {

        const element = qrRef.current;

        const delay = isMobile ? 500 : 0;

        if (!element) return;

        // Preload the base64 image so iPhone Safari decodes it before capture
        if (base64Image) {
            await preloadLogo(base64Image);
            // const logoSizePx = logoSize;
            // const logoPos = 50 + qrSize / 2 - logoSizePx / 2;
            
            // ctx.drawImage(logoImg, logoPos, logoPos, logoSizePx, logoSizePx);
        }

        // Small delay to allow iOS Safari to finish layout
        // await new Promise(r => setTimeout(r, 150));

        setTimeout(async () => {
            const canvas = await html2canvas(element, {
                useCORS: true, // supports external images/logos
                allowTaint: true,
                scale: 3, // increases image quality
                imageTimeout: 15000,
                logging: true,
                backgroundColor: null
            });

            const dataURL = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataURL;
            link.target = "_blank";
            link.download = (titleValue ? `${titleValue}.png` : "qr-code.png");
            link.click();
        }, delay);
    };
    

    // Download generated QR Code Image
    const handleDownload = () => {
        if (isMobile) {
            const viewportMeta = document.getElementById("viewportMeta");
            const originalViewportContent = viewportMeta.getAttribute("content");

            if (!viewportMeta) {
                console.error("Viewport meta tag not found.");
                return;
            }

            viewportMeta.setAttribute("content", "width=800"); // Temporarily modify viewport

            try {
                captureScreenshot();
                console.log("Screenshot captured successfully.");
            } catch (error) {
                console.error("Error capturing screenshot: ", error);
            } finally {
                viewportMeta.setAttribute("content", originalViewportContent); // Restore original viewport
                console.log("Viewport restored.");
            }
        } else {
            captureScreenshot();
            console.log("Desktop device detected.");
        }
    }


    // const handleDownload = async () => {
    //     const qrElement = qrRef.current.querySelector("svg");

    //     if (!qrElement) return;

    //     // Convert SVG to Canvas
    //     const svgData = new XMLSerializer().serializeToString(qrElement);
    //     const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    //     const url = URL.createObjectURL(svgBlob);

    //     const img = await loadImage(url);

    //     // Create final canvas
    //     const canvas = document.createElement("canvas");
    //     const size = qrSize + 100; // add space for title
    //     canvas.width = size;
    //     canvas.height = size;
    //     const ctx = canvas.getContext("2d");

    //     // // Fill background
    //     // ctx.fillStyle = bgValue || "white";
    //     // ctx.fillRect(0, 0, size, size);

    //     // Draw QR
    //     ctx.drawImage(img, 50, 50, qrSize, qrSize);
    //     URL.revokeObjectURL(url);

    //     // // Draw Title
    //     if (titleValue) {
    //         ctx.font = "bold 20px Arial";
    //         ctx.fillStyle = fgValue || "black";
    //         ctx.textAlign = "center";
    //         ctx.fillText(titleValue, size / 2, 40);
    //     }

    //     // Draw Logo
    //     if (base64Image) {
    //         const logoImg = await loadImage(base64Image);
    //         const logoSizePx = logoSize;
    //         const logoPos = 50 + qrSize / 2 - logoSizePx / 2;

    //         ctx.drawImage(logoImg, logoPos, logoPos, logoSizePx, logoSizePx);
    //     }

    //     // Export PNG
    //     const pngData = canvas.toDataURL("image/png");

    //     // Safari-safe download
    //     const link = document.createElement("a");
    //     link.href = pngData;
    //     link.target = "_blank"; // force iPhone to open new tab
    //     link.download = titleValue ? `${titleValue}.png` : "qr-code.png";
    //     link.click();
    // };

    // function loadImage(src) {
    //     return new Promise((resolve) => {
    //         const img = new Image();
    //         img.crossOrigin = "anonymous";
    //         img.onload = () => resolve(img);
    //         img.src = src;
    //     });
    // }




    function handleClick(event) {
        event.preventDefault();

        // alert message if URL field is empty
        if (inputValue.length === 0) {
            alert("Please enter a URL or number!")
            return;
        }

        setDark(true);
        
        setHidden(false);

        document.body.style.overflow = "hidden";
    }


    return (
        <div className="main-con">
            <div className={`overlay ${dark ? "darken" : ""}`}></div>
            <div className="container">
                <p className="form-text">Fill the form to generate a QR code</p>
                <form action="#" id="main-form">
                    
                    <LinkInput
                    changeFunc={handleChange}
                    text={inputValue} 
                    />

                    <TitleInput
                    changeFunc={handleTitle}
                    text={titleValue} 
                    />

                    <BgInput
                    changeFunc={handleBackground}
                    text={bgValue} 
                    />

                    <FgInput
                    changeFunc={handleForeground}
                    text={fgValue} 
                    />
 
                    

                    <section className="logo">
                        <p> Insert Image on QR Code? </p>

                        <div className="radioBtns">
                            <div className="yes">
                                <input
                                type="radio" 
                                id="yes" 
                                name="logo" 
                                value="yes"
                                checked={radio === "yes"}
                                onChange={() => {setRadio("yes")}}
                                />
                                <label htmlFor="yes">Yes</label>
                            </div>

                            <div className="no">
                                <input 
                                type="radio" 
                                id="no" 
                                name="logo" 
                                value="no"
                                checked={radio === "no"}
                                onChange={() => {setRadio("no")}}
                                />
                                <label htmlFor="no">No</label>
                            </div>
                        </div>
                    </section>

                    
                    {radio === "yes" && <div>
                                <ImgFile
                                func={handleFile}
                                confirmImage={base64Image}
                                />

                                <section className="checkbox">
                                    <input 
                                    type="checkbox" 
                                    id="excavate"
                                    checked={!checkExcavate}
                                    onChange={() => {setExcavate(!checkExcavate)}}
                                    name="images" 
                                    value="excavate" 
                                    />
                                    <label htmlFor="excavate">Excavate (Overlap image with background)</label>
                                </section>
                            </div>}

                        <Button 
                        clickFunc={handleClick}
                        />
                </form>


                {!hidden && (
                        <div className="canvas-parent">

                            <div id="close-btn">
                                <X
                                onClick={handleClose} 
                                />
                            </div>

                            <div className="canvas-con" ref={qrRef}>
                                {titleValue && <h5 className="title"> {titleValue} </h5>}

                                <QRCodeSVG
                                size={qrSize}
                                value={inputValue}
                                title={titleValue}
                                bgColor={bgValue ? bgValue : "White"}
                                fgColor={fgValue ? fgValue : "Black"}
                                marginSize={3}
                                crossOrigin="anonymous"
                                imageSettings={{
                                    src: base64Image,
                                    x: undefined,
                                    y: undefined,
                                    height: logoSize,
                                    width: logoSize,
                                    opacity: 1,
                                    excavate: !checkExcavate
                                }}
                                />
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
                )}
            </div>
        </div>
    )
}

export default QrCode;