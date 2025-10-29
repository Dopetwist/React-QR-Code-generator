import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ buttonText, setButtonText ] = useState("Generate");
    const [ click, setClick ] = useState(false);
    const [ code, setCode ] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    function handleClick() {
        setClick(true);
        setCode(<QRCodeSVG value={inputValue} />);
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

                <button className="btn"
                onClick={handleClick}
                > 
                    {buttonText} 
                </button>

               <img src={code} alt="QR Code" />
            </div>
        </div>
    )
}

export default QrCode;