import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import ImgFile from "./ImgFile";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ code, setCode ] = useState();
    const [ titleValue, setTitleValue ] = useState("");
    const [ bgValue, setBgValue ] = useState("");
    const [ fgValue, setFgValue ] = useState("");
    const [ images, setImages ] = useState([]);
    const [ checkExcavate, setExcavate ] = useState(false);
    const [ radio, setRadio ] = useState(false);
    

    // Store uploaded image to array
    const handleFile = (e) => {
        const files = Array.from(e.target.files);

        const urls = files.map(file => URL.createObjectURL(file))

        setImages(urls);
    }
    
    // Toggle boolean value
    useEffect(() => {
        const toggleExcavate = () => {
            setExcavate(!checkExcavate)
        }

        toggleExcavate();
    }, [])


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

    function handleClick(event) {
        event.preventDefault();
        
        setCode(<div>
                <h1 className="title"> {titleValue} </h1>
                <QRCodeSVG 
                    value={inputValue}
                    title={titleValue}
                    bgColor={bgValue}
                    fgColor={fgValue}
                    imageSettings={{
                        src: images,
                        x: undefined,
                        y: undefined,
                        height: 30,
                        width: 30,
                        opacity: 1,
                        excavate: checkExcavate
                    }}
                />
            </div>
        );
    }


    return (
        <div>
            <h1> QR Code Generator </h1>
            <div className="container">
                <form action="#">
                    <label htmlFor="link"> Link or Number: </label>
                    <input type="text"
                    onChange={handleChange}
                    value={inputValue}
                    name="link"
                    placeholder="Enter Link or Phone Number" 
                    />

                    <label htmlFor="title"> Title: </label>
                    <input type="text"
                    onChange={handleTitle}
                    value={titleValue} 
                    name="title"
                    placeholder="Title of the QR Code" 
                    />

                    <label htmlFor="background"> Enter background color: </label>
                    <input type="text"
                    onChange={handleBackground}
                    value={bgValue} 
                    name="background"
                    placeholder="Background Color" 
                    />

                    <label htmlFor="foreground"> Enter foreground color: </label>
                    <input type="text"
                    onChange={handleForeground}
                    value={fgValue}
                    name="foreground"
                    placeholder="Foreground Color" 
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
                                    value="excavate" />
                                    <label htmlFor="excavate">Excavate (Overlap image with background)</label>
                                </section>
                            </div>}

                    <button className="btn"
                    onClick={handleClick}
                    > 
                        Generate
                    </button>
                </form>

                <div className="img-con">
                    {code}
                </div>
            </div>
        </div>
    )
}

export default QrCode;