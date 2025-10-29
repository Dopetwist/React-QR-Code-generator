import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function QrCode() {
    const [ inputValue, setInputValue ] = useState("");
    const [ code, setCode ] = useState();
    const [ titleValue, setTitleValue ] = useState("");
    const [ bgValue, setBgValue ] = useState("");
    const [ fgValue, setfgValue ] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    function handleClick() {
        setCode(<QRCodeSVG value={inputValue} />);
    }


    return (
        <div>
            <h1> QR Code Generator </h1>
            <div className="container">
                <input type="text"
                onChange={handleChange}
                value={inputValue} 
                placeholder="Enter Link or Phone Number" 
                />

                <input type="text" value="" placeholder="Title of the QR Code" />

                <input type="text" value="" placeholder="Enter Background Color" />

                <input type="text" value="" placeholder="Enter Foreground Color" />

                <input type="file" />

                <button className="btn"
                onClick={handleClick}
                > 
                    Generate
                </button>

                <div className="img-con">
                    {code}
                </div>
            </div>
        </div>
    )
}

export default QrCode;