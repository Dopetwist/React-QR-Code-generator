
function FgInput(props) {
    return (
        <div className="input-div">
            <label htmlFor="code-fg"> Enter foreground color (optional): </label>
            <input type="text"
            onChange={props.changeFunc}
            value={props.text}
            id="code-fg"
            className="increase-input"
            name="foreground"
            placeholder="Foreground Color" 
            />
        </div>
    )
}

export default FgInput;