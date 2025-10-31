import { useState } from "react";

function ImgFile() {
    const [ imgArray, setImgArray ] = useState([]);

    return (
        <div>
            <input type="file" value={imgArray} onChange={(e) => {imgArray.push(e.target.value)}} />

            {console.log(imgArray)}
        </div>
    )
}

export default ImgFile;