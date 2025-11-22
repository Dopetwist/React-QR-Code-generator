
function LinkInput(props) {
    return (
        <div className="input-div">
            <label htmlFor="code-link"> URL or Number: </label>
            <input type="text"
            onChange={props.changeFunc}
            value={props.text}
            id="code-link"
            name="link"
            placeholder="Enter Link or Phone Number" 
            />         
        </div>
    )
}

export default LinkInput;