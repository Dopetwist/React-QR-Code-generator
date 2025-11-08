
function TitleInput(props) {
    return (
        <div>
            <label htmlFor="code-title"> Title: </label>
            <input type="text"
            onChange={props.changeFunc}
            value={props.text} 
            id="code-title"
            name="title"
            placeholder="Title of the QR Code" 
            />
        </div>
    )
}

export default TitleInput;