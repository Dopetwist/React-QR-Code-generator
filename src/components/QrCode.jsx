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
    const [ radio, setRadio ] = useState(false);
    const [ hidden, setHidden ] = useState(true);
    const [ dark, setDark ] = useState(false);

    const qrRef = useRef();

    const qrSize = 160;

    const logoSize = Math.min(80, qrSize * 0.18); // adaptive size



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
        setExcavate(false);
    }


    // Download generated QR Code Image
    const handleDownload = async () => {

        const element = qrRef.current;

        if (!element) return;

        const canvas = await html2canvas(element, {
            useCORS: true, // supports external images/logos
            allowTaint: true,
            scale: 2 // increases image quality
        });

        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = (titleValue ? `${titleValue}.png` : "qr-code.png");
        link.click();
    };


    function handleClick(event) {
        event.preventDefault();

        if (inputValue.length === 0) {
            alert("Please enter a URL or number!")
            return;
        }

        setDark(true);
        
        setHidden(false);
    }


    return (
        <div className="main-con">
            <div className={`overlay ${dark ? "darken" : ""}`}></div>
            <div className="container">
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
                        <div className="svg-parent">

                            <div id="close-btn">
                                <X
                                onClick={handleClose} 
                                />
                            </div>

                            <div className="svg-con" ref={qrRef}>
                                {titleValue && <h3 className="title"> {titleValue} </h3>}

                                <QRCodeSVG
                                size={qrSize}
                                value={inputValue}
                                title={titleValue}
                                bgColor={bgValue ? bgValue : "White"}
                                fgColor={fgValue ? fgValue : "Black"}
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