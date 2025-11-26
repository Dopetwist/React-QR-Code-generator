import { useRef, useState } from "react";
import { Upload } from "lucide-react";


function ImgFile(props) {
    const fileInputRef = useRef(null);
    const [ btnText, setBtnText ] = useState(<> 
                    <Upload
                    size={18}
                    id="upload-icon" 
                    /> 
                    Upload Image 
                </>);
                

    const handleUpload = (e) => {
        e.preventDefault();
        setBtnText("Please wait...")
        fileInputRef.current.click();

        // Reset button text on file-picker dialog cancel
        const resetOnFocus = () => {
            setBtnText(<> 
                    <Upload
                    size={18}
                    id="upload-icon" 
                    /> 
                    Upload Image 
                </>);
            window.removeEventListener("focus", resetOnFocus);
        };

        window.addEventListener("focus", resetOnFocus);
    }


    return (
        <div>
            <button 
            id="upload-btn"
            onClick={handleUpload}
            > 
                { props.confirmImage ? "Uploaded ✅" : btnText }

            </button>

            <input 
            type="file" 
            id="file-input" 
            accept="image/*"
            ref={fileInputRef}
            onChange={props.func}
            hidden
            />

        </div>
    )
}

export default ImgFile;