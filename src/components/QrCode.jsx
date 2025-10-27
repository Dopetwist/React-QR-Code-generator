import { QRCodeSVG } from "qrcode.react";

function QrCode() {
    return (
        <div>
            <QRCodeSVG value="https://jonathan-afugwobi.vercel.app/" />
        </div>
    )
}

export default QrCode;