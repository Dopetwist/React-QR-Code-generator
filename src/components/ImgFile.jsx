import { Upload } from "lucide-react";
import { useState } from "react";


function ImgFile(props) {

    const [ buttonText, setButtonText ] = useState(<> 
                    <Upload
                    size={18}
                    id="upload-icon" 
                    /> 
                    Upload Image 
                </>)
                

    const handleUpload = (e) => {
        e.preventDefault();

        setButtonText("Please wait...")

        const inputFile = document.getElementById("file-input");

        inputFile.click();
    }


    return (
        <div>
            <button 
            id="upload-btn"
            onClick={handleUpload}
            > 
                { props.confirmImage ? "Uploaded ✅" : buttonText }

            </button>

            <input type="file" id="file-input" className="hide" accept="image/*" onChange={props.func} multiple />

        </div>
    )
}

export default ImgFile;