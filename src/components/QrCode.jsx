import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ code, setCode ] = useState();
    const [ titleValue, setTitleValue ] = useState("");
    const [ bgValue, setBgValue ] = useState("");
    const [ fgValue, setFgValue ] = useState("");

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
        
        setCode(<QRCodeSVG 
            value={inputValue}
            title={titleValue}
            bgColor={bgValue}
            fgColor={fgValue}
        />);
    }


    return (
        <div>
            <h1> QR Code Generator </h1>
            <div className="container">
                <form action="#">
                    <input type="text"
                    onChange={handleChange}
                    value={inputValue} 
                    placeholder="Enter Link or Phone Number" 
                    />

                    <input type="text"
                    onChange={handleTitle}
                    value={titleValue} 
                    placeholder="Title of the QR Code" 
                    />

                    <input type="text"
                    onChange={handleBackground}
                    value={bgValue} 
                    placeholder="Enter Background Color (optional)" 
                    />

                    <input type="text"
                    onChange={handleForeground}
                    value={fgValue} 
                    placeholder="Enter Foreground Color (optional)" 
                    />

                    <input type="file" />

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