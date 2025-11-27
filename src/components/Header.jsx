import QrScan from "./QrScan";

function Header() {
    return (
        <div id="header">
            <div className="header-logo">
                <h1> KwikScan </h1>
                <p> Encode and scan easily </p>
            </div>

            <div className="qr-scan">
                <QrScan />
            </div>
        </div>
    )
}

export default Header;