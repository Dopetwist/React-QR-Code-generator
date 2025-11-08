
function FgInput() {
    return (
        <div>
            <label htmlFor="code-fg"> Enter foreground color: </label>
            <input type="text"
            onChange={handleForeground}
            value={fgValue}
            id="code-fg"
            name="foreground"
            placeholder="Foreground Color (optional)" 
            />
        </div>
    )
}

export default FgInput;