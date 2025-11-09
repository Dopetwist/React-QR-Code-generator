
function Button(props) {
    return (
        <button className="btn"
        onClick={props.clickFunc}
        > 
            Generate
        </button>
    )
}

export default Button;