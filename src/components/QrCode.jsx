import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ buttonText, setButtonText ] = useState("Generate");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }


    return (
        <div>
            <h1> QR Code Generator </h1>
            <div className="container">
                <input type="text"
                onChange={handleChange}
                value={inputValue} 
                placeholder="Enter Link" 
                />

                <button className="btn"> {buttonText} </button>

                {inputValue && <QRCodeSVG value={inputValue} />}
            </div>
        </div>
    )
}

export default QrCode;