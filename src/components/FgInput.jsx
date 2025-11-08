
function FgInput(props) {
    return (
        <div>
            <label htmlFor="code-fg"> Enter foreground color: </label>
            <input type="text"
            onChange={props.changeFunc}
            value={props.text}
            id="code-fg"
            name="foreground"
            placeholder="Foreground Color (optional)" 
            />
        </div>
    )
}

export default FgInput;