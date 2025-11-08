
function BgInput() {
    return (
        <div>
            <label htmlFor="code-bg"> Enter background color: </label>
            <input type="text"
            onChange={handleBackground}
            value={bgValue}
            id="code-bg"
            name="background"
            placeholder="Background Color (optional)" 
            />
        </div>
    )
}

export default BgInput;