import { useEffect, useState } from "react";
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import ImgFile from "./ImgFile";
import LinkInput from "./LinkInput";
import TitleInput from "./TitleInput";
import BgInput from "./BgInput";
import FgInput from "./FgInput";
import Button from "./Button";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ code, setCode ] = useState();
    const [ titleValue, setTitleValue ] = useState("");
    const [ bgValue, setBgValue ] = useState("");
    const [ fgValue, setFgValue ] = useState("");
    const [ images, setImages ] = useState([]);
    const [ checkExcavate, setExcavate ] = useState(false);
    const [ radio, setRadio ] = useState(false);

    const qrRef = useRef();
    

    // Store uploaded image to array
    const handleFile = (e) => {
        const files = Array.from(e.target.files);

        if (files) {
            // revoke previous if any
            if (images) URL.revokeObjectURL(images);

            const urls = files.map(file => URL.createObjectURL(file))

            setImages(urls);
        }
    }

    // const triggerDownload = (dataUrl, filename = "qr.png") => {
    //     const link = document.createElement("a");
    //     link.href = dataUrl;
    //     link.download = filename;

    //     // append -> click -> remove is most compatible
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    // };
    
    // Toggle boolean value
    useEffect(() => {
        const toggleExcavate = () => {
            setExcavate(!checkExcavate);
        }

        toggleExcavate();
    }, []);


    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleTitle = (e) => {
        setTitleValue(e.target.value);
    }

    const handleBackground = (e) => {
        setBgValue(e.target.value);
    }

    const handleForeground = (e) => {
        setFgValue(e.target.value);
    }

    // Download generated QR Code Image
    const handleDownload = async () => {

        const element = qrRef.current;

        if (!element) return;

        const canvas = await html2canvas(element, {
            useCORS: true, // supports external images/logos
            scale: 2 // increases image quality
        });

        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "qr-code.png";
        link.click();


        // const svg = svgRef.current.querySelector("svg");


        // const svgData = new XMLSerializer().serializeToString(svg);
        // const canvas = document.createElement("canvas");
        // const ctx = canvas.getContext("2d");

        // const qrSize = 160;

        // // Convert SVG to PNG
        // const img = new Image();
        // const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        // const url = URL.createObjectURL(svgBlob);

        // img.onload = () => {
        //     canvas.width = qrSize;
        //     canvas.height = qrSize;
        //     ctx.drawImage(img, 0, 0, qrSize, qrSize);
        //     URL.revokeObjectURL(url);

        //     const drawTextAndFinish = () => {
        //         const pngDataUrl = canvas.toDataURL("image/png");
        //         triggerDownload(pngDataUrl, images[0] ? "qr-with-logo.png" : "qr-code.png");
        //     };

        //     if (images) {
        //         const logo = new Image();
        //         const selectedLogo = images[0];
        //         logo.src = selectedLogo;

        //         logo.onload = () => {
        //             const logoSize = 40;
        //             const x = (qrSize - logoSize) / 2;
        //             const y = (qrSize - logoSize) / 2;
        //             ctx.drawImage(logo, x, y, logoSize, logoSize);

        //             drawTextAndFinish();
        //         }

        //         logo.onerror = (err) => {
        //             console.warn("Logo failed to load, proceeding without it.", err);
        //             drawTextAndFinish();
        //         };

        //         logo.src = images;
        //     } else {
        //         drawTextAndFinish();
        //     }
        // };

        // img.onerror = (err) => {
        //     console.error("Failed to load QR image from SVG blob", err);
        //     URL.revokeObjectURL(url);
        // };

        // img.src = url;
    };

    function handleClick(event) {
        event.preventDefault();
        
        setCode(<div className="svg-parent">
                <div className="svg-con" ref={qrRef}>
                    {titleValue && <h2 className="title"> {titleValue} </h2>}

                    <QRCodeSVG
                    size={160}
                    value={inputValue}
                    title={titleValue}
                    bgColor={bgValue ? bgValue : "White"}
                    fgColor={fgValue ? fgValue : "Black"}
                    imageSettings={{
                        src: images,
                        x: undefined,
                        y: undefined,
                        height: 40,
                        width: 40,
                        opacity: 1,
                        excavate: !checkExcavate
                    }}
                    />
                </div>

                <button 
                onClick={handleDownload}
                id="download-btn"
                > 
                    Download 
                </button>
            </div>
        );
    }


    return (
        <div>
            <h1> QR Code Generator </h1>
            <div className="container">
                <form action="#">
                    
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
                            <div className="yes"
                            onClick={() => {setRadio(true)}}>
                                <input type="radio" id="yes" name="logo" value="yes" />
                                <label htmlFor="yes">Yes</label>
                            </div>

                            <div className="no"
                            onClick={() => {setRadio(false)}}>
                                <input type="radio" id="no" name="logo" value="no" />
                                <label htmlFor="no">No</label>
                            </div>
                        </div>
                    </section>

                    
                    {radio && <div>
                                <ImgFile
                                func={handleFile}
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

                <div className="img-con">
                    {code}
                </div>
            </div>
        </div>
    )
}

export default QrCode;