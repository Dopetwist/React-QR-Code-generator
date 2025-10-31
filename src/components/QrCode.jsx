import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import ImgFile from "./ImgFile";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ code, setCode ] = useState();
    const [ titleValue, setTitleValue ] = useState("");
    const [ bgValue, setBgValue ] = useState("");
    const [ fgValue, setFgValue ] = useState("");
    const [ imgValue, setImgValue ] = useState("");
    

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
            />
        </div>);
    }

    // useEffect(() => {
    //     const checkImg = (e) => {
    //         setImgValue(e.target.value)
    //     }
    // }, []);

    // const checkImg = (e) => {
    //     setImgValue(e.target.value)
    // }


    return (
        <div>
            <h1> QR Code Generator </h1>
            <div className="container">
                <form action="#">
                    <input type="text"
                    onChange={handleChange}
                    value={inputValue}
                    name="link"
                    placeholder="Enter Link or Phone Number" 
                    />

                    <input type="text"
                    onChange={handleTitle}
                    value={titleValue} 
                    name="title"
                    placeholder="Title of the QR Code" 
                    />

                    <input type="text"
                    onChange={handleBackground}
                    value={bgValue} 
                    name="background"
                    placeholder="Enter Background Color (optional)" 
                    />

                    <input type="text"
                    onChange={handleForeground}
                    value={fgValue}
                    name="foreground"
                    placeholder="Enter Foreground Color (optional)" 
                    />

                    <ImgFile />


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