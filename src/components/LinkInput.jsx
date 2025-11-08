
function LinkInput() {
    return (
        <div>
            <label htmlFor="code-link"> Link or Number: </label>
            <input type="text"
            onChange={handleChange}
            value={inputValue}
            id="code-link"
            name="link"
            placeholder="Enter Link or Phone Number" 
            />         
        </div>
    )
}

export default LinkInput;