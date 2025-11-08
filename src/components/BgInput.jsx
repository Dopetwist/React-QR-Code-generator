
function BgInput(props) {
    return (
        <div>
            <label htmlFor="code-bg"> Enter background color: </label>
            <input type="text"
            onChange={props.changeFunc}
            value={props.text}
            id="code-bg"
            name="background"
            placeholder="Background Color (optional)" 
            />
        </div>
    )
}

export default BgInput;