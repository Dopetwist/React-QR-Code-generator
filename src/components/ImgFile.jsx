
function ImgFile(props) {


    return (
        <div>
            <input type="file" id="file-input" accept="image/*" onChange={props.func} multiple />

        </div>
    )
}

export default ImgFile;