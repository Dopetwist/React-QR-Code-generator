import { useState } from "react";

function ImgFile() {
    const [ images, setImages ] = useState([]);

    const handleFile = (e) => {
        const files = Array.from(e.target.files);

        const urls = files.map(file => URL.createObjectURL(file))

        setImages(urls);

        console.log(urls);
    }


    return (
        <div>
            <input type="file" onChange={handleFile} multiple />

        </div>
    )
}

export default ImgFile;