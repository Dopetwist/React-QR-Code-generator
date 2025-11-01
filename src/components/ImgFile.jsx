
function ImgFile(props) {


    return (
        <div>
            <input type="file" onChange={props.func} multiple />

        </div>
    )
}

export default ImgFile;