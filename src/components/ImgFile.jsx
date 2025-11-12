
function ImgFile(props) {


    return (
        <div>
            <input type="file" accept="image/*" onChange={props.func} multiple />

        </div>
    )
}

export default ImgFile;