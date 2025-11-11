import { useEffect, useState } from "react";
import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
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

    const svgRef = useRef();
    

    // Store uploaded image to array
    const handleFile = (e) => {
        const files = Array.from(e.target.files);

        const urls = files.map(file => URL.createObjectURL(file))

        setImages(urls);
    }
    
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

    const downloadQR = () => {
        const svg = svgRef.current.querySelector("svg");
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = "my-qr-code.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        img.src = url;
    };

    function handleClick(event) {
        event.preventDefault();
        
        setCode(<div className="svg-parent">
                <div className="svg-con" ref={svgRef}>
                    {titleValue && <h2 className="title"> {titleValue} </h2>}

                    <QRCodeSVG
                    size={150}
                    value={inputValue}
                    title={titleValue}
                    bgColor={bgValue ? bgValue : "White"}
                    fgColor={fgValue ? fgValue : "Black"}
                    imageSettings={{
                        src: images,
                        x: undefined,
                        y: undefined,
                        height: 30,
                        width: 30,
                        opacity: 1,
                        excavate: !checkExcavate
                    }}
                    />
                </div>

                <button 
                onClick={downloadQR}
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