
function BgInput(props) {
    return (
        <div className="input-div">
            <label htmlFor="code-bg"> Enter background color (optional): </label>
            <input type="text"
            onChange={props.changeFunc}
            value={props.text}
            id="code-bg"
            name="background"
            placeholder="Background Color" 
            />
        </div>
    )
}

export default BgInput;