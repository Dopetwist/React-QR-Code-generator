
function TitleInput() {
    return (
        <div>
            <label htmlFor="code-title"> Title: </label>
            <input type="text"
            onChange={handleTitle}
            value={titleValue} 
            id="code-title"
            name="title"
            placeholder="Title of the QR Code" 
            />
        </div>
    )
}

export default TitleInput;